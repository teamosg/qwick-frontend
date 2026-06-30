import AvatarUser from "@/components/ui/AvatarUser";
import { motion } from "framer-motion";



const SuggestedUsersList = ({ suggestedUsers, handleUserSelect }) => {
    return (
        <div className="flex-1 overflow-y-auto">
            <div className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground dark:text-muted-foreground mb-3">Suggested</h3>
                <div className="space-y-1">
                    {suggestedUsers?.map(user => (
                        <motion.button
                            key={user?.user_id}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleUserSelect(user)}
                            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-qwick-gray-100 dark:hover:bg-qwick-gray-800 transition-colors"
                        >
                            <div className="relative">
                                <AvatarUser
                                    src={user?.avatar}
                                    alt={user?.username}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                {user?.isOnline && (
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-qwick-gray-900 rounded-full"></div>
                                )}
                            </div>
                            <div className="flex-1 text-left">
                                <h4 className="font-medium text-sm text-qwick-gray-950 dark:text-white">{user?.username}</h4>
                                <p className="text-xs text-muted-foreground dark:text-muted-foreground">@{user?.username}</p>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SuggestedUsersList;