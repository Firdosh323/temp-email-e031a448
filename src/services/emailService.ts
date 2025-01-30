const API_URL = "https://api.mail.gw";

interface EmailResponse {
  id: string;
  address: string;
}

interface Domain {
  id: string;
  domain: string;
}

interface MessageResponse {
  'hydra:member': Message[];
  'hydra:totalItems': number;
}

interface Message {
  id: string;
  accountId: string;
  from: {
    name: string;
    address: string;
  };
  to: Array<{
    name: string;
    address: string;
  }>;
  subject: string;
  intro?: string;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
}

interface MessageDetail extends Message {
  text?: string;
  html?: string[];
  attachments?: Array<{
    id: string;
    filename: string;
    contentType: string;
    size: number;
    downloadUrl: string;
  }>;
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
      
      // Generate random username
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

  async getToken(): Promise<string> {
    try {
      const authResponse = await fetch(`${API_URL}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: currentEmail,
          password: currentPassword,
        }),
      });

      if (!authResponse.ok) {
        throw new Error('Authentication failed');
      }

      const { token } = await authResponse.json();
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
      throw error;
    }
  },

  async getMessages(email: string): Promise<Message[]> {
    try {
      const token = await this.getToken();
      
      const messagesResponse = await fetch(`${API_URL}/messages?page=1`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!messagesResponse.ok) {
        throw new Error('Failed to fetch messages');
      }

      const messagesData: MessageResponse = await messagesResponse.json();
      
      // Fetch detailed content for each message
      const detailedMessages = await Promise.all(
        messagesData['hydra:member'].map(async (message) => {
          try {
            const detailResponse = await fetch(`${API_URL}/messages/${message.id}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
            
            if (detailResponse.ok) {
              const detailData: MessageDetail = await detailResponse.json();
              return {
                ...message,
                text: detailData.text,
                html: detailData.html?.[0],
              };
            }
          } catch (error) {
            console.error(`Error fetching message detail for ${message.id}:`, error);
          }
          return message;
        })
      );

      return detailedMessages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },
};