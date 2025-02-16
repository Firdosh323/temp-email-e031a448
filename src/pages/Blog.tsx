import { Navigation } from '../components/Navigation';
import { Calendar, User, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';

const posts = [
  {
    title: "Understanding Email Security: A Comprehensive Guide",
    excerpt: "Dive deep into the world of email security. Learn about encryption, two-factor authentication, and best practices to protect your digital communications in 2024.",
    content: `
      Email security has become increasingly crucial in our digital age. With cyber threats evolving daily, protecting your email communications is more important than ever. This comprehensive guide will walk you through essential email security measures and best practices.

      <h3>The Fundamentals of Email Security</h3>
      Email security begins with understanding the basic principles of digital communication protection. The most fundamental aspects include:
      
      • Strong password practices
      • Two-factor authentication
      • Email encryption
      • Regular security audits
      
      <h3>Advanced Security Measures</h3>
      Modern email security goes beyond basic password protection. Advanced measures include:
      
      • End-to-end encryption
      • Digital signatures
      • Secure email gateways
      • Anti-phishing tools
      
      <h3>Best Practices for 2024</h3>
      Stay ahead of cyber threats with these current best practices:
      
      1. Use a password manager
      2. Enable two-factor authentication
      3. Regularly update security software
      4. Be cautious with email attachments
      5. Use temporary email services for untrusted sources
      
      Remember, email security is an ongoing process. Stay informed about the latest threats and regularly update your security measures.
    `,
    author: "Dr. Alex Thompson",
    authorImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80",
    date: "March 15, 2024",
    category: "Security",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1563986768494-4dee09f4960b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "The Rise of Disposable Email Services in Modern Privacy",
    excerpt: "Explore how temporary email services have become essential tools for privacy-conscious users and their role in protecting personal information online.",
    content: `
      In an era where digital privacy is increasingly valuable, disposable email services have emerged as essential tools for protecting personal information. Let's explore why these services have become crucial for online privacy.

      <h3>Why Use Temporary Email Services?</h3>
      Temporary email services offer several key advantages:
      
      • Protection from spam
      • Privacy preservation
      • Reduced digital footprint
      • Safe testing and verification
      
      <h3>Common Use Cases</h3>
      Temporary email services are particularly useful for:
      
      1. Online shopping and newsletters
      2. Forum registrations
      3. App testing
      4. One-time verifications
      
      <h3>Choosing the Right Service</h3>
      When selecting a temporary email service, consider:
      
      • Ease of use
      • Duration of email availability
      • Security features
      • Additional functionality
      
      Privacy is a fundamental right in the digital age. Temporary email services provide a practical solution for maintaining that privacy while navigating the modern web.
    `,
    author: "Sarah Chen",
    authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    date: "March 12, 2024",
    category: "Privacy",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Best Practices for Online Account Security in 2024",
    excerpt: "Stay ahead of cyber threats with our comprehensive guide to account security. Learn about password managers, security keys, and other essential tools.",
    content: `
      As cyber threats continue to evolve, maintaining strong online account security is crucial. This guide covers the latest best practices and tools for protecting your digital presence in 2024.

      <h3>Essential Security Tools</h3>
      Modern account security relies on several key tools:
      
      • Password managers
      • Hardware security keys
      • Authentication apps
      • Encrypted backup solutions
      
      <h3>Password Management</h3>
      Effective password management includes:
      
      1. Using unique passwords for each account
      2. Implementing strong password generators
      3. Regular password updates
      4. Secure password storage
      
      <h3>Multi-Factor Authentication</h3>
      Strengthen your security with:
      
      • Biometric verification
      • Security keys
      • Authentication apps
      • Backup codes
      
      Stay vigilant and regularly review your security practices to maintain strong protection against emerging threats.
    `,
    author: "Marcus Rivera",
    authorImage: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&q=80",
    date: "March 10, 2024",
    category: "Guide",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1496096265110-f83ad7f96608?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "How to Protect Your Primary Email from Spam",
    excerpt: "Learn effective strategies to keep your main email inbox clean and organized while handling promotional signups and temporary registrations.",
    content: `
      Maintaining a clean and organized email inbox is essential for productivity and security. This guide will help you protect your primary email address from spam and unwanted communications.

      <h3>Email Management Strategies</h3>
      Implement these key strategies:
      
      • Use email filters and rules
      • Create separate email addresses for different purposes
      • Implement spam detection tools
      • Regularly clean your inbox
      
      <h3>Preventing Spam</h3>
      Proactive measures to prevent spam:
      
      1. Use temporary email services for signups
      2. Avoid sharing your email publicly
      3. Implement strong spam filters
      4. Unsubscribe from unwanted newsletters
      
      <h3>Managing Multiple Email Addresses</h3>
      Organize your email presence with:
      
      • Primary email for important communications
      • Secondary email for subscriptions
      • Temporary email for one-time uses
      • Business email for professional contacts
      
      Keep your primary inbox clean and efficient by implementing these strategies consistently.
    `,
    author: "Emma Wilson",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    date: "March 8, 2024",
    category: "Tips",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?auto=format&fit=crop&w=1200&q=80"
  }
];

const Blog = () => {
  const categories = ["All", "Security", "Privacy", "Guide", "Tips"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-white">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Our Blog
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Insights and guides about email security, privacy, and digital communication best practices.
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category, index) => (
              <button
                key={index}
                className="px-6 py-2 rounded-full bg-white hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md text-gray-700 font-medium"
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Featured Post */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 rounded-2xl opacity-0 group-hover:opacity-90 transition-opacity duration-300" />
            <img
              src={posts[0].image}
              alt={posts[0].title}
              className="w-full h-[400px] object-cover rounded-2xl"
            />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="relative z-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                  {posts[0].category}
                </span>
                <h2 className="text-3xl font-bold mt-4 mb-2">{posts[0].title}</h2>
                <p className="text-white/80 mb-4">{posts[0].excerpt}</p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {posts[0].author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {posts[0].date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {posts[0].readTime}
                  </div>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post, index) => (
              <motion.article 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 rounded-full text-sm text-primary font-medium">
                    {post.category}
                  </span>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-6">
              Get the latest updates and insights delivered directly to your inbox.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
              />
              <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
