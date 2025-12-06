import { Heart, MessageCircle, Share } from "lucide-react";

export default function FeedSinglePostSkeleton() {
    return (
        <div className="bg-white dark:bg-zinc-900 shadow rounded-[12px] p-6 mb-8 border border-gray-200 dark:border-zinc-700 animate-pulse">

            {/* Header */}
            <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-zinc-700" />

                <div className="flex flex-col gap-2">
                    <div className="h-4 w-32 bg-gray-300 dark:bg-zinc-700 rounded" />
                    <div className="h-3 w-20 bg-gray-300 dark:bg-zinc-700 rounded" />
                </div>
            </div>

            {/* Content */}
            <div className="mb-4 space-y-3">
                <div className="h-4 w-full bg-gray-300 dark:bg-zinc-700 rounded" />
                <div className="h-4 w-5/6 bg-gray-300 dark:bg-zinc-700 rounded" />
                <div className="h-4 w-4/6 bg-gray-300 dark:bg-zinc-700 rounded" />
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="w-full h-40 bg-gray-300 dark:bg-zinc-700 rounded-lg" />
                <div className="w-full h-40 bg-gray-300 dark:bg-zinc-700 rounded-lg" />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <Heart className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                        <div className="h-3 w-16 bg-gray-300 dark:bg-zinc-700 rounded" />
                    </div>

                    <div className="flex items-center space-x-2">
                        <MessageCircle className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                        <div className="h-3 w-20 bg-gray-300 dark:bg-zinc-700 rounded" />
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Share className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <div className="h-3 w-10 bg-gray-300 dark:bg-zinc-700 rounded" />
                </div>
            </div>
        </div>
    );
}
