import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useComment } from '@/hooks/announcement.hook';


const AnnounceMentCommentAction = ({ AnnouncementId }) => {
    const { mutate: postComment, isPending: isCommenting } = useComment();
    const [commentText, setCommentText] = useState("");


    const handleComment = () => {
        if (!commentText) return;
        postComment({
            AnnouncementId,
            payload: { content: commentText }
        });
        setCommentText("");
    };


    return (
        <div className="sticky bottom-0 bg-card border-t border-border p-3 sm:p-4 flex gap-2 sm:gap-3 items-end">
            <Textarea
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={1}
                className="resize-none max-h-[150px] sm:max-h-[200px] text-sm"
            />

            <button
                onClick={handleComment}
                disabled={!commentText || isCommenting}
                className="bg-foreground-strong dark:bg-accent disabled:opacity-60 text-white px-3 sm:px-4 py-2 rounded-lg"
            >
                <Send className="w-4 h-4" />
            </button>
        </div>
    );
};

export default AnnounceMentCommentAction;