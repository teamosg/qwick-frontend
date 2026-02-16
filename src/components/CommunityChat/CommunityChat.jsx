import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatHeader from "./ChatHeader";
import { useCommunityStore } from "@/store/communityStore";
import { useProfile } from "@/hooks/auth.hook";
import { toast } from "sonner";
import { useGetCommunityConversations } from "@/hooks/community.hook";
import { LuSend } from "react-icons/lu";
import ChatSkeleton from "./ChatSkeleton";

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
    } catch {
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

  const handleNewMessages = useCallback((data) => {
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
  }, [user?.username]);

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
  }, [communityUsername, token, user?.username, handleNewMessages]);

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
    hidden: () => ({
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
    <div className="flex flex-col w-full h-full bg-gray-50 dark:bg-zinc-950 relative overflow-hidden">
      <div className="flex-shrink-0">
        <ChatHeader
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-4 no-scrollbar">
        {isHistoryLoading ? (
          <ChatSkeleton />
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
                <div className={`flex flex-col ${message.sender === "me" ? "items-end" : "items-start"} max-w-[85%] sm:max-w-md`}>
                  <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 mb-1 px-1 uppercase tracking-tight">
                    {message.senderUsername}
                  </span>

                  <div
                    className={`py-2 px-4 rounded-2xl text-sm shadow-sm transition-all ${message.sender === "me"
                      ? "bg-[#003933] text-white rounded-tr-none"
                      : "bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-200 rounded-tl-none border border-gray-100 dark:border-zinc-800"
                      }`}
                  >
                    <p className="whitespace-pre-wrap break-words leading-relaxed">
                      {message.text}
                    </p>
                  </div>

                  <span className="text-[9px] font-medium text-gray-400 dark:text-zinc-600 mt-1 px-1">
                    {message.timestamp}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} className="h-2" />
      </div>

      <div className="p-3 sm:p-4 bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900">
        <div className="max-w-4xl mx-auto flex gap-2 items-center bg-gray-50 dark:bg-zinc-900 px-4 py-2 rounded-2xl border border-gray-200 dark:border-zinc-800 transition-all focus-within:ring-2 focus-within:ring-[#003933]/10 focus-within:border-[#003933]">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-transparent py-2 text-sm focus:outline-none dark:text-white placeholder:text-gray-400"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-2 sm:p-2.5 bg-[#003933] text-white rounded-xl hover:bg-[#002822] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95"
          >
            <LuSend size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;
