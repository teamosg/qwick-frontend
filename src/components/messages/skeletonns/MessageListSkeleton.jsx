import { Skeleton } from "@/components/ui/skeleton";

const ChatItemSkeleton = () => (
  <div className="flex items-center gap-3 p-3">
    <Skeleton className="w-10 h-10 rounded-full" />
    <div className="flex-1 min-w-0 space-y-2">
      <div className="flex items-center justify-between">
        <Skeleton className="w-24 h-3" />
        <Skeleton className="w-10 h-3" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="w-32 h-3" />
        <Skeleton className="w-5 h-5 rounded-full" />
      </div>
    </div>
  </div>
);

const SectionSkeleton = () => (
  <div className="p-4">
    <div className="flex items-center gap-2 mb-3">
      <Skeleton className="w-4 h-4" />
      <Skeleton className="w-24 h-3" />
    </div>
    <div className="space-y-1">
      <ChatItemSkeleton />
      <ChatItemSkeleton />
      <ChatItemSkeleton />
    </div>
  </div>
);

const MessageListSkeleton = () => {
  return (
    <div className="w-80 border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col h-full max-h-full">

      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <Skeleton className="w-24 h-5" />
          <Skeleton className="w-16 h-4" />
        </div>
      </div>

      {/* Search + Buttons */}
      <div className="p-4 border-b border-gray-200 dark:border-zinc-800">
        <div className="flex gap-2 mb-3">
          <Skeleton className="h-10 flex-1 rounded-lg" />
          <Skeleton className="w-10 h-10 rounded-lg" />
        </div>

        {/* Badges */}
        <div className="flex gap-2">
          <Skeleton className="w-20 h-6 rounded-full" />
          <Skeleton className="w-24 h-6 rounded-full" />
          <Skeleton className="w-20 h-6 rounded-full" />
        </div>
      </div>

      {/* Chat List Sections */}
      <div className="flex-1 overflow-y-auto">
        <SectionSkeleton title="Pinned" />
        <SectionSkeleton title="All Conversations" />
        <SectionSkeleton title="Chat Requests" />
      </div>
    </div>
  );
};

export default MessageListSkeleton;
