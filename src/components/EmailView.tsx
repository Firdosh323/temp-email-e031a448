import { useState } from 'react';
import { X, Reply, Forward, Trash2, Download } from 'lucide-react';
import { toast } from 'sonner';

interface EmailViewProps {
  email: {
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
  } | null;
  onClose: () => void;
}

export const EmailView = ({ email, onClose }: EmailViewProps) => {
  const [loading, setLoading] = useState(false);

  if (!email) return null;

  const handleReply = () => {
    toast.info("Reply feature coming soon!");
  };

  const handleForward = () => {
    toast.info("Forward feature coming soon!");
  };

  const handleDownload = () => {
    toast.info("Download feature coming soon!");
  };

  const handleDelete = () => {
    toast.info("Delete feature coming soon!");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-xl mx-4 animate-scale-in">
        {/* Header */}
        <div className="border-b p-4 flex items-center justify-between bg-gradient-to-r from-primary/10 to-purple-500/10">
          <h2 className="text-xl font-semibold text-gray-800">{email.subject}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Email Details */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-medium">
                {email.from.name?.[0] || email.from.address[0]}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-800">
                {email.from.name || email.from.address}
              </p>
              <p className="text-sm text-gray-500">{email.from.address}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {new Date(email.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Email Content */}
        <div className="p-6 overflow-auto max-h-[50vh]">
          {email.html ? (
            <div dangerouslySetInnerHTML={{ __html: email.html }} />
          ) : (
            <p className="whitespace-pre-wrap">{email.text || "No content available"}</p>
          )}
        </div>

        {/* Actions */}
        <div className="border-t p-4 bg-gray-50 flex justify-end gap-2">
          <button
            onClick={handleReply}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Reply size={18} /> Reply
          </button>
          <button
            onClick={handleForward}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Forward size={18} /> Forward
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Download size={18} /> Download
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-full transition-colors ml-2"
          >
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};