import { Skeleton } from "@/components/ui/skeleton";

const SkeletonUser = () => {
  return (
    <div className="w-full flex items-center gap-3 p-3 rounded-lg">
      <div className="relative">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-muted border-2 border-background rounded-full"></div>
      </div>
      <div className="flex-1 text-left space-y-1">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
};

export default SkeletonUser;
