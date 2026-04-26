import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const SocialProof = () => {
  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Fashion Influencer',
      content: 'Qwick has completely transformed how I work with brands. The automated payouts and performance tracking give me peace of mind.',
      earnings: '$12,400',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    },
    {
      name: 'Mark Thompson',
      role: 'Marketing Director, TechStyle',
      content: 'The ability to set payout rules based on actual performance saved us 30% of our budget while increasing viral reach.',
      earnings: 'ROI: 4.5x',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    },
    {
      name: 'Leo Rodriguez',
      role: 'Gamer & Tech Reviewer',
      content: 'Simple, fast, and transparent. I love being able to see my earnings grow in real-time as my videos go viral.',
      earnings: '$8,900',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    },
  ];

  const stats = [
    { label: 'Active Creators', value: '50K+' },
    { label: 'Campaigns Launched', value: '1.2K' },
    { label: 'Creator Earnings', value: '$25M+' },
    { label: 'Media Reach', value: '500M+' },
  ];

  return (
    <section className="py-24 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary blur-[150px] rounded-full animate-pulse" />
        </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-4 gap-8 mb-24">
            {stats.map((stat, i) => (
                <div key={i} className="text-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-slate-400 font-medium">{stat.label}</div>
                </div>
            ))}
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Loved by Thousands of Creators</h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Leading brands and top-tier creators trust Qwick to power their collaboration and growth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-white flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex gap-1 mb-6 text-yellow-400">
                    {[...Array(5)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
                </div>
                <Quote className="text-primary/20 mb-4" size={48} />
                <p className="text-slate-600 italic leading-relaxed mb-8">"{t.content}"</p>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-primary/20" />
                  <div>
                    <div className="font-bold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
                <div className="bg-primary/10 px-3 py-1 rounded-full text-xs font-bold text-primary">
                    {t.earnings}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
