import { toast } from "sonner";

const API_URL = "https://api.mail.gw";

interface EmailResponse {
  id: string;
  address: string;
}

interface Domain {
  id: string;
  domain: string;
}

// Store password temporarily in memory
let currentPassword = "";

export const emailService = {
  async generateEmail(): Promise<string> {
    try {
      // First get available domains
      const domainsResponse = await fetch(`${API_URL}/domains`);
      if (!domainsResponse.ok) {
        throw new Error('Failed to fetch domains');
      }
      const domainsData = await domainsResponse.json();
      const domains: Domain[] = domainsData['hydra:member'];
      const randomDomain = domains[Math.floor(Math.random() * domains.length)];
      
      // Generate random username and password
      const username = Math.random().toString(36).substring(2, 12);
      currentPassword = Math.random().toString(36).substring(2, 12);
      
      // Create new email account
      const createResponse = await fetch(`${API_URL}/accounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: `${username}@${randomDomain.domain}`,
          password: currentPassword,
        }),
      });

      if (!createResponse.ok) {
        throw new Error('Failed to create email account');
      }
      
      const emailData: EmailResponse = await createResponse.json();
      return emailData.address;
    } catch (error) {
      console.error('Error generating email:', error);
      toast.error("Failed to generate email");
      throw error;
    }
  },

  async getMessages(email: string): Promise<any[]> {
    try {
      // Get auth token using stored password
      const authResponse = await fetch(`${API_URL}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: email,
          password: currentPassword,
        }),
      });

      if (!authResponse.ok) {
        // If authentication fails, generate a new email and notify the UI
        console.error('Auth failed, generating new email...');
        const newEmail = await this.generateEmail();
        
        // Important: Update the UI with the new email
        window.dispatchEvent(new CustomEvent('emailUpdated', { detail: newEmail }));
        
        // Get new auth token with the new credentials
        const retryAuthResponse = await fetch(`${API_URL}/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: newEmail,
            password: currentPassword,
          }),
        });

        if (!retryAuthResponse.ok) {
          console.error('Retry auth failed');
          toast.error("Authentication failed");
          return [];
        }

        const { token } = await retryAuthResponse.json();
        
        // Get messages with new token
        const messagesResponse = await fetch(`${API_URL}/messages`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!messagesResponse.ok) {
          throw new Error('Failed to fetch messages');
        }

        const messagesData = await messagesResponse.json();
        console.log('Fetched messages:', messagesData['hydra:member']);
        return messagesData['hydra:member'];
      }

      const { token } = await authResponse.json();

      // Get messages with valid token
      const messagesResponse = await fetch(`${API_URL}/messages`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!messagesResponse.ok) {
        throw new Error('Failed to fetch messages');
      }

      const messagesData = await messagesResponse.json();
      console.log('Fetched messages:', messagesData['hydra:member']);
      return messagesData['hydra:member'];
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error("Failed to fetch messages");
      return [];
    }
  },
};