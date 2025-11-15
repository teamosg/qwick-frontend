import MessageOptions from "@/components/MessagesComponents/MessageSelect/MessageOptions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatItem = ({ chat, onSelectChat, selectedChatId }) => {
  const { username, avatar, last_message, last_message_at, unread_count } =
    chat;

  const date = new Date(last_message_at);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  };
  const formattedDate = date.toLocaleTimeString("en-US", options);

  return (
    <div
      onClick={() => onSelectChat(chat)}
      className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
        selectedChatId === chat.user_id
          ? "bg-gray-100 dark:bg-gray-800"
          : "hover:bg-gray-50 dark:hover:bg-gray-800"
      }`}
    >
      <div className="relative">
        <Avatar className="w-10 h-10 rounded-full object-cover">
          <AvatarImage src={avatar} alt={username} />
          <AvatarFallback>{username.split("")[0]}</AvatarFallback>
        </Avatar>
        {chat?.isOnline && (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#171717] rounded-full"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm text-gray-900 dark:text-white truncate">
            {username}
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formattedDate}
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
            {last_message}
          </p>
          {selectedChatId === chat.user_id ? (
            <MessageOptions
              chat={chat}
              avatar={avatar || "https://i.pravatar.cc/40?img=10"}
            />
          ) : (
            unread_count > 0 && (
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-500 rounded-full">
                  {unread_count}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
