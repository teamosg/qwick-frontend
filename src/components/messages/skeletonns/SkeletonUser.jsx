const SkeletonUser = () => {
  return (
    <div className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 animate-pulse">
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gray-400 border-2 border-gray-100 dark:border-zinc-800 rounded-full"></div>
      </div>
      <div className="flex-1 text-left space-y-1">
        <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-3 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonUser;
