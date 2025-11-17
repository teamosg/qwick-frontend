import { List, Pin } from "lucide-react";
import { MessagesSquare } from "lucide-react";
import ChatItem from "./skeletonns/ChatItem";

const ChatList = ({
  showRequestsOnly,
  requestsChats,
  onSelectChat,
  selectedChatId,
  pinnedConversation,
  regularConversation,
}) => {
  console.log(requestsChats);
  return (
    <div className="flex-1 overflow-y-auto">
      {showRequestsOnly ? (
        /* Only Requests Chats Section */
        <div className="p-4 animate-fadeIn">
          <div className="flex items-center gap-2 mb-3">
            <MessagesSquare className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Chat Requests
            </h3>
          </div>
          <div className="space-y-1">
            {requestsChats.map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                onSelectChat={onSelectChat}
                selectedChatId={selectedChatId}
              />
            ))}
          </div>
        </div>
      ) : (
        /* All Sections */
        <div className="animate-fadeIn">
          {/* Pinned Section */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Pin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Pinned
              </h3>
            </div>
            <div className="space-y-1">
              {pinnedConversation.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  onSelectChat={onSelectChat}
                  selectedChatId={selectedChatId}
                />
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
              {regularConversation.map((chat) => (
                <ChatItem
                  key={chat.user_id}
                  chat={chat}
                  onSelectChat={onSelectChat}
                  selectedChatId={selectedChatId}
                />
              ))}
            </div>
          </div>

          {/* Requests Chats Section */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <MessagesSquare className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Chat Requests
              </h3>
            </div>
            <div className="space-y-1">
              {requestsChats.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  onSelectChat={onSelectChat}
                  selectedChatId={selectedChatId}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatList;
