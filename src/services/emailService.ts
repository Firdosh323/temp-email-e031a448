import { toast } from "sonner";

const API_URL = "https://1secmail.com/api/v1/";
const CORS_PROXY = "https://api.allorigins.win/raw?url=";

interface EmailResponse {
  login: string;
  domain: string;
}

export const emailService = {
  async generateEmail(): Promise<string> {
    try {
      const url = encodeURIComponent(`${API_URL}?action=genRandomMailbox&count=1`);
      const response = await fetch(`${CORS_PROXY}${url}`);
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
      const url = encodeURIComponent(
        `${API_URL}?action=getMessages&login=${login}&domain=${domain}`
      );
      const response = await fetch(`${CORS_PROXY}${url}`);
      return await response.json();
    } catch (error) {
      toast.error("Failed to fetch messages");
      throw error;
    }
  },
};