import { useEffect, useRef, useState } from "react";
import { useGetConversationDetails } from "@/hooks/conversations.hook";
import ConversationDetailsSkeleton from "./skeletonns/ConversationDetailsSkeleton";
import { useProfile } from "@/hooks/auth.hook";
import ChatConversationContainer from "./ChatConversationContainer";
import ConversationActionBox from "./ConversationActionBox";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const ChatBox = ({ selectedChat, setSelectedChat }) => {
  // State management for chat features
  const [messages, setMessages] = useState([]);
  const ws = useRef();
  const queryClient = useQueryClient();

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
  const token = localStorage.getItem("token");

  // conversation details
  const {
    data: conversationDetails,
    isLoading: isConversationLoading,
    isError: isConversationError,
  } = useGetConversationDetails({
    type: "dm",
    conversationId: sender_id,
  });

  const handleNewMessages = (data) => {
    if (!data?.message) return;

    //! do not use the below set function 
    // const receivedMessage = {
    //   ...data.message,
    //   sender_id,
    //   sender_username,
    // };
    // setMessages((prevMessages) => [...prevMessages, receivedMessage]);

    queryClient.invalidateQueries({
      queryKey: ["conversationList"],
    });

    queryClient.invalidateQueries({
      queryKey: ["conversationDetails"],
    });
  };

  const handleSendMessage = ({ content }) => {
    if (!content || !ws.current || ws.current.readyState !== WebSocket.OPEN) {
      toast.error("Network error, Please try again latter")
      return
    }
    ws.current.send(
      JSON.stringify({ content })
    )
  }

  // Load messages whenever chat changes
  useEffect(() => {
    if (sender_username) {
      setMessages(conversationDetails || []);
      ws.current = new WebSocket(
        `wss://darrenchua.softvencealpha.com/ws/chat/${sender_username}/?token=${token}`
      );

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleNewMessages(data);
      };

      // ws.current.onopen = () => {
      //   console.log("connected to ws");
      // };

      // ws.current.onclose = () => {
      //   console.log("disconnected from ws");
      // };

      return () => {
        ws.current.close();
      };
    }
  }, [sender_username, conversationDetails, token]);

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
        {/* <div ref={messagesEndRef} /> */}
      </div>

      {/* Message Input or Request Acceptance */}
      <ConversationActionBox
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        messages={messages}
        setMessages={setMessages}
        sender={sender}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatBox;
