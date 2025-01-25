import { useState } from 'react';
import { Copy, RefreshCw, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [tempEmail, setTempEmail] = useState('');
  const [emails, setEmails] = useState([]);

  const generateEmail = () => {
    const randomString = Math.random().toString(36).substring(7);
    const newEmail = `${randomString}@tempmail.com`;
    setTempEmail(newEmail);
    toast.success("New email address generated!");
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(tempEmail);
    toast.success("Email copied to clipboard!");
  };

  const refreshInbox = () => {
    // This would typically fetch new emails from an API
    toast.info("Refreshing inbox...");
  };

  const deleteEmail = () => {
    setTempEmail('');
    setEmails([]);
    toast.success("Email address deleted!");
  };

  return (
    <div className="min-h-screen bg-accent">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center gap-8 mb-6">
            <button className="text-gray-600 hover:text-primary">Temporary E-mail</button>
            <button className="text-gray-600 hover:text-primary">Temporary SMS</button>
          </div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-primary">Temporary</span> Email Address
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Forget about spam, advertising mailings, hacking and robot attacks. Keep your real mailbox clean and secure.
          </p>
        </div>

        {/* Email Generator Section */}
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={tempEmail}
              readOnly
              className="flex-1 p-3 bg-secondary rounded-lg text-gray-800"
              placeholder="Your temporary email address"
            />
            <button
              onClick={generateEmail}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Generate
            </button>
          </div>
          
          <div className="flex justify-center gap-6 mt-6">
            <button
              onClick={copyEmail}
              className="flex items-center gap-2 text-gray-600 hover:text-primary"
            >
              <Copy size={18} /> Copy
            </button>
            <button
              onClick={refreshInbox}
              className="flex items-center gap-2 text-gray-600 hover:text-primary"
            >
              <RefreshCw size={18} /> Refresh
            </button>
            <button
              onClick={deleteEmail}
              className="flex items-center gap-2 text-gray-600 hover:text-primary"
            >
              <Trash2 size={18} /> Delete
            </button>
          </div>
        </div>

        {/* Inbox Section */}
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold">Your Inbox</h2>
          </div>
          
          {emails.length === 0 ? (
            <div className="text-center py-12">
              <img 
                src="/placeholder.svg" 
                alt="Empty inbox" 
                className="w-24 h-24 mx-auto mb-4"
              />
              <p className="text-gray-600">Your inbox is empty</p>
              <p className="text-gray-400 text-sm">Awaiting for incoming emails</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Email list would go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;