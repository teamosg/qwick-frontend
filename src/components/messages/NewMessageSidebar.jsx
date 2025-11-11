import { X, Search, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/**
 * NewMessageSidebar allows searching users to start new chats,
 * creating group chats, and suggested user selections.
 * Dark mode colors are updated for coherence.
 */
const NewMessageSidebar = ({ isOpen, onClose, onUserSelect, onCreateGroup }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Suggested users sample data
  const suggestedUsers = [
    { id: 101, name: "Sarah Wilson", avatar: "https://i.pravatar.cc/40?img=20", username: "@sarahw", isOnline: true },
    { id: 102, name: "David Chen", avatar: "https://i.pravatar.cc/40?img=21", username: "@davidc", isOnline: false },
    { id: 103, name: "Maria Garcia", avatar: "https://i.pravatar.cc/40?img=22", username: "@mariag", isOnline: true },
    { id: 104, name: "James Park", avatar: "https://i.pravatar.cc/40?img=23", username: "@jamespark", isOnline: true },
    { id: 105, name: "Emily Brown", avatar: "https://i.pravatar.cc/40?img=24", username: "@emilyb", isOnline: false },
  ];

  // Filter users based on search input (name or username)
  const filteredUsers = suggestedUsers.filter(
    user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Sidebar panel */}
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-[#171717] border-r border-gray-200 dark:border-[#282828] z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-[#282828] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">New Message</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-[#282828] rounded-lg transition-colors"
                aria-label="Close new message sidebar"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-gray-200 dark:border-[#282828]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-[#282828] rounded-lg bg-gray-50 dark:bg-[#232323] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Create Group Chat Button */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-[#282828]">
              <button
                onClick={onCreateGroup}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#282828] transition-colors text-left"
                aria-label="Create a group chat"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Create a group chat</span>
              </button>
            </div>

            {/* Suggested Users List */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Suggested</h3>
                <div className="space-y-1">
                  {filteredUsers.map(user => (
                    <motion.button
                      key={user.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => onUserSelect(user)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#282828] transition-colors"
                    >
                      <div className="relative">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {user.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#171717] rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-medium text-sm text-gray-900 dark:text-white">{user.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.username}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewMessageSidebar;
