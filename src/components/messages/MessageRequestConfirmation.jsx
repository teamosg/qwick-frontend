import { useConversationRequestAction } from "@/hooks/conversations.hook";
import { motion } from "framer-motion";
import AvatarUser from "../ui/AvatarUser";
import { XCircle, CheckCircle } from "lucide-react";

const MessageRequestConfirmation = ({
  sender,
  selectedChat,
  setSelectedChat,
}) => {
  const conversationId = selectedChat?.id;
  const { sender_avatar, sender_username } = sender;
  const { mutateAsync: mutateRequestAction } = useConversationRequestAction();

  // Handle acceptance of a message request (request type chat)
  const handleAcceptRequest = async () => {
    const res = await mutateRequestAction({
      conversationId,
      action: "accept",
    });

    if (res.success) {
      setSelectedChat({ ...selectedChat, requested_at: null });
    }
  };

  // Do nothing on delete request as per requirements
  const handleDeleteRequest = async () => {
    const res = await mutateRequestAction({
      conversationId,
      action: "decline",
    });

    if (res.success) {
      setSelectedChat(null);
    }
  };

  return (
    <motion.div
      key="request-acceptance"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="p-6 bg-card dark:bg-card border-t border-border dark:border-border"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center border-2 border-blue-200 dark:border-blue-800">
              <AvatarUser
                src={sender_avatar}
                alt={sender_username}
                className={"w-14 h-14 "}
              />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Accept message from {sender_username}?
          </h3>
          <p className="text-sm text-muted-foreground dark:text-muted-foreground leading-relaxed">
            {sender_username} wants to send you a message. You can accept or
            delete this request.
          </p>
        </div>
        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-accent dark:bg-accent/50 rounded-lg p-4 mb-6 border border-border dark:border-border"
        >
          <p className="text-sm text-foreground dark:text-foreground">
            📬 By accepting, you'll be able to chat with {selectedChat.name} and
            they'll know you've seen their message.
          </p>
        </motion.div>
        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDeleteRequest}
            className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-zinc-800 text-foreground dark:text-foreground rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800/50 font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <XCircle className="w-5 h-5" />
            Delete Request
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAcceptRequest}
            className="flex-1 px-6 py-3 bg-foreground-strong dark:bg-accent hover:bg-foreground dark:hover:bg-accent/80 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Accept Request
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageRequestConfirmation;
