import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Clock } from "lucide-react";
import AvatarUser from '../ui/AvatarUser';

import AnnounceMentCommentAction from './components/AnnounceMentCommentAction';
import AnnouncementComments from './components/AnnouncementComments';

const PostModal = ({ openComments, setOpenComments, post, setOpenImage }) => {


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
                    <AnnouncementComments
                        post={post}
                    />
                </div>

                {/* Sticky Comment Input */}
                <AnnounceMentCommentAction
                    AnnouncementId={post?.id}
                />

            </DialogContent>
        </Dialog>
    );
};

export default PostModal;
