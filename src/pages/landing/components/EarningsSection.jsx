import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, DollarSign } from 'lucide-react';
import { Link } from 'react-router';

const EarningsSection = () => {
  return (
    <>
    <section className="container mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-20">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="lg:w-1/2"
      >
        <div className="flex items-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100">
            <DollarSign size={24} />
          </div>
          <span className="text-sm  text-slate-400 uppercase tracking-widest font-inter">Cash-out</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-medium text-slate-900 mb-8 leading-[1.1] font-inter">
          Earn payouts
        </h2>
        <p className="text-lg text-slate-500 mb-8 max-w-2xl font-inter leading-relaxed">
Start earning as your content gains views. Track your earnings and manage withdrawals directly from your dashboard.        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="lg:w-1/2 w-full"
      >
          <div className="relative bg-slate-100/50 rounded-[2rem] p-3 py-2 overflow-hidden border border-slate-200 shadow-inner flex items-center justify-center group min-h-[300px] md:min-h-[450px]">
            <div className="relative w-full aspect-video rounded-[2rem] py-0  overflow-hidden shadow-2xl border border-white bg-white min-h-[300px] md:min-h-[450px]">
              <motion.img 
                src="https://images.unsplash.com/photo-1551288049-bbb6518149ad?auto=format&fit=crop&q=80&w=1200" 
                alt="Earnings Preview" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
      </motion.div>



     
    </section>


<div className='flex items-center justify-center p-5'>

  <Link to="/sign-in">
    <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-6 "
          >
            <button className="w-full cursor-pointer sm:w-auto px-10 py-5 bg-white text-black border  rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-white/10 uppercase tracking-widest text-sm font-inter">
             Explore Campaigns
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          </Link>

</div>

</>
  );
};

export default EarningsSection;
