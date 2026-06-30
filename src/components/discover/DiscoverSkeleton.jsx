
import { Skeleton } from "@/components/ui/skeleton";

const DiscoverSkeleton = () => {
    return (
        <div className="space-y-8 mt-6">
            {/* Filters Skeleton */}
            <div className="flex flex-wrap gap-4 items-center">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full sm:w-[200px] rounded-xl" />
                ))}
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-card p-4 rounded-3xl border border-qwick-gray-100 dark:border-qwick-gray-800 space-y-4 shadow-sm">
                        <Skeleton className="h-48 w-full rounded-2xl" />
                        <div className="space-y-3 px-2">
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-12" />
                            </div>
                            <Skeleton className="h-6 w-3/4" />
                            <div className="flex gap-2">
                                <Skeleton className="h-5 w-5 rounded-full" />
                                <Skeleton className="h-5 w-5 rounded-full" />
                                <Skeleton className="h-5 w-5 rounded-full" />
                            </div>
                            <div className="pt-2 flex justify-between items-center">
                                <div className="space-y-2">
                                    <Skeleton className="h-3 w-20" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                                <Skeleton className="h-10 w-24 rounded-full" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiscoverSkeleton;
