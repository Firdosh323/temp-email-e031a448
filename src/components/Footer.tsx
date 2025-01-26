import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Facebook, Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-accent/20 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 animate-fade-in">
          {/* Company Info */}
          <div className="space-y-6 transform hover:scale-105 transition-transform duration-300">
            <Logo />
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-secondary-foreground hover:text-primary transition-colors">
                <MapPin className="w-5 h-5" />
                <p>House-09, Rd no. 15, Mecca, Saudi Arabia</p>
              </div>
              <div className="flex items-center gap-3 text-secondary-foreground hover:text-primary transition-colors">
                <Phone className="w-5 h-5" />
                <p>+966 0576 XXX XXX</p>
              </div>
              <div className="flex items-center gap-3 text-secondary-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
                <p>contact@tempmail.com</p>
              </div>
            </div>
            <div className="flex gap-4">
              {[
                { icon: Linkedin, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 rounded-full bg-accent/50 hover:bg-primary hover:text-white transform hover:scale-110 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Site Map */}
          <div className="space-y-6 transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                "Home",
                "Services",
                "Features",
                "News",
                "Blogs",
              ].map((item, index) => (
                <li key={index} className="transform hover:translate-x-2 transition-transform">
                  <a href="#" className="text-secondary-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6 transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Subscribe to Newsletter
            </h3>
            <p className="text-secondary-foreground">
              Stay updated with our latest features and releases.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 focus:ring-2 focus:ring-primary/20"
              />
              <Button 
                type="submit" 
                size="icon"
                className="bg-primary hover:bg-primary/90 transition-colors"
              >
                →
              </Button>
            </div>
            <p className="text-sm text-secondary-foreground">
              By subscribing you agree to our{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t text-center">
          <p className="text-secondary-foreground animate-fade-in">
            ©{new Date().getFullYear()} Temp Mail. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};