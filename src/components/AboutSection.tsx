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
    <div className="w-full">
      {/* About Content Section */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-4 md:space-y-6 text-center"
          >
            <span className="text-primary font-medium">About temp mail</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
              Your Secure Temporary Email Solution
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Temp Mail provides disposable email addresses to protect your privacy. 
              Perfect for testing, registrations, and avoiding spam in your primary inbox.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left max-w-2xl mx-auto mt-8">
              {features.map((feature, index) => (
                <motion.li 
                  key={index} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2"
                >
                  <span className="flex-shrink-0 w-4 h-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </span>
                  <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Images Section */}
      <section className="py-8 md:py-12 bg-secondary relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative h-[400px] md:h-[500px] max-w-4xl mx-auto"
          >
            {/* Background Card */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute right-0 top-[5%] w-[85%] md:w-[90%] h-auto"
            >
              <div className="bg-white p-3 md:p-6 rounded-xl md:rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="/lovable-uploads/7f23861d-bc00-470c-8f8d-3c1d6075e621.png" 
                  alt="Temporary Email Interface" 
                  className="w-full rounded-lg md:rounded-xl"
                />
              </div>
            </motion.div>

            {/* Foreground Card */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute left-0 top-[30%] w-[80%] md:w-[85%] h-auto z-20"
            >
              <div className="bg-white p-3 md:p-6 rounded-xl md:rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="/lovable-uploads/3240ca9f-aebe-489a-9f37-cd30fac54e70.png" 
                  alt="Email Inbox Interface" 
                  className="w-full rounded-lg md:rounded-xl"
                />
              </div>
            </motion.div>

            {/* Decorative Background Circle */}
            <div className="absolute -right-20 -bottom-20 w-48 h-48 md:w-64 md:h-64 bg-primary/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};