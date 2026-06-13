import MessageOptions from "@/components/MessagesComponents/MessageSelect/MessageOptions";
import AvatarUser from "@/components/ui/AvatarUser";

const ChatItem = ({ chat, onSelectChat, selectedChatId, setSelectedChat, setOpenAddToGroupModal }) => {
  const { avatar, group_avatar, last_message, last_message_at, unread_count } = chat;
  const username = chat?.sender_username || chat?.username;
  const user_id = chat?.sender_id || chat?.user_id;

  const group_name = chat?.group_name;
  const group_id = chat?.group_id;

  const conversationId = user_id || group_id;
  const conversationName = username || group_name;

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
      className={`rounded-md flex items-center gap-3 p-3 cursor-pointer transition-colors ${selectedChatId === conversationId
        ? "bg-nav-active-bg"
        : "hover:bg-nav-active-bg"
        }`}
    >
      <div className="relative">
        <AvatarUser
          src={avatar || group_avatar}
          alt={conversationName}
          className="w-10 h-10 rounded-full object-cover"
        />

        {chat?.isOnline && (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full"></div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm text-gray-900 dark:text-white truncate">
            {conversationName}
          </h3>
          <span className="text-xs text-muted-foreground dark:text-muted-foreground">
            {formattedDate}
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-muted-foreground dark:text-foreground truncate">
            {last_message}
          </p>
          {selectedChatId === conversationId && chat?.type === "dm" ? (
            <MessageOptions
              chat={chat}
              avatar={avatar || group_avatar}
              setSelectedChat={setSelectedChat}
              setOpenAddToGroupModal={setOpenAddToGroupModal}
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
