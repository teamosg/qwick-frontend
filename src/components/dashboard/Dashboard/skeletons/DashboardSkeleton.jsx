import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-60 bg-card border-r border-border p-4">
                <Skeleton className="h-12 w-12 rounded-full mb-3" />
                <Skeleton className="h-6 w-24 rounded mb-8" />
                <div className="space-y-4">
                    {[...Array(7)].map((_, i) => (
                        <Skeleton key={i} className="h-5 w-32 rounded" />
                    ))}
                </div>
            </aside>

            {/* Main dashboard area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="w-full flex items-center justify-between px-4 py-5 bg-card shadow-sm">
                    <Skeleton className="h-8 w-36 rounded" />
                    <Skeleton className="h-10 w-40 rounded" />
                </div>

                {/* Content payout title & Create Reward Button */}
                <div className="flex flex-wrap items-center justify-between py-4 px-4">
                    <Skeleton className="h-8 w-40 rounded mb-2" />
                    <Skeleton className="h-10 w-44 rounded" />
                </div>

                {/* Reward cards (like in the image) */}
                <div className="space-y-6 px-4 pb-8">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center bg-card rounded-xl shadow-sm border border-border p-5 gap-6"
                        >
                            {/* Thumbnail/Card left */}
                            <Skeleton className="h-32 w-40 rounded-lg" />

                            {/* Text Info section */}
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-5 w-36 rounded" />
                                <Skeleton className="h-4 w-72 rounded" />
                                <Skeleton className="h-4 w-56 rounded" />
                                <div className="flex space-x-6 mt-2">
                                    <Skeleton className="h-6 w-16 rounded" />
                                    <Skeleton className="h-6 w-14 rounded" />
                                    <Skeleton className="h-6 w-16 rounded" />
                                </div>
                                <div className="flex space-x-3 mt-1">
                                    <Skeleton className="h-5 w-8 rounded" />
                                    <Skeleton className="h-5 w-8 rounded" />
                                    <Skeleton className="h-5 w-8 rounded" />
                                </div>
                                <Skeleton className="h-4 w-24 rounded mt-2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardSkeleton;
