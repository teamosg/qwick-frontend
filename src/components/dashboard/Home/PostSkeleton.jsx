import { Skeleton } from "@/components/ui/skeleton";

const PostSkeleton = () => {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        {/* Avatar */}
        <Skeleton className="w-10 h-10 rounded-full" />
        
        <div className="flex-1">
          {/* Author name */}
          <Skeleton className="h-4 w-24 mb-2" />
          {/* Time */}
          <Skeleton className="h-3 w-16" />
        </div>
        
        {/* Menu dots */}
        <Skeleton className="w-6 h-6 rounded" />
      </div>

      {/* Content */}
      <div className="mb-4">
        {/* Text lines */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Image placeholder */}
      <Skeleton className="w-full h-64 rounded-lg mb-4" />

      {/* Action buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-6">
          {/* Like button */}
          <div className="flex items-center space-x-2">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="h-3 w-8" />
          </div>
          
          {/* Comment button */}
          <div className="flex items-center space-x-2">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="h-3 w-12" />
          </div>
          
          {/* Share button */}
          <div className="flex items-center space-x-2">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="h-3 w-10" />
          </div>
        </div>
        
        {/* Save button */}
        <Skeleton className="w-5 h-5 rounded" />
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
