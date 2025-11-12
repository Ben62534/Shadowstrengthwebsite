import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { ProductModal } from "./ProductModal";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  description?: string;
  image?: string;
}

interface ShopPageProps {
  onAddToCart: (product: Product, size: string, quantity: number) => void;
}

export function ShopPage({ onAddToCart }: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: "Shadow Tank Pro",
      category: "mens",
      price: "$34.99",
      image: "https://images.unsplash.com/photo-1744551472645-7fd56c0406ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB0YW5rJTIwdG9wfGVufDF8fHx8MTc2MTAwMjgzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 2,
      name: "Strength Flex Leggings",
      category: "womens",
      price: "$44.99",
      image: "https://images.unsplash.com/photo-1626444231642-6bd985bca16a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMGxlZ2dpbmdzfGVufDF8fHx8MTc2MTA1MjEzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 3,
      name: "Community Crew Tee",
      category: "unisex",
      price: "$29.99",
      image: "https://images.unsplash.com/photo-1613593013133-b6e122feafe8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYXBwYXJlbCUyMGJsYWNrfGVufDF8fHx8MTc2MTA1MjEzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 4,
      name: "Power Hoodie",
      category: "unisex",
      price: "$54.99",
      image: "https://images.unsplash.com/photo-1650744784287-66283639f54b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGd5bSUyMGhvb2RpZXxlbnwxfHx8fDE3NjEwNTIxMzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 5,
      name: "Elite Training Shorts",
      category: "mens",
      price: "$39.99",
      image: "https://images.unsplash.com/photo-1615570484051-3f5c08d4c87e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYXRobGV0aWMlMjB3ZWFyfGVufDF8fHx8MTc2MTA1MjEzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 6,
      name: "Unity Sports Bra",
      category: "womens",
      price: "$36.99",
      image: "https://images.unsplash.com/photo-1626444231642-6bd985bca16a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBicmElMjBhdGhsZXRpY3xlbnwxfHx8fDE3NjEwNTIxMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 7,
      name: "Foundation Joggers",
      category: "mens",
      price: "$49.99",
      image: "https://images.unsplash.com/photo-1615570484051-3f5c08d4c87e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYXRobGV0aWMlMjB3ZWFyfGVufDF8fHx8MTc2MTA1MjEzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 8,
      name: "Empower Crop Top",
      category: "womens",
      price: "$32.99",
      image: "https://images.unsplash.com/photo-1626444231642-6bd985bca16a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMGxlZ2dpbmdzfGVufDF8fHx8MTc2MTA1MjEzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 9,
      name: "Legacy Snapback",
      category: "unisex",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1613593013133-b6e122feafe8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYXBwYXJlbCUyMGJsYWNrfGVufDF8fHx8MTc2MTA1MjEzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
  ];

  const categories = [
    { id: "all", label: "All Products" },
    { id: "mens", label: "Men's" },
    { id: "womens", label: "Women's" },
    { id: "unisex", label: "Unisex" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-7xl mb-8 text-center bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Collection
        </motion.h2>

        {/* Category Filter */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`px-8 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl shadow-red-600/40"
                  : "bg-zinc-900/50 backdrop-blur-sm border border-red-600/20 text-gray-300 hover:border-red-600 hover:text-white hover:shadow-lg hover:shadow-red-600/20"
              }`}
            >
              <span className="relative z-10">{category.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                onClick={() => handleProductClick(product)}
                className="bg-zinc-900/50 backdrop-blur-sm border-2 border-red-600/20 hover:border-red-600 transition-all duration-300 cursor-pointer overflow-hidden group hover:shadow-2xl hover:shadow-red-600/20"
              >
                <div className="aspect-square bg-zinc-800 overflow-hidden relative">
                  {product.image ? (
                    <>
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60"></div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
                      <span className="text-8xl text-red-600/30 group-hover:text-red-600/50 transition-colors">
                        SS
                      </span>
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <span className="text-white px-6 py-2 bg-red-600 rounded-lg shadow-lg">
                      Quick View
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-3">
                    <Badge
                      variant="outline"
                      className="border-red-600/50 text-red-500 mb-2 bg-red-600/10"
                    >
                      {product.category === "mens"
                        ? "Men's"
                        : product.category === "womens"
                        ? "Women's"
                        : "Unisex"}
                    </Badge>
                  </div>
                  <h3 className="text-white text-xl mb-2 group-hover:text-red-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-red-600 text-2xl">{product.price}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}
