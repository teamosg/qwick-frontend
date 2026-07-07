import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

const NoAnnouncementDashboardPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-card dark:bg-card p-8 rounded-xl shadow max-w-md w-full"
            >
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex items-center justify-center mb-5"
                >
                    <FaUsers className="text-foreground-strong dark:text-white" size={60} />
                </motion.div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-foreground dark:text-white mb-3">
                    No Communities Yet
                </h2>

                {/* Description */}
                <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-6">
                    You haven’t created or joined a community yet. Create your own
                    community or join an existing one to stay connected and receive
                    announcements.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                    {/* Create Community */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                        <Button
                            asChild
                            className="bg-foreground-strong dark:bg-accent hover:bg-foreground dark:hover:bg-accent/80 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2"
                        >
                            <Link to="/addcommunity">
                                <Plus size={18} />
                                Create Community
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Join Community */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                        <Button
                            asChild
                            variant="outline"
                            className="border-foreground-muted dark:border-white text-foreground-strong dark:text-white hover:bg-foreground-strong dark:hover:bg-accent hover:text-white dark:hover:text-white px-6 py-2 rounded-full font-medium flex items-center gap-2"
                        >
                            <Link to="/discover">
                                <FaUsers size={18} />
                                Join Community
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default NoAnnouncementDashboardPage;
