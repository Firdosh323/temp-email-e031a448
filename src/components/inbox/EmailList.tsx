
import { Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Mail } from 'lucide-react';

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

interface EmailListProps {
  emails: Email[];
  onViewEmail: (email: Email) => void;
}

export const EmailList = ({ emails, onViewEmail }: EmailListProps) => {
  if (emails.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-accent/50 rounded-full flex items-center justify-center transform transition-all duration-500 hover:scale-110 hover:rotate-12 animate-scale-in">
          <Mail className="w-12 h-12 text-primary/40" />
        </div>
        <p className="text-gray-800 font-medium animate-fade-in" style={{ animationDelay: '400ms' }}>
          Your inbox is empty
        </p>
        <p className="text-gray-500 text-sm animate-fade-in" style={{ animationDelay: '500ms' }}>
          Awaiting incoming emails
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-gray-50/50">
          <TableHead className="w-[200px]">From</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead className="text-right w-[120px]">Date</TableHead>
          <TableHead className="w-[80px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {emails.map((email, index) => (
          <TableRow 
            key={email.id}
            className={cn(
              "animate-fade-in hover:bg-accent/30 transition-colors duration-200 cursor-pointer",
              !email.seen && "font-medium"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => onViewEmail(email)}
          >
            <TableCell className="font-medium">
              {email.from.name || email.from.address}
            </TableCell>
            <TableCell>{email.subject}</TableCell>
            <TableCell className="text-right text-gray-500">
              {new Date(email.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent row click when clicking the button
                  onViewEmail(email);
                }}
                className="p-2 text-gray-600 hover:text-primary transition-all duration-300 rounded-full hover:bg-white/80 transform hover:scale-110"
              >
                <Eye className="w-4 h-4" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
