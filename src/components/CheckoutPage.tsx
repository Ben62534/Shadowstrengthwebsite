import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { motion } from "motion/react";
import { ArrowLeft, CreditCard, MapPin, CheckCircle2 } from "lucide-react";
import { CartItem } from "./CartSheet";
import { DataConsentWarning } from "./DataConsentWarning";

interface CheckoutPageProps {
  items: CartItem[];
  onBack: () => void;
  onComplete: () => void;
}

export function CheckoutPage({ items, onBack, onComplete }: CheckoutPageProps) {
  const [step, setStep] = useState<"delivery" | "payment" | "complete">("delivery");
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check if user has already given consent for checkout
    const consent = localStorage.getItem("shadowStrengthCheckoutConsent");
    if (consent === "accepted") {
      setHasConsent(true);
    } else {
      setShowConsentDialog(true);
    }
  }, []);
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return total + price * item.quantity;
    }, 0);
  };

  const handleConsentAccept = () => {
    localStorage.setItem("shadowStrengthCheckoutConsent", "accepted");
    setHasConsent(true);
    setShowConsentDialog(false);
  };

  const handleConsentDecline = () => {
    setShowConsentDialog(false);
    onBack();
  };

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConsent) {
      setShowConsentDialog(true);
      return;
    }
    setStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConsent) {
      setShowConsentDialog(true);
      return;
    }
    setStep("complete");
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  if (step === "complete") {
    return (
      <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-red-600/50">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          <h2 className="text-4xl mb-4 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            Order Confirmed!
          </h2>
          <p className="text-gray-400 text-lg mb-2">
            Thank you for supporting Shadow Strength
          </p>
          <p className="text-gray-500">
            A confirmation email has been sent to {deliveryInfo.email}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <DataConsentWarning
        isOpen={showConsentDialog}
        onAccept={handleConsentAccept}
        onDecline={handleConsentDecline}
        formType="checkout"
      />
      <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Cart
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl mb-6 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                Checkout
              </h2>

              {/* Progress Indicator */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === "delivery" ? "bg-red-600" : "bg-green-600"
                  }`}>
                    {step === "payment" ? <CheckCircle2 className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                  </div>
                  <span className={step === "delivery" ? "text-white" : "text-gray-500"}>Delivery</span>
                </div>
                <div className="flex-1 h-0.5 bg-zinc-800"></div>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === "payment" ? "bg-red-600" : "bg-zinc-800"
                  }`}>
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <span className={step === "payment" ? "text-white" : "text-gray-500"}>Payment</span>
                </div>
              </div>

              {step === "delivery" ? (
                <Card className="bg-zinc-900/50 backdrop-blur-xl border-red-600/20 p-8 shadow-2xl">
                  <h3 className="text-2xl mb-6 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-red-600" />
                    Delivery Information
                  </h3>
                  <form onSubmit={handleDeliverySubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="fullName" className="text-white mb-2 block">
                          Full Name
                        </Label>
                        <Input
                          id="fullName"
                          required
                          value={deliveryInfo.fullName}
                          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, fullName: e.target.value })}
                          className="bg-zinc-800/50 border-zinc-700 text-white focus:border-red-600 h-12"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white mb-2 block">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={deliveryInfo.email}
                          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, email: e.target.value })}
                          className="bg-zinc-800/50 border-zinc-700 text-white focus:border-red-600 h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address" className="text-white mb-2 block">
                        Street Address
                      </Label>
                      <Input
                        id="address"
                        required
                        value={deliveryInfo.address}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                        className="bg-zinc-800/50 border-zinc-700 text-white focus:border-red-600 h-12"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="city" className="text-white mb-2 block">
                          City
                        </Label>
                        <Input
                          id="city"
                          required
                          value={deliveryInfo.city}
                          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                          className="bg-zinc-800/50 border-zinc-700 text-white focus:border-red-600 h-12"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-white mb-2 block">
                          State
                        </Label>
                        <Input
                          id="state"
                          required
                          value={deliveryInfo.state}
                          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, state: e.target.value })}
                          className="bg-zinc-800/50 border-zinc-700 text-white focus:border-red-600 h-12"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode" className="text-white mb-2 block">
                          ZIP Code
                        </Label>
                        <Input
                          id="zipCode"
                          required
                          value={deliveryInfo.zipCode}
                          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, zipCode: e.target.value })}
                          className="bg-zinc-800/50 border-zinc-700 text-white focus:border-red-600 h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-white mb-2 block">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={deliveryInfo.phone}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                        className="bg-zinc-800/50 border-zinc-700 text-white focus:border-red-600 h-12"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-6 shadow-lg shadow-red-600/30"
                    >
                      Continue to Payment
                    </Button>
                  </form>
                </Card>
              ) : (
                <Card className="bg-zinc-900/50 backdrop-blur-xl border-red-600/20 p-8 shadow-2xl">
                  <h3 className="text-2xl mb-6 flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-red-600" />
                    Payment Information
                  </h3>
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="cardNumber" className="text-white mb-2 block">
                        Card Number
                      </Label>
                      <Input
                        id="cardNumber"
                        required
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                        className="bg-zinc-800/50 border-zinc-700 text-white focus:border-red-600 h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardName" className="text-white mb-2 block">
                        Cardholder Name
                      </Label>
                      <Input
                        id="cardName"
                        required
                        value={paymentInfo.cardName}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                        className="bg-zinc-800/50 border-zinc-700 text-white focus:border-red-600 h-12"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="expiryDate" className="text-white mb-2 block">
                          Expiry Date
                        </Label>
                        <Input
                          id="expiryDate"
                          required
                          placeholder="MM/YY"
                          maxLength={5}
                          value={paymentInfo.expiryDate}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                          className="bg-zinc-800/50 border-zinc-700 text-white focus:border-red-600 h-12"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-white mb-2 block">
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          required
                          placeholder="123"
                          maxLength={4}
                          value={paymentInfo.cvv}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                          className="bg-zinc-800/50 border-zinc-700 text-white focus:border-red-600 h-12"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-6 shadow-lg shadow-red-600/30"
                    >
                      Complete Order
                    </Button>
                  </form>
                </Card>
              )}
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="bg-zinc-900/50 backdrop-blur-xl border-red-600/20 p-6 shadow-2xl sticky top-24">
              <h3 className="text-xl mb-4">Order Summary</h3>
              <Separator className="bg-red-600/20 mb-4" />
              
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                    <div>
                      <p className="text-white">{item.name}</p>
                      <p className="text-gray-500">Size: {item.size} × {item.quantity}</p>
                    </div>
                    <p className="text-red-600">{item.price}</p>
                  </div>
                ))}
              </div>

              <Separator className="bg-red-600/20 mb-4" />
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-white">Free</span>
                </div>
              </div>

              <Separator className="bg-red-600/20 mb-4" />
              
              <div className="flex justify-between text-xl">
                <span>Total</span>
                <span className="text-red-600">${calculateTotal().toFixed(2)}</span>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
}
