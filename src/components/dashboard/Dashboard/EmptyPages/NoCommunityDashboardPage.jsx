import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { Plus } from "lucide-react";

const NoCommunityDashboardPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-card dark:bg-card p-8 rounded-xl shadow max-w-md w-full"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex items-center justify-center mb-5"
                >
                    <FaUsers className="text-foreground-strong dark:text-white" size={60} />
                </motion.div>

                <h2 className="text-xl font-semibold text-foreground dark:text-white mb-3">
                    No Community Yet
                </h2>

                <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-6">
                    You haven’t created a community for your brand. Start one to engage your audience and unlock more features.
                </p>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                    <Link
                        to={`/addcommunity`}
                        type="submit"
                        className="max-w-max mx-auto bg-foreground-strong dark:bg-accent text-white px-4 py-2 sm:py-2.5 sm:px-10 rounded-3xl sm:rounded-full hover:bg-foreground dark:hover:bg-accent/80 transition font-medium cursor-pointer flex gap-2"
                    >
                        <Plus />
                        Add Community
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};


export default NoCommunityDashboardPage;