const API_URL = "https://api.mail.gw";

interface EmailResponse {
  id: string;
  address: string;
}

interface Domain {
  id: string;
  domain: string;
}

// Store credentials temporarily in memory
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
      throw error;
    }
  },

  async getMessages(email: string): Promise<any[]> {
    try {
      // Get auth token
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
        console.error('Auth failed:', await authResponse.text());
        return [];
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
        console.error('Messages fetch failed:', await messagesResponse.text());
        return [];
      }

      const messagesData = await messagesResponse.json();
      const messages = messagesData['hydra:member'];

      // Fetch full content for each message
      const fullMessages = await Promise.all(
        messages.map(async (message: any) => {
          const messageResponse = await fetch(`${API_URL}/messages/${message.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (messageResponse.ok) {
            const fullMessage = await messageResponse.json();
            return fullMessage;
          }
          return message;
        })
      );

      return fullMessages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  },
};
