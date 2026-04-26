import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const LandingHero = () => {
  return (
    <section className="bg-white pt-48 pb-24 px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold font-silkscreen tracking-tight text-slate-900 mb-8 leading-[0.9] font-outfit"
          >
            Grow Faster with <span className="text-primary italic">Qwick</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 leading-relaxed mb-12 max-w-2xl font-outfit"
          >
            The all-in-one platform for brands to launch viral campaigns and creators to earn 
            from their influence. Scale your presence across TikTok, Instagram, and YouTube.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <button className="w-full sm:w-auto px-10 py-5 bg-black text-white font-black rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-black/10 uppercase tracking-widest text-sm">
              GEt Started
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
           
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
