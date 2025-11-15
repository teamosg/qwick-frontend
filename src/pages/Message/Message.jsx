import { useState } from "react";
import ChatBox from "../../components/messages/ChatBox";
import ChatHeader from "../../components/messages/ChatHeader";
import MessageList from "../../components/messages/MessageList";

// const dummyConversation = {
//   id: 1,
//   name: "Emma Johnson",
//   avatar: "https://i.pravatar.cc/40?img=1",
//   lastMessage: "Hello, I'm having an issue with my recent order...",
//   time: "07:00 AM",
//   unreadCount: 2,
//   isOnline: true,
// };

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
