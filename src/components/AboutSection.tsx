import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const AboutSection = () => {
  const features = [
    "No Sign up required",
    "No annoying mails",
    "No installations"
  ];

  return (
    <div className="w-full bg-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-24">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6"
          >
            <span className="text-primary/80 text-sm md:text-base">About temp mail</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              What is Temp mail?
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id est quis magna viverr
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
                  <span className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-500" />
                  </span>
                  <span className="text-gray-600">{feature}</span>
                </motion.li>
              ))}
            </ul>
            <motion.button
              whileHover={{ x: 5 }}
              className="text-primary flex items-center gap-2 font-medium mt-4"
            >
              Learn More
              <span className="text-lg">→</span>
            </motion.button>
          </motion.div>

          {/* Right Images */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex-1 relative min-h-[400px] md:min-h-[500px] w-full"
          >
            {/* Background Card */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute right-0 top-[5%] w-[85%] md:w-[90%] h-auto"
            >
              <div className="bg-white rounded-2xl shadow-lg">
                <img 
                  src="/lovable-uploads/7f23861d-bc00-470c-8f8d-3c1d6075e621.png" 
                  alt="Temporary Email Interface" 
                  className="w-full rounded-xl"
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
              <div className="bg-white rounded-2xl shadow-xl">
                <img 
                  src="/lovable-uploads/3240ca9f-aebe-489a-9f37-cd30fac54e70.png" 
                  alt="Email Inbox Interface" 
                  className="w-full rounded-xl"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};