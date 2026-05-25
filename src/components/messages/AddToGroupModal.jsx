import { X, ArrowLeft, Search, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useMemo } from "react";
import AvatarUser from "../ui/AvatarUser";
import { useAddMemberToGroup } from "@/hooks/conversations.hook";
import { Spinner } from "../ui/spinner";

const AddToGroupModal = ({ chat, isOpen, onClose, groups }) => {
    const { mutate: addMemberToGroup, isPending: isAdding } = useAddMemberToGroup()
    const [search, setSearch] = useState("");
    const [selectedGroup, setSelectedGroup] = useState(null);

    const filteredGroups = useMemo(() => {
        return groups.filter((g) =>
            g.group_name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    const handleAdd = (group) => {
        if (!chat || !group) return
        setSelectedGroup(group)
        addMemberToGroup(
            { groupId: group.group_id, members: [chat.user_id] },
            {
                onSettled: () => {
                    setSelectedGroup(null)
                }
            }
        )
    };

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
                        className="fixed inset-0 bg-black/50 z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl shadow-2xl flex flex-col max-h-[600px]">

                            {/* Header */}
                            <div className="p-4 border-b border-gray-200 dark:border-zinc-800 flex items-center gap-3">
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg"
                                >
                                    <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </button>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
                                    Add User To Group
                                </h2>

                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg"
                                >
                                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </button>
                            </div>

                            {/* User Info */}
                            <div className="px-4 py-3 border-b border-gray-200 dark:border-zinc-800 flex items-center gap-3">
                                <AvatarUser
                                    src={chat?.avatar}
                                    alt={chat?.username}
                                    className="w-12 h-12 rounded-full"
                                />

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {chat?.username}
                                    </h3>
                                </div>
                            </div>

                            {/* Search */}
                            <div className="p-4 border-b border-gray-200 dark:border-zinc-800">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search groups..."
                                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white border border-gray-300 dark:border-zinc-800 focus:ring-2 focus:ring-teal-600 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Group List */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-2">

                                {filteredGroups.map((group) => (
                                    <motion.div
                                        key={group.group_id}
                                        className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <AvatarUser
                                                src={chat?.avatar}
                                                alt={chat?.username}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {group.group_name}
                                            </p>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => handleAdd(group)}
                                            className="p-2 rounded-full cursor-pointer bg-teal-600 hover:bg-teal-700 transition">
                                            {
                                                isAdding && selectedGroup?.group_id === group.group_id ? (
                                                    <Spinner className={'text-white'} />
                                                ) : (
                                                    <Plus className="w-4 h-4 text-white" />
                                                )
                                            }
                                        </motion.button>
                                    </motion.div>
                                ))}

                                {filteredGroups.length === 0 && (
                                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
                                        No groups found.
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AddToGroupModal;
