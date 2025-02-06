
import { useState, useEffect } from 'react';
import { RefreshCw, Copy, Trash2, Mail, Search, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { emailService } from '@/services/emailService';
import { EmailView } from './EmailView';
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
  from: {
    address: string;
    name: string;
  };
  subject: string;
  text?: string;
  html?: string;
  seen: boolean;
  createdAt: string;
}

interface InboxProps {
  currentEmail: string;
}

export const Inbox = ({ currentEmail }: InboxProps) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (currentEmail) {
      refreshInbox();
    }
  }, [currentEmail]);

  useEffect(() => {
    if (currentEmail) {
      const refreshInterval = setInterval(refreshInbox, 10000); // 10 seconds
      return () => clearInterval(refreshInterval);
    }
  }, [currentEmail]);

  const refreshInbox = async () => {
    if (!currentEmail || loading) return;
    
    setLoading(true);
    setIsRefreshing(true);
    try {
      const messages = await emailService.getMessages(currentEmail);
      setEmails(messages);
      if (messages.length > 0) {
        toast.success(`Inbox refreshed: ${messages.length} messages found`);
      }
    } catch (error) {
      console.error('Error refreshing inbox:', error);
      toast.error('Failed to refresh inbox');
      setEmails([]);
    } finally {
      setLoading(false);
      setTimeout(() => setIsRefreshing(false), 1000); // Keep animation for 1 second
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

  const handleViewEmail = (email: Email) => {
    setSelectedEmail(email);
  };

  const filteredEmails = emails.filter(email => 
    email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.from.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (email.from.name && email.from.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-4xl mx-auto mt-12 animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-primary/10 to-purple-500/10 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <Mail className="text-primary" /> Your Inbox
            </h2>
            <div className="flex gap-2">
              <button
                onClick={refreshInbox}
                disabled={loading}
                className={cn(
                  "p-2 text-gray-600 hover:text-primary transition-colors rounded-full hover:bg-white/50",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  isRefreshing && "animate-spin"
                )}
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={copyEmail}
                className="p-2 text-gray-600 hover:text-primary transition-colors rounded-full hover:bg-white/50"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button
                onClick={deleteAllEmails}
                className="p-2 text-gray-600 hover:text-primary transition-colors rounded-full hover:bg-white/50"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Email List */}
        <div className="min-h-[400px]">
          {filteredEmails.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">From</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead className="text-right w-[120px]">Date</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmails.map((email, index) => (
                  <TableRow 
                    key={email.id}
                    className={cn(
                      "animate-fade-in hover:bg-accent/50",
                      !email.seen && "font-medium"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell>
                      {email.from.name || email.from.address}
                    </TableCell>
                    <TableCell>{email.subject}</TableCell>
                    <TableCell className="text-right text-gray-500">
                      {new Date(email.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleViewEmail(email)}
                        className="p-2 text-gray-600 hover:text-primary transition-colors rounded-full hover:bg-white/50"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 animate-scale-in">
              <div className="w-24 h-24 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center transform transition-transform hover:scale-110 hover:rotate-12">
                <Mail className="w-12 h-12 text-primary/40" />
              </div>
              <p className="text-gray-800 font-medium animate-fade-in" style={{ animationDelay: '400ms' }}>
                Your inbox is empty
              </p>
              <p className="text-gray-500 text-sm animate-fade-in" style={{ animationDelay: '500ms' }}>
                Awaiting incoming emails
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Email View Modal */}
      {selectedEmail && (
        <EmailView 
          email={selectedEmail} 
          onClose={() => setSelectedEmail(null)} 
        />
      )}
    </div>
  );
};
