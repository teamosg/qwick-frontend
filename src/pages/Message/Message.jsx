import { useState } from "react";
import ChatBox from "../../components/messages/ChatBox";
import ChatHeader from "../../components/messages/ChatHeader";
import MessageList from "../../components/messages/MessageList";
import EmptyChatBox from "@/components/messages/EmptyChatBox";


const Message = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chat) => {
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
          <ChatBox selectedChat={selectedChat} />
        ) : (
          <EmptyChatBox />
        )}
      </div>
    </div>
  );
};

export default Message;
