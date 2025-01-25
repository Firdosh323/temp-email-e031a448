import { RefreshCw, Copy, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Inbox = () => {
  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-6 animate-fade-in">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold">Your Inbox</h2>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-8 text-gray-600 font-medium">
        <div>Sender</div>
        <div>Subject</div>
        <div>View</div>
      </div>

      <div className="text-center py-12 animate-fade-in">
        <div className="w-24 h-24 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center transform transition-transform hover:scale-105">
          <span className="text-3xl">—</span>
        </div>
        <p className="text-gray-800 font-medium">Your inbox is empty</p>
        <p className="text-gray-500 text-sm">Awaiting for incoming emails</p>
      </div>

      <div className="flex justify-center gap-4 mt-8 border-t pt-4">
        <button className="flex items-center gap-2 px-6 py-2 text-gray-600 hover:text-primary transition-colors transform hover:scale-105 active:scale-95">
          <Copy size={18} /> Copy
        </button>
        <button className="flex items-center gap-2 px-6 py-2 text-gray-600 hover:text-primary transition-colors transform hover:scale-105 active:scale-95">
          <RefreshCw size={18} /> Refresh
        </button>
        <button className="flex items-center gap-2 px-6 py-2 text-gray-600 hover:text-primary transition-colors transform hover:scale-105 active:scale-95">
          <Trash2 size={18} /> Delete
        </button>
      </div>
    </div>
  );
};