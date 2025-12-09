import { X, Phone, Video, Mail, Bell, BellOff, UserX } from "lucide-react";
import { motion } from "framer-motion";
import AvatarUser from "../ui/AvatarUser";
import { UserCheck } from "lucide-react";
import { useBlockUser, useUnBlockUser } from "@/hooks/conversations.hook";

/**
 * DirectChatInfo displays details of a direct chat user,
 * including notification toggle, contact info, and block user button.
 * Dark mode colors updated for consistency.
 */
const DirectChatInfo = ({ selectedChat, setSelectedChat, onClose }) => {
  const { mutate: blockUser } = useBlockUser();
  const { mutate: unblockUser } = useUnBlockUser();
  // const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { avatar, blocked, user_id, group_id } = selectedChat;
  const username = selectedChat?.sender_username || selectedChat?.username;

  const handleBlockUser = () => {
    blockUser({
      userId: user_id ?? group_id,
    }, {
      onSuccess: () => {
        setSelectedChat({ ...selectedChat, blocked: true });
      }
    });
  };

  const handleUnblockUser = () => {
    unblockUser({
      userId: user_id ?? group_id,
    }, {
      onSuccess: () => {
        setSelectedChat({ ...selectedChat, blocked: false });
      }
    });
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#171717] text-gray-900 dark:text-white">
      {/* Header with avatar, status, and close button */}
      <div className="relative p-6 border-b border-gray-200 dark:border-[#282828]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-[#282828] rounded-lg transition-colors"
          aria-label="Close chat info"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>

        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <AvatarUser
              src={avatar}
              alt={username}
              className="w-20 h-20 rounded-full object-cover text-2xl"
            />
            {selectedChat.isOnline && (
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-[#171717] rounded-full"></div>
            )}
          </div>
          <h2 className="text-lg font-semibold text-center">{username}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {selectedChat.isOnline ? "Active now" : "Offline"}
          </p>
        </div>
      </div>

      {/* //* Notification Toggle */}
      {/* <div className="p-4 border-b border-gray-200 dark:border-[#282828]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {notificationsEnabled ? (
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <BellOff className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Notifications
            </span>
          </div>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notificationsEnabled
                ? "bg-blue-600"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
            aria-pressed={notificationsEnabled}
            aria-label="Toggle notifications"
          >
            <motion.span
              layout
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationsEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div> */}

      {/* User Information: About, Email, Shared Media */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {/* About */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
              About
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Available for chat
            </p>
          </div>

          {/* //* Email */}
          {/* <div>
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
              Email
            </h3>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                emma.johnson@example.com
              </p>
            </div>
          </div> */}

          {/* Shared Media */}
          {/* //* <div>
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
              Shared Media
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-200 dark:bg-[#282828] rounded-lg"
                ></div>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {/* Block User Button */}
      <div className="p-4 border-t border-gray-200 dark:border-[#282828]">
        {
          blocked ? (
            <button
              onClick={handleUnblockUser}
              className="
              w-full flex items-center justify-center gap-2
              px-4 py-3 rounded-xl font-semibold
              text-green-600 dark:text-green-400
              bg-green-50/50 dark:bg-green-900/10
              hover:bg-green-100 dark:hover:bg-green-900/20
              transition-all"
              aria-label="Unblock user"
            >
              <UserCheck className="w-5 h-5" />
              Unblock User
            </button>
          ) : (
            <button
              onClick={handleBlockUser}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium"
              aria-label="Block user"
            >
              <UserX className="w-5 h-5" />
              Block User
            </button>
          )
        }
      </div>
    </div>
  );
};

export default DirectChatInfo;
