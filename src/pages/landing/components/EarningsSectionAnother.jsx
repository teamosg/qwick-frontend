import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, DollarSign } from "lucide-react";
import { Link } from "react-router";

const EarningsSectionAnother = () => {
  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24 flex flex-col lg:flex-row items-center gap-10 sm:gap-14 md:gap-16 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 w-full text-center lg:text-left"
        >
          <div className="flex items-center gap-2 mb-5 sm:mb-6 lg:mb-8 justify-center lg:justify-start">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#9B9B9B] flex items-center justify-center text-white border border-slate-100">
              <DollarSign size={24} />
            </div>
            <span className="text-xs sm:text-sm text-[#9B9B9B] uppercase tracking-widest font-inter">
              Cash-out
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-normal text-slate-900 mb-4 sm:mb-6 lg:mb-8 leading-[1.1] font-inter">
            Stay in control of your budget{" "}
          </h2>
          <p className="text-base sm:text-lg text-[#9B9B9B] mb-4 sm:mb-6 lg:mb-8 max-w-2xl mx-auto lg:mx-0 font-inter leading-relaxed">
            Track posts and performance. Extend your campaign or refund unused
            funds directly from your dashboard.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 w-full"
        >
          <div className="relative bg-slate-100/50 rounded-xl sm:rounded-2xl lg:rounded-[2rem] p-0 py-0 overflow-hidden shadow-inner flex items-center justify-center group min-h-[220px] sm:min-h-[280px] md:min-h-[450px]">
            <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl lg:rounded-[2rem] py-0 overflow-hidden shadow-2xl border border-white bg-white min-h-[220px] sm:min-h-[280px] md:min-h-[450px]">
              <motion.img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200"
                alt="Budget Dashboard"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </motion.div>
      </section>

      <div className="flex items-center justify-center px-4 sm:px-6 py-4 sm:p-5">
        <Link to="/sign-in" className="w-full sm:w-auto max-w-sm sm:max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
          >
            <button className="w-full sm:w-auto cursor-pointer px-8 sm:px-10 py-4 sm:py-5 bg-white text-black border rounded-xl sm:rounded-2xl hover:bg-[#EF0C18] hover:text-white transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-white/10 uppercase tracking-widest text-xs sm:text-sm font-inter">
              Create Campaign
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </motion.div>
        </Link>
      </div>
    </>
  );
};

export default EarningsSectionAnother;
