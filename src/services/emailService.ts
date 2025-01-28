const API_URL = "https://www.1secmail.com/api/v1";

interface EmailResponse {
  id: string;
  address: string;
}

interface Message {
  id: number;
  from: string;
  subject: string;
  date: string;
  attachments: any[];
  body: string;
  textBody: string;
  htmlBody: string;
}

let currentEmail = "";

export const emailService = {
  async generateEmail(): Promise<string> {
    try {
      const response = await fetch(`${API_URL}/?action=genRandomMailbox&count=1`);
      if (!response.ok) {
        throw new Error('Failed to generate email');
      }
      const [email] = await response.json();
      currentEmail = email;
      return email;
    } catch (error) {
      console.error('Error generating email:', error);
      throw error;
    }
  },

  async getMessages(email: string): Promise<any[]> {
    try {
      const [login, domain] = email.split('@');
      
      if (!login || !domain) {
        throw new Error('Invalid email format');
      }

      const response = await fetch(
        `${API_URL}/?action=getMessages&login=${login}&domain=${domain}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const messages = await response.json();
      
      // Fetch full message content for each message
      const fullMessages = await Promise.all(
        messages.map(async (msg: any) => {
          const msgResponse = await fetch(
            `${API_URL}/?action=readMessage&login=${login}&domain=${domain}&id=${msg.id}`
          );
          
          if (!msgResponse.ok) {
            return {
              ...msg,
              text: 'Failed to load message content',
              html: null
            };
          }

          const fullMsg = await msgResponse.json();
          
          return {
            id: String(msg.id),
            from: {
              address: msg.from,
              name: msg.from.split('@')[0]
            },
            subject: msg.subject,
            text: fullMsg.textBody,
            html: fullMsg.htmlBody,
            seen: false,
            createdAt: msg.date
          };
        })
      );

      return fullMessages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  }
};