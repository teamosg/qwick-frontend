import MessageOptions from "@/components/MessagesComponents/MessageSelect/MessageOptions";

const ChatItem = ({ chat, onSelectChat, selectedChatId }) => (
  <div
    onClick={() => onSelectChat(chat)}
    className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
      selectedChatId === chat.id
        ? "bg-gray-100 dark:bg-gray-800"
        : "hover:bg-gray-50 dark:hover:bg-gray-800"
    }`}
  >
    <div className="relative">
      <img
        src={chat.avatar}
        alt={chat.name}
        className="w-10 h-10 rounded-full object-cover"
      />
      {chat.isOnline && (
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#171717] rounded-full"></div>
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
        {selectedChatId === chat.id ? (
          <MessageOptions avatar={chat?.avatar} />
        ) : (
          chat.unreadCount > 0 && (
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-500 rounded-full">
                {chat.unreadCount}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  </div>
);

export default ChatItem;
