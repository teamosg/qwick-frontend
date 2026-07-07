"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  FileText,
  HelpCircle,
  Menu,
  MessageSquare,
  Moon,
  Shield,
  Sun,
  Users,
  LogOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../shared/ThemeProvider";
import { Link } from "react-router";
import { useLogout } from "../../hooks/auth.hook";

const SettingsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { theme, setTheme } = useTheme();
  const { mutate: logOut, isPending } = useLogout();

  const toggleTheme = (selectedTheme) => setTheme(selectedTheme);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    // { type: "button", icon: Users, label: "FAQ", link: '/feedback' },
    {
      type: "button",
      icon: HelpCircle,
      label: "Need help?",
      link: "/need-help",
    },
    {
      type: "button",
      icon: MessageSquare,
      label: "Submit feedback",
      link: "/feedback",
    },
    // { type: "button", icon: Shield, label: "Privacy Policy", link: '/privacy-policy' },
    // { type: "button", icon: FileText, label: "Terms and Conditions", link: '/terms-conditions' },
  ];

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 cursor-pointer text-foreground dark:text-foreground font-semibold transition-colors duration-200 p-2 rounded-lg hover:bg-accent dark:hover:bg-accent"
      >
        <Menu size={20} />
        <span>Menu</span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full left-0 mb-2 w-[100%] bg-card dark:bg-card rounded-xl shadow-xl border border-border dark:border-border py-2 z-[9999]"
          >
            {/* Theme Toggle Section */}
            <div className="px-4 py-3 border-b border-border dark:border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground dark:text-foreground">
                  {theme === "dark" ? "Dark Mode" : "Light Mode"}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleTheme("light")}
                    className={`p-1.5 rounded-md transition-colors ${
                      theme === "light"
                        ? "bg-blue-100 text-blue-600"
                        : "hover:bg-accent dark:hover:bg-accent text-muted-foreground dark:text-foreground"
                    }`}
                    aria-label="Switch to light mode"
                  >
                    <Sun size={16} />
                  </button>
                  <button
                    onClick={() => toggleTheme("dark")}
                    className={`p-1.5 rounded-md transition-colors ${
                      theme === "dark"
                        ? "bg-blue-100 text-blue-600"
                        : "hover:bg-accent dark:hover:bg-accent text-muted-foreground dark:text-foreground"
                    }`}
                    aria-label="Switch to dark mode"
                  >
                    <Moon size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              {menuItems.map((item, index) => (
                <Link to={item?.link} key={index}>
                  <button className="cursor-pointer w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-accent dark:hover:bg-accent transition-colors">
                    <item.icon
                      size={18}
                      className="text-muted-foreground dark:text-foreground"
                    />
                    <span className="text-sm font-medium text-foreground dark:text-foreground">
                      {item.label}
                    </span>
                  </button>
                </Link>
              ))}
              <button
                onClick={() => logOut()}
                disabled={isPending}
                className="cursor-pointer w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-accent dark:hover:bg-accent transition-colors border-t border-border dark:border-border mt-1"
              >
                <LogOut size={18} className="text-red-500" />
                <span className="text-sm font-medium text-red-500">
                  {isPending ? "Logging out..." : "Logout"}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsMenu;
