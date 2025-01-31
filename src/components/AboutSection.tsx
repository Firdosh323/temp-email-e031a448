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
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6"
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

          {/* Right Images */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            {/* First Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <img 
                src="/lovable-uploads/7f23861d-bc00-470c-8f8d-3c1d6075e621.png" 
                alt="Temporary Email Interface" 
                className="w-full rounded-xl"
              />
            </motion.div>

            {/* Second Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg ml-auto w-11/12"
            >
              <img 
                src="/lovable-uploads/3240ca9f-aebe-489a-9f37-cd30fac54e70.png" 
                alt="Email Inbox Interface" 
                className="w-full rounded-xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};