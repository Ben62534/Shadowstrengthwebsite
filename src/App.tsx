import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { SubmissionsPage } from "./components/SubmissionsPage";
import { ShopPage } from "./components/ShopPage";
import { ContactPage } from "./components/ContactPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { CartSheet, CartItem } from "./components/CartSheet";
import { CookieConsent } from "./components/CookieConsent";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
}

type PageType = "home" | "about" | "submissions" | "shop" | "contact" | "checkout";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cookieConsentGiven, setCookieConsentGiven] = useState(false);

  const handleAddToCart = (product: Product, size: string, quantity: number) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id && item.size === size
    );

    if (existingItemIndex > -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          size,
          quantity,
        },
      ]);
    }

    toast.success("Added to cart!", {
      description: `${product.name} (Size: ${size})`,
    });
  };

  const handleRemoveItem = (id: number, size: string) => {
    setCartItems(cartItems.filter((item) => !(item.id === id && item.size === size)));
    toast.info("Removed from cart");
  };

  const handleUpdateQuantity = (id: number, size: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage("checkout");
  };

  const handleCheckoutComplete = () => {
    setCartItems([]);
    setCurrentPage("home");
    toast.success("Order completed successfully!", {
      description: "Thank you for supporting Shadow Strength!",
    });
  };

  const handleCookieAccept = () => {
    setCookieConsentGiven(true);
  };

  const handleCookieDecline = () => {
    setCookieConsentGiven(false);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "about":
        return <AboutPage />;
      case "submissions":
        return <SubmissionsPage />;
      case "shop":
        return <ShopPage onAddToCart={handleAddToCart} />;
      case "contact":
        return <ContactPage />;
      case "checkout":
        return (
          <CheckoutPage
            items={cartItems}
            onBack={() => {
              setCurrentPage("shop");
              setIsCartOpen(true);
            }}
            onComplete={handleCheckoutComplete}
          />
        );
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {currentPage !== "checkout" && (
        <Navigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          cartItemCount={cartItemCount}
          onOpenCart={() => setIsCartOpen(true)}
        />
      )}
      {renderPage()}
      <CartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(9, 9, 11, 0.95)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(220, 38, 38, 0.3)",
            color: "#fff",
          },
        }}
      />
      <CookieConsent onAccept={handleCookieAccept} onDecline={handleCookieDecline} />
    </div>
  );
}
