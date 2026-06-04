import React from "react";

const BalanceCardSkeleton = () => {
  return (
    <div className="p-6 text-left w-full shadow rounded-[16px] sm:rounded-[24px] bg-card">
      {/* Title Skeleton */}
      <div className="h-4 w-32 bg-accent rounded animate-pulse"></div>

      {/* Balance Skeleton */}
      <div className="h-6 w-40 bg-accent rounded mt-3 animate-pulse"></div>

      {/* Subtext skeleton */}
      <div className="h-4 w-48 bg-accent rounded mt-3 animate-pulse"></div>

      {/* Button Skeleton */}
      <div className="flex justify-center mt-4">
        <div className="h-10 sm:h-12 w-28 sm:w-40 bg-accent rounded-3xl sm:rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default BalanceCardSkeleton;
