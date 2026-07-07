import { X, Search, ArrowLeft, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import AvatarUser from "../ui/AvatarUser";
import { useConversationStore } from "@/store/conversationStore";
import { useAddMemberToGroup } from "@/hooks/conversations.hook";

const AddMemberToGroupModal = ({ isOpen, onClose, existingMembers, selectedChat }) => {
    const { fetchedConversationList } = useConversationStore((state) => state);
    const { mutate: addMemberToGroup, isPending: isAdding } = useAddMemberToGroup()

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);

    // ✅ Only DM users
    const suggestedUsers = useMemo(
        () => fetchedConversationList?.filter(c => c?.type === "dm") || [],
        [fetchedConversationList]
    );

    // ✅ Remove users who are already members
    const availableUsers = useMemo(() => {
        return suggestedUsers.filter(user =>
            !existingMembers?.some(member => member?.id === user?.user_id)
        );
    }, [suggestedUsers, existingMembers]);

    // ✅ Search filtering
    const filteredUsers = useMemo(() => {
        return availableUsers.filter(user =>
            user?.username?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [availableUsers, searchQuery]);

    const toggleUserSelection = (user_id) => {
        setSelectedUsers((prev) =>
            prev.includes(user_id)
                ? prev.filter((id) => id !== user_id)
                : [...prev, user_id]
        );
    };

    // ✅ Only console selected IDs
    const handleAddMembers = () => {
        addMemberToGroup({
            groupId: selectedChat?.group_id,
            members: selectedUsers
        },
            {
                onSuccess: () => {
                    setSelectedUsers([]);
                    onClose();
                }
            }
        )
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
                        <div className="bg-card dark:bg-card rounded-2xl shadow-2xl w-full max-w-md max-h-[600px] flex flex-col">

                            {/* Header */}
                            <div className="p-4 border-b border-qwick-gray-200 dark:border-qwick-gray-800 flex items-center gap-3">
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-accent dark:hover:bg-accent rounded-lg transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5 text-muted-foreground dark:text-muted-foreground" />
                                </button>

                                {/* ✅ Group name from selectedChat */}
                                <h2 className="text-lg font-semibold text-foreground dark:text-foreground flex-1">
                                    {selectedChat?.group_name || "Add Members"}
                                </h2>

                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-accent dark:hover:bg-accent rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-muted-foreground dark:text-muted-foreground" />
                                </button>
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
                                        className="w-full pl-10 pr-4 py-2 text-sm border border-qwick-gray-300 dark:border-qwick-gray-800 rounded-lg bg-qwick-gray-50 dark:bg-qwick-gray-800/50 text-foreground dark:text-foreground placeholder-qwick-gray-500 dark:placeholder-qwick-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {selectedUsers.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="mt-3"
                                    >
                                        <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                                            {selectedUsers.length} member{selectedUsers.length !== 1 ? "s" : ""} selected
                                        </p>
                                    </motion.div>
                                )}
                            </div>

                            {/* Suggested Users */}
                            <div className="flex-1 overflow-y-auto p-4">
                                <h3 className="text-sm font-medium text-muted-foreground dark:text-muted-foreground mb-3">
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
                                                    : "hover:bg-accent dark:hover:bg-accent"
                                                    }`}
                                            >
                                                <AvatarUser
                                                    src={user?.avatar}
                                                    alt={user?.username}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />

                                                <div className="flex-1 text-left">
                                                    <h4 className="font-medium text-sm text-foreground dark:text-foreground">
                                                        {user?.username}
                                                    </h4>
                                                    <p className="text-xs text-muted-foreground dark:text-muted-foreground">
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

                            {/* Add Button */}
                            <div className="p-4 border-t border-qwick-gray-200 dark:border-qwick-gray-800">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAddMembers}
                                    disabled={selectedUsers.length === 0 || isAdding}
                                    className="w-full px-6 py-3 bg-foreground-strong dark:bg-accent hover:bg-foreground dark:hover:bg-accent/80 text-white rounded-lg font-semibold shadow-md transition-all disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    {isAdding ? "Adding..." : "Add Members"} ({selectedUsers.length})
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AddMemberToGroupModal;
