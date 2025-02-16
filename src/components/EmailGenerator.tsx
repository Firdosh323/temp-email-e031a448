
import { useState, useEffect } from 'react';
import { Copy, RefreshCw, Trash2, Loader, QrCode } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { emailService } from '@/services/emailService';
import { EmailSettings } from './EmailSettings';
import { QRCodeSVG } from 'qrcode.react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface EmailGeneratorProps {
  onEmailGenerated: (email: string) => void;
  currentEmail: string;
}

export const EmailGenerator = ({ onEmailGenerated, currentEmail }: EmailGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [customUsername, setCustomUsername] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [availableDomains, setAvailableDomains] = useState<string[]>([]);
  const [isCustom, setIsCustom] = useState(false);

  useEffect(() => {
    // Fetch available domains
    const fetchDomains = async () => {
      try {
        const domains = await emailService.getAvailableDomains();
        setAvailableDomains(domains);
        setSelectedDomain(domains[0] || '');
      } catch (error) {
        console.error('Error fetching domains:', error);
        toast.error('Failed to fetch available domains');
      }
    };

    fetchDomains();
  }, []);

  useEffect(() => {
    if (!currentEmail) {
      generateEmail();
    }

    const handleEmailDelete = () => {
      onEmailGenerated('');
      toast.info('Email address expired and was deleted');
    };

    window.addEventListener('emailDeleted', handleEmailDelete);
    
    return () => {
      window.removeEventListener('emailDeleted', handleEmailDelete);
    };
  }, []);

  const generateEmail = async () => {
    setIsGenerating(true);
    try {
      let newEmail;
      if (isCustom && customUsername && selectedDomain) {
        newEmail = await emailService.generateCustomEmail(customUsername, selectedDomain);
      } else {
        newEmail = await emailService.generateEmail();
      }
      onEmailGenerated(newEmail);
      toast.success("New email address generated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate email");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExpirationChange = (minutes: number) => {
    emailService.setExpiration(minutes);
  };

  const copyEmail = async () => {
    if (!currentEmail) {
      toast.error("No email address to copy");
      return;
    }
    
    try {
      await navigator.clipboard.writeText(currentEmail);
      toast.success("Email copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy email address");
    }
  };

  const refreshInbox = async () => {
    if (!currentEmail) {
      toast.error("No email address to refresh");
      return;
    }

    setIsRefreshing(true);
    try {
      await emailService.getMessages(currentEmail);
      toast.success("Inbox refreshed");
    } catch (error) {
      console.error(error);
      toast.error("Failed to refresh inbox");
    } finally {
      setIsRefreshing(false);
    }
  };

  const deleteEmail = () => {
    if (!currentEmail) {
      toast.error("No email address to delete");
      return;
    }
    
    emailService.deleteAccount();
    onEmailGenerated('');
    toast.success("Email address deleted!");
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in px-4 sm:px-6">
      <div className="flex justify-center gap-4 sm:gap-8 mb-6">
        <button 
          onClick={() => setIsCustom(false)}
          className={cn(
            "text-sm sm:text-base font-medium border-b-2 pb-2 transition-all relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left",
            !isCustom ? "text-primary dark:text-primary-dark border-primary dark:border-primary-dark" : "text-gray-600 dark:text-gray-400 border-transparent"
          )}
        >
          Random Email
        </button>
        <button 
          onClick={() => setIsCustom(true)}
          className={cn(
            "text-sm sm:text-base font-medium border-b-2 pb-2 transition-all relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left",
            isCustom ? "text-primary dark:text-primary-dark border-primary dark:border-primary-dark" : "text-gray-600 dark:text-gray-400 border-transparent"
          )}
        >
          Custom Email
        </button>
      </div>

      <div className="glass dark:bg-accent-dark/50 rounded-2xl mb-6 sm:mb-8 p-1.5 transition-all hover:shadow-lg hover:scale-[1.02] duration-300 premium-shadow">
        {isCustom ? (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white dark:bg-gray-800 rounded-xl">
            <input
              type="text"
              value={customUsername}
              onChange={(e) => setCustomUsername(e.target.value)}
              placeholder="Enter username"
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 outline-none text-sm sm:text-base rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none border-b sm:border-b-0 sm:border-r border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="px-4 sm:px-6 py-3 sm:py-4 outline-none text-sm sm:text-base border-b sm:border-b-0 sm:border-r border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              {availableDomains.map((domain) => (
                <option key={domain} value={domain}>@{domain}</option>
              ))}
            </select>
            <div className="flex items-center justify-end gap-2 p-2">
              <button
                onClick={generateEmail}
                disabled={!customUsername || !selectedDomain}
                className="premium-gradient text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-xl hover:opacity-90 transition-all duration-300 disabled:opacity-50 transform hover:scale-105 active:scale-95"
              >
                Generate
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white dark:bg-gray-800 rounded-xl">
            <input
              type="text"
              value={currentEmail}
              readOnly
              placeholder="Your temporary email address"
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 outline-none text-sm sm:text-base rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none border-b sm:border-b-0 sm:border-r border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <div className="flex items-center justify-end gap-2 p-2">
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    className="p-2 sm:p-3 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark transition-colors rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700"
                    disabled={!currentEmail}
                  >
                    <QrCode className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Share via QR Code</SheetTitle>
                    <SheetDescription>
                      Scan this code to quickly access your temporary email
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex justify-center items-center mt-8">
                    <div className="glass dark:bg-gray-800 p-4 sm:p-6 rounded-2xl premium-shadow">
                      <QRCodeSVG
                        value={currentEmail || ''}
                        size={200}
                        level="H"
                        includeMargin={true}
                      />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <button
                onClick={copyEmail}
                className="premium-gradient text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-xl hover:opacity-90 transition-all duration-300 disabled:opacity-50 transform hover:scale-105 active:scale-95 font-medium whitespace-nowrap"
                disabled={!currentEmail}
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 items-center mb-6 sm:mb-8">
        <button
          onClick={generateEmail}
          disabled={isGenerating}
          className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white dark:bg-gray-800 rounded-xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 premium-shadow hover:shadow-lg transform hover:scale-105 active:scale-95 min-w-[120px] sm:min-w-[140px] justify-center"
        >
          {isGenerating ? (
            <Loader className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <Copy className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-12" />
          )}
          <span className="text-sm sm:text-base font-medium dark:text-white">Generate</span>
        </button>
        <button
          onClick={refreshInbox}
          disabled={isRefreshing || !currentEmail}
          className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white dark:bg-gray-800 rounded-xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 premium-shadow hover:shadow-lg transform hover:scale-105 active:scale-95 min-w-[120px] sm:min-w-[140px] justify-center"
        >
          <RefreshCw
            className={cn("w-4 h-4 sm:w-5 sm:h-5", isRefreshing && "animate-spin")}
          />
          <span className="text-sm sm:text-base font-medium dark:text-white">Refresh</span>
        </button>
        <button
          onClick={deleteEmail}
          disabled={!currentEmail}
          className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white dark:bg-gray-800 rounded-xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 premium-shadow hover:shadow-lg transform hover:scale-105 active:scale-95 min-w-[120px] sm:min-w-[140px] justify-center group"
        >
          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-12" />
          <span className="text-sm sm:text-base font-medium dark:text-white">Delete</span>
        </button>
        
        <EmailSettings onExpirationChange={handleExpirationChange} />
      </div>
    </div>
  );
};
