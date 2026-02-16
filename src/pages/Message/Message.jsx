import { useState } from "react";
import ChatBox from "../../components/messages/ChatBox";
import ChatHeader from "../../components/messages/ChatHeader";
import MessageList from "../../components/messages/MessageList";
import EmptyChatBox from "@/components/messages/EmptyChatBox";
import GroupChatBox from "@/components/messages/GroupChatBox";
import { useQueryClient } from "@tanstack/react-query";

const Message = () => {
  const queryClient = useQueryClient();
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chat) => {
    queryClient.invalidateQueries({ queryKey: ["conversationList"] });
    queryClient.invalidateQueries({ queryKey: ["requestConversationList"] });
    setSelectedChat(chat);
  };

  return (
    <div className="flex h-full bg-gray-50 dark:bg-[#15161E] overflow-hidden">
      {/* Left Sidebar - Message List */}
      <div className={`${selectedChat ? "hidden md:flex" : "flex"} w-full md:w-80 border-r border-gray-200 dark:border-[#282828]`}>
        <MessageList
          onSelectChat={handleSelectChat}
          selectedChatId={selectedChat?.user_id || selectedChat?.group_id}
          setSelectedChat={setSelectedChat}
          selectedChat={selectedChat}
        />
      </div>

      {/* Right Side - Chat Area */}
      <div className={`${selectedChat ? "flex" : "hidden md:flex"} flex-1 flex-col overflow-hidden`}>
        <ChatHeader selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
        <div className="flex-1 overflow-hidden">
          {selectedChat ? (
            selectedChat?.type === "group" ? (
              <GroupChatBox
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
              />
            ) : (
              <ChatBox
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
              />
            )
          ) : (
            <EmptyChatBox />
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
