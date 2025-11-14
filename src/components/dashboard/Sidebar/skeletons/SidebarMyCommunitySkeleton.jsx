import { Skeleton } from "@/components/ui/skeleton";

export function SidebarMyCommunitySkeleton() {
  return (
    <div className="p-4 space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full bg-gray-200" />
          <Skeleton className="h-4 w-24 bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
