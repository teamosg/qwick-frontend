import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "lucide-react";
import { FiImage } from "react-icons/fi";
import { LuFile, LuPaperclip, LuSend, LuX } from "react-icons/lu";
import ChatHeader from "./ChatHeader";
import { useCommunityStore } from "@/store/communityStore";
import { useProfile } from "@/hooks/auth.hook";
import { toast } from "sonner";
import { axiosPrivate } from "@/lib/axios.config";

const CommunityChat = () => {
  const { selectedCreatorCommunity } = useCommunityStore();
  const token = localStorage.getItem("token");
  const { data: user } = useProfile();

  const [messages, setMessages] = useState([]);
  const [isWsError, setIsWsError] = useState(false);

  // Store user profiles: { "username": { avatar, ... }, ... }
  const [userProfiles, setUserProfiles] = useState({});

  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [totalAttachments, setTotalAttachments] = useState(0);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const ws = useRef(null);

  // Initialize my profile in the map
  useEffect(() => {
    if (user?.username) {
      setUserProfiles((prev) => ({
        ...prev,
        [user.username]: user
      }));
    }
  }, [user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchUserProfile = async (username) => {
    if (!username || userProfiles[username]) return;

    try {
      const res = await axiosPrivate.get(`/v1/account/profile/${username}/`);
      if (res.data?.success && res.data?.data) {
        // Adjust avatar URL if needed (User mentioned 'implemented in this project already', usually standard)
        // Check if avatar needs domain prepending. The user's sample user response showed `/media/...`
        // Existing code used `https://darrenchua.softvencealpha.com` prefix logic in useProfile, let's replicate if needed.
        // Or assume the endpoint returns usable URL. Let's strictly follow the example response data structure.
        const profileData = res.data.data;
        if (profileData.avatar && !profileData.avatar.startsWith("http")) {
          profileData.avatar = "https://darrenchua.softvencealpha.com" + profileData.avatar;
        }

        setUserProfiles((prev) => ({
          ...prev,
          [username]: profileData,
        }));
      }
    } catch (error) {
      console.error(`Failed to fetch profile for ${username}:`, error);
      // Optional: Set a flag to avoid retrying immediately
    }
  };

  const handleNewMessages = (data) => {
    if (!data?.message) return;

    const senderUsername = data.user;

    // Lazy load profile if not present (and not 'me' which is already loaded)
    if (senderUsername && senderUsername !== user?.username && !userProfiles[senderUsername]) {
      fetchUserProfile(senderUsername);
    }

    const isMe = senderUsername === user?.username;

    const mappedMsg = {
      id: Date.now() + Math.random(),
      text: data.message,
      sender: isMe ? "me" : "other",
      senderUsername: senderUsername || "Unknown", // Store username to look up profile later
      timestamp: data.timestamp
        ? new Date(data.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
        : new Date().toLocaleTimeString(),
      reaction: null,
      attachments: [],
    };

    setMessages((prevMessages) => [...prevMessages, mappedMsg]);
    setShouldScrollToBottom(true);
  };

  // WebSocket Connection
  useEffect(() => {
    if (!selectedCreatorCommunity?.username || !token) return;

    setMessages([]);

    ws.current = new WebSocket(
      `wss://darrenchua.softvencealpha.com/ws/${selectedCreatorCommunity.username}/?token=${token}`
    );

    ws.current.onopen = () => {
      setIsWsError(false);
    };

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
  }, [selectedCreatorCommunity?.username, token, user?.username]);

  useEffect(() => {
    if (shouldScrollToBottom) {
      scrollToBottom();
      setShouldScrollToBottom(false);
    }
  }, [messages, shouldScrollToBottom]);

  // Filter messages based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredMessages(messages);
    } else {
      const filtered = messages.filter((message) =>
        message.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMessages(filtered);
    }
  }, [messages, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "" && attachments.length === 0) return;

    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      toast.error("Network error, Please try again later");
      return;
    }

    ws.current.send(JSON.stringify({ message: newMessage }));

    setNewMessage("");
    setAttachments([]);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    toast.info("File upload not yet connected to backend.");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveAttachment = (attachmentId) => {
    setAttachments(
      attachments.filter((attachment) => attachment.id !== attachmentId)
    );
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  // UI Variants
  const messageVariants = {
    hidden: (message) => ({
      opacity: 0,
      y: 20,
      x: message.sender === "me" ? 50 : -50,
      scale: 0.8,
    }),
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 220,
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const getAvatar = (username) => {
    const profile = userProfiles[username];
    return profile?.avatar || "/media/avatars/login2_2VTF5Ce.jpg";
  }

  return (
    <div className="flex flex-col w-full h-[calc(100vh-80px)] sm:h-[calc(100vh-80px)]">
      <ChatHeader
        onSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="flex-1 p-2 md:p-4 overflow-y-auto pb-4">
        <AnimatePresence>
          {filteredMessages.map((message, index) => (
            <motion.div
              key={message.id || index}
              variants={messageVariants}
              custom={message}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className={`mb-4 flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div className={`relative max-w-md flex ${message.sender === "me" ? "flex-row-reverse" : "flex-row"} items-start gap-3`}>

                {/* Avatar */}
                {message.sender === "other" && (
                  <img
                    src={getAvatar(message.senderUsername)}
                    alt={message.senderUsername}
                    className="w-8 h-8 rounded-full mt-1"
                  />
                )}

                <div className={`flex flex-col ${message.sender === "me" ? "items-end" : "items-start"}`}>
                  {/* Username on top */}
                  <span className="text-xs text-gray-500 mb-1 ml-1">
                    {message.senderUsername}
                  </span>

                  {/* Message Bubble */}
                  <div
                    className={`py-3 px-4 rounded-xl text-black dark:text-[#d2e5f5] text-sm ${message.sender === "me"
                        ? "bg-[#5050fa] dark:bg-blue-900/90 rounded-br-none text-white"
                        : "bg-[#f0f2f5] dark:bg-slate-800 rounded-bl-none text-[#1D2739]"
                      }`}
                  >
                    {/* Attachments (Commented out/Hidden logic but kept in code structure if needed later) */}
                    {/* 
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mb-2">
                        {message.attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center p-2 mb-2 bg-white rounded-md border border-gray-200 dark:bg-slate-800 dark:border-slate-700">
                             ... attachment UI ...
                             <div className="p-2 bg-gray-100 dark:bg-slate-900 rounded-md">
                               {attachment.type.includes("image/") ? (
                                 <FiImage size={16} />
                               ) : (
                                 <LuFile size={16} />
                               )}
                             </div>
                             <div className="ml-2 flex-1 max-w-[330px]">
                               <span className="text-xs break-words  font-medium">
                                 {attachment.name}
                               </span>
                               <p className="text-xs dark:text-[#d2e5f5]/70 text-gray-500">
                                 {formatFileSize(attachment.size)}
                               </p>
                             </div>
                          </div>
                        ))}
                      </div>
                    )} 
                    */}

                    {message.text}
                  </div>

                  {/* Time under message */}
                  <span className="text-[10px] text-gray-400 mt-1 mx-1">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="sticky bottom-0 bg-white dark:bg-slate-900 dark:border-slate-700 px-6 py-2 border border-border rounded-full shadow mx-2 md:mx-4 mb-2">
        {/* Attachments preview (Hidden) */}
        {/* 
        {(attachments.length || isUploading) && (
          <div className="mb-2 flex flex-wrap gap-2">
             ... ui code for attachments preview ...
             {isUploading &&
               Array.from({ length: totalAttachments }).map((_, index) => (
                 <div
                   key={index}
                   className="bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-[#d2e5f5] p-2 rounded-md border border-gray-200 flex items-center gap-2"
                 >
                   <Loader className="animate-spin" size={16} />
                   <span className="text-sm">Uploading...</span>
                 </div>
               ))}
 
             {attachments.map((file) =>
               file.type.startsWith("image/") ? (
                 <div key={file.id} className="relative group">
                   <img
                     src={file.url}
                     alt={file.name}
                     className="w-[80px] object-cover h-[60px] dark:border-slate-700 border border-border p-1 rounded-lg"
                   />
 
                   <button
                     onClick={() => handleRemoveAttachment(file.id)}
                     className="p-1 invisible dark:bg-slate-700 dark:text-[#d2e5f5] group-hover:visible absolute top-0 right-0 bg-gray-100 hover:bg-gray-200 rounded-full scale-[0.8] group-hover:scale-100 transition-all duration-200 ease-in"
                   >
                     <LuX size={14} />
                   </button>
                 </div>
               ) : (
                 <div
                   key={file.id}
                   className="pl-2 pr-3.5 py-2 dark:border-slate-700 rounded-lg border border-border flex items-center gap-2 group relative"
                 >
                   <LuFile className="text-[2.2rem] text-gray-600 dark:text-[#d2e5f5]/70" />
                   <div>
                     <p className="text-sm dark:text-[#d2e5f5] max-w-xs truncate">
                       {file.name}
                     </p>
                     <p className="text-xs mt-0.5 dark:text-[#d2e5f5]/70 text-gray-500">
                       {formatFileSize(file.size)}
                     </p>
                   </div>
                   <button
                     onClick={() => handleRemoveAttachment(file.id)}
                     className="p-1 invisible dark:bg-slate-700 dark:text-[#d2e5f5] group-hover:visible scale-[0.8] group-hover:scale-100 transition-all duration-200 absolute top-0 right-0 bg-gray-100 hover:bg-gray-200 rounded-full ease-in"
                   >
                     <LuX size={14} />
                   </button>
                 </div>
               )
             )}
          </div>
        )} 
        */}

        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-[70%] md:flex-1 pr-4 py-1 border-none dark:bg-transparent dark:text-[#d2e5f5] focus:outline-none focus:ring-0"
          />

          {/* Hidden file input (Commented out) */}
          {/* <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            multiple
          /> */}

          {/* File attachment button (Hidden) */}
          {/* <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAttachmentClick}
            className="bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-[#d2e5f5] dark:hover:bg-slate-600/50 min-w-[30px] p-2.5 rounded-full hover:bg-gray-200 flex items-center justify-center focus:outline-none"
            disabled={isUploading}
          >
            <LuPaperclip size={18} />
          </motion.button> */}

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            className="bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-[#d2e5f5] dark:hover:bg-slate-600/50 min-w-[30px] p-2.5 rounded-full hover:bg-gray-200 flex items-center justify-center focus:outline-none"
          >
            <LuSend size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;
