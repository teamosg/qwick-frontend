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
        <div className="flex items-center justify-between pt-4 border-t border-border bg-transparent mb-4">
            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handlePostLike}
                        disabled={isLiking || isDisliking}
                        className="disabled:cursor-progress cursor-pointer text-foreground-subtle hover:text-primary transition-colors group"
                    >
                        <Heart
                            className={`w-5 h-5 ${post?.is_liked
                                ? "fill-primary text-primary"
                                : "group-hover:text-primary"
                                }`}
                        />
                    </button>
                    <span className="text-sm font-medium text-foreground-subtle">
                        {post?.like_count || 0} Likes
                    </span>
                </div>

                <div className="flex items-center space-x-2">
                    <button 
                        className="cursor-pointer flex items-center space-x-2 text-foreground-subtle hover:text-primary transition-colors group"
                    >
                        <MessageCircle className="w-5 h-5 group-hover:text-primary" />
                    </button>
                    <span className="text-sm font-medium text-foreground-subtle">
                        {post?.comment_count || 0} comments
                    </span>
                </div>
            </div>

            <button
                onClick={handleSave}
                disabled={isSaving || isUnsaving}
                className="disabled:cursor-progress cursor-pointer text-foreground-subtle hover:text-primary transition-colors group"
            >
                <Bookmark
                    className={`w-5 h-5 ${post?.is_saved
                        ? "fill-primary text-primary"
                        : "group-hover:text-primary"
                        }`}
                />
            </button>
        </div>
    );
};

export default PostActions;