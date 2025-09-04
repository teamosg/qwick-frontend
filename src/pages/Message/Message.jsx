import { useState } from "react";
import ChatBox from "../../components/messages/ChatBox";
import ChatHeader from "../../components/messages/ChatHeader";
import MessageList from "../../components/messages/MessageList";

const Message = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Left Sidebar - Message List */}
      <MessageList
        onSelectChat={handleSelectChat}
        selectedChatId={selectedChat?.id}
      />

      {/* Right Side - Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatHeader selectedChat={selectedChat} />
        <ChatBox selectedChat={selectedChat} />
      </div>
    </div>
  );
};

export default Message;
