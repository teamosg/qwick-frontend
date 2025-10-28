import { X, Edit2, UserPlus, LogOut, Bell, BellOff } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const GroupChatInfo = ({ selectedChat, onClose }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Sample members data
  const members = [
    {
      id: 1,
      name: "DARREN CHUA YI JIE",
      avatar: "https://i.pravatar.cc/40?img=1",
      role: "Admin",
    },
    {
      id: 2,
      name: "Dum My",
      avatar: "https://i.pravatar.cc/40?img=2",
      role: "Member",
    },
    {
      id: 3,
      name: "Brook",
      avatar: "https://i.pravatar.cc/40?img=3",
      role: "Member",
    },
  ];

  const handleRename = () => {
    toast.success("Rename feature coming soon!");
  };

  const handleAddUser = () => {
    toast.success("Add user feature coming soon!");
  };

  const handleLeave = () => {
    toast.error("Leave group feature coming soon!");
  };

  const handleRemoveMember = (memberName) => {
    toast.error(`Remove ${memberName} feature coming soon!`);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with avatar and close button */}
      <div className="relative p-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>

        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <img
              src={selectedChat.avatar}
              alt={selectedChat.name}
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
            {selectedChat.name}
          </h2>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={handleRename}
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Edit2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Rename
          </span>
        </button>

        <button
          onClick={handleAddUser}
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <UserPlus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Add user
          </span>
        </button>

        <button
          onClick={handleLeave}
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
          <span className="text-xs font-medium text-red-700 dark:text-red-300">
            Leave
          </span>
        </button>
      </div>

      {/* Notifications Toggle */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {notificationsEnabled ? (
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <BellOff className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Notifications
            </span>
          </div>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notificationsEnabled
                ? "bg-blue-600"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          >
            <motion.span
              layout
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationsEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Members List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            {members.length} members
          </h3>
          <div className="space-y-1">
            {members.map((member, index) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {member.name}
                    </h4>
                    {index === 0 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {member.role}
                      </span>
                    )}
                  </div>
                </div>
                {index !== 0 && (
                  <button
                    onClick={() => handleRemoveMember(member.name)}
                    className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChatInfo;
