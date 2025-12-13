import Comment from "@/assets/svg/Comment";
import Like from "@/assets/svg/Like";
import Save from "@/assets/svg/Save";
import { PostShare } from "./PostShare";
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
        if (post?.isSaved) {
            unsaveAnnouncement(post?.id);
        } else {
            saveAnnouncement(post?.id);
        }
    };

    return (
        <div className="border-t border-b border-gray-200 dark:border-gray-700 py-2 mb-3 sm:mb-4 font-semibold bg-white dark:bg-zinc-900">
            <div className="flex justify-between gap-2">
                <button
                    onClick={handlePostLike}
                    disabled={isLiking || isDisliking}
                    className={`flex items-center disabled:cursor-progress space-x-1 px-2 sm:px-3 py-2 sm:py-1 rounded-md cursor-pointer text-sm sm:text-base transition-colors
                    ${post?.is_liked
                            ? "text-[#003933] dark:text-emerald-400"
                            : "text-gray-500 dark:text-gray-400 hover:text-[#003933] hover:dark:text-emerald-300"
                        }`}
                >
                    <Like isLiked={post?.is_liked} />
                    <span className="sm:hidden">
                        {post?.is_liked ? "Liked" : "Like"}
                    </span>
                </button>

                <button className="flex items-center space-x-1 px-2 sm:px-3 py-2 sm:py-1 rounded-md text-sm sm:text-base text-gray-500 dark:text-gray-400 hover:text-[#003933] hover:dark:text-emerald-300 transition-colors">
                    <Comment />
                </button>

                <PostShare />

                <button
                    onClick={handleSave}
                    disabled={isSaving || isUnsaving}
                    className={`flex items-center px-2 sm:px-3 py-2 sm:py-1 rounded-md cursor-pointer text-sm sm:text-base transition-colors disabled:cursor-progress
              ${post?.is_saved
                            ? "text-[#003933] dark:text-emerald-400"
                            : "text-gray-500 dark:text-gray-400 hover:text-[#003933] hover:dark:text-emerald-300"
                        }`}
                >
                    <Save isSaved={post?.is_saved} />
                </button>
            </div>
        </div>
    );
};

export default PostActions;