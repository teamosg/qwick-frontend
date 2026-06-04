const PostSkeleton = () => {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-4 animate-pulse max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        {/* Avatar */}
        <div className="w-10 h-10 bg-accent rounded-full"></div>
        
        <div className="flex-1">
          {/* Author name */}
          <div className="h-4 bg-accent rounded w-24 mb-2"></div>
          {/* Time */}
          <div className="h-3 bg-accent rounded w-16"></div>
        </div>
        
        {/* Menu dots */}
        <div className="w-6 h-6 bg-accent rounded"></div>
      </div>

      {/* Content */}
      <div className="mb-4">
        {/* Text lines */}
        <div className="h-4 bg-accent rounded w-full mb-2"></div>
        <div className="h-4 bg-accent rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-accent rounded w-1/2"></div>
      </div>

      {/* Image placeholder */}
      <div className="w-full h-64 bg-accent rounded-lg mb-4"></div>

      {/* Action buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-6">
          {/* Like button */}
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-accent rounded"></div>
            <div className="h-3 bg-accent rounded w-8"></div>
          </div>
          
          {/* Comment button */}
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-accent rounded"></div>
            <div className="h-3 bg-accent rounded w-12"></div>
          </div>
          
          {/* Share button */}
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-accent rounded"></div>
            <div className="h-3 bg-accent rounded w-10"></div>
          </div>
        </div>
        
        {/* Save button */}
        <div className="w-5 h-5 bg-accent rounded"></div>
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