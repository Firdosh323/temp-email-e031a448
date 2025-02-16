
import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { EmailGenerator } from '../components/EmailGenerator';
import { Inbox } from '../components/Inbox';
import { AboutSection } from '../components/AboutSection';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';
import { Toaster } from 'sonner';
import { ClientsSection } from '../components/ClientsSection';

const Index = () => {
  const [currentEmail, setCurrentEmail] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-accent/20">
      <Toaster position="top-center" />
      <Navigation />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Secure Temporary Email for Your Privacy
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Get an instant disposable email address. No sign up required. 
            Protect your inbox from spam and unwanted emails.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <EmailGenerator onEmailGenerated={setCurrentEmail} currentEmail={currentEmail} />
          <Inbox currentEmail={currentEmail} />
        </div>
      </div>

      {/* Client Logos */}
      <ClientsSection />

      {/* Features Section */}
      <AboutSection />

      {/* Social Proof */}
      <Testimonials />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
