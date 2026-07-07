const NoPostsState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Post Card Mockup - Exact match to image */}
      <div className="w-full max-w-sm mb-6">
        <div className="bg-surface dark:bg-qwick-gray-800 rounded-lg border border-qwick-gray-200 dark:border-qwick-gray-700 p-4 shadow-sm relative overflow-hidden">
          {/* Gradient overlay for transparency effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/20 to-surface/80 dark:via-qwick-gray-800/20 dark:to-qwick-gray-800/80 pointer-events-none"></div>
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-qwick-gray-300 dark:bg-qwick-gray-600 rounded-full"></div>
              <div className="flex-1">
                <div className="h-2.5 bg-qwick-gray-300 dark:bg-qwick-gray-600 rounded w-16 mb-1.5"></div>
                <div className="h-2 bg-qwick-gray-200 dark:bg-qwick-gray-700 rounded w-12"></div>
              </div>
            </div>

            {/* Content lines */}
            <div className="space-y-1.5 mb-3">
              <div className="h-2.5 bg-qwick-gray-300 dark:bg-qwick-gray-600 rounded w-full"></div>
              <div className="h-2.5 bg-qwick-gray-300 dark:bg-qwick-gray-600 rounded w-5/6"></div>
              <div className="h-2.5 bg-qwick-gray-300 dark:bg-qwick-gray-600 rounded w-2/3"></div>
            </div>

            {/* Image placeholder */}
            <div className="w-full h-24 bg-qwick-gray-200 dark:bg-qwick-gray-700 rounded mb-3"></div>

            {/* Action buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-transparent border border-qwick-gray-300 dark:border-qwick-gray-600 rounded"></div>
                <div className="w-4 h-4 bg-transparent border border-qwick-gray-300 dark:border-qwick-gray-600 rounded"></div>
                <div className="w-4 h-4 bg-transparent border border-qwick-gray-300 dark:border-qwick-gray-600 rounded"></div>
              </div>
              <div className="w-4 h-4 bg-transparent border border-qwick-gray-300 dark:border-qwick-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Text Content - Exact match to image */}
      <div className="max-w-xs">
        <h3 className="text-base font-medium text-qwick-gray-800 dark:text-white mb-1">
          Welcome to Qwick
        </h3>
        <p className="text-qwick-gray-500 dark:text-qwick-gray-400 text-sm">
          No posts yet. Join more community to view more posts
        </p>
      </div>
    </div>
  );
};

export default NoPostsState;
