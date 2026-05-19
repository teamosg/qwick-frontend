import { useCallback, useEffect, useRef, useState } from "react";
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

  // const sender = { sender_avatar, sender_id, sender_username };

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
  const groupMembers = conversationDetails?.group?.members || selectedChat?.members || [];
  groupMembers.forEach(member => {
    members[member?.username] = member
  })



  const handleNewMessages = useCallback((data) => {
    if (!data?.message) return;

    queryClient.invalidateQueries({
      queryKey: ["conversationList"],
    });

    queryClient.invalidateQueries({
      queryKey: ["conversationDetails", group_id],
    });
  }, [queryClient, group_id]);


  const handleSendMessage = ({ content }) => {
    if (!content || !ws.current || ws.current.readyState !== WebSocket.OPEN) {
      toast.error("Network error, Please try again latter")
      return
    }
    ws.current.send(
      JSON.stringify({ content })
    )
  }


  // sync messages and enrich selectedChat with group details
  useEffect(() => {
    if (conversationDetails) {
      setMessages(conversationDetails.messages || []);
      
      if (conversationDetails.group) {
        setSelectedChat(prev => ({
          ...prev,
          members: conversationDetails.group.members || [],
          name: conversationDetails.group.name,
          avatar: conversationDetails.group.avatar || prev?.group_avatar || prev?.avatar
        }));
      }
    }
  }, [conversationDetails, setSelectedChat]);


  // WebSocket connection management
  useEffect(() => {
    if (!group_id) return;

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
  }, [group_id, token, conversationDetails, handleNewMessages]); // remove conversationDetails

  // skeleton
  if (
    isConversationLoading ||
    isConversationError ||
    isUserLoading ||
    isUserError
  )
    return <ConversationDetailsSkeleton />;

  return (
    <div className="flex-1 flex flex-col bg-gray-50 dark:bg-[#171717] h-full min-h-0">
      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto no-scrollbar">
        {/* Message bubbles, colors updated for dark mode */}
        <GroupChatConversationContainer
          messages={messages}
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
