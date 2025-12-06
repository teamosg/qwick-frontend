import { X, Search, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useGetOtherUser } from "@/hooks/users.hook";
import { useMemo } from "react";
import { useEffect } from "react";
import SuggestedUsersList from "./components/SuggestedUsersList";
import SkeletonUser from "./skeletonns/SkeletonUser";
import { NoDataAlert } from "../Alerts/NoDataAlert";
import SearchedUsersList from "./components/SearchedUsersList";
import { TodoAlert } from "../Alerts/TodoAlert";


const NewMessageSidebar = ({ fetchedConversationList, onSelectChat, isOpen, onClose, onCreateGroup }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);


  const suggestedUsers = useMemo(() => {
    const map = {};
    fetchedConversationList?.forEach(conversation => {
      if (conversation?.type === "dm") {
        map[conversation?.username] = conversation;
      }
    });
    return map;
  }, [fetchedConversationList]);



  const filteredUsers = useMemo(() => {
    if (!debouncedSearch) return [];
    return suggestedUsers[debouncedSearch]
      ? [suggestedUsers[debouncedSearch]]
      : [];
  }, [debouncedSearch, suggestedUsers]);

  const isUserFoundInLocal = filteredUsers.length > 0;




  const { data: searchedUser, isLoading } = useGetOtherUser({
    userName: debouncedSearch.trim(),
    enabled: !!debouncedSearch && !isUserFoundInLocal,
  });



  const handleUserSelect = (user) => {
    const newChat = { ...user }
    newChat.last_message = ""
    newChat.new_conversation = true


    onSelectChat(newChat);
    onClose()
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

            {
              !searchQuery
                ? (
                  <TodoAlert message="Search for users to start a conversation" />
                )
                : (
                  isLoading ? (
                    <div>
                      <SkeletonUser />
                      <SkeletonUser />
                      <SkeletonUser />
                    </div>
                  ) : (
                    filteredUsers?.length ? (
                      <SuggestedUsersList
                        suggestedUsers={filteredUsers}
                        handleUserSelect={handleUserSelect}
                      />
                    )
                      : (
                        searchedUser
                          ? (
                            <SearchedUsersList
                              usersList={[searchedUser]}
                              handleUserSelect={handleUserSelect}
                            />
                          )
                          : (
                            <NoDataAlert message="No users found" />
                          )
                      )
                  )
                )
            }
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewMessageSidebar;
