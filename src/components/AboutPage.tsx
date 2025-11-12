import { Card } from "./ui/card";
import { Star } from "lucide-react";
import { motion } from "motion/react";

export function AboutPage() {
  const reviews = [
    {
      name: "Marcus Johnson",
      rating: 5,
      comment: "The quality is unmatched. I love that my design submission made it to production!",
    },
    {
      name: "Sarah Chen",
      rating: 5,
      comment: "Finally, a brand that actually listens to its community. The gear is top-notch.",
    },
    {
      name: "David Martinez",
      rating: 5,
      comment: "Knowing my purchase supports community programs makes every workout feel even better.",
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      comment: "The designs are incredible and the mission behind Shadow Strength is inspiring.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Our Story Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-7xl mb-8 text-center bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">
            Our Story
          </h2>
          
          <Card className="bg-zinc-900/50 backdrop-blur-xl border-2 border-red-600/20 p-8 md:p-12 shadow-2xl hover:border-red-600/40 transition-all">
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p className="first-letter:text-6xl first-letter:text-red-600 first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:mt-1">
                At Shadow Strength, we believe that true strength comes from connection—connection to ourselves, 
                to our goals, and to the communities we are part of. Our mission is simple yet powerful: 
                "For the community, built by the community."
              </p>
              <p>
                We are not just a brand; we are a movement. Shadow Strength was created to empower individuals 
                to contribute directly to the products they love. Our platform allows you to share your own 
                designs and ideas, bringing them to life as real products. At the end of each quarter, our 
                community votes on which designs will make it into production, ensuring every voice can be 
                heard—whether you're a creator or an enthusiast supporting others.
              </p>
              <p>
                But our vision extends far beyond fitness gear. We are committed to making a tangible difference 
                in the world. A portion of every profit is reinvested into underdeveloped communities, funding 
                health and fitness facilities and programs that promote physical activity, wellness, and opportunity 
                for all. By choosing Shadow Strength, you're not just investing in high-quality products—you're 
                supporting a movement that strengthens communities, uplifts lives, and promotes healthier, more 
                active futures.
              </p>
              <div className="bg-red-600/10 border-l-4 border-red-600 pl-6 py-4 rounded-r-lg">
                <p className="text-red-400 italic">
                  Join us in building something greater. Together, we can transform ideas into products, and products 
                  into purpose. At Shadow Strength, every member of our community is a creator, a contributor, and a 
                  force for positive change.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Customer Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-7xl mb-8 text-center bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="bg-zinc-900/50 backdrop-blur-xl border-2 border-red-600/20 p-6 hover:border-red-600/50 transition-all duration-300 h-full hover:shadow-xl hover:shadow-red-600/20">
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 + i * 0.05 }}
                      >
                        <Star className="w-5 h-5 fill-red-600 text-red-600" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">{review.comment}</p>
                  <p className="text-red-600">— {review.name}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
