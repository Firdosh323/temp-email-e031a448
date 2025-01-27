import { useState, useEffect } from 'react';
import { Copy, RefreshCw, Trash2, Loader } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { emailService } from '@/services/emailService';

interface EmailGeneratorProps {
  onEmailGenerated: (email: string) => void;
  currentEmail: string;
}

export const EmailGenerator = ({ onEmailGenerated, currentEmail }: EmailGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!currentEmail) {
      generateEmail();
    }
  }, []);

  const generateEmail = async () => {
    setIsGenerating(true);
    try {
      const newEmail = await emailService.generateEmail();
      onEmailGenerated(newEmail);
      toast.success("New email address generated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate email");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyEmail = async () => {
    if (!currentEmail) {
      toast.error("No email address to copy");
      return;
    }
    
    try {
      await navigator.clipboard.writeText(currentEmail);
      toast.success("Email copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy email address");
    }
  };

  const refreshInbox = async () => {
    if (!currentEmail) {
      toast.error("No email address to refresh");
      return;
    }

    setIsRefreshing(true);
    try {
      const messages = await emailService.getMessages(currentEmail);
      toast.success(`Inbox refreshed: ${messages.length} messages found`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to refresh inbox");
    } finally {
      setIsRefreshing(false);
    }
  };

  const deleteEmail = () => {
    if (!currentEmail) {
      toast.error("No email address to delete");
      return;
    }
    
    onEmailGenerated('');
    toast.success("Email address deleted!");
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="flex justify-center gap-8 mb-6">
        <button className="text-primary font-medium border-b-2 border-primary pb-2 transition-all hover:opacity-80 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
          Temporary E-mail
        </button>
        <button className="text-gray-600 hover:text-primary transition-colors">
          Temporary SMS
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-center animate-scale-in bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
        <span className="font-normal">Temporary</span>
        <br />
        Email Address
      </h1>

      <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto animate-fade-in">
        Forget about spam, advertising mailings, hacking and attacking robots. Keep your real mailbox clean and secure. Temp Mail provides temporary, secure, anonymous, free, disposable email address.
      </p>

      <div className="bg-white rounded-full mb-6 flex items-center p-2 transition-all hover:shadow-lg hover:scale-105 duration-300 border border-gray-100">
        <input
          type="text"
          value={currentEmail}
          readOnly
          placeholder="Your temporary email address"
          className="flex-1 bg-transparent px-4 py-2 outline-none"
        />
        <button
          onClick={copyEmail}
          className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 transform hover:scale-105 active:scale-95"
          disabled={!currentEmail}
        >
          Copy
        </button>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={generateEmail}
          disabled={isGenerating}
          className={cn(
            "flex items-center gap-2 px-6 py-2 bg-accent rounded-full transition-all duration-300",
            "hover:bg-accent/80 disabled:opacity-50 hover:shadow-md",
            "transform hover:scale-105 active:scale-95"
          )}
        >
          {isGenerating ? (
            <Loader className="animate-spin" size={18} />
          ) : (
            <Copy size={18} className="transition-transform group-hover:rotate-12" />
          )}
          Generate
        </button>
        <button
          onClick={refreshInbox}
          disabled={isRefreshing || !currentEmail}
          className={cn(
            "flex items-center gap-2 px-6 py-2 bg-accent rounded-full transition-all duration-300",
            "hover:bg-accent/80 disabled:opacity-50 hover:shadow-md",
            "transform hover:scale-105 active:scale-95"
          )}
        >
          <RefreshCw
            size={18}
            className={cn(isRefreshing && "animate-spin")}
          />
          Refresh
        </button>
        <button
          onClick={deleteEmail}
          disabled={!currentEmail}
          className={cn(
            "flex items-center gap-2 px-6 py-2 bg-accent rounded-full transition-all duration-300",
            "hover:bg-accent/80 disabled:opacity-50 hover:shadow-md",
            "transform hover:scale-105 active:scale-95 group"
          )}
        >
          <Trash2 size={18} className="transition-transform group-hover:rotate-12" />
          Delete
        </button>
      </div>
    </div>
  );
};