import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Trash2 } from 'lucide-react';

const PostComments = ({ comments = [] }) => {
    const [showAll, setShowAll] = useState(false);

    const displayedComments = showAll ? comments : comments.slice(-2);

    return (
        <div className="relative">

            {/* ✅ COMMENTS LIST */}
            <div
                className={`space-y-2 sm:space-y-3 mb-3 sm:mb-4 ${showAll ? "max-h-[300px] overflow-y-auto pr-1" : ""
                    }`}
            >
                {displayedComments.map((comment) => (
                    <div key={comment.id} className="flex space-x-2 relative">
                        <img
                            src={comment.author.avatar}
                            alt={comment.author.first_name}
                            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
                        />

                        <div className="bg-gray-100 dark:bg-[#2E2E2E] rounded-lg p-2 sm:p-3 flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center  gap-4">
                                    <div className="font-medium text-xs sm:text-sm dark:text-white truncate">
                                        {comment.author.first_name} {comment.author.last_name}
                                    </div>

                                    {/* ✅ CREATED AT TIME */}
                                    <div className="text-[10px] text-gray-500 dark:text-zinc-400 mt-0.5">
                                        {new Date(comment.created_at).toLocaleString()}
                                    </div>
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent
                                        align="end"
                                        className="w-32 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700"
                                    >
                                        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                                            <Trash2 size={16} className="mr-2" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="text-gray-700 dark:text-zinc-400 text-xs sm:text-sm break-words mt-1">
                                {comment.content}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ✅ VIEW ALL BUTTON */}
            {comments.length > 2 && !showAll && (
                <button
                    onClick={() => setShowAll(true)}
                    className="text-xs text-[#003933] dark:text-zinc-400 mb-4 cursor-pointer hover:underline"
                >
                    View all comments
                </button>
            )}

            {
                showAll && (
                    <button
                        onClick={() => setShowAll(false)}
                        className="text-xs text-[#003933] dark:text-zinc-400 mb-4 cursor-pointer hover:underline"
                    >
                        View less comments
                    </button>
                )
            }
        </div>
    );
};

export default PostComments;
