import { Menu } from 'lucide-react';
import { Logo } from './Logo';

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-primary font-medium">Home</a>
            <a href="/service" className="text-gray-600 hover:text-primary">Service</a>
            <a href="/about" className="text-gray-600 hover:text-primary">About</a>
            <a href="/blog" className="text-gray-600 hover:text-primary">Blog</a>
          </div>
          
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};