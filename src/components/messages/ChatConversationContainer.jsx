import { AnimatePresence, motion } from "framer-motion";
import { FiImage } from "react-icons/fi";
import { LuFile } from "react-icons/lu";
import AvatarUser from "../ui/AvatarUser";
import formatFileSize from "@/lib/formatFileSize";
import { useEffect } from "react";
import { useRef } from "react";

const ChatConversationContainer = ({ messages, sender, user }) => {
  const { sender_id, sender_avatar, sender_username } = sender;

  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);


  return (
    <>
      <AnimatePresence>
        {messages.map((message) => {
          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 flex ${message?.sender_id === sender_id
                  ? "justify-start"
                  : "justify-end"
                }`}
            >
              <div className="relative max-w-md flex items-center gap-3">
                {message?.sender_id === sender_id && (
                  <AvatarUser
                    src={sender_avatar}
                    alt={sender_username}
                    className="w-8 h-8"
                  />
                )}
                <div>
                  <div
                    className={`py-3 px-4 rounded-2xl text-sm ${message.sender_id !== sender_id
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-[#232323] text-gray-900 dark:text-white"
                      } ${message.isCard ? "border border-blue-300" : ""}`}
                  >
                    {/* File attachments in message */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mb-2">
                        {message.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="flex items-center p-2 mb-2 bg-white dark:bg-[#282828] rounded-md border border-gray-200 dark:border-[#282828]"
                          >
                            <div className="p-2 bg-gray-100 dark:bg-[#171717] rounded-md">
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
                    {message.content}
                  </div>
                  <div
                    className={`${message.sender === "me" ? "text-right" : "text-left"
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
                {message.sender_id !== sender_id && (
                  <AvatarUser
                    src={user?.avatar}
                    alt={user?.first_name}
                    className="w-8 h-8"
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </>
  );
};

export default ChatConversationContainer;
