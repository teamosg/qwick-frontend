import logo from "@/assets/logo.png";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import SettingsMenu from "./SettingsMenu";
import { SidebarJoinedCommunity } from "./Sidebar/SidebarJoinedCommunity";
import { SidebarMyCommunity } from "./Sidebar/SidebarMyCommunity";

import DashboardSVG from "@/assets/svg/DashboardSVG";
import DiscoverySVG from "@/assets/svg/DiscoverySVG";
import Home from "@/assets/svg/Home";
import MessageSVG from "@/assets/svg/MessageSVG";
import NotificationSVG from "@/assets/svg/NotificationSVG";
import ProfileSVG from "@/assets/svg/ProfileSVG";
import { useTheme } from "../shared/ThemeProvider";
import { Megaphone } from "lucide-react";
import { useGetMyCommunityList } from "@/hooks/community.hook";
import { useCommunityStore } from "@/store/communityStore";

const NavItem = ({ icon, text, to, onClose }) => {
  const { theme } = useTheme();
  return (
    <NavLink
      to={to}
      onClick={onClose}
      className={({ isActive, isPending }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out relative navmenu" ${isActive || isPending
          ? "bg-[#003933] text-white shadow-sm before:absolute before:-left-3 before:top-0 before:w-1 before:h-full before:bg-[#003933] before:rounded-tr-2xl before:rounded-br-2xl "
          : "text-[#202224] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
        }`
      }
    >
      {({ isActive, isPending }) => (
        <div className="flex items-center justify-center gap-1.5">
          <div
            className={`flex-shrink-0 ${isActive || isPending
              ? "text-white"
              : "text-gray-500 dark:text-gray-400"
              }`}
          >
            {React.cloneElement(icon, {
              color: isActive || isPending ? "white" : theme === 'light' ? "#202224" : "white",
            })}
          </div>
          <span className="truncate text-[16px]">{text}</span>
        </div>
      )}
    </NavLink>
  );
};

const Sidebar = ({ onClose }) => {
  const {
    data: communityList,
    isLoading: isLoadingCommunityList,
    isError: isErrorCommunityList,
  } = useGetMyCommunityList();

  const createdCommunityList = communityList?.created_communities || []
  const joinedCommunityList = communityList?.joined_communities || []


  return (
    <div className="h-full flex flex-col bg-[#f9f9f9] dark:bg-[#171717] overflow-y-auto  ">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div>
            <div className="p-6 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 md:gap-2.5">
                <img src={logo} alt="logo" className="w-[100px]" />
              </Link>
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-md hover:bg-accent"
              >
                <X size={20} className="text-sidebar-foreground" />
              </button>
            </div>

            <div className="flex-1 px-3 py-2 space-y-1">
              {[
                { icon: <Home />, text: "Home", to: "/" },
                { icon: <DiscoverySVG />, text: "Discover", to: "/discover" },
                { icon: <Megaphone />, text: "Announcement", to: "/announcement" },
                { icon: <MessageSVG />, text: "Messages", to: "/messages" },
                {
                  icon: <NotificationSVG />,
                  text: "Notifications",
                  to: "/notifications",
                },
                { icon: <DashboardSVG />, text: "Dashboard", to: "/dashboard" },
                { icon: <ProfileSVG />, text: "Profile", to: "/profile" },
              ].map((item, idx) => (
                <NavItem
                  key={idx}
                  icon={item.icon}
                  text={item.text}
                  to={item.to}
                  onClose={onClose}
                />
              ))}
            </div>
          </div>

          {/* Search Community */}
          <div className="px-4 border-t border-sidebar-border">
            {/* <SidebarSearchCommunity /> */}
            <SidebarMyCommunity
              onClose={onClose}
              createdCommunityList={createdCommunityList}
              isLoadingCommunityList={isLoadingCommunityList}
              isErrorCommunityList={isErrorCommunityList}
            />
          </div>

          <div className="px-4 border-t border-sidebar-border">
            {/* <SidebarSearchCommunity /> */}
            <SidebarJoinedCommunity
              onClose={onClose}
              joinedCommunityList={joinedCommunityList}
              isLoadingCommunityList={isLoadingCommunityList}
              isErrorCommunityList={isErrorCommunityList}

            />
          </div>
        </div>

        <div className="p-4">
          <SettingsMenu />
        </div>

        {/* 
        {/* Add Community
        <div className="p-4 border-t border-sidebar-border flex gap-3  items-center">
          <Link
            to={`/addcommunity`}
            onClick={onClose}
            className="hover:bg-transparent text-[16px] font-semibold px-0 py-0 cursor-pointer flex gap-3 items-center"
          >
            <Plus />
            <span>Add Community</span>
          </Link>
        </div> */}

        {/* Menu */}
        {/* <div className="p-4 border-t border-sidebar-border flex gap-3  items-center">
          <Link
            to=""
            onClick={onClose}
            className="hover:bg-transparent text-[16px] font-semibold px-0 py-0 cursor-pointer flex gap-3 items-center"
          >
            <Menu />
            Menu
          </Link>
        </div> */}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func.isRequired,
};

NavItem.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
