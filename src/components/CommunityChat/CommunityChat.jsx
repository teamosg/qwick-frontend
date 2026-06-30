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
  const { selectedCreatorCommunity, selectedBrandCommunity } = useCommunityStore();
  const community = selectedCreatorCommunity || selectedBrandCommunity;
  const token = localStorage.getItem("token");
  const { data: user } = useProfile();

  const communityUsername = community?.username;
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

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 128)}px`;
    }
  }, [newMessage]);

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
    <div className="flex-1 flex flex-col w-full min-h-0 bg-white dark:bg-zinc-950 relative overflow-hidden">
      {/* Header Area */}
      <div className="flex-none sticky top-0 z-10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800">
        <ChatHeader
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {/* Messages Area - flex-1 with its own scrollbar */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 no-scrollbar bg-gray-50/30 dark:bg-transparent">
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
                <div className={`flex flex-col ${message.sender === "me" ? "items-end" : "items-start"} max-w-[85%] sm:max-w-[70%]`}>
                  {message.sender !== "me" && (
                    <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 mb-1 px-1 uppercase tracking-tight">
                      {message.senderUsername}
                    </span>
                  )}

                  <div
                    className={`py-2.5 px-4 rounded-2xl text-sm shadow-sm transition-all ${message.sender === "me"
                      ? "bg-foreground-strong dark:bg-accent text-white rounded-tr-none shadow-foreground-strong/10"
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
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="flex-none p-4 sm:p-6 bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-center bg-gray-50 dark:bg-zinc-900/50 p-2 rounded-2xl border border-gray-200 dark:border-zinc-800 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-foreground-muted transition-all duration-300">
            <textarea
              ref={inputRef}
              rows={1}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-transparent py-2.5 px-3 text-sm focus:outline-none dark:text-white placeholder:text-gray-400 resize-none min-h-[44px] max-h-32 custom-scrollbar"
              style={{ height: 'auto' }}
            />
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="ml-2 p-3 bg-foreground-strong dark:bg-accent text-white rounded-xl hover:bg-foreground dark:hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
            >
              <LuSend size={20} />
            </motion.button>
          </div>
          <p className="mt-2 text-[10px] text-center text-gray-400 dark:text-zinc-500">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;
