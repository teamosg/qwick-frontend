import React, { useState } from 'react';
import { Bell, Search, LogOut, User, Settings, Menu } from 'lucide-react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import ModeToggle from './../ui/mode-toggle';

const NotificationItem = ({ title, time, isRead }) => (
  <div
    className={`p-4 ${
      !isRead ? 'bg-blue-50' : ''
    } hover:bg-gray-50 cursor-pointer`}
  >
    <p className="text-sm font-medium text-gray-800">{title}</p>
    <p className="text-xs text-muted-foreground mt-1">{time}</p>
  </div>
);

NotificationItem.propTypes = {
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  isRead: PropTypes.bool,
};

const Header = ({ userName, userImage, userRole, onMenuClick }) => {
  const location = useLocation();
  const getSubtitle = (pathname) => {
    const base = (
      <Link
        to="/"
        className="text-muted-foreground text-[14px] md:text-[16px] not-italic font-normal leading-[160%] hover:underline"
      >
        Home
      </Link>
    );

    const map = {
      '/': "Here's your dashboard overview.",
      '/students': <>{base} / Students</>,
      '/alumni': <>{base} / Alumni</>,
      '/impression': <>{base} / Impression</>,
      '/career-checklist': <>{base} / Career Checklist</>,
      '/risk-alerts': <>{base} / Risk Alerts</>,
      '/ai-nudges': <>{base} / AI Nudges</>,
      '/scheduled': <>{base} / Scheduled</>,
    };

    return map[pathname] || 'Dashboard';
  };

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'New alumni request',
      time: '5 minutes ago',
      isRead: false,
    },
    {
      id: 2,
      title: 'Career readiness update',
      time: '1 hour ago',
      isRead: false,
    },
    {
      id: 3,
      title: 'Monthly report available',
      time: '2 hours ago',
      isRead: true,
    },
  ];

  const handleClickOutside = (setter) => {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown-container')) {
        setter(false);
      }
    });
  };

  return (
    <>
      <header className="bg-grey-white py-4 px-6 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Sidebar toggle button (mobile) */}
          <button
            className="lg:hidden p-1 md:p-2 rounded-md  hover:bg-[#15C8E8]"
            onClick={onMenuClick}
          >
            <Menu size={22} />
          </button>

          <div>
            <h1 className=" font-[poppins] text-[18px] sm:text-[20px] md:text-[24px] lg:text-[32px] not-italic font-medium leading-[150%] tracking-[-0.32px]">
              Good morning, {userName}
            </h1>
            <p className="font-[manrope] text-[14px] md:text-[16px] not-italic font-medium leading-[normal]">
              {getSubtitle(location.pathname)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search bar (desktop only) */}
          <div className="relative hidden sm:block">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#6317C3]" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="pr-10 pl-4 py-2 text-[#6317C3] font-[poppins] text-[14px] font-medium border border-[#D6DDEB] bg-[#FCF6FF] rounded-full focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Search icon (mobile only) */}
          <div className="sm:hidden">
            <button
              onClick={() => setShowMobileSearch((prev) => !prev)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Search className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          <ModeToggle />

          {/* Notification dropdown */}
          <div className="relative dropdown-container">
            <button
              className="p-2 rounded-full hover:bg-gray-100 relative"
              onClick={(e) => {
                e.stopPropagation();
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
                handleClickOutside(setShowNotifications);
              }}
            >
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold">Notifications</h3>
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
                <div className="p-4 border-t border-gray-200">
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile dropdown */}
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
                className="h-8 w-8 rounded-full object-cover border border-gray-200"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">{userName}</p>
                {userRole && (
                  <p className="text-xs text-muted-foreground">{userRole}</p>
                )}
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <User size={16} className="mr-2" />
                    Edit Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <Settings size={16} className="mr-2" />
                    Settings
                  </button>
                  <hr className="my-1" />
                  <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center">
                    <LogOut size={16} className="mr-2" />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Search Bar (below header) */}
      {showMobileSearch && (
        <div className="sm:hidden px-4 pb-2 mt-[-10px]">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 text-[#6317C3] font-[poppins] text-[14px] border border-[#D6DDEB] bg-[#FCF6FF] rounded-full focus:ring-2 focus:ring-purple-500 focus:outline-none"
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
