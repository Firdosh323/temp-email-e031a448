import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const AboutSection = () => {
  const features = [
    "No Sign up required",
    "No annoying mails",
    "No installations",
    "Secure & Private",
    "Auto-delete after expiry",
    "24/7 availability"
  ];

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-primary font-medium">About temp mail</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Your Secure Temporary Email Solution
            </h2>
            <p className="text-gray-600">
              Temp Mail provides disposable email addresses to protect your privacy. 
              Perfect for testing, registrations, and avoiding spam in your primary inbox.
            </p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <motion.li 
                  key={index} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <span className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </span>
                  <span className="text-gray-700">{feature}</span>
                </motion.li>
              ))}
            </ul>
            <button className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all">
              Learn More
              <span>→</span>
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <img 
                src="/lovable-uploads/62ae5c84-028f-48c3-827d-c27ec753a7ae.png" 
                alt="Email Security" 
                className="rounded-2xl shadow-lg w-full object-cover h-48 animate-scale-in"
              />
              <img 
                src="/placeholder.svg" 
                alt="Email Interface" 
                className="rounded-2xl shadow-lg w-full object-cover h-64 animate-scale-in"
              />
            </div>
            <div className="space-y-4 mt-8">
              <img 
                src="/placeholder.svg" 
                alt="Email Protection" 
                className="rounded-2xl shadow-lg w-full object-cover h-64 animate-scale-in"
              />
              <img 
                src="/placeholder.svg" 
                alt="Email Features" 
                className="rounded-2xl shadow-lg w-full object-cover h-48 animate-scale-in"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};