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
            className="fixed left-0 top-0 h-full w-80 bg-card dark:bg-card border-r border-border dark:border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-qwick-gray-200 dark:border-qwick-gray-800 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground dark:text-foreground">New Message</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-accent dark:hover:bg-accent rounded-lg transition-colors"
                aria-label="Close new message sidebar"
              >
                <X className="w-5 h-5 text-muted-foreground dark:text-muted-foreground" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-qwick-gray-200 dark:border-qwick-gray-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-qwick-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-qwick-gray-300 dark:border-qwick-gray-800 rounded-lg bg-background dark:bg-background text-foreground dark:text-foreground placeholder-qwick-gray-500 dark:placeholder-qwick-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Create Group Chat Button */}
            <div className="p-4 border-b border-qwick-gray-200 dark:border-qwick-gray-800">
              <button
                onClick={onCreateGroup}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent dark:hover:bg-accent transition-colors text-left"
                aria-label="Create a group chat"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="font-medium text-foreground dark:text-foreground">Create a group chat</span>
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
                            <NoDataAlert message="No user found" />
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
