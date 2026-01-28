import React from "react";
import { motion } from "framer-motion";
import {
  Share2,
  Award,
  Users,
  Heart,
  ArrowRight,
  MessageCircle,
} from "lucide-react"; // Added MessageCircle
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12">
      {/* 1. HERO SECTION */}
      <div className="container mx-auto px-4 mb-20 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block py-1 px-3 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-bold tracking-widest uppercase mb-4"
        >
          Incubated by Govt. of NCT of Delhi
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-display mb-6"
        >
          Crafting Memories, <br />
          <span className="text-[#d4af37]">Not Just Gifts.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
        >
          Giftify Delhi started with a simple idea: The best gifts aren't
          things, they are experiences. From a small dorm room project to a
          government-backed startup, we are redefining how Delhi celebrates.
        </motion.p>
      </div>

      {/* 2. STATS SECTION */}
      <div className="bg-white/5 border-y border-white/10 py-12 mb-20 backdrop-blur-sm">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <StatCard number="500+" label="Happy Customers" icon={Users} />
          <StatCard number="50+" label="Car Surprises" icon={Award} />
          <StatCard number="100%" label="Delhi Vibes" icon={Heart} />
          <StatCard number="4.9" label="Rating" icon={Award} />
        </div>
      </div>

      {/* 3. FOUNDER SECTION */}
      <div className="container mx-auto px-4 mb-24">
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto bg-gray-900/50 rounded-3xl p-8 border border-white/10">
          {/* Founder Image */}
          <div className="w-full md:w-1/3 shrink-0">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#d4af37]/30 group">
              <div className="absolute inset-0 bg-[#d4af37] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              {/* REPLACE THIS URL WITH YOUR ACTUAL IMAGE URL */}
              <img
                src="/founder.jpg"
                alt="Founder"
                className="w-full h-full object-cover transition-all duration-700"
              />
            </div>
          </div>

          {/* Founder Text */}
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h2 className="text-3xl font-display mb-2 text-white">
              Sumant Singh
            </h2>
            <p className="text-[#d4af37] font-bold uppercase tracking-wider text-sm mb-6">
              Founder & CEO
            </p>

            <p className="text-gray-300 mb-8 leading-relaxed">
              "I started Giftify because I was tired of seeing the same old
              generic gifts everywhere. I wanted to create something that felt
              personal, raw, and authentically Delhi. Gifts should carry
              emotions, not just price tags. As a student, I’ve always believed
              that creativity and technology can come together to make life
              easier and more meaningful. That’s exactly what Giftify does—it
              makes gifting effortless, memorable, and full of heart."
            </p>

            {/* UPDATED INSTAGRAM BUTTON */}
            <a
              href="https://www.instagram.com/giftiffy.delhi/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-pink-500/20 hover:scale-105 transition-all duration-300"
            >
              <Share2 size={20} />
              <span>DM to Order @giftifydelhi</span>
              <MessageCircle size={20} className="fill-white" />
            </a>
          </div>
        </div>
      </div>

      {/* 4. CTA */}
      <div className="text-center">
        <h3 className="text-2xl font-display mb-6">
          Ready to find something unique?
        </h3>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-[#d4af37] text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300"
        >
          Explore Collection <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};

const StatCard = ({ number, label, icon: Icon }) => (
  <div className="space-y-2">
    <div className="flex justify-center text-[#d4af37] mb-2">
      <Icon size={24} />
    </div>
    <div className="text-3xl md:text-4xl font-bold font-display">{number}</div>
    <div className="text-sm text-gray-500 uppercase tracking-widest">
      {label}
    </div>
  </div>
);

export default AboutPage;
