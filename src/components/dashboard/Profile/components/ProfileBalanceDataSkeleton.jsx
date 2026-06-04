import { Skeleton } from "@/components/ui/skeleton";

const ProfileBalanceDataSkeleton = () => {
  return (
    <>
      {/* List Items Skeleton */}
      <div className="space-y-4 mt-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 rounded-lg bg-card border border-border h-16 flex items-center"
          >
            <Skeleton className="h-4 w-3/4 ml-2" />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfileBalanceDataSkeleton;
