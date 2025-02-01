import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const AboutSection = () => {
  const features = [
    "No Sign up required",
    "No annoying mails",
    "No installations"
  ];

  return (
    <section className="py-8 md:py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex-1 max-w-xl"
          >
            <span className="text-indigo-500 text-sm font-medium mb-4 block">About temp mail</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              What is Temp mail?
            </h2>
            <p className="text-gray-600 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id est quis magna viverr
            </p>
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.li 
                  key={index} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <span className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-500" />
                  </span>
                  <span className="text-gray-600">{feature}</span>
                </motion.li>
              ))}
            </ul>
            <motion.button 
              whileHover={{ x: 5 }}
              className="text-indigo-500 font-medium flex items-center gap-2 group"
            >
              Learn More
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </motion.button>
          </motion.div>

          {/* Right Images */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex-1 relative min-h-[400px] w-full lg:w-1/2"
          >
            {/* Background Card */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute left-0 top-0 w-[90%] h-auto"
            >
              <div className="bg-white rounded-2xl shadow-lg p-4">
                <img 
                  src="/lovable-uploads/74eaac20-40c6-4ec0-b0ab-38f306de6d55.png" 
                  alt="Temporary Email Interface" 
                  className="w-full rounded-xl"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};