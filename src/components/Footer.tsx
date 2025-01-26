import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Logo />
            <p className="text-secondary-foreground">
              Lorem ipsum dolor sit amet.
            </p>
            <p className="text-secondary-foreground">
              House-09, Rd no. 15, Mecca, Saudi Arabia
            </p>
            <p className="text-secondary-foreground">
              +966 0576 XXX XXX
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full hover:bg-accent">
                <Linkedin className="w-5 h-5 text-secondary-foreground" />
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-accent">
                <Facebook className="w-5 h-5 text-secondary-foreground" />
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-accent">
                <Twitter className="w-5 h-5 text-secondary-foreground" />
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-accent">
                <Instagram className="w-5 h-5 text-secondary-foreground" />
              </a>
            </div>
          </div>

          {/* Site Map */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Site Map</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-secondary-foreground hover:text-primary">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground hover:text-primary">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground hover:text-primary">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground hover:text-primary">
                  News
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground hover:text-primary">
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Subscribe for the Newsletter</h3>
            <p className="text-secondary-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Email address" 
                className="flex-1"
              />
              <Button type="submit" size="icon">
                →
              </Button>
            </div>
            <p className="text-sm text-secondary-foreground">
              By Subscribing you are accepting our{" "}
              <a href="#" className="text-primary hover:underline">
                Policy
              </a>
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t text-center text-secondary-foreground">
          ©Copyright 2023 by Temp Mail. All rights reserved.
        </div>
      </div>
    </footer>
  );
};