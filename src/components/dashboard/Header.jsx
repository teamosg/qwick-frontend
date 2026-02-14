import { Menu, Plus } from "lucide-react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router";



const NotificationItem = ({ title, time, isRead }) => (
  <div
    className={`p-4 ${!isRead ? "bg-primary/10" : ""
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


const menuItems = [
  {
    path: "/",
    text: "Home",
  },
  {
    path: "/discover",
    text: "Discover",
  },
  {
    path: "/discover",
    text: "Discover",
  },
  {
    path: "/messages",
    text: "Messages",
  },
  {
    path: "/notifications",
    text: "Notifications",
  },
  {
    path: "/dashboard",
    text: "Dashboard",
  },
  {
    path: "/profile",
    text: "Profile",
  },
  {
    path: "/profile",
    text: "Profile",
  },
  {
    path: "/profile",
    text: "Profile",
  },
  {
    path: "/profile",
    text: "Profile",
  },
  {
    path: "/dashboard/content-payout",
    text: "Content Payout",
  },
  {
    path: "/dashboard/users",
    text: "Users",
  },
  {
    path: "/dashboard/wait-list",
    text: "Wait List",
  },
  {
    path: "/dashboard/payments",
    text: "Payments",
  },
  {
    path: "/dashboard/payout",
    text: "Payout",
  },
  {
    path: "/dashboard/automated-message",
    text: "Automated Message",
  },
  {
    path: "/dashboard/dashboard-settings",
    text: "Dashboard Settings",
  },
];

const Header = ({ onMenuClick }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";


  return (
    <>
      <header
        className={`${isHome && "block lg:hidden"
          } bg-card py-4 px-6 flex items-center justify-between border-b border-border`}
      >
        <div className="flex items-center justify-center space-x-2 md:space-x-4">
          {/* Show menu text name based on the router. map will not work here because it needs to show only one name based on the path */}
          <button
            className="lg:hidden p-1 md:p-2 rounded-md hover:bg-accent"
            onClick={onMenuClick}
          >
            <Menu size={22} className="text-foreground" />
          </button>
          <h2 className="text-xl md:text-2xl text-gray-900 dark:text-white font-semibold">
            {menuItems.find((item) => item.path === location.pathname)?.text}
          </h2>

        </div>
        <div className="flex items-center justify-between space-x-0 gap-4 sm:gap-10 sm:space-x-4">

          <Link
            to={`/addcommunity`}
            className="bg-[#003933] dark:bg-[#003933] text-white px-3 py-2 sm:py-2.5 sm:px-6 rounded-full hover:bg-[#002822] dark:hover:bg-primary/90 transition font-medium cursor-pointer flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Add Community</span>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
