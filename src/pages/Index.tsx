import { Navigation } from '../components/Navigation';
import { EmailGenerator } from '../components/EmailGenerator';
import { Inbox } from '../components/Inbox';
import { AboutSection } from '../components/AboutSection';
import { Footer } from '../components/Footer';
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
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;