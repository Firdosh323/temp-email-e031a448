import { Navigation } from '../components/Navigation';
import { EmailGenerator } from '../components/EmailGenerator';
import { Inbox } from '../components/Inbox';
import { Toaster } from 'sonner';

const Index = () => {
  return (
    <div className="min-h-screen bg-accent">
      <Toaster position="top-center" />
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <EmailGenerator />
        <Inbox />
      </div>
    </div>
  );
};

export default Index;