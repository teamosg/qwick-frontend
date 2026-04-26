import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-32 px-6">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-black rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden"
        >
          {/* Animated Background Elements */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              rotate: [0, -90, 0],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ duration: 15, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />

          <div className="relative z-10">
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-white/20"
            >
                <Zap size={40} className="text-white fill-white" />
            </motion.div>
            <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 font-silkscreen tracking-tighter leading-none">
              READY TO START <br /> EARNING?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto text-xl mb-12 font-outfit">
              Join thousands of creators who are already monetizing their short-form content with Qwick.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="px-10 py-5 bg-white text-black rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-slate-100 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10">
                Join Now
              </button>
              <button className="px-10 py-5 bg-transparent border-2 border-white/20 text-white rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-2 group">
                Learn More
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
