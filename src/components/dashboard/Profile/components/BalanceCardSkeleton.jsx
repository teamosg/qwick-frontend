import React from "react";

const BalanceCardSkeleton = () => {
  return (
    <div className="p-6 text-left w-full shadow rounded-[16px] sm:rounded-[24px] bg-white dark:bg-zinc-800">
      {/* Title Skeleton */}
      <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>

      {/* Balance Skeleton */}
      <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mt-3 animate-pulse"></div>

      {/* Subtext skeleton */}
      <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded mt-3 animate-pulse"></div>

      {/* Button Skeleton */}
      <div className="flex justify-center mt-4">
        <div className="h-10 sm:h-12 w-28 sm:w-40 bg-gray-200 dark:bg-gray-700 rounded-3xl sm:rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default BalanceCardSkeleton;
