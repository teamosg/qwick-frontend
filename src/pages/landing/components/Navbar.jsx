import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Zap } from "lucide-react";
import logo from "../../../assets/qwick_logo.webp";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300   ${
        isScrolled
          ? "bg-transparent  border-slate-200/60 py-3  "
          : "bg-transparent  border-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo section */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="Logo"
              className="w-36 h-8 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-1 bg-[#9B9B9B] backdrop-blur-lg px-1.5 py-1.5 rounded-full border border-slate-200/60 shadow-sm">
          <Link
            to="/#creators"
            className="text-[14px] font-medium text-slate-600 px-7 py-2.5 rounded-full hover:bg-white hover:text-black hover:shadow-sm transition-all duration-300 font-inter"
          >
            Creators
          </Link>
          <Link
            to="/#brand"
            className="text-[14px] font-medium text-slate-600 px-7 py-2.5 rounded-full hover:bg-white hover:text-black hover:shadow-sm transition-all duration-300 font-inter"
          >
            Brands
          </Link>
          <Link
            to="/#video-guides"
            className="text-[14px] font-medium text-slate-600 px-7 py-2.5 rounded-full hover:bg-white hover:text-black hover:shadow-sm transition-all duration-300 font-inter"
          >
            Guides
          </Link>
          <Link
            to="/home"
            className="text-[14px] font-medium text-slate-600 px-7 py-2.5 rounded-full bg-gray-200 hover:bg-white hover:text-black hover:shadow-sm transition-all duration-300 font-inter"
          >
            Get Started
          </Link>
        </div>

        {/* Right Section (Balancing) */}
        <div className="flex-1 flex justify-end">
          {/* Balanced layout container */}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
