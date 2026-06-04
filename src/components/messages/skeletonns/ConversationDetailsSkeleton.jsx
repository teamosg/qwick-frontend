import { Skeleton } from "@/components/ui/skeleton";

const ConversationDetailsSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col h-full bg-background">
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-8">

        {/* Skeleton Row */}
        <div className="flex items-start gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="space-y-3">
            <Skeleton className="w-56 h-12 rounded-xl" />
            <Skeleton className="w-28 h-3 rounded-md" />
          </div>
        </div>

        {/* Skeleton Row */}
        <div className="flex justify-end">
          <div className="flex items-start gap-3">
            <div className="space-y-3">
              <Skeleton className="w-64 h-12 rounded-xl" />
              <Skeleton className="w-20 h-3 rounded-md ml-auto" />
            </div>
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
        </div>

        {/* Large block */}
        <div className="flex items-start gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="space-y-4">
            <Skeleton className="w-64 h-40 rounded-xl" />
            <Skeleton className="w-32 h-3 rounded-md" />
          </div>
        </div>

      </div>

      {/* Input bar */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-4">
          <Skeleton className="flex-1 h-11 rounded-lg" />
          <Skeleton className="w-10 h-10 rounded-lg" />
          <Skeleton className="w-10 h-10 rounded-lg" />
          <Skeleton className="w-24 h-10 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ConversationDetailsSkeleton;
