import { useState } from 'react';
import { MoreHorizontal, Trash2, Edit } from "lucide-react";
import AvatarUser from '@/components/ui/AvatarUser';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useProfile } from '@/hooks/auth.hook';
import { useDeleteComment, useUpdateComment } from '@/hooks/announcement.hook';

const AnnouncementComment = ({ comment, AnnouncementId }) => {
    const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();
    const { mutate: updateComment, isPending: isUpdating } = useUpdateComment();

    const { data: user } = useProfile();
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editContent, setEditContent] = useState("");

    const handleDeleteComment = (commentId) => {
        deleteComment({
            AnnouncementId,
            commentId
        });
    };

    const handleUpdateComment = (commentId) => {
        updateComment({
            AnnouncementId,
            commentId,
            payload: {
                content: editContent
            }
        }, {
            onSuccess: () => {
                setEditingCommentId(null);
                setEditContent("");
            }
        });
    };

    return (
        <div className="flex gap-2 sm:gap-3 group">
            <AvatarUser
                src={comment?.author?.avatar}
                alt={comment?.author?.full_name}
                className="w-8 h-8 sm:w-9 sm:h-9"
            />

            <div className="flex-1 flex justify-between items-start bg-gray-100 dark:bg-zinc-800 rounded-xl px-3 sm:px-4 py-2 relative">
                <div className="w-full">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-1">
                        <div className="font-medium text-sm sm:text-base text-black dark:text-white truncate">
                            {comment?.author?.full_name}
                        </div>
                        <div className="text-[10px] text-gray-500 dark:text-zinc-400">
                            {new Date(comment?.created_at)?.toLocaleString()}
                        </div>
                    </div>

                    {editingCommentId === comment?.id ? (
                        <div className="flex flex-col sm:flex-row gap-2 mt-1">
                            <input
                                type="text"
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full px-3 py-1.5 text-sm rounded-md border bg-white dark:bg-zinc-900"
                            />
                            <button
                                onClick={() => handleUpdateComment(comment?.id)}
                                disabled={isUpdating}
                                className="px-3 disabled:bg-foreground-strong/50 py-1.5 text-xs rounded-md bg-foreground-strong text-white"
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200">
                            {comment?.content}
                        </p>
                    )}
                </div>

                {user?.email === comment?.author?.email && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="text-gray-400 p-1">
                                <MoreHorizontal size={16} />
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => {
                                    setEditingCommentId(comment?.id);
                                    setEditContent(comment?.content);
                                }}
                            >
                                <Edit size={14} className="mr-2" /> Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => handleDeleteComment(comment?.id)}
                                disabled={isDeleting}
                                className="text-red-600 disabled:cursor-not-allowed"
                            >
                                <Trash2 size={14} className="mr-2" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </div>
    );
};

export default AnnouncementComment;