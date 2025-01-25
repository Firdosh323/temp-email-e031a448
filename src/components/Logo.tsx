import { Mail } from 'lucide-react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Mail className="w-6 h-6 text-primary" />
      <span className="font-semibold text-xl">TempMail</span>
    </div>
  );
};