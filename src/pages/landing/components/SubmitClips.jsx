import React from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import submissionImg from '../../../assets/submission.png';

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
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100">
            <Send size={24} />
          </div>
          <span className="text-sm  text-slate-400 uppercase tracking-widest font-inter">Post clips</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-medium text-slate-900 mb-8 leading-[1.1] font-inter">
        Create and post
        </h2>
        <p className="text-lg text-slate-500 mb-8 max-w-lg font-inter leading-relaxed">
Publish content on your social platforms following the campaign guidelines. Submit your post link through Qwick to track views and performance.        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="lg:w-1/2 w-full"
      >
        <div className="relative bg-slate-100/50 rounded-[2rem] p-3 py-2 overflow-hidden border border-slate-200 shadow-inner flex items-center justify-center group min-h-[300px] md:min-h-[450px]">
          <div className="relative w-full aspect-video rounded-[2rem] py-0 overflow-hidden shadow-2xl border border-white bg-white min-h-[300px] md:min-h-[450px]">
            <motion.img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
              alt="Submission Preview" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SubmitClips;
