import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { ArrowRight, Sparkles, Shirt, Gift, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    id: "apparel",
    name: "Custom Apparel",
    desc: "From oversized graphic tees to custom embroidered hoodies. Express your Delhi vibe with our premium streetwear collection.",
    link: "/category/custom-apparel",
    image: "/landing_page_apparel.jpg",
    icon: Shirt,
  },
  {
    id: "surprises",
    name: "Car Boot Surprises",
    desc: "Planning a proposal or a midnight birthday bash? We turn your car trunk into a magical venue with lights, balloons, and decor.",
    link: "/category/car-surprises",
    image: "/car_trunk.jpg",
    icon: Sparkles,
  },
  {
    id: "hampers",
    name: "Resin Art & Hampers",
    desc: "Preserve your memories in solid resin blocks or gift a curated hamper box. Perfect for anniversaries or corporate events.",
    link: "/category/resin-hampers",
    image: "/gift_landing.jpg",
    icon: Gift,
  },
];

const UserHome = () => {
  const { user } = useUserStore();
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* 1. Welcome Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Dynamic Greeting: Handles both User and Guest */}
          <h1 className="text-4xl md:text-6xl font-display mb-4">
            {user ? (
              <>
                Welcome back,{" "}
                <span className="text-[#d4af37]">{user.name}</span>
              </>
            ) : (
              <>
                The Giftify <span className="text-[#d4af37]">Collection</span>
              </>
            )}
          </h1>

          <p className="text-gray-400 text-lg mb-6">
            {user
              ? "Ready to find something special today?"
              : "Curated experiences and premium custom gifts."}
          </p>

          {/* Track Order Button: Only visible if logged in */}
          {user && (
            <Link
              to="/purchase-history"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-[#d4af37] text-gray-300 hover:text-[#d4af37] px-6 py-2 rounded-full transition-all duration-300 text-sm uppercase tracking-wider"
            >
              <ShoppingBag size={16} /> Track Your Orders
            </Link>
          )}
        </motion.div>

        {/* 2. Featured Products */}
        {!isLoading && products.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-8 justify-center">
              <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent flex-1" />
              <h2 className="text-3xl font-display text-[#d4af37] uppercase tracking-wider">
                Featured Picks
              </h2>
              <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent flex-1" />
            </div>
            <FeaturedProducts featuredProducts={products} />
          </div>
        )}

        {/* 3. Category Browser */}
        <div className="space-y-24">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-12`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute inset-0 bg-[#d4af37] rounded-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-300 opacity-20"></div>
                <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-video">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300" />
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
                <div className="inline-flex items-center justify-center lg:justify-start gap-3">
                  <cat.icon className="text-[#d4af37] w-8 h-8" />
                  <h2 className="text-4xl font-display">{cat.name}</h2>
                </div>

                <p className="text-gray-400 text-lg leading-relaxed">
                  {cat.desc}
                </p>

                <Link
                  to={cat.link}
                  className="inline-flex items-center gap-2 bg-[#d4af37] text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300"
                >
                  Browse Now <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
