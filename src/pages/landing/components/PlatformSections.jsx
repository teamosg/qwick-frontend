import React from 'react';
import { motion } from 'framer-motion';
import { Search, Send, DollarSign, CheckCircle2, TrendingUp, Layers, Zap, Globe, BarChart3, Users, Play, Clock, Youtube, Instagram, Twitter } from 'lucide-react';

const FeatureCard = ({ icon: Icon, tag, title, description, image, reverse = false }) => (
  <section className={`container mx-auto px-6 py-20 flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>
    <motion.div 
      initial={{ opacity: 0, x: reverse ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="lg:w-1/2"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
          <Icon size={20} />
        </div>
        <span className="text-sm font-bold text-slate-500 font-outfit">{tag}</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight font-outfit">
        {title}
      </h2>
      <p className="text-lg text-slate-500 mb-8 max-w-lg font-outfit">
        {description}
      </p>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="lg:w-1/2 w-full"
    >
      <div className="relative bg-slate-100/50 rounded-[3rem] p-6 lg:p-12 overflow-hidden border border-slate-200/50 shadow-inner">
        {image}
      </div>
    </motion.div>
  </section>
);

const PlatformSections = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="text-center py-20 px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-6 font-silkscreen tracking-tighter"
        >
          QWICK CREATOR REWARDS PROGRAM
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 max-w-2xl mx-auto text-lg font-outfit"
        >
          Welcome to the easiest way to make money creating short-form content. Get paid to get views, it's that simple.
        </motion.p>
      </div>

      {/* Campaign Drops */}
      <FeatureCard 
        icon={Search}
        tag="Find campaigns"
        title="Campaign drops you care about"
        description="Verified creators launching high-paying campaigns for top shippers. We review each listing to make sure they're legit. See them live with notifications on Discord & email."
        image={
          <div className="bg-white rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 max-w-sm mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-cyan-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=MrBeast" alt="avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 text-lg">MrBeast</span>
                            <CheckCircle2 size={16} className="text-blue-500 fill-blue-500" />
                        </div>
                        <div className="text-xs font-bold text-slate-400">8d New • English</div>
                    </div>
                </div>
            </div>
            <p className="text-sm text-slate-600 mb-8 leading-relaxed">Help us raise $40,000,000 by shipping #TeamMillion content!</p>
            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex gap-3">
                    <Youtube size={20} className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer" />
                    <Instagram size={20} className="text-slate-400 hover:text-pink-600 transition-colors cursor-pointer" />
                    <Twitter size={20} className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer" />
                </div>
                <div className="text-right">
                    <div className="text-3xl font-black text-slate-900 tracking-tighter">$2,000</div>
                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">TOTAL REWARDS</div>
                </div>
            </div>
          </div>
        }
      />

      {/* Submit Clips */}
      <FeatureCard 
        icon={Send}
        tag="Post clips"
        title="Submit clips in a click"
        description="Connect your socials and add clips in seconds. Track your uploads, approvals and stats in one place. Sync your name for giving rank."
        reverse
        image={
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 max-w-md mx-auto">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=MrBeast" alt="avatar" />
                </div>
                <div>
                    <span className="font-bold text-slate-900 block">MrBeast</span>
                    <span className="text-xs text-slate-400">#TeamMillion Campaign</span>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-8">
                {[
                    { label: '23+', value: 'Verified' },
                    { label: '3.2m', value: 'Views' },
                    { label: '45', value: 'Rank' },
                    { label: '74%', value: 'Check out' }
                ].map((stat, i) => (
                    <div key={i} className="text-center">
                        <div className="text-sm font-bold text-slate-900">{stat.label}</div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold">{stat.value}</div>
                    </div>
                ))}
            </div>
            <div className="space-y-3">
                <button className="w-full py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-600 font-bold text-sm flex items-center justify-between px-6">
                    Directions and content
                    <span className="text-slate-400">›</span>
                </button>
                <button className="w-full py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-600 font-bold text-sm flex items-center justify-between px-6">
                    My submissions (32)
                    <span className="text-slate-400">›</span>
                </button>
                <button className="w-full py-4 bg-black text-white rounded-2xl font-bold text-sm">
                    Submit post
                </button>
            </div>
          </div>
        }
      />

      {/* Earnings */}
      <FeatureCard 
        icon={DollarSign}
        tag="Cash-out"
        title="Earnings on easy mode"
        description="Payouts are sent to your vybe wallet hourly. See what you've earned and withdraw using Stripe or PayPal (depending on country)."
        image={
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 max-w-md mx-auto overflow-hidden">
            <div className="flex gap-4 mb-8">
                <div className="flex-1 p-4 bg-slate-50 rounded-2xl">
                    <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Available balance</div>
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-black text-slate-900">$485.92</span>
                        <button className="px-3 py-1 bg-black text-white rounded-full text-[10px] font-bold">CASHOUT</button>
                    </div>
                </div>
                <div className="flex-1 p-4 bg-slate-50 rounded-2xl">
                    <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Lifetime earnings</div>
                    <div className="text-xl font-black text-slate-900">$12,739.00</div>
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex text-[10px] font-bold text-slate-400 uppercase border-b border-slate-100 pb-2 px-2">
                    <span className="flex-1">Date</span>
                    <span className="flex-1">Post</span>
                    <span className="w-16 text-right">Earnings</span>
                </div>
                {[1, 2].map((_, i) => (
                    <div key={i} className="flex items-center px-2">
                        <span className="flex-1 text-[10px] text-slate-400 font-bold">2/25/2024</span>
                        <div className="flex-1 flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-pink-100 flex items-center justify-center text-[10px]">🎨</div>
                            <span className="text-[10px] font-bold text-slate-900 truncate">#TeamMillion...</span>
                        </div>
                        <span className="w-16 text-right text-[10px] font-black text-slate-900">$24.00</span>
                    </div>
                ))}
            </div>
          </div>
        }
      />

      {/* Middle Banner */}
      <div className="bg-white border-y border-slate-100 py-24 text-center px-6">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-6 font-silkscreen tracking-tighter"
        >
          HIGH IMPACT CAMPAIGNS. LOWER RISK
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 max-w-2xl mx-auto text-lg font-outfit"
        >
          Welcome to the easiest way to make money creating short-form content. Get paid to get views, it's that simple.
        </motion.p>
      </div>

      {/* Repeated Sections with slight variations or just repeated for demo */}
      <FeatureCard 
        icon={Search}
        tag="Find campaigns"
        title="Campaign drops you care about"
        description="Verified creators launching high-paying campaigns for top shippers. We review each listing to make sure they're legit."
        image={
             <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 max-w-md mx-auto">
             <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-3">
                     <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center overflow-hidden">
                         <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jimmy" alt="avatar" />
                     </div>
                     <div>
                         <div className="flex items-center gap-1">
                             <span className="font-bold text-slate-900">MrBeast</span>
                             <CheckCircle2 size={14} className="text-blue-500 fill-blue-500" />
                         </div>
                         <div className="text-xs text-slate-400">8d New • English</div>
                     </div>
                 </div>
             </div>
             <p className="text-sm text-slate-600 mb-6">Help us raise $40,000,000 by shipping #TeamMillion content!</p>
             <div className="flex items-center justify-between">
                 <div className="flex gap-2">
                     <Youtube size={18} className="text-slate-400" />
                     <Instagram size={18} className="text-slate-400" />
                     <Twitter size={18} className="text-slate-400" />
                 </div>
                 <div className="text-right">
                     <div className="text-2xl font-black text-slate-900">$2,000</div>
                     <div className="text-[10px] text-slate-400 font-bold">TOTAL REWARDS</div>
                 </div>
             </div>
           </div>
        }
      />
    </div>
  );
};

export default PlatformSections;
