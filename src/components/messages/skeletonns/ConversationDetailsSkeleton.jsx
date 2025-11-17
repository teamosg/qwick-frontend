import { Skeleton } from "@/components/ui/skeleton";

const ConversationDetailsSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col max-h-full">
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-8">

        {/* Skeleton Row */}
        <div className="flex items-start gap-3">
          <Skeleton className="w-10 h-10 rounded-full bg-gray-200" />
          <div className="space-y-3">
            <Skeleton className="w-56 h-12 rounded-xl bg-gray-200" />
            <Skeleton className="w-28 h-3 rounded-md bg-gray-200" />
          </div>
        </div>

        {/* Skeleton Row */}
        <div className="flex justify-end">
          <div className="flex items-start gap-3">
            <div className="space-y-3">
              <Skeleton className="w-64 h-12 rounded-xl bg-gray-200" />
              <Skeleton className="w-20 h-3 rounded-md bg-gray-200 ml-auto" />
            </div>
            <Skeleton className="w-10 h-10 rounded-full bg-gray-200" />
          </div>
        </div>

        {/* Large block */}
        <div className="flex items-start gap-3">
          <Skeleton className="w-10 h-10 rounded-full bg-gray-200" />
          <div className="space-y-4">
            <Skeleton className="w-64 h-40 rounded-xl bg-gray-200" />
            <Skeleton className="w-32 h-3 rounded-md bg-gray-200" />
          </div>
        </div>

      </div>

      {/* Input bar */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <Skeleton className="flex-1 h-11 rounded-lg bg-gray-200" />
          <Skeleton className="w-10 h-10 rounded-lg bg-gray-200" />
          <Skeleton className="w-10 h-10 rounded-lg bg-gray-200" />
          <Skeleton className="w-24 h-10 rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default ConversationDetailsSkeleton;
