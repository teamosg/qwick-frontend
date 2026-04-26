import React from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

const SubmitClips = () => {
  return (
    <section className="container mx-auto px-6 py-24 flex flex-col lg:flex-row-reverse items-center gap-20">
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="lg:w-1/2"
      >
        <div className="flex items-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100 shadow-sm">
            <Send size={24} />
          </div>
          <span className="text-sm font-black text-slate-400 uppercase tracking-widest font-outfit">Post clips</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-[1.1] font-outfit">
          Submit clips <br /> in a click
        </h2>
        <p className="text-lg text-slate-500 mb-8 max-w-lg font-outfit leading-relaxed">
          Connect your socials and add clips in seconds. Track your uploads, approvals and stats in one place. Sync your name for giving rank.
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
            <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_30px_70px_rgba(0,0,0,0.12)] border border-slate-100 w-full max-w-md">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=MrBeast" alt="avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <span className="font-black text-slate-900 text-xl font-outfit block">MrBeast</span>
                        <span className="text-sm font-bold text-slate-400 font-outfit">#TeamMillion Campaign</span>
                    </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-12">
                    {[
                        { label: '23+', value: 'Verified' },
                        { label: '3.2m', value: 'Views' },
                        { label: '45', value: 'Rank' },
                        { label: '74%', value: 'Check out' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center p-3 rounded-2xl bg-slate-50/50 border border-slate-100">
                            <div className="text-lg font-black text-slate-900 font-outfit tracking-tighter">{stat.label}</div>
                            <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest">{stat.value}</div>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <button className="w-full py-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-600 font-black text-sm flex items-center justify-between px-8 hover:bg-slate-100 transition-colors">
                        Directions and content
                        <span className="text-slate-400 text-xl font-light">›</span>
                    </button>
                    <button className="w-full py-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-600 font-black text-sm flex items-center justify-between px-8 hover:bg-slate-100 transition-colors">
                        My submissions (32)
                        <span className="text-slate-400 text-xl font-light">›</span>
                    </button>
                    <button className="w-full py-5 bg-black text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-black/10 hover:bg-slate-800 transition-colors">
                        Submit post
                    </button>
                </div>
            </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SubmitClips;
