import { LogOut, Menu, Moon, Plus, Settings, Sun, User } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router";
import { useTheme } from "../shared/ThemeProvider";

const NotificationItem = ({ title, time, isRead }) => (
  <div
    className={`p-4 ${
      !isRead ? "bg-primary/10" : ""
    } hover:bg-accent cursor-pointer`}
  >
    <p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
    <p className="text-xs text-gray-600 dark:text-zinc-400 mt-1">{time}</p>
  </div>
);

NotificationItem.propTypes = {
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  isRead: PropTypes.bool,
};

const Header = ({ userName, userImage, userRole, onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const { theme, setTheme } = useTheme();

  // const notifications = [
  //   {
  //     id: 1,
  //     title: "New alumni request",
  //     time: "5 minutes ago",
  //     isRead: false,
  //   },
  //   {
  //     id: 2,
  //     title: "Career readiness update",
  //     time: "1 hour ago",
  //     isRead: false,
  //   },
  //   {
  //     id: 3,
  //     title: "Monthly report available",
  //     time: "2 hours ago",
  //     isRead: true,
  //   },
  // ];

  const handleClickOutside = (setter) => {
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setter(false);
      }
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <header className="bg-card py-4 px-6 flex items-center justify-between border-b border-border">
        <div className="flex items-center space-x-2 md:space-x-4">
          <button
            className="lg:hidden p-1 md:p-2 rounded-md hover:bg-accent"
            onClick={onMenuClick}
          >
            <Menu size={22} className="text-foreground" />
          </button>
        </div>

        <div className="flex items-center justify-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="hidden bg-[#0D99FF1A] sm:block p-2 rounded-full hover:bg-[#0d9aff54]"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-foreground" /> // You'll need to import Sun icon from lucide-react
            ) : (
              <Moon className="h-5 w-5 text-foreground" /> // You'll need to import Moon icon from lucide-react
            )}
          </button>

          <Link
            to={`/addcommunity`}
            type="submit"
            className="bg-[#003933] dark:bg-[#003933] text-white px-4 py-2 sm:py-4 sm:px-10 rounded-3xl sm:rounded-full hover:bg-[#002822] dark:hover:bg-primary/90 transition font-medium cursor-pointer flex gap-2"
          >
            <Plus />
            Add Community
          </Link>

          {/* <div className="relative hidden sm:block">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-primary" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="pr-10 pl-4 py-2 text-primary font-[poppins] text-[14px] font-medium border border-border bg-popover rounded-full focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="sm:hidden">
            <button
              onClick={() => setShowMobileSearch((prev) => !prev)}
              className="p-2 rounded-full hover:bg-accent"
            >
              <Search className="h-5 w-5 text-muted-foreground" />
            </button>
          </div> */}

          {/* <div className="relative dropdown-container">
            <button
              className="p-2 rounded-full hover:bg-accent relative"
              onClick={(e) => {
                e.stopPropagation();
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
                handleClickOutside(setShowNotifications);
              }}
            >
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-destructive rounded-full" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-popover rounded-lg shadow-lg border border-border z-50">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      title={notification.title}
                      time={notification.time}
                      isRead={notification.isRead}
                    />
                  ))}
                </div>
                <div className="p-4 border-t border-border">
                  <Link
                    to="http://localhost:5173/notifications"
                    className="text-sm text-primary hover:text-primary/80"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div> */}

          <div className="relative dropdown-container">
            <button
              className="flex items-center space-x-3 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
                handleClickOutside(setShowProfileMenu);
              }}
            >
              <img
                src={userImage}
                alt={userName}
                className="h-8 w-8 rounded-full object-cover border border-border"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {userName}
                </p>
                {userRole && (
                  <p className="text-xs text-gray-600 dark:text-zinc-400">
                    {userRole}
                  </p>
                )}
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-popover rounded-lg shadow-lg border border-border z-50">
                <div className="py-1">
                  <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-accent flex items-center">
                    <User size={16} className="mr-2" />
                    Edit Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-accent flex items-center">
                    <Settings size={16} className="mr-2" />
                    Settings
                  </button>
                  <hr className="my-1 border-border" />
                  <button className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-accent flex items-center">
                    <LogOut size={16} className="mr-2" />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {showMobileSearch && (
        <div className="sm:hidden px-4 pb-2 mt-[-10px]">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 text-primary font-[poppins] text-[14px] border border-border bg-popover rounded-full focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      )}
    </>
  );
};

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
  userRole: PropTypes.string,
  onMenuClick: PropTypes.func.isRequired,
};

export default Header;
