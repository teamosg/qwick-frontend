import { useState } from "react";
import { useProfile } from "@/hooks/auth.hook";
import PostCommentSingle from "./PostCommentSingle";

const PostComments = ({ comments = [] }) => {
    const { data: profile } = useProfile()
    const [showAll, setShowAll] = useState(false);
    const displayedComments = showAll ? comments : comments.slice(-2);
    return (
        <div className="relative">

            {/* ✅ COMMENTS LIST */}
            <div
                className={`space-y-2 sm:space-y-3 mb-3 sm:mb-4 ${showAll ? "max-h-[300px] overflow-y-auto pr-1" : ""
                    }`}
            >
                {displayedComments.map((comment) => <PostCommentSingle
                    comment={comment}
                    profile={profile}
                    key={comment?.id} />
                )}
            </div>

            {/* ✅ VIEW ALL BUTTON */}
            {comments.length > 2 && !showAll && (
                <button
                    onClick={() => setShowAll(true)}
                    className="text-xs text-foreground-strong dark:text-zinc-400 mb-4 cursor-pointer hover:underline"
                >
                    View all comments
                </button>
            )}

            {
                showAll && (
                    <button
                        onClick={() => setShowAll(false)}
                        className="text-xs text-foreground-strong dark:text-zinc-400 mb-4 cursor-pointer hover:underline"
                    >
                        View less comments
                    </button>
                )
            }
        </div>
    );
};

export default PostComments;
