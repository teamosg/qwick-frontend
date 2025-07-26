import React from 'react';
import {
  Home,
  Users,
  TrendingUp,
  MessageSquare,
  Calendar,
  Settings,
  X,
  User,
  CheckSquare,
  AlertTriangle,
  Bot,
} from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavItem = ({ icon, text, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive, isPending }) =>
        `flex items-center space-x-3 p-3 rounded-lg text-sidebar-foreground ${
          isActive || isPending
            ? 'bg-sidebar-link-active !text-[#15C8E8]'
            : ' hover:bg-gray-100'
        }`
      }
    >
      {({ isActive, isPending }) => (
        <>
          <div
            className={
              isActive || isPending
                ? 'text-[#15C8E8]'
                : 'text-sidebar-foreground'
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
  const [showSettings, setShowSettings] = React.useState(false);

  return (
    <div className="bg-sidebar h-full flex flex-col border-r border-sidebar-border">
      <div className="p-6 flex items-center justify-between">
        <h1 className="text-[#2A3851] font-[poppins] text-[18px] sm:text-[20px] md:text-[24px] not-italic font-bold leading-[32px] tracking-[-0.48px]">
          School Admin
        </h1>
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 px-3 py-2 space-y-1">
        <NavItem icon={<Home size={20} />} text="Home" to="/" />
        <NavItem icon={<User size={20} />} text="Students" to="/students" />
        <NavItem icon={<Users size={20} />} text="Alumni" to="/alumni" />
        <NavItem
          icon={<TrendingUp size={20} />}
          text="Impression"
          to="/impression"
        />
        <NavItem
          icon={<CheckSquare size={20} />}
          text="Career Checklist"
          to="/career-checklist"
        />
        <NavItem
          icon={<AlertTriangle size={20} />}
          text="Risk Alerts"
          to="/risk-alerts"
        />
        <NavItem icon={<Bot size={20} />} text="AI Nudges" to="/ai-nudges" />
        {/* <NavItem
          icon={<MessageSquare size={20} />}
          text="Message"
          to="/message"
        /> */}
        <NavItem
          icon={<Calendar size={20} />}
          text="Scheduled"
          to="/scheduled"
        />
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
        >
          <Settings size={20} className="text-muted-foreground" />
          <span className="font-medium">Settings</span>
        </button>

        {showSettings && (
          <div className="mt-2 py-2 px-3 bg-gray-50 rounded-lg">
            <button className="w-full text-left py-2 px-3 text-sm text-gray-700 hover:bg-gray-100 rounded-sm">
              Account Settings
            </button>
            <button className="w-full text-left py-2 px-3 text-sm text-gray-700 hover:bg-gray-100 rounded-sm">
              Notifications
            </button>
            <button className="w-full text-left py-2 px-3 text-sm text-gray-700 hover:bg-gray-100 rounded-sm">
              Privacy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
