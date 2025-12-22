
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

/**
 * LeaveGroupModal confirms if the user wants to leave the group.
 */
const LeaveGroupModal = ({ isOpen, onClose, onConfirm, isLeaving }) => {
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
                        <div className="bg-white dark:bg-[#171717] rounded-xl shadow-2xl w-full max-w-sm p-6 text-center">

                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-500" />
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Leave this group?
                            </h3>

                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                                You will no longer receive messages from this group. You can only rejoin if added by a member.
                            </p>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={onConfirm}
                                    disabled={isLeaving}
                                    className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLeaving ? "Leaving..." : "Leave Group"}
                                </button>

                                <button
                                    onClick={onClose}
                                    disabled={isLeaving}
                                    className="w-full py-2.5 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default LeaveGroupModal;
