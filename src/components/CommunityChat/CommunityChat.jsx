import { useEffect, useRef, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatHeader from "./ChatHeader";
import { useCommunityStore } from "@/store/communityStore";
import { useProfile } from "@/hooks/auth.hook";
import { toast } from "sonner";
import { useGetCommunityConversations } from "@/hooks/community.hook";
import { LuSend } from "react-icons/lu";

const CommunityChat = () => {
  const { selectedCreatorCommunity } = useCommunityStore();
  const token = localStorage.getItem("token");
  const { data: user } = useProfile();

  const communityUsername = selectedCreatorCommunity?.username;
  const { data: conversationData, isLoading: isHistoryLoading } = useGetCommunityConversations(communityUsername);

  const [messages, setMessages] = useState([]);
  const [isWsError, setIsWsError] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const ws = useRef(null);

  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    try {
      return new Date(timeStr).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return timeStr;
    }
  };

  // Unify history messages with state
  useEffect(() => {
    if (conversationData?.messages) {
      const mappedHistory = conversationData.messages.map(msg => ({
        id: msg.id,
        text: msg.message,
        sender: msg.sender_username === user?.username ? "me" : "other",
        senderUsername: msg.sender_username,
        timestamp: formatTime(msg.timestamp)
      }));
      setMessages(mappedHistory);
      setShouldScrollToBottom(true);
      // Immediate scroll for history
      setTimeout(() => scrollToBottom("auto"), 100);
    }
  }, [conversationData, user?.username]);

  const handleNewMessages = (data) => {
    if (!data?.message) return;

    const senderUsername = data.user;
    const isMe = senderUsername === user?.username;

    const mappedMsg = {
      id: Date.now() + Math.random(),
      text: data.message,
      sender: isMe ? "me" : "other",
      senderUsername: senderUsername || "Unknown",
      timestamp: formatTime(data.timestamp),
    };

    setMessages((prev) => [...prev, mappedMsg]);
    setShouldScrollToBottom(true);
  };

  // WebSocket Connection
  useEffect(() => {
    if (!communityUsername || !token) return;

    ws.current = new WebSocket(
      `wss://darrenchua.softvencealpha.com/ws/${communityUsername}/?token=${token}`
    );

    ws.current.onopen = () => setIsWsError(false);

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        handleNewMessages(data);
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };

    ws.current.onclose = () => {
      if (ws.current?.readyState === WebSocket.CLOSED) {
        setIsWsError(true);
      }
    };

    return () => {
      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
    };
  }, [communityUsername, token, user?.username]);

  useEffect(() => {
    if (shouldScrollToBottom) {
      scrollToBottom();
      setShouldScrollToBottom(false);
    }
  }, [messages, shouldScrollToBottom]);

  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) return messages;
    return messages.filter((m) =>
      m.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.senderUsername.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [messages, searchQuery]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      toast.error("Network error, restoring connection...");
      return;
    }

    ws.current.send(JSON.stringify({ message: newMessage }));
    setNewMessage("");
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const messageVariants = {
    hidden: (message) => ({
      opacity: 0,
      y: 10,
      scale: 0.95,
    }),
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-80px)] bg-gray-50 dark:bg-zinc-950">
      <ChatHeader
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-hide">
        {isHistoryLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003933]"></div>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {filteredMessages.map((message) => (
              <motion.div
                key={message.id}
                variants={messageVariants}
                custom={message}
                initial="hidden"
                animate="visible"
                layout
                className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex flex-col ${message.sender === "me" ? "items-end" : "items-start"} max-w-[80%] sm:max-w-md`}>
                  <span className="text-[10px] font-medium text-gray-500 dark:text-zinc-500 mb-1 px-1">
                    {message.senderUsername}
                  </span>

                  <div
                    className={`py-2 px-4 rounded-2xl text-sm shadow-sm ${message.sender === "me"
                        ? "bg-[#003933] text-white rounded-tr-none"
                        : "bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 rounded-tl-none border border-gray-100 dark:border-zinc-700"
                      }`}
                  >
                    {message.text}
                  </div>

                  <span className="text-[10px] text-gray-400 dark:text-zinc-600 mt-1 px-1">
                    {message.timestamp}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800">
        <div className="flex gap-2 max-w-4xl mx-auto items-center bg-gray-50 dark:bg-zinc-800 p-2 rounded-2xl border border-gray-200 dark:border-zinc-700">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none dark:text-white"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSendMessage}
            className="p-2 bg-[#003933] text-white rounded-xl hover:bg-[#002822] transition-colors shadow-lg"
          >
            <LuSend size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;
