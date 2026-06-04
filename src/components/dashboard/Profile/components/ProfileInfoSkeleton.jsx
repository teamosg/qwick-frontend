import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileInfoSkeleton() {
  return (
    <div className="p-6 space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-11 w-full rounded-lg" />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-14" />
        <Skeleton className="h-24 w-full rounded-lg" />
      </div>

      {/* Username */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-11 w-full rounded-lg" />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-11 w-full rounded-lg" />
      </div>

      {/* Submit Button */}
      <Skeleton className="h-12 w-32 rounded-lg mx-auto" />
    </div>
  );
}
