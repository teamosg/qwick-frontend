import React from 'react';
import { motion } from 'framer-motion';
import { Search, Youtube, Instagram, Twitter, CheckCircle2 } from 'lucide-react';

const CampaignDrops = () => {
  return (
    <section className="container mx-auto px-6 py-24">
      {/* Section Header */}
      <div className="text-center mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl font-bold mb-8 font-silkscreen tracking-tighter leading-none"
        >
          QWICK CREATOR <br className="hidden md:block" /> REWARDS PROGRAM
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 max-w-2xl mx-auto text-xl font-outfit"
        >
          Welcome to the easiest way to make money creating short-form content. Get paid to get views, it's that simple.
        </motion.p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-20">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2"
        >
          <div className="flex items-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100 shadow-sm">
              <Search size={24} />
            </div>
            <span className="text-sm font-black text-slate-400 uppercase tracking-widest font-outfit">Find campaigns</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-[1.1] font-outfit">
            Campaign drops <br /> you care about
          </h2>
          <p className="text-lg text-slate-500 mb-8 max-w-lg font-outfit leading-relaxed">
            Verified creators launching high-paying campaigns for top shippers. We review each listing to make sure they're legit. See them live with notifications on Discord & email.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 w-full"
        >
          <div className="relative bg-slate-100/50 rounded-[4rem] p-12 overflow-hidden border border-slate-200/50 shadow-inner flex items-center justify-center">
              <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_30px_70px_rgba(0,0,0,0.12)] border border-slate-100 w-full max-w-md transform hover:scale-[1.02] transition-transform duration-500">
                  <div className="flex items-center justify-between mb-10">
                      <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=MrBeast" alt="avatar" className="w-full h-full object-cover" />
                          </div>
                          <div>
                              <div className="flex items-center gap-2">
                                  <span className="font-black text-slate-900 text-xl font-outfit">MrBeast</span>
                                  <CheckCircle2 size={18} className="text-blue-500 fill-blue-500" />
                              </div>
                              <div className="text-sm font-bold text-slate-400 font-outfit tracking-tight">8d New • English</div>
                          </div>
                      </div>
                  </div>
                  <p className="text-base text-slate-600 mb-10 leading-relaxed font-outfit">
                    Help us raise $40,000,000 by shipping #TeamMillion content! All views count towards the goal.
                  </p>
                  <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                      <div className="flex gap-4">
                          <Youtube size={24} className="text-slate-300 hover:text-red-600 transition-colors cursor-pointer" />
                          <Instagram size={24} className="text-slate-300 hover:text-pink-600 transition-colors cursor-pointer" />
                          <Twitter size={24} className="text-slate-300 hover:text-blue-400 transition-colors cursor-pointer" />
                      </div>
                      <div className="text-right">
                          <div className="text-4xl font-black text-slate-900 tracking-tighter font-outfit">$2,000</div>
                          <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">TOTAL REWARDS</div>
                      </div>
                  </div>
              </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CampaignDrops;
