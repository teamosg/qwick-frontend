const PostSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-4 animate-pulse">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        {/* Avatar */}
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        
        <div className="flex-1">
          {/* Author name */}
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-2"></div>
          {/* Time */}
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
        </div>
        
        {/* Menu dots */}
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>

      {/* Content */}
      <div className="mb-4">
        {/* Text lines */}
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      </div>

      {/* Image placeholder */}
      <div className="w-full h-64 bg-gray-300 dark:bg-gray-600 rounded-lg mb-4"></div>

      {/* Action buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-6">
          {/* Like button */}
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-8"></div>
          </div>
          
          {/* Comment button */}
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
          </div>
          
          {/* Share button */}
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-10"></div>
          </div>
        </div>
        
        {/* Save button */}
        <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
  );
};

// Component to show multiple skeletons
const PostSkeletonList = ({ count = 3 }) => {
  return (
    <div>
      {Array.from({ length: count }, (_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  );
};

export default PostSkeleton;
export { PostSkeletonList };