import { X, Search, ArrowLeft, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import AvatarUser from "../ui/AvatarUser";
import { useCreateConversationGroup } from "@/hooks/conversations.hook";
import { Spinner } from "../ui/spinner"

const CreateGroupModal = ({ fetchedConversationList, isOpen, onClose, onSelectChat }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [nameError, setNameError] = useState(false);

  const { mutateAsync: createConversationGroup, isPending: isCreating } = useCreateConversationGroup();

  const suggestedUsers = fetchedConversationList?.filter(conversation => conversation?.type === 'dm') || [];
  const filteredUsers = suggestedUsers.filter(
    user => user?.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUserSelection = (user_id) => {
    setSelectedUsers((prev) =>
      prev.includes(user_id)
        ? prev.filter((id) => id !== user_id)
        : [...prev, user_id]
    );
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      setNameError(true);
      return;
    }

    if (selectedUsers.length === 0) return;

    const res = await createConversationGroup({
      name: groupName,
      members: selectedUsers,
    })

    if (res?.success) {

      const chat = {
        type: 'group',
        group_id: res?.group_id,
        group_name: res?.group_name,
        last_message: "",
        last_message_at: null,
        pinned: false
      }

      onSelectChat(chat)
      setSelectedUsers([])
      setGroupName("")
      setNameError(false)
      onClose()
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md max-h-[600px] flex flex-col">

              {/* Header */}
              <div className="p-4 border-b border-qwick-gray-200 dark:border-qwick-gray-800 flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-qwick-gray-100 dark:hover:bg-qwick-gray-800 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-muted-foreground dark:text-qwick-gray-400" />
                </button>
                <h2 className="text-lg font-semibold text-foreground dark:text-white flex-1">
                  New Group Chat
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-qwick-gray-100 dark:hover:bg-qwick-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground dark:text-qwick-gray-400" />
                </button>
              </div>

              {/* NEW: Group Name Input */}
              <div className="p-4 border-b border-qwick-gray-200 dark:border-qwick-gray-800">
                <input
                  type="text"
                  placeholder="Group name"
                  value={groupName}
                  onChange={(e) => {
                    setGroupName(e.target.value);
                    if (nameError) setNameError(false);
                  }}
                  className={`w-full px-3 py-2 text-sm border rounded-lg bg-qwick-gray-50 dark:bg-qwick-gray-900 text-foreground dark:text-white 
                    ${nameError ? "border-red-500 focus:ring-red-500" : "border-qwick-gray-300 dark:border-qwick-gray-800"}
                    focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              {/* Search Bar */}
              <div className="p-4 border-b border-qwick-gray-200 dark:border-qwick-gray-800">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-qwick-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-qwick-gray-300 dark:border-qwick-gray-800 rounded-lg bg-qwick-gray-50 dark:bg-qwick-gray-900 text-foreground dark:text-white placeholder-qwick-gray-500 dark:placeholder-qwick-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {selectedUsers.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3"
                  >
                    <p className="text-sm text-qwick-gray-600 dark:text-qwick-gray-400">
                      {selectedUsers.length} member{selectedUsers.length !== 1 ? "s" : ""} selected
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Suggested Users */}
              <div className="flex-1 overflow-y-auto p-4">
                <h3 className="text-sm font-medium text-muted-foreground dark:text-qwick-gray-400 mb-3">
                  Suggested
                </h3>

                <div className="space-y-1">
                  {filteredUsers.map((user) => {
                    const isSelected = selectedUsers.includes(user?.user_id);
                    return (
                      <motion.button
                        key={user?.user_id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => toggleUserSelection(user?.user_id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${isSelected
                          ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                          : "hover:bg-qwick-gray-100 dark:hover:bg-qwick-gray-800"
                          }`}
                      >
                        <AvatarUser
                          src={user?.avatar}
                          alt={user?.username}
                          className="w-10 h-10 rounded-full object-cover"
                        />

                        <div className="flex-1 text-left">
                          <h4 className="font-medium text-sm text-foreground dark:text-white">
                            {user?.username}
                          </h4>
                          <p className="text-xs text-muted-foreground dark:text-qwick-gray-400">
                            {user?.username}
                          </p>
                        </div>

                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected
                            ? "bg-blue-500 border-blue-500"
                            : "border-qwick-gray-300 dark:border-qwick-gray-600"
                            }`}
                        >
                          {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Create button */}
              <div className="p-4 border-t border-qwick-gray-200 dark:border-qwick-gray-800">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreateGroup}
                  disabled={selectedUsers.length === 0 || isCreating}
                  className="w-full px-6 py-3 bg-foreground-strong dark:bg-accent hover:bg-foreground dark:hover:bg-accent/80 text-white rounded-lg font-semibold shadow-md transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  {
                    isCreating
                      ? <p className="max-w-max mx-auto"> <Spinner /></p>
                      : `Create Group (${selectedUsers.length})`
                  }
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreateGroupModal;
