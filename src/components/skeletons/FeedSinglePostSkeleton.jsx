import { Heart, MessageCircle, Share } from "lucide-react";

export default function FeedSinglePostSkeleton() {
    return (
        <div className="bg-card shadow rounded-[12px] p-6 mb-8 border border-border animate-pulse">

            {/* Header */}
            <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent" />

                <div className="flex flex-col gap-2">
                    <div className="h-4 w-32 bg-accent rounded" />
                    <div className="h-3 w-20 bg-accent rounded" />
                </div>
            </div>

            {/* Content */}
            <div className="mb-4 space-y-3">
                <div className="h-4 w-full bg-accent rounded" />
                <div className="h-4 w-5/6 bg-accent rounded" />
                <div className="h-4 w-4/6 bg-accent rounded" />
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="w-full h-40 bg-accent rounded-lg" />
                <div className="w-full h-40 bg-accent rounded-lg" />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <Heart className="w-5 h-5 text-foreground-subtle" />
                        <div className="h-3 w-16 bg-accent rounded" />
                    </div>

                    <div className="flex items-center space-x-2">
                        <MessageCircle className="w-5 h-5 text-foreground-subtle" />
                        <div className="h-3 w-20 bg-accent rounded" />
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Share className="w-5 h-5 text-foreground-subtle" />
                    <div className="h-3 w-10 bg-accent rounded" />
                </div>
            </div>
        </div>
    );
}
