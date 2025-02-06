
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Digital Marketer",
    content: "This temp mail service has been a game-changer for my workflow. It's incredibly reliable and user-friendly.",
    rating: 5,
    image: "/photo-1649972904349-6e44c42644a7",
    initials: "SJ"
  },
  {
    name: "Michael Chen",
    role: "Software Developer",
    content: "The best temporary email service I've used. Clean interface and instant email generation make it perfect for testing.",
    rating: 5,
    image: "/photo-1581092795360-fd1ca04f0952",
    initials: "MC"
  },
  {
    name: "Emma Davis",
    role: "Freelancer",
    content: "I use this service daily for my client registrations. It's fast, secure, and exactly what I need.",
    rating: 5,
    image: "/photo-1581091226825-a6a2a5aee158",
    initials: "ED"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20 md:py-24 bg-[#F1F0FB]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who trust our temporary email service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-blue-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ padding: '2px' }}>
                  <div className="h-full w-full bg-white rounded-xl" />
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="object-cover"
                      />
                      <AvatarFallback>{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700">{testimonial.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
