import {
  BellDot,
  Compass,
  Home,
  LayoutDashboard,
  Menu,
  MessageSquareMore,
  Plus,
  UserCircle,
  X,
} from "lucide-react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { SidebarCommunity } from "./Sidebar/SidebarCommunity";
import { SidebarSearchCommunity } from "./Sidebar/SidebarSearchCommunity";

const NavItem = ({ icon, text, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive, isPending }) =>
        `flex items-center space-x-3 p-3 rounded-full text-muted-foreground border transition duration-600 ease-out ${
          isActive || isPending
            ? "bg-sidebar-link-active !text-[#003933] dark:!text-[#FFF] border-[#e4e4e7] dark:border-[#fff] bg-[#fafafa] dark:bg-[#6a6a75]"
            : "hover:bg-accent border-transparent"
        }`
      }
    >
      {({ isActive, isPending }) => (
        <>
          <div
            className={
              isActive || isPending
                ? "text-[#003933] dark:text-[#fff]"
                : "text-sidebar-foreground"
            }
          >
            {icon}
          </div>
          <span className="font-medium">{text}</span>
        </>
      )}
    </NavLink>
  );
};

const Sidebar = ({ onClose }) => {
  return (
    <div className="h-full flex flex-col border-r border-sidebar-border bg-white dark:bg-[#171717] overflow-y-auto  ">
      <div className="flex justify-between flex-col h-full">
        <div>
          <div className="p-6 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 md:gap-2.5">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="49"
                  viewBox="0 0 50 49"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M49.0833 34.0223C49.0845 34.6257 49.0845 35.3618 49.0845 35.9639C49.0845 36.566 48.6128 37.1121 47.9924 37.1779C46.8272 37.2961 45.7193 37.6045 44.6979 38.0701C42.2883 39.167 40.3638 41.1415 39.34 43.5816C38.9524 44.5055 38.694 45.4951 38.5855 46.5299C38.5197 47.1503 37.998 47.6196 37.3752 47.6196C36.8024 47.622 36.1125 47.622 35.5396 47.622C34.9156 47.622 34.3915 47.1515 34.3257 46.5311C34.3233 46.5092 34.3208 46.486 34.3184 46.4641C34.1685 45.0954 33.7541 43.8059 33.1252 42.648C32.6925 41.8509 32.1562 41.1305 31.5382 40.5016C29.7648 38.6941 27.3138 37.6349 24.7079 37.6349H9.64446C6.27684 37.6349 3.27121 35.5215 2.13161 32.3513C1.87444 31.6346 1.65017 30.9034 1.46004 30.1574C0.973723 28.2475 0.715332 26.2462 0.715332 24.1852C0.715332 10.8366 11.5519 0 24.9005 0C38.2491 0 49.0845 10.8366 49.0845 24.1852C49.0845 26.4168 48.781 28.5778 48.2142 30.6291C45.7595 30.3756 43.6168 29.0666 42.2603 27.1652C42.426 26.1962 42.5126 25.2005 42.5126 24.1852C42.5126 14.4638 34.6207 6.57191 24.9005 6.57191C15.1804 6.57191 7.28725 14.4638 7.28725 24.1852C7.28725 26.2816 7.65411 28.2926 8.32812 30.1574C8.80347 31.4738 10.0528 32.3513 11.452 32.3513H24.7104C28.2218 32.3513 31.4529 30.428 33.1264 27.3395C33.765 26.1621 34.1831 24.8507 34.3281 23.4575C34.394 22.8384 34.9168 22.3679 35.5396 22.3679C36.1125 22.3679 36.8024 22.3679 37.3752 22.3679C37.9992 22.3679 38.5221 22.8384 38.5879 23.4588C38.8414 25.9135 39.9481 28.1183 41.6057 29.7747C43.1695 31.3385 45.2244 32.4147 47.5195 32.7547C47.6755 32.7767 47.8327 32.7974 47.9912 32.8133C48.6116 32.8778 49.0833 33.4007 49.0833 34.0235V34.0223ZM32.2293 47.2356C29.9172 47.9718 27.4552 48.3691 24.9005 48.3691C20.9271 48.3691 17.1756 47.4087 13.8665 45.7072C13.8579 45.7036 13.8482 45.6987 13.8397 45.6938C11.0217 44.241 8.52557 42.2506 6.4877 39.8581L6.48404 39.8544C6.47551 39.8459 6.46819 39.8374 6.4621 39.8288C6.22443 39.5485 5.99163 39.2633 5.76737 38.972C6.417 39.2974 7.13245 39.4961 7.89666 39.4961H16.1957C16.3968 39.6119 16.6015 39.7228 16.8075 39.8288C17.4254 40.1506 18.0641 40.4358 18.7235 40.6832H18.7259C20.648 41.4035 22.7273 41.7972 24.9005 41.7972C26.3521 41.7972 27.7623 41.6217 29.1128 41.289C29.9599 41.9179 30.6765 42.7321 31.197 43.6925C31.7003 44.6225 32.0306 45.6572 32.144 46.7566V46.7591C32.1611 46.9224 32.1903 47.0808 32.2293 47.2356Z"
                    fill="currentColor"
                    className="text-[#003933] dark:text-white"
                  />
                </svg>
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="110"
                  height="30"
                  viewBox="0 0 110 30"
                  fill="none"
                >
                  <path
                    d="M89.4023 27.5229V1.13623H94.977V15.779L102.373 7.60283H109.062L101.332 15.8162L109.285 27.5229H103.19L97.7272 18.9751L94.977 21.9111V27.5229H89.4023Z"
                    fill="currentColor"
                    className="text-[#003933] dark:text-white"
                  />
                  <path
                    d="M77.3275 27.969C71.1953 27.969 67.2188 23.8438 67.2188 17.563C67.2188 11.2822 71.1953 7.15698 77.3275 7.15698C82.642 7.15698 86.4699 10.0558 87.0645 14.9615L81.304 15.2216C80.9696 12.7688 79.4458 11.4681 77.3275 11.4681C74.5401 11.4681 72.9421 13.6979 72.9421 17.563C72.9421 21.4281 74.5401 23.6951 77.3275 23.6951C79.483 23.6951 81.0067 22.4315 81.304 19.7185L87.0645 19.9415C86.5071 24.8472 82.7535 27.969 77.3275 27.969Z"
                    fill="currentColor"
                    className="text-[#003933] dark:text-white"
                  />
                  <path
                    d="M58.8389 5.14991V0.690186H64.5993V5.14991H58.8389ZM58.9504 27.5229V7.60276H64.525V27.5229H58.9504Z"
                    fill="currentColor"
                    className="text-[#003933] dark:text-white"
                  />
                  <path
                    d="M32.7548 27.5231L26.8457 7.60303H32.4575L35.8766 21.0937L39.5559 7.60303H44.09L47.7692 21.0937L51.2255 7.60303H56.8373L50.9282 27.5231H45.5022L41.8229 15.0731L38.1437 27.5231H32.7548Z"
                    fill="currentColor"
                    className="text-[#003933] dark:text-white"
                  />
                  <path
                    d="M20.0435 29.8273L17.9995 27.2629C16.8474 27.8204 15.2121 28.1177 13.2796 28.1177C5.47509 28.1177 0.532227 22.3944 0.532227 14.3669C0.532227 6.52521 5.02911 0.541748 13.2796 0.541748C21.5301 0.541748 25.9898 6.52521 25.9898 14.3669C25.9898 19.2726 24.2431 23.0262 21.1956 25.479L24.6891 29.8273H20.0435ZM13.2796 23.3607C13.9114 23.3607 14.4689 23.2863 14.952 23.1005L11.2727 18.6036H15.9554L17.888 21.168C19.3374 19.7557 20.155 17.6374 20.155 14.3669C20.155 9.53552 18.0738 5.29878 13.2796 5.29878C8.44824 5.29878 6.36703 9.53552 6.36703 14.3669C6.36703 19.1611 8.4854 23.3607 13.2796 23.3607Z"
                    fill="currentColor"
                    className="text-[#003933] dark:text-white"
                  />
                </svg>
              </span>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-md hover:bg-accent"
            >
              <X size={20} className="text-sidebar-foreground" />
            </button>
          </div>

          <div className="flex-1 px-3 py-2 space-y-1">
            <NavItem icon={<Home size={20} />} text="Home" to="/" />
            <NavItem
              icon={<Compass size={20} />}
              text="Discover"
              to="/discover"
            />
            <NavItem
              icon={<MessageSquareMore size={20} />}
              text="Message"
              to="/message"
            />
            <NavItem
              icon={<BellDot size={20} />}
              text="Notifications"
              to="/notifications"
            />
            <NavItem
              icon={<LayoutDashboard size={20} />}
              text="Dashboard"
              to="/dashboard"
            />
            {/* <NavItem icon={<Wallet size={20} />} text="Payout" to="/payout" /> */}
            <NavItem
              icon={<UserCircle size={20} />}
              text="Profile"
              to="/profile"
            />
          </div>
        </div>
        {/* Search Community */}
        <div className="p-4 border-t border-sidebar-border">
          <SidebarSearchCommunity />
          <SidebarCommunity />
        </div>

        {/* Add Community */}
        <div className="p-4 border-t border-sidebar-border flex gap-3  items-center">
          <Plus />
          <Button
            variant="ghost"
            className="hover:bg-transparent text-[16px] font-semibold px-0 py-0 cursor-pointer"
          >
            Add Community
          </Button>
        </div>

        {/* Menu */}
        <div className="p-4 border-t border-sidebar-border flex gap-3  items-center">
          <Menu />
          <span className="text-[16px] font-semibold">Menu</span>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
