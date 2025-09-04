import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FiImage } from "react-icons/fi";
import { LuFile, LuX } from "react-icons/lu";

const ChatBox = ({ selectedChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [totalAttachments, setTotalAttachments] = useState(0);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Sample messages for Emma Johnson (matching the image description)
  const sampleMessages = {
    1: [
      {
        id: 1,
        text: 'Hello, I\'m having an issue with my recent order. It says "Processing" for the past three days. Can you help me check the status?',
        sender: "other",
        senderProfile: {
          name: "Emma Johnson",
          avatar: "https://i.pravatar.cc/40?img=1",
        },
        timestamp: "07:00 AM",
        isRead: true,
      },
      {
        id: 2,
        text: "Hi Emma, thank you for reaching out! Let me check the status of your order for you. Could you please share your order number?",
        sender: "me",
        senderProfile: {
          name: "You",
          avatar: "https://i.pravatar.cc/40?img=10",
        },
        timestamp: "07:10 AM",
        isRead: true,
        isCard: true,
      },
      {
        id: 3,
        text: "Sure, it's #12345.",
        sender: "other",
        senderProfile: {
          name: "Emma Johnson",
          avatar: "https://i.pravatar.cc/40?img=1",
        },
        timestamp: "07:20 AM",
        isRead: true,
      },
      {
        id: 4,
        text: "Thank you! I see that your order is currently being processed by our warehouse team. It should be shipped within the next 24 hours.",
        sender: "me",
        senderProfile: {
          name: "You",
          avatar: "https://i.pravatar.cc/40?img=10",
        },
        timestamp: "07:30 AM",
        isRead: true,
      },
      {
        id: 5,
        text: "That's great, thank you for the quick update!",
        sender: "other",
        senderProfile: {
          name: "Emma Johnson",
          avatar: "https://i.pravatar.cc/40?img=1",
        },
        timestamp: "07:30 AM",
        isRead: true,
      },
    ],
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedChat) {
      setMessages(sampleMessages[selectedChat.id] || []);
      setShouldScrollToBottom(true);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (shouldScrollToBottom) {
      scrollToBottom();
      setShouldScrollToBottom(false);
    }
  }, [messages, shouldScrollToBottom]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "" && attachments.length === 0) return;

    const newId = messages.length
      ? Math.max(...messages.map((m) => m.id)) + 1
      : 1;

    setMessages([
      ...messages,
      {
        id: newId,
        text: newMessage,
        sender: "me",
        senderProfile: {
          name: "You",
          avatar: "https://i.pravatar.cc/40?img=10",
        },
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        attachments: [...attachments],
      },
    ]);

    setNewMessage("");
    setAttachments([]);
    setShouldScrollToBottom(true);
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

    setTotalAttachments(files.length);
    setIsUploading(true);

    setTimeout(() => {
      const newAttachments = files.map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      }));

      setAttachments([...attachments, ...newAttachments]);
      setIsUploading(false);
    }, 1500);

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

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Select a conversation
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Choose a chat from the list to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-800 max-h-full">
      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 flex ${
                message.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="relative max-w-md flex items-center gap-3">
                {message.sender === "other" && (
                  <img
                    src={message.senderProfile?.avatar}
                    alt={message.senderProfile?.name}
                    className="w-8 h-8 rounded-full"
                  />
                )}

                <div>
                  <div
                    className={`py-3 px-4 rounded-2xl text-sm ${
                      message.sender === "me"
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    } ${message.isCard ? "border border-blue-300" : ""}`}
                  >
                    {message.isCard && (
                      <div className="text-xs text-blue-200 mb-1">
                        card message
                      </div>
                    )}

                    {/* File attachments in message */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mb-2">
                        {message.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="flex items-center p-2 mb-2 bg-white rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                          >
                            <div className="p-2 bg-gray-100 dark:bg-gray-900 rounded-md">
                              {attachment.type.includes("image/") ? (
                                <FiImage size={16} />
                              ) : (
                                <LuFile size={16} />
                              )}
                            </div>
                            <div className="ml-2 flex-1 max-w-[330px]">
                              <span className="text-xs break-words font-medium">
                                {attachment.name}
                              </span>
                              <p className="text-xs text-gray-500">
                                {formatFileSize(attachment.size)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {message.text}
                  </div>

                  <div
                    className={`${
                      message.sender === "me" ? "text-right" : "text-left"
                    } mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1`}
                  >
                    <span>{message.timestamp}</span>
                    {message.isRead && (
                      <div className="flex items-center">
                        <svg
                          className="w-3 h-3 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <svg
                          className="w-3 h-3 text-blue-500 -ml-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {message.sender === "me" && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        {/* Attachments preview */}
        {(attachments.length || isUploading) && (
          <div className="mb-3 flex flex-wrap gap-2">
            {isUploading &&
              Array.from({ length: totalAttachments }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 p-2 rounded-md border border-gray-200 dark:border-gray-700 flex items-center gap-2"
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
                    className="w-16 h-12 object-cover border border-gray-200 dark:border-gray-700 rounded-lg"
                  />
                  <button
                    onClick={() => handleRemoveAttachment(file.id)}
                    className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <LuX size={12} />
                  </button>
                </div>
              ) : (
                <div
                  key={file.id}
                  className="pl-2 pr-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-2 group relative"
                >
                  <LuFile className="text-gray-600 dark:text-gray-400" />
                  <div>
                    <p className="text-sm max-w-xs truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveAttachment(file.id)}
                    className="p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <LuX size={14} />
                  </button>
                </div>
              )
            )}
          </div>
        )}

        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Write a message..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            multiple
          />

          {/* File attachment button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAttachmentClick}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            disabled={isUploading}
          >
            <FiImage className="w-5 h-5" />
          </motion.button>

          {/* Link button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </motion.button>

          {/* Emoji button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </motion.button>

          {/* Send button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="text-sm font-medium">Send</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
