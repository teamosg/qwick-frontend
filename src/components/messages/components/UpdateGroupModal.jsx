import { X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUpdateGroup } from "@/hooks/conversations.hook";

const UpdateGroupModal = ({ isOpen, onClose, selectedChat }) => {
    const { mutate: updateGroup, isPending: isUpdating } = useUpdateGroup();
    const [groupName, setGroupName] = useState(selectedChat?.group_name || "");
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(selectedChat?.avatar || null);

    // ✅ Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    };

    // ✅ Save handler
    const handleSave = () => {
        const data = new FormData();
        data.append("name", groupName);
        if (imageFile) {
            data.append("avatar", imageFile);
        }

        updateGroup(
            { groupId: selectedChat?.group_id, data },
            {
                onSuccess: () => {
                    onClose?.();
                }
            }
        );

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
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-white dark:bg-[#171717] rounded-2xl shadow-2xl w-full max-w-md max-h-[600px] flex flex-col">

                            {/* Header */}
                            <div className="p-4 border-b border-gray-200 dark:border-[#282828] flex items-center gap-3">
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-[#282828] rounded-lg transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                </button>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
                                    Update Group
                                </h2>

                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-[#282828] rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="flex-1 p-6 space-y-6">

                                {/* ✅ Avatar Preview */}
                                <div className="flex flex-col items-center gap-3">
                                    <Avatar className="w-24 h-24">
                                        <AvatarImage src={preview || ""} />
                                        <AvatarFallback>
                                            {selectedChat?.group_name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <label className="cursor-pointer text-sm font-medium text-blue-600 hover:underline">
                                        Upload Image
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>

                                {/* ✅ Group Name Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Group Name
                                    </label>
                                    <input
                                        type="text"
                                        value={groupName}
                                        onChange={(e) => setGroupName(e.target.value)}
                                        placeholder="Enter group name"
                                        className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-[#282828] rounded-lg bg-gray-50 dark:bg-[#232323] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-4 border-t border-gray-200 dark:border-[#282828]">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSave}
                                    disabled={isUpdating}
                                    className="w-full disabled:opacity-60 px-6 py-3 bg-[#003933] hover:bg-[#002822] text-white rounded-lg font-semibold shadow-md transition-all"
                                >
                                    {isUpdating ? "Updating..." : "Save Changes"}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default UpdateGroupModal;
