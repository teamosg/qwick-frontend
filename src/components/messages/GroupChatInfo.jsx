import { X, Edit2, UserPlus, LogOut } from "lucide-react";
import AvatarUser from "../ui/AvatarUser";
import { useState } from "react";
import { useLeaveGroup } from "@/hooks/conversations.hook";
import AddMemberToGroupModal from "./AddMemberToGroupModal";
import LeaveGroupModal from "./components/LeaveGroupModal";
import UpdateGroupModal from "./components/UpdateGroupModal";

/**
 * GroupChatInfo shows group details including members, notifications toggle,
 * and actions like rename, add user, leave, and remove member?.
 * Dark mode colors updated for consistency.
 */
const GroupChatInfo = ({ selectedChat, onClose, setSelectedChat }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openLeaveModal, setOpenLeaveModal] = useState(false);

  const { mutate: leaveGroup, isPending: isLeaving } = useLeaveGroup();



  const members = selectedChat?.members || [];

  // Placeholder handlers for future features
  // const handleRename = () => {
  //   toast.success("Rename feature coming soon!");
  // };

  const handleAddUser = () => {
    setOpenModal(true);
  };

  const handleLeave = () => {
    setOpenLeaveModal(true);
  };

  const confirmLeave = () => {
    leaveGroup(
      { groupId: selectedChat?.group_id },
      {
        onSuccess: () => {
          setOpenLeaveModal(false);
          onClose(); // Close sidebar
          setSelectedChat(null); // Clear selected chat
        },
      }
    );
  };

  // const handleRemoveMember = (memberName) => {
  //   toast.error(`Remove ${memberName} feature coming soon!`);
  // };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-900 text-gray-900 dark:text-white">
      {/* Header with close button and group avatar + name */}
      <div className="relative p-6 border-b border-gray-200 dark:border-zinc-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          aria-label="Close group info"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>

        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <AvatarUser
              src={selectedChat?.avatar || selectedChat?.group_avatar}
              alt={selectedChat?.name || selectedChat?.group_name}
              className="w-20 h-20 rounded-full"
            />
          </div>
          <h2 className="text-lg font-semibold text-center">{selectedChat.name || selectedChat?.group_name}</h2>
        </div>
      </div>

      {/* Action Buttons: Rename, Add User, Leave */}
      <div className="grid grid-cols-3 gap-3 p-4 border-b border-gray-200 dark:border-zinc-800">
        <button
          onClick={() => setOpenUpdateModal(true)}
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Rename group"
        >
          <Edit2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Edit
          </span>
        </button>

        <button
          onClick={handleAddUser}
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Add user to group"
        >
          <UserPlus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Add user
          </span>
        </button>

        <button
          onClick={handleLeave}
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Leave group"
        >
          <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
          <span className="text-xs font-medium text-red-700 dark:text-red-300">
            Leave
          </span>
        </button>
      </div>

      {/* Notifications Toggle */}
      {/* <div className="p-4 border-b border-gray-200 dark:border-zinc-800">
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
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notificationsEnabled
                ? "bg-blue-600"
                : "bg-gray-300 dark:bg-gray-600"
              }`}
            aria-pressed={notificationsEnabled}
            aria-label="Toggle notifications"
          >
            <motion.span
              layout
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationsEnabled ? "translate-x-6" : "translate-x-1"
                }`}
            />
          </button>
        </div>
      </div> */}

      {/* Members List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            {members.length} members
          </h3>
          <div className="space-y-1">
            {members.map((member) => (
              <div
                key={member?.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <AvatarUser
                    src={member?.avatar}
                    alt={member?.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {member?.username}
                    </h4>
                    {/* role  */}
                    {/* {index === 0 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {member?.role}
                      </span>
                    )} */}
                  </div>
                </div>
                {/* remove button  */}
                {/* {index !== 0 && (
                  <button
                    onClick={() => handleRemoveMember(member?.name)}
                    className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    aria-label={`Remove ${member?.name}`}
                  >
                    Remove
                  </button>
                )} */}
              </div>
            ))}
          </div>
        </div>
      </div>

      <UpdateGroupModal
        isOpen={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />

      <LeaveGroupModal
        isOpen={openLeaveModal}
        onClose={() => setOpenLeaveModal(false)}
        onConfirm={confirmLeave}
        isLeaving={isLeaving}
      />


      <AddMemberToGroupModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        existingMembers={members}
        selectedChat={selectedChat}
      />
    </div>
  );
};

export default GroupChatInfo;
