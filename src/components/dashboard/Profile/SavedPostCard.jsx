
import { useUnsaveAnnouncement } from "@/hooks/announcement.hook";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import PostModal from "@/components/announcement/PostModal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

const SavedPostCard = ({ post, index }) => {
    const [openComments, setOpenComments] = useState(false);
    const [openImage, setOpenImage] = useState(false);

    const { mutate: unsaveAnnouncement, isPending } = useUnsaveAnnouncement();

    const handleUnsave = (e) => {
        e.stopPropagation(); // Prevent opening modal
        unsaveAnnouncement(post.id);
    };

    // Determine image source
    const image = post.files?.[0]?.file || null;
    const title = post.content || "No content";
    const description = post.community?.username ? `Community: ${post.community.username}` : "";

    return (
        <>
            <motion.div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:border-blue-500/30 transition-all shadow-sm hover:shadow-md cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => setOpenComments(true)}
            >
                {/* Image */}
                {image && (
                    <div className="w-full sm:w-[160px] h-[200px] sm:h-[120px] rounded-xl overflow-hidden shrink-0">
                        <img
                            src={image}
                            alt={title}
                            className="object-cover w-full h-full"
                        />
                    </div>
                )}

                {/* Text */}
                <div className="flex-1 space-y-1.5 w-full">
                    <h1 className="text-gray-900 dark:text-white font-bold text-base sm:text-lg leading-tight line-clamp-2">
                        {title}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm line-clamp-2">
                        {description}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                        <span className="text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-500">
                            {new Date(post.created_at).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                {/* Options Icon */}
                <div onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className="self-start sm:self-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors p-2"
                            >
                                <EllipsisVertical size={20} />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={handleUnsave} disabled={isPending} className="text-red-500 focus:text-red-500 cursor-pointer">
                                {isPending ? "Unsaving..." : "Unsave"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </motion.div>

            {openComments && (
                <PostModal
                    openComments={openComments}
                    setOpenComments={setOpenComments}
                    post={post}
                    setOpenImage={setOpenImage}
                />
            )}
        </>
    );
};

export default SavedPostCard;
