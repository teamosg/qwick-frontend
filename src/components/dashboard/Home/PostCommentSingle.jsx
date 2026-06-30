import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useDeleteComment, useUpdateComment } from '@/hooks/announcement.hook';
import { MoreHorizontal, Trash2, Edit } from 'lucide-react';

const PostCommentSingle = ({ comment, profile }) => {
    const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();
    const { mutate: updateComment, isPending: isUpdating } = useUpdateComment();
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editContent, setEditContent] = useState("");

    const handleDeleteComment = () => {
        deleteComment({
            AnnouncementId: comment?.announcement,
            commentId: comment?.id
        });
    };

    const handleUpdateComment = () => {
        updateComment(
            {
                AnnouncementId: comment?.announcement,
                commentId: comment?.id,
                payload: { content: editContent }
            },
            {
                onSuccess: () => {
                    setEditingCommentId(null);
                    setEditContent("");
                }
            }
        );
    };

    return (
        <div key={comment.id} className="flex space-x-2 relative">
            <img
                src={comment.author.avatar}
                alt={comment.author.full_name}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
            />

            <div className="bg-qwick-gray-100 dark:bg-qwick-gray-800 rounded-lg p-2 sm:p-3 flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <div className="flex items-end gap-4">
                        <div className="font-medium text-xs sm:text-sm dark:text-white truncate">
                            {comment.author.full_name}
                        </div>

                        <div className="text-[10px] text-qwick-gray-500 dark:text-qwick-gray-400 mt-0.5">
                            {new Date(comment.created_at).toLocaleString()}
                        </div>
                    </div>

                    {profile?.email === comment?.author?.email && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="text-qwick-gray-400 hover:text-qwick-gray-600 dark:hover:text-qwick-gray-300 p-1">
                                    <MoreHorizontal size={16} />
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                className="w-32 bg-card border border-qwick-gray-200 dark:border-qwick-gray-800"
                            >
                                <DropdownMenuItem
                                    onClick={() => {
                                        setEditingCommentId(comment?.id);
                                        setEditContent(comment?.content);
                                    }}
                                    className="cursor-pointer"
                                >
                                    <Edit size={16} className="mr-2" /> Edit
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={handleDeleteComment}
                                    disabled={isDeleting}
                                    className="cursor-pointer disabled:cursor-not-allowed text-red-600 focus:text-red-600"
                                >
                                    <Trash2 size={16} className="mr-2 text-red-400" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>

                {editingCommentId === comment?.id ? (
                    <div className="flex flex-col sm:flex-row gap-2 mt-1">
                        <input
                            type="text"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full px-3 py-1.5 text-sm rounded-md border border-qwick-gray-300 dark:border-qwick-gray-800 bg-white dark:bg-qwick-gray-900"
                        />
                        <button
                            onClick={handleUpdateComment}
                            disabled={isUpdating}
                            className="px-3 py-1.5 text-xs rounded-md bg-foreground-strong dark:bg-accent text-white disabled:bg-foreground-strong/50"
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <div className="text-qwick-gray-700 dark:text-qwick-gray-400 text-xs sm:text-sm break-words mt-1">
                        {comment.content}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostCommentSingle;
