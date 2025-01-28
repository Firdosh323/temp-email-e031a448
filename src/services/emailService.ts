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
let currentEmail = "";
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
      currentEmail = `${username}@${randomDomain.domain}`;
      
      // Create new email account
      const createResponse = await fetch(`${API_URL}/accounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: currentEmail,
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

  async getAuthToken(): Promise<string> {
    const response = await fetch(`${API_URL}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: currentEmail,
        password: currentPassword,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get auth token');
    }

    const data = await response.json();
    return data.token;
  },

  async getMessages(email: string): Promise<any[]> {
    try {
      // Update current email if it's different
      if (email !== currentEmail) {
        currentEmail = email;
      }

      // Get auth token
      const token = await this.getAuthToken();

      // Get messages with token
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