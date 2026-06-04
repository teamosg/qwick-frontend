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
            <div className="h-4 w-3/4 bg-accent rounded animate-pulse ml-2"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfileBalanceDataSkeleton;
