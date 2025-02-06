
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
    <section className="py-12 md:py-20 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6 md:space-y-8 relative z-10 max-w-xl mx-auto lg:mx-0"
          >
            <span className="text-primary font-medium inline-block">About temp mail</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              Your Secure Temporary Email Solution
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
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
                  <span className="text-gray-700 text-base md:text-lg">{feature}</span>
                </motion.li>
              ))}
            </ul>
            <button className="text-primary text-base md:text-lg font-medium flex items-center gap-2 hover:gap-3 transition-all">
              Learn More
              <span>→</span>
            </button>
          </motion.div>

          {/* Right Images */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex-1 relative w-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px] max-w-[500px] mx-auto"
          >
            {/* Background Card */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute right-0 top-[5%] w-[80%] sm:w-[85%] z-10"
            >
              <div className="bg-white p-2 md:p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                  src="/lovable-uploads/7f23861d-bc00-470c-8f8d-3c1d6075e621.png" 
                  alt="Temporary Email Interface" 
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Foreground Card */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute left-0 top-[35%] w-[75%] sm:w-[80%] z-20"
            >
              <div className="bg-white p-2 md:p-3 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <img 
                  src="/lovable-uploads/3240ca9f-aebe-489a-9f37-cd30fac54e70.png" 
                  alt="Email Inbox Interface" 
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Decorative Background Circle */}
            <div className="absolute -right-20 -bottom-20 w-48 h-48 md:w-64 md:h-64 bg-primary/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
