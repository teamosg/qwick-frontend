import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  Youtube,
  Instagram,
  Twitter,
  CheckCircle2,
} from "lucide-react";
import collabImg from "../../../assets/collaboration.png";

const CampaignDropsAnother = () => {
  return (
    <section id="brand" className="container mx-auto px-6 py-24">
      <div className="flex flex-col lg:flex-row items-center gap-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2"
        >
          <div className="flex items-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#9B9B9B] flex items-center justify-center text-white border border-slate-100 ">
              <Search size={24} />
            </div>
            <span className="text-sm text-[#9B9B9B] uppercase tracking-widest font-inter">
              Find campaigns
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-normal text-slate-900 mb-8 leading-[1.1] font-inter">
            Create your community
          </h2>
          <p className="text-lg text-[#9B9B9B] mb-8 max-w-2xl font-inter leading-relaxed">
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
          <div className="relative bg-slate-100/50 rounded-[2rem] p-0 py-0 overflow-hidden  shadow-inner flex items-center justify-center group min-h-[300px] md:min-h-[450px]">
            <div className="relative w-full aspect-video rounded-[2rem] py-0 overflow-hidden shadow-2xl border border-white bg-white min-h-[300px] md:min-h-[450px]">
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
