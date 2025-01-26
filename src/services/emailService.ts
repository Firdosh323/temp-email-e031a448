import { toast } from "sonner";

const API_URL = "https://www.1secmail.com/api/v1/";

interface EmailResponse {
  login: string;
  domain: string;
}

export const emailService = {
  async generateEmail(): Promise<string> {
    try {
      const response = await fetch(`${API_URL}?action=genRandomMailbox&count=1`);
      const data = await response.json() as EmailResponse[];
      return data[0].login + "@" + data[0].domain;
    } catch (error) {
      toast.error("Failed to generate email");
      throw error;
    }
  },

  async getMessages(email: string): Promise<any[]> {
    try {
      const [login, domain] = email.split("@");
      const response = await fetch(
        `${API_URL}?action=getMessages&login=${login}&domain=${domain}`
      );
      return await response.json();
    } catch (error) {
      toast.error("Failed to fetch messages");
      throw error;
    }
  },
};