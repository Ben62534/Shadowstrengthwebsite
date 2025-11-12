import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { motion } from "motion/react";
import { Logo } from "./Logo";
import { ChevronDown, Target, Users, Heart, TrendingUp } from "lucide-react";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="bg-zinc-950">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1585484764802-387ea30e8432?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB3ZWlnaHRzJTIwZGFyayUyMGF0bW9zcGhlcmV8ZW58MXx8fHwxNzYxMDUxNzY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Shadow Strength Gym"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/95"></div>
          <div className="absolute inset-0 bg-red-950/15"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          {/* Custom Logo */}
          <div className="mb-12 inline-block">
            <Logo size="large" animated={true} />
          </div>

          {/* Brand Name with Gradient */}
          <motion.h1
            className="text-8xl mb-8 tracking-wider bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            SHADOW STRENGTH
          </motion.h1>

          {/* Slogan with Accent */}
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="inline-block bg-black/30 backdrop-blur-sm px-8 py-4 rounded-full border border-red-600/30">
              <p className="text-red-400 text-2xl tracking-wide italic">
                For the community, built by the community
              </p>
            </div>
          </motion.div>

          {/* CTA Button with Enhanced Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Button
              onClick={() => onNavigate("shop")}
              className="relative group bg-gradient-to-r from-red-600 via-red-700 to-red-600 hover:from-red-700 hover:via-red-800 hover:to-red-700 text-white px-16 py-8 text-2xl tracking-widest shadow-2xl shadow-red-600/50 hover:shadow-red-600/70 transition-all duration-500 border-2 border-red-500/30 overflow-hidden rounded-xl"
            >
              <span className="relative z-10 flex items-center gap-3">
                SHOP NOW
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              {/* Animated Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-200%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-red-600" />
        </motion.div>
      </div>

      {/* Our Values Section */}
      <div className="py-24 px-6 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-6xl mb-16 text-center bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What We Stand For
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Target className="w-12 h-12 text-red-600" />,
                title: "Community First",
                description: "Every design, every product, voted on by you."
              },
              {
                icon: <Users className="w-12 h-12 text-red-600" />,
                title: "Built Together",
                description: "Submit your designs and see them come to life."
              },
              {
                icon: <Heart className="w-12 h-12 text-red-600" />,
                title: "Give Back",
                description: "Profits invested in underdeveloped communities."
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-red-600" />,
                title: "Premium Quality",
                description: "High-performance gear that lasts."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="bg-zinc-900/50 backdrop-blur-xl border-2 border-red-600/20 p-8 hover:border-red-600/50 transition-all duration-300 h-full group hover:shadow-xl hover:shadow-red-600/20">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products Preview */}
      <div className="py-24 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-6xl mb-16 text-center bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Collection
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { name: "Power Hoodie", price: "$54.99", image: "https://images.unsplash.com/photo-1650744784287-66283639f54b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGd5bSUyMGhvb2RpZXxlbnwxfHx8fDE3NjEwNTIxMzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
              { name: "Elite Training Shorts", price: "$39.99", image: "https://images.unsplash.com/photo-1615570484051-3f5c08d4c87e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYXRobGV0aWMlMjB3ZWFyfGVufDF8fHx8MTc2MTA1MjEzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
              { name: "Community Crew Tee", price: "$29.99", image: "https://images.unsplash.com/photo-1613593013133-b6e122feafe8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYXBwYXJlbCUyMGJsYWNrfGVufDF8fHx8MTc2MTA1MjEzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="bg-zinc-900/50 backdrop-blur-xl border-2 border-red-600/20 hover:border-red-600 transition-all duration-300 overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-red-600/20">
                  <div className="aspect-square bg-zinc-800 overflow-hidden relative">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl text-white mb-2">{product.name}</h3>
                    <p className="text-red-600 text-2xl">{product.price}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => onNavigate("shop")}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-6 text-lg shadow-xl shadow-red-600/40 hover:shadow-2xl hover:shadow-red-600/60 transition-all duration-300"
            >
              View All Products
            </Button>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-24 px-6 bg-gradient-to-b from-zinc-950 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-zinc-900/50 backdrop-blur-xl border-2 border-red-600/20 p-12 text-center">
              <h2 className="text-5xl mb-6 bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">
                Your Purchase Makes a Difference
              </h2>
              <p className="text-gray-300 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Every product you buy helps fund health and fitness facilities in underdeveloped communities. 
                Together, we're building strength beyond the gym.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-5xl text-red-600 mb-2">15+</div>
                  <p className="text-gray-400">Communities Supported</p>
                </div>
                <div>
                  <div className="text-5xl text-red-600 mb-2">500+</div>
                  <p className="text-gray-400">Designs Submitted</p>
                </div>
                <div>
                  <div className="text-5xl text-red-600 mb-2">$50K+</div>
                  <p className="text-gray-400">Reinvested Locally</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-6xl mb-6 text-white">
              Join the Movement
            </h2>
            <p className="text-gray-400 text-xl mb-10">
              Be part of a community that creates, contributes, and gives back.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => onNavigate("submissions")}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-6 text-lg shadow-xl shadow-red-600/40"
              >
                Submit Your Design
              </Button>
              <Button
                onClick={() => onNavigate("about")}
                variant="outline"
                className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-12 py-6 text-lg"
              >
                Learn Our Story
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
