import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { Shield, Lock } from "lucide-react";

interface DataConsentWarningProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
  formType: "checkout" | "submission" | "contact";
}

export function DataConsentWarning({ isOpen, onAccept, onDecline, formType }: DataConsentWarningProps) {
  const formDetails = {
    checkout: {
      title: "Checkout Data Consent",
      description: "We need to collect and store your delivery and payment information to process your order.",
      dataCollected: [
        "Full name and email address",
        "Delivery address and phone number",
        "Payment card details (encrypted)",
        "Order history and preferences"
      ]
    },
    submission: {
      title: "Design Submission Consent",
      description: "To process your design submission, we need to collect and store your contact information.",
      dataCollected: [
        "Your name and email address",
        "Design files and descriptions",
        "Submission date and status",
        "Communication history"
      ]
    },
    contact: {
      title: "Contact Form Consent",
      description: "We need to store your message and contact details to respond to your inquiry.",
      dataCollected: [
        "Your name and email address",
        "Subject and message content",
        "Communication history",
        "Response tracking data"
      ]
    }
  };

  const details = formDetails[formType];

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-zinc-900 border-red-600/30 text-white max-w-lg">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/50">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <AlertDialogTitle className="text-2xl text-white">
              {details.title}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-gray-300 text-base leading-relaxed">
            {details.description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="my-4 bg-black/30 rounded-lg p-4 border border-red-600/20">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-4 h-4 text-red-600" />
            <h4 className="text-white">Data We'll Collect:</h4>
          </div>
          <ul className="text-gray-400 text-sm space-y-2 ml-6 list-disc">
            {details.dataCollected.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-300">
            <strong className="text-red-400">Your Privacy is Protected:</strong> All data is encrypted, 
            securely stored, and will never be sold to third parties. You can request data deletion at any time.
          </p>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={onDecline}
            className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onAccept}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-600/40"
          >
            I Consent - Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
