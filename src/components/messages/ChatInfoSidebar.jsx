import { motion, AnimatePresence } from "framer-motion";
import GroupChatInfo from "./GroupChatInfo";
import DirectChatInfo from "./DirectChatInfo";

const ChatInfoSidebar = ({ isOpen, onClose, selectedChat, setSelectedChat }) => {
  if (!selectedChat) return null;
  const isGroupChat = selectedChat.type === "group";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-80 bg-white dark:bg-zinc-900 border-l border-gray-200 dark:border-zinc-800 z-50 flex flex-col overflow-hidden"
          >
            {isGroupChat ? (
              <GroupChatInfo selectedChat={selectedChat} onClose={onClose} setSelectedChat={setSelectedChat} />
            ) : (
              <DirectChatInfo selectedChat={selectedChat} onClose={onClose} setSelectedChat={setSelectedChat} />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatInfoSidebar;
