import { Skeleton } from "@/components/ui/skeleton";

const BalanceCardSkeleton = () => {
  return (
    <div className="p-6 text-left w-full shadow rounded-[16px] sm:rounded-[24px] bg-card">
      {/* Title Skeleton */}
      <Skeleton className="h-4 w-32" />

      {/* Balance Skeleton */}
      <Skeleton className="h-6 w-40 mt-3" />

      {/* Subtext skeleton */}
      <Skeleton className="h-4 w-48 mt-3" />

      {/* Button Skeleton */}
      <div className="flex justify-center mt-4">
        <Skeleton className="h-10 sm:h-12 w-28 sm:w-40 rounded-3xl sm:rounded-full" />
      </div>
    </div>
  );
};

export default BalanceCardSkeleton;
