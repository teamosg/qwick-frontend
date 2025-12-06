export default function ProfileInfoSkeleton() {
  return (
    <div className="p-6 space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-11 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <div className="h-4 w-14 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-24 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      </div>

      {/* Username */}
      <div className="space-y-2">
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-11 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-11 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      </div>

      {/* Submit Button */}
      <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mx-auto"></div>
    </div>
  );
}
