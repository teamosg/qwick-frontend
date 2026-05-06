import { AnimatePresence, motion } from "framer-motion";
import { FiImage } from "react-icons/fi";
import { LuFile } from "react-icons/lu";
import AvatarUser from "../ui/AvatarUser";
import formatFileSize from "@/lib/formatFileSize";
import { useEffect, useRef } from "react";

const GroupChatConversationContainer = ({ messages, user, members }) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView();
    }, [messages]);

    return (
        <>
            <AnimatePresence>
                {messages.map((message) => {
                    // FIXED: fetch sender using username, not sender_id
                    const senderData = members[message.sender_username];

                    // detect if message is from current logged-in user
                    const isCurrentUser = message.sender_username === user?.username;

                    return (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`mb-4 flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                        >
                            <div className="relative max-w-[85%] sm:max-w-md flex items-center gap-2 sm:gap-3">

                                {/* LEFT avatar */}
                                {!isCurrentUser && (
                                    <AvatarUser
                                        src={senderData?.avatar}
                                        alt={senderData?.username}
                                        className="w-8 h-8"
                                    />
                                )}

                                <div>
                                    <div
                                        className={`py-3 px-4 rounded-2xl text-sm ${isCurrentUser
                                            ? "bg-blue-500 text-white"
                                            : "bg-white dark:bg-[#232323] text-gray-900 dark:text-white"
                                            } ${message.isCard ? "border border-blue-300" : ""}`}
                                    >
                                        {/* Attachments */}
                                        {message.attachments?.length > 0 && (
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

                                                        <div className="ml-2 flex-1 max-w-[200px] sm:max-w-[330px]">
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

                                    {/* Timestamp & Read */}
                                    <div
                                        className={`${isCurrentUser ? "text-right" : "text-left"} mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1`}
                                    >
                                        <span>{message.timestamp}</span>

                                        {message.isRead && (
                                            <div className="flex items-center">
                                                <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <svg className="w-3 h-3 text-blue-500 -ml-1" fill="currentColor" viewBox="0 0 20 20">
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

                                {/* RIGHT avatar (me) */}
                                {isCurrentUser && (
                                    <AvatarUser
                                        src={user?.avatar}
                                        alt={user?.full_name}
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

export default GroupChatConversationContainer;
