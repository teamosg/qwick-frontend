import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-8 left-0 right-0 z-50 flex justify-center px-6">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`flex items-center gap-8 px-8 py-3 rounded-full border border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-300 ${
          isScrolled ? 'py-2 px-6 bg-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.08)]' : ''
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group mr-4">
          <span className="text-2xl font-black tracking-tighter font-outfit text-black">QWICK</span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] font-bold text-slate-500 hover:text-black transition-colors font-outfit"
          >
            Discord
          </a>
          <Link
            to="/sign-in"
            className="text-[15px] font-bold text-slate-500 hover:text-black transition-colors font-outfit"
          >
            Log in
          </Link>
        </div>

        {/* Action Button */}
        <Link
          to="/sign-up"
          className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-100 rounded-full text-[15px] font-bold text-black hover:bg-slate-50 transition-all shadow-sm group font-outfit"
        >
            <div className="flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
                    <rect x="7" y="5" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M4 8V16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
            </div>
          Sign up
        </Link>

      </motion.nav>
    </div>
  );
};

export default Navbar;
