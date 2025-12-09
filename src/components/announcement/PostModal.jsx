import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { MoreHorizontal, Send, Trash2, Clock, Edit } from "lucide-react";
import AvatarUser from '../ui/AvatarUser';
import { useComment, useDeleteComment } from '@/hooks/announcement.hook';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useProfile } from '@/hooks/auth.hook';

const PostModal = ({ openComments, setOpenComments, post, setOpenImage }) => {
    const { mutate: postComment, isPending: isCommenting } = useComment();
    const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();
    const { data: user } = useProfile();

    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [commentText, setCommentText] = useState("");

    const handleComment = () => {
        if (!commentText) return;
        postComment({
            AnnouncementId: post?.id,
            payload: { content: commentText }
        });
        setCommentText("");
    };

    const handleDeleteComment = (commentId) => {
        deleteComment({
            AnnouncementId: post?.id,
            commentId
        });
    };

    return (
        <Dialog open={openComments} onOpenChange={setOpenComments}>
            <DialogContent className="max-w-[95vw]! sm:max-w-[90vw]! md:max-w-[80vw]! lg:max-w-[900px]! max-h-[95vh]! p-0 overflow-hidden">

                {/* Header */}
                <DialogHeader className="p-3 sm:p-4 border-b">
                    <DialogTitle>Post</DialogTitle>
                </DialogHeader>

                {/* Scroll Area */}
                <div className="bg-white dark:bg-zinc-900 max-h-[calc(95vh-160px)] overflow-y-auto">

                    {/* Post Section */}
                    <div className="p-4 sm:p-6 border-b">
                        <div className="flex items-center gap-3 mb-4">
                            <AvatarUser
                                src={post?.author?.avatar}
                                alt={post?.author?.first_name}
                                className="w-10 h-10 sm:w-12 sm:h-12"
                            />

                            <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-sm sm:text-base dark:text-white truncate">
                                    {post?.author?.first_name} {post?.author?.last_name}
                                </h3>

                                <div className="text-xs text-[#AAAAAA] dark:text-gray-400 flex items-center">
                                    <Clock size={10} className="mr-1" />
                                    {new Date(post?.created_at).toLocaleString()}
                                </div>
                            </div>
                        </div>

                        <p className="text-sm sm:text-base leading-relaxed mb-3 text-gray-700 dark:text-gray-200">
                            {post?.content}
                        </p>

                        {post?.link && (
                            <a
                                href={post?.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 underline break-all text-xs sm:text-sm"
                            >
                                {post?.link}
                            </a>
                        )}

                        {/* Images */}
                        {post?.files?.length > 0 && (
                            <div className="mt-4">
                                {post?.files.length === 1 ? (
                                    <img
                                        src={post?.files[0]?.file}
                                        alt="Post"
                                        onClick={() => setOpenImage(true)}
                                        className="w-full max-h-[300px] sm:max-h-[450px] object-cover rounded-lg cursor-pointer"
                                    />
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                                        {post?.files.map((file, index) => (
                                            <img
                                                key={index}
                                                src={file?.file}
                                                alt={`Post ${index + 1}`}
                                                onClick={() => setOpenImage(true)}
                                                className="w-full h-[150px] sm:h-[200px] object-cover rounded-lg cursor-pointer"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex gap-4 mt-4 text-xs sm:text-sm text-gray-500">
                            <span>{post?.like_count} Likes</span>
                            <span>{post?.comment_count} Comments</span>
                        </div>
                    </div>

                    {/* Comments */}
                    <div className="p-4 sm:p-6 space-y-4">
                        {post?.comments?.map((comment) => (
                            <div key={comment?.id} className="flex gap-2 sm:gap-3 group">
                                <AvatarUser
                                    src={comment?.author?.avatar}
                                    alt={comment?.author?.first_name}
                                    className="w-8 h-8 sm:w-9 sm:h-9"
                                />

                                <div className="flex-1 flex justify-between bg-gray-100 dark:bg-zinc-800 rounded-xl px-3 sm:px-4 py-2 relative">
                                    <div className="w-full">
                                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-1">
                                            <div className="font-medium text-sm sm:text-base text-black dark:text-white truncate">
                                                {comment?.author?.first_name} {comment?.author?.last_name}
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
                                                    onClick={() => {
                                                        console.log("Updated Comment:", editContent);
                                                        setEditingCommentId(null);
                                                    }}
                                                    className="px-3 py-1.5 text-xs rounded-md bg-[#003933] text-white"
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
                                                    className="text-red-600"
                                                >
                                                    <Trash2 size={14} className="mr-2" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sticky Comment Input */}
                <div className="sticky bottom-0 bg-white dark:bg-zinc-900 border-t p-3 sm:p-4 flex gap-2 sm:gap-3 items-end">
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
                        className="bg-[#002822] disabled:bg-[#002822]/60 text-white px-3 sm:px-4 py-2 rounded-lg"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default PostModal;
