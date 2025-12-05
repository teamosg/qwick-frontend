import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { MoreVertical, Send } from "lucide-react"
import AvatarUser from '../ui/AvatarUser';
import { useComment, useDeleteComment } from '@/hooks/announcement.hook';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

const PostModal = ({ openComments, setOpenComments, post, setOpenImage }) => {
    const { mutate: postComment, isPending: isCommenting } = useComment()
    const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment()


    const [commentText, setCommentText] = useState("")
    const user = JSON.parse(localStorage.getItem('user'))

    console.log(post);

    const handleComment = () => {
        if (!commentText) return;

        postComment({
            AnnouncementId: post?.id,
            payload: {
                content: commentText
            }
        })
        setCommentText("")
    }


    const handleDeleteComment = (commentId) => {
        deleteComment({
            AnnouncementId: post?.id,
            commentId
        })
    }


    return (
        <Dialog open={openComments} onOpenChange={setOpenComments}>
            <DialogContent className="max-w-200! p-0 overflow-hidden">


                {/* Header */}
                <DialogHeader className="p-4 border-b">
                    <DialogTitle>Post</DialogTitle>
                </DialogHeader>

                {/* Scroll Area */}
                <div className="bg-white dark:bg-zinc-900 max-h-[70vh] overflow-y-auto">

                    {/* ✅ FULL POST INSIDE MODAL */}
                    {/* ✅ FULL ORIGINAL POST FORMAT INSIDE MODAL */}
                    <div className="p-6 border-b">
                        {/* Post Header */}
                        <div className="flex items-center space-x-3 mb-4">
                            <AvatarUser
                                src={post?.author?.avatar}
                                alt={post?.author?.first_name}
                                className="w-12 h-12"
                            />
                            <div className="flex gap-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                                    {post?.author?.first_name} {post?.author?.last_name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-[16px]">
                                    {post?.timestamp}
                                </p>
                            </div>
                        </div>

                        {/* Post Content */}
                        <div className="mb-4">
                            <p className="text-base leading-relaxed mb-3 text-gray-700 dark:text-gray-200">
                                {post?.content}
                            </p>

                            {post?.link && (
                                <a
                                    href={post?.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline text-sm break-all"
                                >
                                    {post?.link}
                                </a>
                            )}
                        </div>

                        {/* Images */}
                        {post?.files && post?.files.length > 0 && (
                            <div className="mb-4">
                                {post?.files.length === 1 ? (
                                    <div className="flex justify-center">
                                        <div className="w-full relative group">
                                            <img
                                                src={post?.files[0]?.file}
                                                alt="Post image"
                                                onClick={() => setOpenImage(true)}
                                                className="w-full object-cover rounded-lg cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-3">
                                        {post?.files.map((file, index) => (
                                            <img
                                                key={index}
                                                src={file?.file}
                                                alt={`Post image ${index + 1}`}
                                                onClick={() => setOpenImage(true)}
                                                className="w-full h-50 object-cover rounded-lg cursor-pointer"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Post Actions */}
                        <div className="flex gap-6 mt-4 text-sm text-gray-500">
                            <span>{post?.like_count} Likes</span>
                            <span>{post?.comment_count} Comments</span>
                        </div>
                    </div>


                    {/* ✅ COMMENTS LIST */}
                    <div className="p-6 space-y-4">
                        {post?.comments?.map((comment) => (
                            <div key={comment.id} className="flex gap-3 group">
                                <AvatarUser
                                    src={comment?.author?.avatar}
                                    alt={comment?.author?.first_name}
                                    className="w-9 h-9"
                                />

                                <div className="flex-1 bg-gray-100 dark:bg-zinc-800 rounded-xl px-4 py-2 relative">

                                    {/* ✅ Three Dot Dropdown Menu */}
                                    {
                                        user?.first_name === comment?.author?.first_name && (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button
                                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition"
                                                    >
                                                        <MoreVertical className="w-4 h-4 cursor-pointer text-gray-500" />
                                                    </button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end" className="w-32">
                                                    <DropdownMenuItem
                                                        className="text-red-500 cursor-pointer"
                                                        onClick={() => {
                                                            handleDeleteComment(comment.id)
                                                        }}
                                                    >
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )
                                    }

                                    <p className="text-sm text-gray-800 dark:text-gray-200">
                                        {comment.content}
                                    </p>

                                    <span className="text-xs text-gray-500 block mt-1">
                                        {new Date(comment.created_at).toLocaleTimeString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ✅ COMMENT INPUT FIXED AT BOTTOM (MULTI-LINE) */}
                <div
                    className='relative mt-20'
                >
                    <div className="absolute bg-white dark:bg-zinc-900 w-full  bottom-0 border-t p-4 flex gap-3 items-end">
                        <Textarea
                            placeholder="Write a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            rows={1}
                            className="resize-none max-h-[200px]"
                        />

                        <button
                            onClick={handleComment}
                            disabled={!commentText || isCommenting}
                            className="bg-[#002822] disabled:bg-[#002822]/60 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg hover:bg-[#002822]/60 transition-all duration-300 cursor-pointer"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default PostModal;