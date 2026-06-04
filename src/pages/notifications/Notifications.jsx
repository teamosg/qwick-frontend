import { useNotificationStore } from "@/store/notificationStore";
import { format } from "date-fns";
import { Bell, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetNotifications } from "@/hooks/notification.hook";
import { Button } from "@/components/ui/button";

const Notifications = () => {
  const { setHasUnread } = useNotificationStore();
  const { data: response, isLoading } = useGetNotifications();
  const [displayCount, setDisplayCount] = useState(10);

  const notifications = response?.data || [];

  useEffect(() => {
    setHasUnread(false);
  }, [setHasUnread]);

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 10);
  };

  const handleShowLess = () => {
    setDisplayCount(10);
  };

  const visibleNotifications = notifications.slice(0, displayCount);

  return (
    <div className="bg-background dark:bg-zinc-950 min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden flex flex-col h-full md:max-h-[calc(100vh-8rem)]">
          <div className="px-4 md:px-6 py-4 md:py-5 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between sticky top-0 bg-white dark:bg-zinc-900 z-10">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Bell className="w-5 h-5 text-foreground-strong dark:text-foreground-strong" />
              Notifications
            </h1>
            <span className="bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ml-2">
              {notifications.length} Total
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-zinc-800 custom-scrollbar">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center p-20 gap-3">
                <Loader2 className="w-8 h-8 text-foreground-strong animate-spin" />
                <p className="text-gray-500 dark:text-gray-400 animate-pulse">Fetching your notifications...</p>
              </div>
            ) : visibleNotifications.length > 0 ? (
              <>
                {visibleNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-all duration-200 hover: border-l-4 hover:border-[#F62B36] border-l-transparent"
                  >
                    <div className="flex flex-col gap-1.5">
                      <p className="text-gray-900 dark:text-gray-100 font-medium leading-relaxed">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground-strong/40"></span>
                        <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 dark:text-gray-500">
                          {format(new Date(notification.created_at), "MMM d, yyyy • h:mm a")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="p-4 md:p-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 bg-gray-50/50 dark:bg-zinc-800/20">
                  {displayCount < notifications.length && (
                    <Button
                      onClick={handleLoadMore}
                      variant="outline"
                      className="w-full sm:w-auto rounded-full px-6 flex items-center justify-center gap-2 hover:bg-foreground-strong hover:text-white transition-all text-sm"
                    >
                      <ChevronDown size={16} />
                      Load More
                    </Button>
                  )}
                  {displayCount > 10 && (
                    <Button
                      onClick={handleShowLess}
                      variant="ghost"
                      className="w-full sm:w-auto rounded-full px-6 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-zinc-700 text-sm"
                    >
                      <ChevronUp size={16} />
                      Show Less
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <div className="p-20 text-center">
                <div className="bg-gray-100 dark:bg-zinc-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bell className="w-10 h-10 text-gray-300 dark:text-gray-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Clean slate!</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto text-sm leading-relaxed">
                  When you receive notifications about your campaigns or account, they will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
