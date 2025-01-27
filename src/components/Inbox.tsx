import { useState, useEffect } from 'react';
import { RefreshCw, Copy, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { emailService } from '@/services/emailService';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Email {
  id: string;
  from: string;
  subject: string;
  seen: boolean;
  createdAt: string;
}

interface InboxProps {
  currentEmail: string;
}

export const Inbox = ({ currentEmail }: InboxProps) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const refreshInterval = setInterval(refreshInbox, 30000); // Refresh every 30 seconds
    return () => clearInterval(refreshInterval);
  }, [currentEmail]);

  const refreshInbox = async () => {
    if (!currentEmail) return;
    
    setLoading(true);
    try {
      const messages = await emailService.getMessages(currentEmail);
      setEmails(messages);
      toast.success(`Inbox refreshed: ${messages.length} messages found`);
    } catch (error) {
      console.error('Error refreshing inbox:', error);
      toast.error('Failed to refresh inbox');
    } finally {
      setLoading(false);
    }
  };

  const copyEmail = async () => {
    if (!currentEmail) {
      toast.error('No email address to copy');
      return;
    }
    
    try {
      await navigator.clipboard.writeText(currentEmail);
      toast.success('Email copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy email address');
    }
  };

  const deleteAllEmails = () => {
    setEmails([]);
    toast.success('All emails deleted!');
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-6 animate-fade-in hover:shadow-xl transition-shadow duration-300">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
          Your Inbox
        </h2>
      </div>

      <div className="min-h-[400px]">
        {emails.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Sender</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="text-right">View</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emails.map((email, index) => (
                <TableRow 
                  key={email.id}
                  className="animate-fade-in hover:bg-accent/50 cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <TableCell className="font-medium">{email.from}</TableCell>
                  <TableCell>{email.subject}</TableCell>
                  <TableCell className="text-right">
                    <button 
                      className="text-primary hover:text-primary/80 transition-colors"
                      onClick={() => toast.info('Email viewer coming soon!')}
                    >
                      View
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12 animate-scale-in">
            <div className="w-24 h-24 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center transform transition-transform hover:scale-110 hover:rotate-12">
              <span className="text-3xl">—</span>
            </div>
            <p className="text-gray-800 font-medium animate-fade-in" style={{ animationDelay: '400ms' }}>
              Your inbox is empty
            </p>
            <p className="text-gray-500 text-sm animate-fade-in" style={{ animationDelay: '500ms' }}>
              Awaiting for incoming emails
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-8 border-t pt-4">
        <button
          onClick={copyEmail}
          className="flex items-center gap-2 px-6 py-2 text-gray-600 hover:text-primary transition-colors transform hover:scale-105 active:scale-95 hover:bg-accent/50 rounded-full"
        >
          <Copy size={18} /> Copy
        </button>
        <button
          onClick={refreshInbox}
          disabled={loading}
          className={cn(
            "flex items-center gap-2 px-6 py-2 text-gray-600 hover:text-primary transition-colors",
            "transform hover:scale-105 active:scale-95 hover:bg-accent/50 rounded-full",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <RefreshCw size={18} className={cn(loading && "animate-spin")} /> Refresh
        </button>
        <button
          onClick={deleteAllEmails}
          className="flex items-center gap-2 px-6 py-2 text-gray-600 hover:text-primary transition-colors transform hover:scale-105 active:scale-95 hover:bg-accent/50 rounded-full"
        >
          <Trash2 size={18} /> Delete
        </button>
      </div>
    </div>
  );
};