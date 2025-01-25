import { useState } from 'react';
import { Copy, RefreshCw, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export const EmailGenerator = () => {
  const [tempEmail, setTempEmail] = useState('');

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
    toast.info("Refreshing inbox...");
  };

  const deleteEmail = () => {
    setTempEmail('');
    toast.success("Email address deleted!");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-center gap-8 mb-6">
        <button className="text-primary font-medium border-b-2 border-primary pb-2">
          Temporary E-mail
        </button>
        <button className="text-gray-600 hover:text-primary">
          Temporary SMS
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-center">
        <span className="text-primary font-normal">Temporary</span>
        <br />
        Email Address
      </h1>

      <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
        Forget about spam, advertising mailings, hacking and attacking robots. Keep your real mailbox clean and secure. Temp Mail provides temporary, secure, anonymous, free, disposable email address.
      </p>

      <div className="bg-secondary rounded-full mb-6 flex items-center p-2">
        <input
          type="text"
          value={tempEmail}
          readOnly
          placeholder="Your temporary email address"
          className="flex-1 bg-transparent px-4 py-2 outline-none"
        />
        <button
          onClick={copyEmail}
          className="bg-white text-primary px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-colors"
        >
          Copy
        </button>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={generateEmail}
          className="flex items-center gap-2 px-6 py-2 bg-accent rounded-full hover:bg-accent/80 transition-colors"
        >
          <Copy size={18} /> Copy
        </button>
        <button
          onClick={refreshInbox}
          className="flex items-center gap-2 px-6 py-2 bg-accent rounded-full hover:bg-accent/80 transition-colors"
        >
          <RefreshCw size={18} /> Refresh
        </button>
        <button
          onClick={deleteEmail}
          className="flex items-center gap-2 px-6 py-2 bg-accent rounded-full hover:bg-accent/80 transition-colors"
        >
          <Trash2 size={18} /> Delete
        </button>
      </div>
    </div>
  );
};