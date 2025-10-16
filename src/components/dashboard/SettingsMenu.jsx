import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  HelpCircle,
  Menu,
  MessageSquare,
  Moon,
  Sun,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../shared/ThemeProvider";

const SettingsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [developerMode, setDeveloperMode] = useState(true);
  const { theme, setTheme } = useTheme();
  const dropdownRef = useRef(null);

  const toggleTheme = (selectedTheme) => {
    setTheme(selectedTheme);
  };

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      type: "button",
      icon: Users,
      label: "FAQ",
    },
    {
      type: "button",
      icon: HelpCircle,
      label: "Need help?",
    },
    {
      type: "button",
      icon: MessageSquare,
      label: "Submit feedback",
    },
  ];

  const ToggleSwitch = ({ checked, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#003933] focus:ring-offset-2 ${
        checked ? "bg-[#003933]" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Menu Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 cursor-pointer text-[#202224] font-semibold hover:text-[#003933] transition-colors duration-200 p-2 rounded-lg hover:bg-gray-50"
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
            className="absolute bottom-full left-0 mb-2 w-[100%] bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-[9999] h-auto overflow-y-auto"
          >
            {/* Theme Toggle Button */}
            {/* <>
            {" "}
            <button
              onClick={toggleTheme}
              className="hidden bg-[#0D99FF1A] sm:block p-2 rounded-full hover:bg-[#0d9aff54]"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"
                } mode`}
            >
              {theme === "dark" ? (
                <Sun className="h-7 w-7 text-foreground" /> // You'll need to import Sun icon from lucide-react
              ) : (
                <Moon className="h-7 w-7 text-foreground" /> // You'll need to import Moon icon from lucide-react
              )}
            </button>
            <Link
              to={`/addcommunity`}
              type="submit"
              className="bg-[#003933] dark:bg-[#003933] text-white px-4 py-2 sm:py-2.5 sm:px-10 rounded-3xl sm:rounded-full hover:bg-[#002822] dark:hover:bg-primary/90 transition font-medium cursor-pointer flex gap-2"
            >
              <Plus />
              Add Community
            </Link>
          </> */}

            {/* Theme Toggle Section */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleTheme("light")}
                    className={`p-1.5 rounded-md transition-colors ${
                      theme === "light"
                        ? "bg-[#0D99FF1A] text-[#0D99FF]"
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Sun size={16} />
                  </button>
                  <button
                    onClick={() => toggleTheme("dark")}
                    className={`p-1.5 rounded-md transition-colors ${
                      theme === "dark"
                        ? "bg-[#0D99FF1A] text-[#0D99FF]"
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Moon size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              {menuItems.map((item, index) => {
                if (item.type === "divider") {
                  return (
                    <div
                      key={index}
                      className="my-1 border-t border-gray-100"
                    />
                  );
                }

                if (item.type === "toggle") {
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={18} className="text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">
                          {item.label}
                        </span>
                      </div>
                      <ToggleSwitch
                        checked={item.value}
                        onChange={() => item.onChange(!item.value)}
                      />
                    </div>
                  );
                }

                if (item.type === "submenu") {
                  return (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={18} className="text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">
                          {item.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-[#003933] text-white rounded-full">
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                    </button>
                  );
                }

                if (item.type === "button") {
                  return (
                    <button
                      key={index}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                    >
                      <item.icon size={18} className="text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">
                        {item.label}
                      </span>
                    </button>
                  );
                }

                return null;
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsMenu;
