import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  Youtube,
  Instagram,
  Twitter,
  CheckCircle2,
} from "lucide-react";
import campaignImg from "../../../assets/campaign-drop.png";

const CampaignDrops = () => {
  return (
    <section id="creators" className="container mx-auto px-6 py-24">
      {/* Section Header */}
      <div className="text-center mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl font-medium mb-8 font-inter tracking-tighter leading-none"
        >
          Qwick Creator
          <br className="hidden md:block" /> Rewards Program
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[#9B9B9B] max-w-2xl mx-auto text-xl font-inter"
        >
          Welcome to the easiest way to make money creating short-form content.
          Get paid to get views, it's that simple.
        </motion.p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2"
        >
          <div className="flex items-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#9B9B9B] flex items-center justify-center text-white border border-slate-100 ">
              <Search size={24} />
            </div>
            <span className="text-sm font-medium text-[#9B9B9B] uppercase tracking-widest font-inter">
              Find campaigns
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-normal text-slate-900 mb-8 leading-[1.1] font-inter">
            Explore campaigns on Qwick
          </h2>
          <p className="text-lg text-[#9B9B9B] mb-8 max-w-2xl font-inter leading-relaxed">
            Browse campaigns from your favourite brands or creators directly on
            Qwick’s Discover page. Check payout rates, campaign details, and
            supported platforms at a glance before you join.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 w-full"
        >
          <div className="relative bg-slate-100/50 rounded-[2rem] p-0 py-0 overflow-hidden  shadow-inner flex items-center justify-center group min-h-[300px] md:min-h-[450px]">
            <div className="relative w-full aspect-video rounded-[2rem] py-0 overflow-hidden shadow-2xl border border-white bg-white min-h-[300px] md:min-h-[450px]">
              <motion.img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
                alt="Campaign Preview"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CampaignDrops;
