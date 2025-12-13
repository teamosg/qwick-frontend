
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
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all shadow-sm hover:shadow-md cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => setOpenComments(true)}
            >
                {/* Image */}
                {image && (
                    <div className="w-full sm:w-[171px] sm:h-[132px] rounded-lg overflow-hidden shrink-0">
                        <img
                            src={image}
                            alt={title}
                            className="object-cover w-full h-full"
                        />
                    </div>
                )}

                {/* Text */}
                <div className="flex-1 space-y-2">
                    <h1 className="text-gray-900 dark:text-white font-semibold text-lg sm:text-xl leading-snug line-clamp-2">
                        {title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                        {description}
                    </p>
                    <p className="text-xs text-gray-500">
                        {new Date(post.created_at).toLocaleDateString()}
                    </p>
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
