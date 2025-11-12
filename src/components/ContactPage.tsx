import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { motion } from "motion/react";
import { Send, CheckCircle2, Mail } from "lucide-react";
import { DataConsentWarning } from "./DataConsentWarning";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showConsentDialog, setShowConsentDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for consent before submitting
    const consent = localStorage.getItem("shadowStrengthContactConsent");
    if (consent !== "accepted") {
      setShowConsentDialog(true);
      return;
    }
    
    setSubmitted(true);
    
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  const handleConsentAccept = () => {
    localStorage.setItem("shadowStrengthContactConsent", "accepted");
    setShowConsentDialog(false);
    setSubmitted(true);
    
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
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
        formType="contact"
      />
      <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-red-600/50">
              <Mail className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-7xl mb-4 bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">
            Contact Us
          </h2>
          <p className="text-gray-300 text-xl leading-relaxed">
            Have questions, feedback, or want to connect? We'd love to hear from you.
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
                <h3 className="text-2xl mb-2">Message Sent!</h3>
                <p className="text-gray-400">Thank you for reaching out. We'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="contact-name" className="text-white mb-2 block text-lg">
                    Name
                  </Label>
                  <Input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-zinc-800/50 border-zinc-700 text-white focus:border-red-600 focus:ring-red-600/20 transition-all h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="contact-email" className="text-white mb-2 block text-lg">
                    Email Address
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-zinc-800/50 border-zinc-700 text-white focus:border-red-600 focus:ring-red-600/20 transition-all h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-white mb-2 block text-lg">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="bg-zinc-800/50 border-zinc-700 text-white focus:border-red-600 focus:ring-red-600/20 transition-all h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-white mb-2 block text-lg">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what's on your mind..."
                    className="bg-zinc-800/50 border-zinc-700 text-white focus:border-red-600 focus:ring-red-600/20 transition-all"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-6 text-lg shadow-xl shadow-red-600/40 hover:shadow-2xl hover:shadow-red-600/60 transition-all duration-300 group"
                >
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Send Message
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
