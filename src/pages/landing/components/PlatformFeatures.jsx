import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layout, 
  Users, 
  Activity, 
  BarChart, 
  Smartphone, 
  Globe, 
  Zap, 
  ShieldCheck, 
  MousePointer2 
} from 'lucide-react';

const PlatformFeatures = () => {
  const features = [
    {
      icon: <Layout className="w-6 h-6" />,
      title: 'Campaign Builder',
      description: 'Create multi-platform campaigns with powerful yet simple-to-use tools.',
      tag: 'New',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Creator Marketplace',
      description: 'Access a vetted pool of talented creators across various niches.',
      tag: 'Vetted',
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Performance Tracking',
      description: 'Monitor engagement, views, and conversions in real-time.',
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: 'Real-time Analytics',
      description: 'Deep dive into data with our comprehensive analytics dashboard.',
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Multi-platform',
      description: 'Support for TikTok, Instagram, YouTube, and Facebook.',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global Payments',
      description: 'Automated payouts to creators anywhere in the world.',
    },
  ];

  return (
    <section className="relative py-32 bg-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6"
            >
              <Zap size={14} fill="currentColor" />
              Next-Gen Infrastructure
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-slate-900 leading-tight"
            >
              Built for the Modern <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Creator Economy</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 max-w-sm leading-relaxed"
          >
            A powerful suite of tools designed to remove friction from influencer marketing and content monetization.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100/50 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-primary/10 transition-all duration-500 relative overflow-hidden"
            >
              {/* Card Decoration */}
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-600 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-500">
                    {feature.icon}
                  </div>
                  {feature.tag && (
                    <span className="px-3 py-1 rounded-full bg-white border border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {feature.tag}
                    </span>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-lg">
                  {feature.description}
                </p>
                
                <div className="mt-8 flex items-center gap-2 text-primary font-bold text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  Explore Feature <MousePointer2 size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Bottom Bar */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 flex flex-wrap items-center justify-center gap-12 py-8 border-y border-slate-100"
        >
            <div className="flex items-center gap-3 text-slate-400 grayscale hover:grayscale-0 transition-all cursor-default">
                <ShieldCheck size={20} className="text-emerald-500" />
                <span className="text-sm font-semibold tracking-wide">Enterprise Grade Security</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400 grayscale hover:grayscale-0 transition-all cursor-default">
                <Globe size={20} className="text-blue-500" />
                <span className="text-sm font-semibold tracking-wide">GDPR & CCPA Compliant</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400 grayscale hover:grayscale-0 transition-all cursor-default">
                <Zap size={20} className="text-yellow-500" />
                <span className="text-sm font-semibold tracking-wide">99.9% Uptime SLA</span>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformFeatures;
