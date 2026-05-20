import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import heroBg from '../../../assets/hero-bg-full.png';
import { Link } from 'react-router';

const LandingHero = () => {
  // Demo mode: Toggle between 'video' or 'image'
  const backgroundMode = 'video';
  // High-performance direct video link (Must be a direct .mp4/.webm file, NOT a YouTube link)
  const videoUrl = "https://cdn.pixabay.com/video/2024/05/26/213757_tiny.mp4";

  return (
    <section className="relative min-h-[100vh] w-full overflow-hidden flex items-center">
      {/* Background Media with Overlay */}
      <div className="absolute inset-0 z-0">
        {backgroundMode === 'video' ? (
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={heroBg}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={heroBg}
            alt="Background"
            className="w-full h-full object-cover scale-[1.4]"
          />
        )}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl font-bold font-inter  text-white mb-8 "
          >
            Earn from making content, even with zero followers
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-200 leading-relaxed mb-12 max-w-2xl font-inter"
          >
            Discover campaigns from brands and creators, post or clip content, and earn based on performance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row  items-center gap-6"
          >
            <Link to="/home" className="w-full sm:w-auto px-10 cursor-pointer py-5 bg-white text-black  rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-white/10 uppercase tracking-widest text-sm font-inter">
              Get Started
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
