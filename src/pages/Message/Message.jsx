import { useState } from "react";
import ChatBox from "../../components/messages/ChatBox";
import ChatHeader from "../../components/messages/ChatHeader";
import MessageList from "../../components/messages/MessageList";
import EmptyChatBox from "@/components/messages/EmptyChatBox";
import GroupChatBox from "@/components/messages/GroupChatBox";
import { useQueryClient } from "@tanstack/react-query";

const Message = () => {
  const queryClient = useQueryClient()
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chat) => {
    queryClient.invalidateQueries({ queryKey: ["conversationList"] })
    queryClient.invalidateQueries({ queryKey: ["requestConversationList"] })
    setSelectedChat(chat);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-50 dark:bg-[#15161E]">
      {/* Left Sidebar - Message List */}
      <MessageList
        onSelectChat={handleSelectChat}
        selectedChatId={selectedChat?.user_id}
      />

      {/* Right Side - Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatHeader selectedChat={selectedChat} />
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
  );
};

export default Message;
