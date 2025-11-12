import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Trash2, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

export interface CartItem {
  id: number;
  name: string;
  price: string;
  size: string;
  quantity: number;
}

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: number, size: string) => void;
  onUpdateQuantity: (id: number, size: string, quantity: number) => void;
  onCheckout: () => void;
}

export function CartSheet({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
}: CartSheetProps) {
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-zinc-950/95 backdrop-blur-xl border-l border-red-600/20 text-white w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-red-600" />
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full mt-6">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400 text-lg">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {items.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-zinc-900/50 backdrop-blur-sm border border-red-600/20 rounded-xl p-4 hover:border-red-600/40 transition-all"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg flex items-center justify-center border border-red-600/20">
                        <span className="text-2xl text-red-600/40">SS</span>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="mb-1">{item.name}</h4>
                        <p className="text-gray-400 text-sm mb-2">Size: {item.size}</p>
                        <p className="text-red-600">{item.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800/50">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() =>
                            onUpdateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))
                          }
                          className="h-8 w-8 p-0 bg-zinc-800 hover:bg-red-600 border-zinc-700"
                          variant="outline"
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          onClick={() =>
                            onUpdateQuantity(item.id, item.size, Math.min(10, item.quantity + 1))
                          }
                          className="h-8 w-8 p-0 bg-zinc-800 hover:bg-red-600 border-zinc-700"
                          variant="outline"
                        >
                          +
                        </Button>
                      </div>
                      
                      <Button
                        size="sm"
                        onClick={() => onRemoveItem(item.id, item.size)}
                        className="bg-red-900/30 hover:bg-red-900 text-red-400 hover:text-white"
                        variant="ghost"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4 space-y-4">
                <Separator className="bg-red-600/20" />
                
                <div className="flex justify-between items-center text-xl">
                  <span>Total:</span>
                  <span className="text-red-600">${calculateTotal().toFixed(2)}</span>
                </div>

                <Button
                  onClick={onCheckout}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-6 text-lg shadow-xl shadow-red-600/40 hover:shadow-2xl hover:shadow-red-600/60 transition-all duration-300"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
