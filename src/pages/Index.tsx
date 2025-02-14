
import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { EmailGenerator } from '../components/EmailGenerator';
import { Inbox } from '../components/Inbox';
import { AboutSection } from '../components/AboutSection';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';
import { Toaster } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Browser, 
  Smartphone, 
  Share2
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';

const Index = () => {
  const [currentEmail, setCurrentEmail] = useState('');

  return (
    <div className="min-h-screen bg-accent">
      <Toaster position="top-center" />
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <EmailGenerator onEmailGenerated={setCurrentEmail} currentEmail={currentEmail} />
        
        {currentEmail && (
          <div className="max-w-4xl mx-auto mt-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-primary">Integration Options</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* QR Code Section */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Show QR Code
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Share via QR Code</SheetTitle>
                      <SheetDescription>
                        Scan this code to quickly access your temporary email
                      </SheetDescription>
                    </SheetHeader>
                    <div className="flex justify-center p-6">
                      <QRCodeSVG
                        value={currentEmail}
                        size={200}
                        level="H"
                        includeMargin={true}
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Browser Extension Link */}
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2"
                  onClick={() => window.open('https://chrome.google.com/webstore/category/extensions', '_blank')}
                >
                  <Browser className="w-4 h-4" />
                  Get Browser Extension
                </Button>

                {/* Mobile App Link */}
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2"
                  onClick={() => window.open('https://play.google.com/store/apps', '_blank')}
                >
                  <Smartphone className="w-4 h-4" />
                  Download Mobile App
                </Button>
              </div>
              
              <p className="text-sm text-gray-500 mt-4 text-center">
                Access your temporary email across all your devices
              </p>
            </div>
          </div>
        )}

        <Inbox currentEmail={currentEmail} />
      </div>
      <AboutSection />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
