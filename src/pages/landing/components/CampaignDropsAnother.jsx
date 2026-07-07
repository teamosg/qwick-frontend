import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const CampaignDropsAnother = () => {
  return (
    <section id="brand" className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-14 md:gap-16 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 w-full text-center lg:text-left"
        >
          <div className="flex items-center gap-2 mb-5 sm:mb-6 lg:mb-8 justify-center lg:justify-start">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#9B9B9B] flex items-center justify-center text-white border border-slate-100">
              <Search size={24} />
            </div>
            <span className="text-xs sm:text-sm text-[#9B9B9B] uppercase tracking-widest font-inter">
              Find campaigns
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-normal text-slate-900 mb-4 sm:mb-6 lg:mb-8 leading-[1.1] font-inter">
            Create your community
          </h2>
          <p className="text-base sm:text-lg text-[#9B9B9B] mb-4 sm:mb-6 lg:mb-8 max-w-2xl mx-auto lg:mx-0 font-inter leading-relaxed">
            Set up your brand community on Qwick to manage campaigns and
            collaborate with creators.{" "}
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
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=1200"
                alt="Collaboration Preview"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CampaignDropsAnother;
