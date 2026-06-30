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
  showUnreadOnly,
  setOpenAddToGroupModal,
  setSelectedChat,
}) => {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar">
      {showRequestsOnly ? (
        /* Only Requests Chats Section */
        <div className="p-4 animate-fadeIn">
          <div className="flex items-center gap-2 mb-3">
            <MessagesSquare className="w-4 h-4 text-muted-foreground dark:text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground dark:text-foreground">
              Chat Requests
            </h3>
          </div>
          <div className="space-y-1">
            {requestsChats?.map((chat) => (
              <ChatItem
                key={chat.user_id || chat.sender_id || `group_${chat.group_id}`}
                chat={chat}
                onSelectChat={onSelectChat}
                selectedChatId={selectedChatId}
                setSelectedChat={setSelectedChat}
                setOpenAddToGroupModal={setOpenAddToGroupModal}
              />
            ))}
          </div>
        </div>
      ) : (
        /* All Sections */
        <div className="animate-fadeIn">
          {/* Pinned Section */}
          {
            pinnedConversation?.length > 0 &&
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Pin className="w-4 h-4 text-muted-foreground dark:text-muted-foreground" />
                <h3 className="text-sm font-medium text-foreground dark:text-foreground">
                  Pinned
                </h3>
              </div>
              <div className="space-y-1">
                {pinnedConversation?.map((chat) => (
                  <ChatItem
                    key={
                      chat.user_id || chat.sender_id || `group_${chat.group_id}`
                    }
                    chat={chat}
                    onSelectChat={onSelectChat}
                    selectedChatId={selectedChatId}
                    setSelectedChat={setSelectedChat}
                    setOpenAddToGroupModal={setOpenAddToGroupModal}
                  />
                ))}
              </div>
            </div>
          }

          {/* All Conversations Section */}
          <div className="p-4 border-t border-qwick-gray-200 dark:border-qwick-gray-800">
            <div className="flex items-center gap-2 mb-3">
              <List className="w-4 h-4 text-muted-foreground dark:text-muted-foreground" />
              <h3 className="text-sm font-medium text-foreground dark:text-foreground">
                All Conversations
              </h3>
            </div>
            <div className="space-y-1">
              {regularConversation?.map((chat) => (
                <ChatItem
                  key={
                    chat.user_id || chat.sender_id || `group_${chat.group_id}`
                  }
                  chat={chat}
                  onSelectChat={onSelectChat}
                  selectedChatId={selectedChatId}
                  setSelectedChat={setSelectedChat}
                  setOpenAddToGroupModal={setOpenAddToGroupModal}
                />
              ))}
            </div>
          </div>

          {/* Requests Chats Section */}
          {
            requestsChats?.length > 0 &&
            <div className="p-4 border-t border-qwick-gray-200 dark:border-qwick-gray-800">
              <div className="flex items-center gap-2 mb-3">
                <MessagesSquare className="w-4 h-4 text-muted-foreground dark:text-muted-foreground" />
                <h3 className="text-sm font-medium text-foreground dark:text-foreground">
                  Chat Requests
                </h3>
              </div>
              <div className="space-y-1">
                {
                  !showUnreadOnly &&
                  requestsChats?.map((chat) => (
                    <ChatItem
                      key={
                        chat.user_id || chat.sender_id || `group_${chat.group_id}`
                      }
                      chat={chat}
                      onSelectChat={onSelectChat}
                      selectedChatId={selectedChatId}
                      setSelectedChat={setSelectedChat}
                      setOpenAddToGroupModal={setOpenAddToGroupModal}
                    />
                  ))}
              </div>
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default ChatList;
