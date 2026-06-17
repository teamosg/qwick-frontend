import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../../assets/qwick_logo.webp";

const navLinks = [
  { to: "/#creators", label: "Creators" },
  { to: "/#brand", label: "Brands" },
  { to: "/#video-guides", label: "Guides" },
  { to: "/home", label: "Get Started", highlight: true },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? "bg-transparent border-slate-200/60 py-2 md:py-3"
            : "bg-transparent border-transparent py-3 md:py-5"
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={logo}
                alt="Logo"
                className="w-24 sm:w-28 md:w-36 h-8 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Center nav pill */}
          <div className="hidden md:flex items-center gap-1 bg-[#9B9B9B] backdrop-blur-lg px-1.5 py-1.5 rounded-full border border-slate-200/60 shadow-sm shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-[14px] font-medium text-slate-600 px-7 py-2.5 rounded-full hover:bg-white hover:text-black hover:shadow-sm transition-all duration-300 font-inter ${
                  link.highlight ? "bg-gray-200" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right balance + mobile menu */}
          <div className="flex-1 flex justify-end">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-xl bg-[#9B9B9B]/90 backdrop-blur-lg border border-slate-200/60 text-slate-700 hover:bg-white transition-colors md:hidden"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={closeMobileMenu}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="fixed top-[60px] left-4 right-4 z-50 md:hidden bg-white rounded-2xl border border-slate-200 shadow-2xl p-4"
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={closeMobileMenu}
                    className={`text-sm font-medium text-slate-700 px-4 py-3.5 rounded-xl hover:bg-slate-50 transition-colors font-inter ${link.highlight ? "bg-slate-100 font-semibold" : ""
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
