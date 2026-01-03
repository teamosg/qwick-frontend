
import { Skeleton } from "@/components/ui/skeleton";

const ChatSkeleton = () => {
    return (
        <div className="flex flex-col w-full h-full bg-gray-50 dark:bg-zinc-950 overflow-hidden">
            {/* Header Skeleton */}
            <div className="bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800 p-4 flex justify-between items-center">
                <Skeleton className="h-7 w-20" />
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-9 rounded-lg" />
                    <Skeleton className="h-9 w-9 rounded-lg" />
                </div>
            </div>

            {/* Messages Skeleton */}
            <div className="flex-1 p-4 space-y-6 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                        <div className={`flex flex-col ${i % 2 === 0 ? 'items-start' : 'items-end'} max-w-[80%] space-y-2`}>
                            <Skeleton className="h-3 w-24 mb-1" />
                            <Skeleton className={`h-12 w-[180px] sm:w-[260px] rounded-2xl ${i % 2 === 0 ? 'rounded-tl-none' : 'rounded-tr-none'}`} />
                            <Skeleton className="h-2 w-12" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Skeleton */}
            <div className="p-4 bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900">
                <div className="max-w-4xl mx-auto flex gap-2">
                    <Skeleton className="h-12 flex-1 rounded-2xl" />
                    <Skeleton className="h-12 w-12 rounded-xl" />
                </div>
            </div>
        </div>
    );
};

export default ChatSkeleton;
