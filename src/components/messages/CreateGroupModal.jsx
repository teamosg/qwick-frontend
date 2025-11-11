import { X, Search, ArrowLeft, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/**
 * CreateGroupModal allows searching and selecting users to create a group chat.
 * Dark mode colors updated for visual coherence.
 */
const CreateGroupModal = ({ isOpen, onClose, onCreateGroup }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Suggested users data
  const suggestedUsers = [
    { id: 101, name: "Sarah Wilson", avatar: "https://i.pravatar.cc/40?img=20", username: "@sarahw", isOnline: true },
    { id: 102, name: "David Chen", avatar: "https://i.pravatar.cc/40?img=21", username: "@davidc", isOnline: false },
    { id: 103, name: "Maria Garcia", avatar: "https://i.pravatar.cc/40?img=22", username: "@mariag", isOnline: true },
    { id: 104, name: "James Park", avatar: "https://i.pravatar.cc/40?img=23", username: "@jamespark", isOnline: true },
    { id: 105, name: "Emily Brown", avatar: "https://i.pravatar.cc/40?img=24", username: "@emilyb", isOnline: false },
  ];

  // Filter users by search (name or username)
  const filteredUsers = suggestedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle selecting or deselecting a user by id
  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  // Create group callback with selected users' data
  const handleCreateGroup = () => {
    if (selectedUsers.length === 0) return;
    const selectedUsersData = suggestedUsers.filter((user) =>
      selectedUsers.includes(user.id)
    );
    onCreateGroup(selectedUsersData);
    setSelectedUsers([]);
    setSearchQuery("");
  };

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
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-[#171717] rounded-2xl shadow-2xl w-full max-w-md max-h-[600px] flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200 dark:border-[#282828] flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-[#282828] rounded-lg transition-colors"
                  aria-label="Back"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
                  New Group Chat
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-[#282828] rounded-lg transition-colors"
                  aria-label="Close"
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
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-[#282828] rounded-lg bg-gray-50 dark:bg-[#232323] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Selected count */}
                {selectedUsers.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3"
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedUsers.length} member{selectedUsers.length !== 1 ? "s" : ""} selected
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Suggested Users List */}
              <div className="flex-1 overflow-y-auto p-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                  Suggested
                </h3>
                <div className="space-y-1">
                  {filteredUsers.map((user) => {
                    const isSelected = selectedUsers.includes(user.id);
                    return (
                      <motion.button
                        key={user.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => toggleUserSelection(user.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          isSelected
                            ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                            : "hover:bg-gray-100 dark:hover:bg-[#282828]"
                        }`}
                        aria-pressed={isSelected}
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
                          <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                            {user.name}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {user.username}
                          </p>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-blue-500 border-blue-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Create Group Button */}
              <div className="p-4 border-t border-gray-200 dark:border-[#282828]">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreateGroup}
                  disabled={selectedUsers.length === 0}
                  className="w-full px-6 py-3 bg-[#003933] hover:bg-[#002822] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Create Group ({selectedUsers.length})
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreateGroupModal;
