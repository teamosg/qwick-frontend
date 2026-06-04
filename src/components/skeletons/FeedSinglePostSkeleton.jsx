import { Heart, MessageCircle, Share } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeedSinglePostSkeleton() {
    return (
        <div className="bg-card shadow rounded-[12px] p-6 mb-8 border border-border">

            {/* Header */}
            <div className="flex items-center space-x-3 mb-4">
                <Skeleton className="w-12 h-12 rounded-full" />

                <div className="flex flex-col gap-2 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                </div>
            </div>

            {/* Content */}
            <div className="mb-4 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <Skeleton className="w-full h-40 rounded-lg" />
                <Skeleton className="w-full h-40 rounded-lg" />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <Heart className="w-5 h-5 text-foreground-subtle" />
                        <Skeleton className="h-3 w-16" />
                    </div>

                    <div className="flex items-center space-x-2">
                        <MessageCircle className="w-5 h-5 text-foreground-subtle" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Share className="w-5 h-5 text-foreground-subtle" />
                    <Skeleton className="h-3 w-10" />
                </div>
            </div>
        </div>
    );
}
