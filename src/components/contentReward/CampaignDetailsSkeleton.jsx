
import { Skeleton } from "@/components/ui/skeleton";

const CampaignDetailsSkeleton = () => {
    return (
        <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-8 w-64 mb-4 sm:mb-6" />

            <div className="bg-white dark:bg-zinc-900 p-5 sm:p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 space-y-8 shadow-sm">
                {/* Header section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-6 w-32" />
                    </div>
                    <Skeleton className="h-8 w-24" />
                </div>

                {/* Content section */}
                <div className="space-y-4">
                    <Skeleton className="h-7 w-3/4" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/6" />
                    </div>
                </div>

                {/* Progress section */}
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-10" />
                    </div>
                    <Skeleton className="h-3 w-full rounded-full" />
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-50 dark:border-zinc-800">
                    <div className="space-y-2">
                        <Skeleton className="h-3 w-12" />
                        <Skeleton className="h-5 w-24" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-3 w-16" />
                        <div className="flex gap-2">
                            <Skeleton className="h-5 w-5 rounded-full" />
                            <Skeleton className="h-5 w-5 rounded-full" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-5 w-24" />
                    </div>
                </div>

                {/* Cards section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Skeleton className="h-24 w-full rounded-2xl" />
                    <Skeleton className="h-24 w-full rounded-2xl" />
                </div>
            </div>

            {/* Summary section */}
            <div className="bg-white dark:bg-zinc-900 p-5 sm:p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <Skeleton className="h-5 w-48" />
                        <div className="space-y-3">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex gap-3">
                                    <Skeleton className="h-5 w-5 rounded-full" />
                                    <Skeleton className="h-4 w-40" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <Skeleton className="h-14 w-full rounded-2xl" />
                        <Skeleton className="h-4 w-24 mx-auto" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignDetailsSkeleton;
