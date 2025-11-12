import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { motion, AnimatePresence } from "motion/react";
import { Cookie, Shield, X } from "lucide-react";

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("shadowStrengthCookieConsent");
    if (!consent) {
      // Delay showing the banner slightly for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("shadowStrengthCookieConsent", "accepted");
    localStorage.setItem("shadowStrengthConsentDate", new Date().toISOString());
    setIsVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem("shadowStrengthCookieConsent", "declined");
    localStorage.setItem("shadowStrengthConsentDate", new Date().toISOString());
    setIsVisible(false);
    onDecline();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
      >
        <Card className="max-w-5xl mx-auto bg-zinc-900/98 backdrop-blur-xl border-2 border-red-600/30 shadow-2xl shadow-red-600/20">
          <div className="p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-600/50">
                <Cookie className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-600" />
                    Your Privacy Matters
                  </h3>
                  <button
                    onClick={handleDecline}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed">
                  We use cookies and similar technologies to enhance your browsing experience, 
                  analyze site traffic, and personalize content. Your data is important to us, 
                  and we're committed to protecting your privacy.
                </p>

                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-black/30 rounded-lg p-4 mb-4 border border-red-600/20"
                  >
                    <h4 className="text-white mb-2">What we collect:</h4>
                    <ul className="text-gray-400 text-sm space-y-2 ml-4 list-disc">
                      <li>
                        <strong className="text-gray-300">Essential Cookies:</strong> Required for 
                        shopping cart functionality and checkout process
                      </li>
                      <li>
                        <strong className="text-gray-300">Form Data:</strong> Information you provide 
                        when submitting designs, placing orders, or contacting us
                      </li>
                      <li>
                        <strong className="text-gray-300">Analytics:</strong> Anonymous usage data to 
                        improve our website and user experience
                      </li>
                      <li>
                        <strong className="text-gray-300">Security:</strong> Data to prevent fraud and 
                        protect your account
                      </li>
                    </ul>
                    <p className="text-gray-400 text-sm mt-3">
                      We will never sell your personal information. All data is encrypted and stored 
                      securely. You can request data deletion at any time by contacting us.
                    </p>
                  </motion.div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAccept}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-600/40 hover:shadow-xl hover:shadow-red-600/60 transition-all duration-300"
                  >
                    Accept All Cookies
                  </Button>
                  <Button
                    onClick={handleDecline}
                    variant="outline"
                    className="border-zinc-700 text-gray-300 hover:bg-zinc-800 hover:text-white"
                  >
                    Decline Non-Essential
                  </Button>
                  <Button
                    onClick={() => setShowDetails(!showDetails)}
                    variant="ghost"
                    className="text-red-400 hover:text-red-300 hover:bg-red-600/10"
                  >
                    {showDetails ? "Hide Details" : "Learn More"}
                  </Button>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  By continuing to use our site, you acknowledge our{" "}
                  <button className="text-red-400 hover:text-red-300 underline">
                    Privacy Policy
                  </button>{" "}
                  and{" "}
                  <button className="text-red-400 hover:text-red-300 underline">
                    Terms of Service
                  </button>
                  .
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

// Hook to check if user has given consent
export function useCookieConsent() {
  const [hasConsent, setHasConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem("shadowStrengthCookieConsent");
    setHasConsent(consent === "accepted");
    setIsLoading(false);
  }, []);

  return { hasConsent, isLoading };
}
