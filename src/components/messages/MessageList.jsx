import { ChevronDown, List, Pin, Search } from "lucide-react";
import { useState } from "react";

const MessageList = ({ onSelectChat, selectedChatId }) => {
  const [sortBy, setSortBy] = useState("Newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data for chatted people
  const pinnedChats = [
    {
      id: 1,
      name: "Emma Johnson",
      avatar: "https://i.pravatar.cc/40?img=1",
      lastMessage: "Hello, I'm having an issue with my recent order...",
      time: "07:00 AM",
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: 2,
      name: "Michael Brown",
      avatar: "https://i.pravatar.cc/40?img=2",
      lastMessage: "Hello, I'm having an issue with my recent order...",
      time: "07:00 AM",
      unreadCount: 2,
      isOnline: false,
    },
  ];

  const allChats = [
    {
      id: 3,
      name: "Sophia Davis",
      avatar: "https://i.pravatar.cc/40?img=3",
      lastMessage: "Hello, I'm having an issue with my recent order...",
      time: "07:00 AM",
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: 4,
      name: "James Wilson",
      avatar: "https://i.pravatar.cc/40?img=4",
      lastMessage: "Hello, I'm having an issue with my recent order...",
      time: "07:00 AM",
      unreadCount: 2,
      isOnline: false,
    },
    {
      id: 5,
      name: "Olivia Martinez",
      avatar: "https://i.pravatar.cc/40?img=5",
      lastMessage: "Hello, I'm having an issue with my recent order...",
      time: "07:00 AM",
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: 6,
      name: "William Anderson",
      avatar: "https://i.pravatar.cc/40?img=6",
      lastMessage: "Hello, I'm having an issue with my recent order...",
      time: "07:00 AM",
      unreadCount: 2,
      isOnline: false,
    },
    {
      id: 7,
      name: "Isabella Taylor",
      avatar: "https://i.pravatar.cc/40?img=7",
      lastMessage: "Hello, I'm having an issue with my recent order...",
      time: "07:00 AM",
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: 8,
      name: "Ethan Thompson",
      avatar: "https://i.pravatar.cc/40?img=8",
      lastMessage: "Hello, I'm having an issue with my recent order...",
      time: "07:00 AM",
      unreadCount: 2,
      isOnline: false,
    },
    {
      id: 9,
      name: "Mia Jackson",
      avatar: "https://i.pravatar.cc/40?img=9",
      lastMessage: "Hello, I'm having an issue with my recent order...",
      time: "07:00 AM",
      unreadCount: 2,
      isOnline: true,
    },
  ];

  const ChatItem = ({ chat }) => (
    <div
      onClick={() => onSelectChat(chat)}
      className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
        selectedChatId === chat.id
          ? "bg-gray-100 dark:bg-gray-800"
          : "hover:bg-gray-50 dark:hover:bg-gray-900"
      }`}
    >
      <div className="relative">
        <img
          src={chat.avatar}
          alt={chat.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        {chat.isOnline && (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm text-gray-900 dark:text-white truncate">
            {chat.name}
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {chat.time}
          </span>
        </div>

        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
            {chat.lastMessage}
          </p>
          {chat.unreadCount > 0 && (
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-500 rounded-full">
                {chat.unreadCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col h-full max-h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Messages
          </h2>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-transparent text-sm text-gray-600 dark:text-gray-300 pr-6 focus:outline-none"
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="Unread">Unread</option>
            </select>
            <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {/* Pinned Section */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Pin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Pinned
            </h3>
          </div>
          <div className="space-y-1">
            {pinnedChats.map((chat) => (
              <ChatItem key={chat.id} chat={chat} />
            ))}
          </div>
        </div>

        {/* All Conversations Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <List className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              All Conversations
            </h3>
          </div>
          <div className="space-y-1">
            {allChats.map((chat) => (
              <ChatItem key={chat.id} chat={chat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageList;
