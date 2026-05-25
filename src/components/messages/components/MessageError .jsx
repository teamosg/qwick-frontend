import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertCircle, Ban } from "lucide-react";

const MessageError = ({ isBlocked = false, isError = false, onUnblock }) => {

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bottom-0 left-0 right-0 
            p-4
            bg-white dark:bg-zinc-900
            border-t border-gray-200 dark:border-gray-800
            flex flex-col items-center gap-3"
        >
            {/* ICON + MESSAGE */}
            <div className="flex items-center gap-2">
                {
                    isBlocked
                        ? <Ban className="text-red-500" size={20} />
                        : !!isError && <AlertCircle className="text-yellow-500" size={20} />
                }

                <p className="text-sm md:text-base text-gray-800 dark:text-gray-200 font-medium">
                    {
                        isBlocked
                            ? "You have blocked this user."
                            : !!isError && "Unable to send or receive messages."
                    }
                </p>
            </div>



            {/* UNBLOCK BUTTON */}
            {!!onUnblock && (
                <Button
                    variant="outline"
                    className="text-sm md:text-base 
                border-gray-300 dark:border-gray-700
                text-gray-800 dark:text-gray-200
                hover:bg-gray-100 dark:hover:bg-zinc-800"
                    onClick={onUnblock}
                >
                    Unblock User
                </Button>
            )}
        </motion.div>
    );
};

export default MessageError;