import React from "react";
import { motion } from "framer-motion";

const ImpactDivider = () => {
  return (
    <section className="bg-white border-y border-slate-100 py-16 sm:py-24 md:py-28 lg:py-32 text-center px-4 sm:px-6 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-3xl sm:text-4xl md:text-7xl font-medium mb-4 sm:mb-6 lg:mb-8 font-inter tracking-tighter leading-tight px-2 sm:px-0"
      >
        High-impact Campaigns. <br className="md:hidden" /> Lower Risk.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-slate-500 max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-inter leading-relaxed px-2 sm:px-0"
      >
        Welcome to the easiest way to make money creating short-form content.
        Get paid to get views, it's that simple.
      </motion.p>
    </section>
  );
};

export default ImpactDivider;
