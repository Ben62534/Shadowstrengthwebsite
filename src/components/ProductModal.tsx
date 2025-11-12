import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { motion } from "motion/react";
import { ShoppingCart, Check } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  description?: string;
  image?: string;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
}

export function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product, selectedSize, quantity);
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
        onClose();
        setQuantity(1);
        setSelectedSize("M");
      }, 1000);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900/95 backdrop-blur-xl border-red-600/30 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Product Image */}
          <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl flex items-center justify-center border border-red-600/20 overflow-hidden relative group">
            {product.image ? (
              <>
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent"></div>
                <motion.div
                  className="text-9xl text-red-600/30 group-hover:text-red-600/50 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  SS
                </motion.div>
              </>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-4xl bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              {product.price}
            </span>
            <span className="text-gray-400 px-4 py-2 bg-zinc-800/50 rounded-lg border border-red-600/20">
              {product.category === "mens"
                ? "Men's"
                : product.category === "womens"
                ? "Women's"
                : "Unisex"}
            </span>
          </div>

          {/* Size Selection */}
          <div>
            <Label className="text-white mb-3 block text-lg">Select Size</Label>
            <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
              <div className="grid grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <div key={size} className="relative">
                    <RadioGroupItem
                      value={size}
                      id={size}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={size}
                      className="flex items-center justify-center h-12 cursor-pointer bg-zinc-800/50 backdrop-blur-sm border-2 border-zinc-700 rounded-lg peer-data-[state=checked]:bg-gradient-to-br peer-data-[state=checked]:from-red-600 peer-data-[state=checked]:to-red-700 peer-data-[state=checked]:border-red-600 hover:border-red-600/50 transition-all"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Quantity */}
          <div>
            <Label className="text-white mb-3 block text-lg">Quantity</Label>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                variant="outline"
                className="bg-zinc-800/50 border-zinc-700 text-white hover:bg-red-600 hover:border-red-600 h-12 w-12"
              >
                -
              </Button>
              <span className="text-2xl w-12 text-center">{quantity}</span>
              <Button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                variant="outline"
                className="bg-zinc-800/50 border-zinc-700 text-white hover:bg-red-600 hover:border-red-600 h-12 w-12"
              >
                +
              </Button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={added}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-6 text-lg shadow-xl shadow-red-600/40 hover:shadow-2xl hover:shadow-red-600/60 transition-all duration-300 disabled:opacity-100"
          >
            {added ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                Added to Cart!
              </motion.div>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
