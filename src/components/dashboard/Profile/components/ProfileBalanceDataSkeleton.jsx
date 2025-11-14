const ProfileBalanceDataSkeleton = () => {
  return (
    <>
      {/* List Items Skeleton */}
      <div className="space-y-4 mt-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse h-16"
          ></div>
        ))}
      </div>
    </>
  );
};

export default ProfileBalanceDataSkeleton;
