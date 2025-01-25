import { useState, useEffect } from 'react';
import { Copy, RefreshCw, Trash2, Loader } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export const EmailGenerator = () => {
  const [tempEmail, setTempEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Generate random email on component mount
  useEffect(() => {
    generateEmail();
  }, []);

  const generateRandomString = (length = 10) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const generateEmail = async () => {
    setIsGenerating(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      const randomString = generateRandomString();
      const newEmail = `${randomString}@tempmail.com`;
      setTempEmail(newEmail);
      toast.success("New email address generated!");
    } catch (error) {
      toast.error("Failed to generate email address");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyEmail = async () => {
    if (!tempEmail) {
      toast.error("No email address to copy");
      return;
    }
    
    try {
      await navigator.clipboard.writeText(tempEmail);
      toast.success("Email copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy email address");
    }
  };

  const refreshInbox = async () => {
    if (!tempEmail) {
      toast.error("No email address to refresh");
      return;
    }

    setIsRefreshing(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Inbox refreshed successfully!");
    } catch (error) {
      toast.error("Failed to refresh inbox");
    } finally {
      setIsRefreshing(false);
    }
  };

  const deleteEmail = () => {
    if (!tempEmail) {
      toast.error("No email address to delete");
      return;
    }
    
    setTempEmail('');
    toast.success("Email address deleted!");
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="flex justify-center gap-8 mb-6">
        <button className="text-primary font-medium border-b-2 border-primary pb-2 transition-all hover:opacity-80">
          Temporary E-mail
        </button>
        <button className="text-gray-600 hover:text-primary transition-colors">
          Temporary SMS
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-center animate-fade-in">
        <span className="text-primary font-normal">Temporary</span>
        <br />
        Email Address
      </h1>

      <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto animate-fade-in">
        Forget about spam, advertising mailings, hacking and attacking robots. Keep your real mailbox clean and secure. Temp Mail provides temporary, secure, anonymous, free, disposable email address.
      </p>

      <div className="bg-secondary rounded-full mb-6 flex items-center p-2 transition-all hover:shadow-md">
        <input
          type="text"
          value={tempEmail}
          readOnly
          placeholder="Your temporary email address"
          className="flex-1 bg-transparent px-4 py-2 outline-none"
        />
        <button
          onClick={copyEmail}
          className="bg-white text-primary px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50"
          disabled={!tempEmail}
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
            "hover:bg-accent/80 disabled:opacity-50",
            "transform hover:scale-105 active:scale-95"
          )}
        >
          {isGenerating ? (
            <Loader className="animate-spin" size={18} />
          ) : (
            <Copy size={18} />
          )}
          Generate
        </button>
        <button
          onClick={refreshInbox}
          disabled={isRefreshing || !tempEmail}
          className={cn(
            "flex items-center gap-2 px-6 py-2 bg-accent rounded-full transition-all duration-300",
            "hover:bg-accent/80 disabled:opacity-50",
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
          disabled={!tempEmail}
          className={cn(
            "flex items-center gap-2 px-6 py-2 bg-accent rounded-full transition-all duration-300",
            "hover:bg-accent/80 disabled:opacity-50",
            "transform hover:scale-105 active:scale-95"
          )}
        >
          <Trash2 size={18} />
          Delete
        </button>
      </div>
    </div>
  );
};