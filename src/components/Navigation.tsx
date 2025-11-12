import { ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";
import { Logo } from "./Logo";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartItemCount: number;
  onOpenCart: () => void;
}

export function Navigation({ currentPage, onNavigate, cartItemCount, onOpenCart }: NavigationProps) {
  const navItems = [
    { name: "Home", id: "home" },
    { name: "About Us & Reviews", id: "about" },
    { name: "Design Submissions", id: "submissions" },
    { name: "Shop", id: "shop" },
    { name: "Contact Us", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-red-600/20 shadow-lg shadow-black/50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <Logo size="small" />
          <span className="text-white text-lg tracking-wider group-hover:text-red-400 transition-colors">
            Shadow Strength
          </span>
        </button>
        
        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                currentPage === item.id
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30"
                  : "text-gray-300 hover:text-white hover:bg-red-600/10"
              }`}
            >
              {item.name}
            </button>
          ))}
          
          <button
            onClick={onOpenCart}
            className="ml-4 relative p-2 text-gray-300 hover:text-white transition-colors hover:bg-red-600/10 rounded-lg"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-red-700 text-white border-0 min-w-[20px] h-5 flex items-center justify-center p-1 shadow-lg shadow-red-600/50">
                {cartItemCount}
              </Badge>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
