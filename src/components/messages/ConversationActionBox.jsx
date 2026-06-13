import { AnimatePresence, motion } from "framer-motion";
import formatFileSize from "@/lib/formatFileSize";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { Loader } from "lucide-react";
import { FiImage } from "react-icons/fi";
import { LuFile, LuX } from "react-icons/lu";
import MessageRequestConfirmation from "./MessageRequestConfirmation";
import EmojiPicker, { Theme } from "emoji-picker-react";


const ConversationActionBox = ({
  selectedChat,
  setSelectedChat,
  sender,
  handleSendMessage: hs,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [totalAttachments, setTotalAttachments] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);



  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const isMessageRequest = selectedChat?.requested_at


  // Remove an attachment by id
  const handleRemoveAttachment = (attachmentId) => {
    setAttachments(
      attachments.filter((attachment) => attachment.id !== attachmentId)
    );
  };
  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  // Send on Enter keypress
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Attachment upload logic and UI
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
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
    if (inputRef.current) inputRef.current.focus();
  };

  // Send text or file message, reset input on send

  const handleSendMessage = () => {
    if (newMessage.trim() === "" && attachments.length === 0) return;
    // const newId = messages.length
    //   ? Math.max(...messages.map((m) => m.id)) + 1
    //   : 1;
    // setMessages([
    //   ...messages,
    //   {
    //     id: newId,
    //     // sender_id: 18,
    //     // sender_username: "yo5",
    //     // recipient_id: 15,
    //     // recipient_username: "yo",
    //     content: newMessage,
    //     created_at: new Date().toLocaleTimeString([], {
    //       hour: "2-digit",
    //       minute: "2-digit",
    //     }),
    //     attachments: [...attachments],
    //   },
    // ]);
    setNewMessage("");
    setAttachments([]);
    if (inputRef.current) inputRef.current.focus();
    hs({ content: newMessage })
  };

  return (
    <AnimatePresence mode="wait">
      {isMessageRequest ? (
        // Request Acceptance Section (dark mode colors)
        <MessageRequestConfirmation
          sender={sender}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
      ) : (
        // Regular Message Input (dark mode colors)
        <motion.div
          key="message-input"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 bg-card dark:bg-card border-t border-border dark:border-border"
        >
          {/* Attachments preview section */}
          {(attachments.length > 0 || isUploading) && (
            <div className="mb-3 flex flex-wrap gap-2">
              {isUploading &&
                Array.from({ length: totalAttachments }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-accent dark:bg-accent/50 p-2 rounded-md border border-border dark:border-border flex items-center gap-2"
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
                      className="w-16 h-12 object-cover border border-gray-200 dark:border-zinc-800 rounded-lg"
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
                    className="pl-2 pr-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 flex items-center gap-2 group relative"
                  >
                    <LuFile className="text-muted-foreground dark:text-muted-foreground" />
                    <div>
                      <p className="text-sm max-w-xs truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
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
          {/* Input and functional buttons, dark variants updated */}
          <div className="flex gap-2 items-center">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Write a message..."
              className="flex-1 px-4 py-2 border border-border dark:border-border rounded-lg bg-gray-50 dark:bg-zinc-800/50 text-foreground dark:text-foreground placeholder-muted-foreground dark:placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {/* Hidden file input for attachments */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              multiple
            />
            {/* File/emoji/etc controls, all dark mode hover colors fixed */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAttachmentClick}
              className="p-2 text-muted-foreground dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800/50 rounded-lg transition-colors"
              disabled={isUploading}
            >
              <FiImage className="w-5 h-5" />
            </motion.button>
            <div className="relative flex items-center">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="hidden sm:block p-2 text-muted-foreground dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800/50 rounded-lg transition-colors"
              >
                {/* Emoji Icon SVG */}
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

              {showEmojiPicker && (
                <div className="absolute bottom-full right-0 mb-2 z-50">
                  <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    theme={Theme.DARK}
                    lazyLoadEmojis={true}
                  />
                </div>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              className="p-2 sm:px-4 sm:py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2"
            >
              <svg
                className="w-5 h-5 sm:w-4 sm:h-4"
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
              <span className="hidden sm:block text-sm font-medium">Send</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConversationActionBox;
