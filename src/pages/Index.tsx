import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { EmailGenerator } from '../components/EmailGenerator';
import { Inbox } from '../components/Inbox';
import { AboutSection } from '../components/AboutSection';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';
import { Toaster } from 'sonner';
import { Shield, Lock, Mail, Clock } from 'lucide-react';
const Index = () => {
  const [currentEmail, setCurrentEmail] = useState('');
  const features = [{
    icon: Shield,
    title: "Privacy Protection",
    description: "Shield your personal email from spam and unwanted communications"
  }, {
    icon: Lock,
    title: "Secure & Anonymous",
    description: "No personal information required, completely anonymous usage"
  }, {
    icon: Mail,
    title: "Instant Access",
    description: "Generate temporary email addresses in seconds, no registration needed"
  }, {
    icon: Clock,
    title: "Auto-Expiring",
    description: "Emails automatically delete after your chosen time period"
  }];
  return <div className="min-h-screen bg-gradient-to-b from-white to-accent/20">
      <Toaster position="top-center" />
      <Navigation />

      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Secure Temporary Email Generator
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Create disposable email addresses instantly. Protect your privacy and avoid spam with our secure temporary email service.
          </p>
        </div>

        <main className="max-w-3xl mx-auto">
          <EmailGenerator onEmailGenerated={setCurrentEmail} currentEmail={currentEmail} />
          <Inbox currentEmail={currentEmail} />
        </main>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Temporary Email Service?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => <article key={index} className="p-6 rounded-xl bg-accent/10 hover:bg-accent/20 transition-colors">
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </article>)}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      

      <AboutSection />
      <Testimonials />
      <Footer />
    </div>;
};
export default Index;