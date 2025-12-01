import { useEffect, useRef, useState } from "react";
import { useGetGroupConversationDetails } from "@/hooks/conversations.hook";
import ConversationDetailsSkeleton from "./skeletonns/ConversationDetailsSkeleton";
import { useProfile } from "@/hooks/auth.hook";
import ChatConversationContainer from "./ChatConversationContainer";

const GroupChatBox = ({ selectedChat, setSelectedChat }) => {
  // State management for chat features
  const [messages, setMessages] = useState([]);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);

  // sender information
  const sender_id = selectedChat?.user_id || selectedChat?.sender_id;
  const sender_username =
    selectedChat?.username || selectedChat?.sender_username;
  const sender_avatar = selectedChat?.avatar;
  const sender = { sender_avatar, sender_id, sender_username };
  // fetch information
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useProfile();
  // conversation details
  const {
    data: conversationDetails,
    isLoading: isConversationLoading,
    isError: isConversationError,
  } = useGetGroupConversationDetails({
    type: "group",
    conversationId: selectedChat?.group_id,
  });

  // Animation: scroll to latest message
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Load messages whenever chat changes
  useEffect(() => {
    if (selectedChat) {
      setMessages(conversationDetails?.messages || []);
      setSelectedChat({ ...selectedChat, members: conversationDetails?.group?.members || [] })
      setShouldScrollToBottom(true);
    }
  }, [conversationDetails]);

  // Scroll on messages update if flagged
  useEffect(() => {
    if (shouldScrollToBottom) {
      scrollToBottom();
      setShouldScrollToBottom(false);
    }
  }, [conversationDetails, shouldScrollToBottom]);

  // skeleton
  if (
    isConversationLoading ||
    isConversationError ||
    isUserLoading ||
    isUserError
  )
    return <ConversationDetailsSkeleton />;

  return (
    <div className="flex-1 flex flex-col bg-gray-50 dark:bg-[#171717] max-h-full">
      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Message bubbles, colors updated for dark mode */}
        <ChatConversationContainer
          messages={messages}
          sender={sender}
          user={user}
        />
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input or Request Acceptance */}
      {/* <ConversationActionBox
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        messages={messages}
        setMessages={setMessages}
        setShouldScrollToBottom={setShouldScrollToBottom}
        sender={sender}
      /> */}
      <p className="border p-4">API on progress for messaging</p>
    </div>
  );
};

export default GroupChatBox;
