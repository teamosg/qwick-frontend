import { useEffect, useRef, useState } from "react";
import { useGetGroupConversationDetails } from "@/hooks/conversations.hook";
import ConversationDetailsSkeleton from "./skeletonns/ConversationDetailsSkeleton";
import { useProfile } from "@/hooks/auth.hook";
import ConversationActionBox from "./ConversationActionBox";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import MessageError from "./components/MessageError ";
import GroupChatConversationContainer from "./GroupChatConversationContainer";
import GroupConversationActionBox from "./GroupConversationActionBox";

const GroupChatBox = ({ selectedChat, setSelectedChat }) => {
  const [isWsError, setIsWsError] = useState(false);
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

  const token = localStorage.getItem("token");
  const group_id = selectedChat?.group_id;

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

  const members = {}
  selectedChat?.members?.forEach(member => {
    return members[member?.username] = member
  })



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
      queryKey: ["conversationDetails", group_id],
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


  // set members
  useEffect(() => {
    if (selectedChat) {
      setMessages(conversationDetails?.messages || []);
      setSelectedChat({ ...selectedChat, members: conversationDetails?.group?.members || [] })
    }
  }, [conversationDetails]);


  // Load messages whenever chat changes
  useEffect(() => {
    if (!group_id) return;
    setMessages(conversationDetails?.messages || []);

    ws.current = new WebSocket(
      `wss://darrenchua.softvencealpha.com/ws/group/${group_id}/?token=${token}`
    );

    // ws.current.onopen = () => {
    //   setIsWsError(false);
    // };

    // ws.current.onerror = (err) => {
    //   setIsWsError(true);
    // };


    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleNewMessages(data);
    };


    ws.current.onclose = () => {
      // If it closes BEFORE open → failed connection
      if (ws.current?.readyState === WebSocket.CLOSED) {
        setIsWsError(true);
      }
    };


    // CLEANUP MUST ALWAYS BE RETURNED FROM USEEFFECT
    return () => {
      if (ws.current) {
        ws.current?.close();
        ws.current = null;
      }
    };
  }, [sender_username, token, conversationDetails]); // remove conversationDetails

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
        <GroupChatConversationContainer
          messages={messages}
          sender={sender}
          user={user}
          members={members}
        />
      </div>
      {
        isWsError
          ? (
            <MessageError
              isError={isWsError}
            />
          ) : (
            <GroupConversationActionBox
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              user={user}
              handleSendMessage={handleSendMessage}
            />
          )
      }
    </div>
  );
};

export default GroupChatBox;
