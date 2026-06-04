import { Info, MoreVertical, ChevronLeft } from "lucide-react";
import { useState } from "react";
import ChatInfoSidebar from "./ChatInfoSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ChatHeader = ({ selectedChat, setSelectedChat }) => {
  const [showInfoSidebar, setShowInfoSidebar] = useState(false);

  if (!selectedChat) {
    return (
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          Select a conversation
        </h2>
      </div>
    );
  }

  const { avatar, group_avatar } = selectedChat;
  const username = selectedChat?.sender_username || selectedChat?.username || selectedChat?.group_name;

  return (
    <>
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        {/* Back button (Mobile only), Avatar, Name and Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setSelectedChat(null)}
            className="md:hidden p-1.5 -ml-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-[#222] rounded-full transition-colors"
            aria-label="Back to messages"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="relative">
            <Avatar className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover">
              <AvatarImage src={avatar || group_avatar} alt={username} />
              <AvatarFallback className={'bg-[#DCDCDC] dark:bg-nav-active-bg text-gray-900 dark:text-white'}>{username?.[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white truncate max-w-[150px] sm:max-w-none">
              {username}
            </h2>
          </div>
        </div>

        {/* Action buttons: Info and More menu */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setShowInfoSidebar(true)}
            className="p-1.5 sm:p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#222] rounded-lg transition-colors"
            aria-label="View chat info"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

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
