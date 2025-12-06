import { Info, MoreVertical } from "lucide-react";
import { useState } from "react";
import ChatInfoSidebar from "./ChatInfoSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

/**
 * ChatHeader displays chat info for the selected conversation,
 * and provides sidebar/info toggle actions. Updates color only for dark mode.
 */
const ChatHeader = ({ selectedChat, setSelectedChat }) => {
  // State to control showing chat info sidebar
  const [showInfoSidebar, setShowInfoSidebar] = useState(false);

  // Placeholder when no chat is selected
  if (!selectedChat) {
    return (
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#282828] bg-white dark:bg-[#171717]">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Select a conversation
        </h2>
      </div>
    );
  }

  const { avatar } = selectedChat;
  const username = selectedChat?.sender_username || selectedChat?.username || selectedChat?.group_name;

  // Main chat header showing participant info, status, and action buttons
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#282828] bg-white dark:bg-[#171717]">
        {/* Avatar, Name and Status */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-10 h-10 rounded-full object-cover">
              <AvatarImage src={avatar} alt={username} />
              <AvatarFallback>{username.split("")[0]}</AvatarFallback>
            </Avatar>
            {/* {selectedChat.isOnline && (
              // Online indicator w/ custom dark border
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#171717] rounded-full"></div>
            )} */}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {username}
            </h2>
            {/* <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedChat.isOnline ? "Online" : "Offline"}
            </p> */}
          </div>
        </div>

        {/* Action buttons: Info and More menu */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowInfoSidebar(true)}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#222] rounded-lg transition-colors"
            aria-label="View chat info"
          >
            <Info className="w-5 h-5" />
          </button>
          {/* <button
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#222] rounded-lg transition-colors"
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5" />
          </button> */}
        </div>
      </div>

      {/* Chat info sidebar (conditioned on state) */}
      <ChatInfoSidebar
        isOpen={showInfoSidebar}
        onClose={() => setShowInfoSidebar(false)}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
    </>
  );
};

export default ChatHeader;
