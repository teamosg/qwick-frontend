import { Heart, MessageCircle, Bookmark } from "lucide-react";
import { useDislikeAnnouncement, useLikeAnnouncement, useSaveAnnouncement, useUnsaveAnnouncement } from "@/hooks/announcement.hook";


const PostActions = ({ post }) => {
    const { mutate: likeAnnouncement, isPending: isLiking } = useLikeAnnouncement();
    const { mutate: dislikeAnnouncement, isPending: isDisliking } = useDislikeAnnouncement();
    const { mutate: saveAnnouncement, isPending: isSaving } = useSaveAnnouncement();
    const { mutate: unsaveAnnouncement, isPending: isUnsaving } = useUnsaveAnnouncement();

    const handlePostLike = () => {
        if (post?.is_liked) {
            dislikeAnnouncement(post?.id);
        } else {
            likeAnnouncement(post?.id);
        }
    };

    const handleSave = () => {
        if (post?.is_saved) {
            unsaveAnnouncement(post?.id);
        } else {
            saveAnnouncement(post?.id);
        }
    };

    return (
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 mb-4">
            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handlePostLike}
                        disabled={isLiking || isDisliking}
                        className="disabled:cursor-progress cursor-pointer text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors group"
                    >
                        <Heart
                            className={`w-5 h-5 ${post?.is_liked
                                ? "fill-red-500 text-red-500"
                                : "group-hover:text-red-500 dark:group-hover:text-red-400"
                                }`}
                        />
                    </button>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {post?.like_count || 0} Likes
                    </span>
                </div>

                <div className="flex items-center space-x-2">
                    <button 
                        className="cursor-pointer flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors group"
                    >
                        <MessageCircle className="w-5 h-5 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
                    </button>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {post?.comment_count || 0} comments
                    </span>
                </div>
            </div>

            <button
                onClick={handleSave}
                disabled={isSaving || isUnsaving}
                className="disabled:cursor-progress cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#003933] dark:hover:text-emerald-400 transition-colors group"
            >
                <Bookmark
                    className={`w-5 h-5 ${post?.is_saved
                        ? "fill-[#003933] text-[#003933] dark:fill-emerald-400 dark:text-emerald-400"
                        : "group-hover:text-[#003933] dark:group-hover:text-emerald-400"
                        }`}
                />
            </button>
        </div>
    );
};

export default PostActions;