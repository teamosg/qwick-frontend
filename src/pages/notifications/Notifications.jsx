import { useNotificationStore } from "@/store/notificationStore";
import { format } from "date-fns";
import { Bell } from "lucide-react";
import { useEffect } from "react";

const Notifications = () => {
  const { notifications, setHasUnread } = useNotificationStore();

  useEffect(() => {
    setHasUnread(false);
  }, [setHasUnread]);

  return (

    <div className="bg-[#f9fafb] dark:bg-zinc-950 min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </h1>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {notifications.length} Total
            </span>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-zinc-800">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {format(new Date(notification.timestamp), "MMM d, h:mm a")}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="bg-gray-100 dark:bg-zinc-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No notifications</h3>
                <p className="text-gray-500 dark:text-gray-400">When you receive notifications, they will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

