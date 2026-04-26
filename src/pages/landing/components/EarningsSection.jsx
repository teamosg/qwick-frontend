import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';

const EarningsSection = () => {
  return (
    <section className="container mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-20">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="lg:w-1/2"
      >
        <div className="flex items-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100 shadow-sm">
            <DollarSign size={24} />
          </div>
          <span className="text-sm font-black text-slate-400 uppercase tracking-widest font-outfit">Cash-out</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-[1.1] font-outfit">
          Earnings on <br /> easy mode
        </h2>
        <p className="text-lg text-slate-500 mb-8 max-w-lg font-outfit leading-relaxed">
          Payouts are sent to your vybe wallet hourly. See what you've earned and withdraw using Stripe or PayPal (depending on country).
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
                <div className="grid grid-cols-2 gap-6 mb-10">
                    <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                        <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Available balance</div>
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-2xl font-black text-slate-900 font-outfit tracking-tighter">$485.92</span>
                            <button className="px-3 py-1.5 bg-black text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-black/10">CASHOUT</button>
                        </div>
                    </div>
                    <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                        <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Lifetime earnings</div>
                        <div className="text-2xl font-black text-slate-900 font-outfit tracking-tighter">$12,739.00</div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-4 px-2">
                        <span className="flex-1">Date</span>
                        <span className="flex-1">Post</span>
                        <span className="w-16 text-right">Earnings</span>
                    </div>
                    {[
                        { date: '2/25/2024', title: '#TeamMillion...', icon: '🎨', amount: '$24.00' },
                        { date: '2/24/2024', title: 'Viral Shorts', icon: '🚀', amount: '$156.50' },
                        { date: '2/24/2024', title: 'Content Drop', icon: '🎬', amount: '$82.10' }
                    ].map((row, i) => (
                        <div key={i} className="flex items-center px-2 group cursor-default">
                            <span className="flex-1 text-[11px] text-slate-400 font-bold font-outfit">{row.date}</span>
                            <div className="flex-1 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-sm shadow-sm group-hover:scale-110 transition-transform">
                                    {row.icon}
                                </div>
                                <span className="text-[11px] font-black text-slate-900 truncate font-outfit">{row.title}</span>
                            </div>
                            <span className="w-16 text-right text-[11px] font-black text-slate-900 font-outfit tracking-tighter">{row.amount}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </motion.div>
    </section>
  );
};

export default EarningsSection;
