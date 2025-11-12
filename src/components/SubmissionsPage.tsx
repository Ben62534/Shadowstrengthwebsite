import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { motion } from "motion/react";
import { Send, CheckCircle2 } from "lucide-react";
import { DataConsentWarning } from "./DataConsentWarning";

export function SubmissionsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designTitle: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showConsentDialog, setShowConsentDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for consent before submitting
    const consent = localStorage.getItem("shadowStrengthSubmissionConsent");
    if (consent !== "accepted") {
      setShowConsentDialog(true);
      return;
    }
    
    setSubmitted(true);
    
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        designTitle: "",
        description: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  const handleConsentAccept = () => {
    localStorage.setItem("shadowStrengthSubmissionConsent", "accepted");
    setShowConsentDialog(false);
    setSubmitted(true);
    
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        designTitle: "",
        description: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  const handleConsentDecline = () => {
    setShowConsentDialog(false);
  };

  return (
    <>
      <DataConsentWarning
        isOpen={showConsentDialog}
        onAccept={handleConsentAccept}
        onDecline={handleConsentDecline}
        formType="submission"
      />
      <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-7xl mb-4 bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">
            Submit Your Design
          </h2>
          <p className="text-gray-300 text-xl leading-relaxed">
            Got an amazing design idea? Submit it and join our community of creators.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-zinc-900/50 backdrop-blur-xl border-2 border-red-600/20 p-8 shadow-2xl">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-red-600 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl mb-2">Submission Received!</h3>
                <p className="text-gray-400">Thank you for contributing to Shadow Strength. Our team will review your design soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-white mb-2 block text-lg">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-zinc-800/50 border-zinc-700 text-white focus:border-red-600 focus:ring-red-600/20 transition-all h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-white mb-2 block text-lg">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-zinc-800/50 border-zinc-700 text-white focus:border-red-600 focus:ring-red-600/20 transition-all h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="designTitle" className="text-white mb-2 block text-lg">
                    Design Title
                  </Label>
                  <Input
                    id="designTitle"
                    type="text"
                    required
                    value={formData.designTitle}
                    onChange={(e) => setFormData({ ...formData, designTitle: e.target.value })}
                    className="bg-zinc-800/50 border-zinc-700 text-white focus:border-red-600 focus:ring-red-600/20 transition-all h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-white mb-2 block text-lg">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    required
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Tell us about your design concept..."
                    className="bg-zinc-800/50 border-zinc-700 text-white focus:border-red-600 focus:ring-red-600/20 transition-all"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-6 text-lg shadow-xl shadow-red-600/40 hover:shadow-2xl hover:shadow-red-600/60 transition-all duration-300 group"
                >
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Submit Design
                </Button>
              </form>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
    </>
  );
}
