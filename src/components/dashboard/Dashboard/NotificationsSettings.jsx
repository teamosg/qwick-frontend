import { useGetNotificationSettings, useUpdateNotificationSettings } from "@/hooks/notification.hook";
import ToggleSwitch from "./ToggleSwitch";
import { Skeleton } from "@/components/ui/skeleton";

const NotificationsSettings = () => {
  const { data: settings, isLoading } = useGetNotificationSettings();
  const { mutate: updateSettings, isPending: isUpdating } = useUpdateNotificationSettings();

  const handleToggle = (key, currentValue) => {
    if (isUpdating) return;
    updateSettings({ [key]: !currentValue });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64 mb-6" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="">
      <h2 className="text-[20px] md:text-[24px] text-foreground-strong font-bold mb-6">
        Notification Settings
      </h2>

      <div className="space-y-4">
        {/* Joins Notification */}
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-foreground-strong text-lg font-semibold mb-2">
                Joins
              </h3>
              <p className="text-foreground-muted text-sm">
                Get notification when new members that join your community
              </p>
            </div>
            <ToggleSwitch
              enabled={settings?.join_notifications}
              onToggle={() => handleToggle("join_notifications", settings?.join_notifications)}
              disabled={isUpdating}
            />
          </div>
        </div>

        {/* Payments Notification */}
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-foreground-strong text-lg font-semibold mb-2">
                Payments
              </h3>
              <p className="text-foreground-muted text-sm">
                Get notification when Purchases and subscription renewals
              </p>
            </div>
            <ToggleSwitch
              enabled={settings?.payment_notifications}
              onToggle={() => handleToggle("payment_notifications", settings?.payment_notifications)}
              disabled={isUpdating}
            />
          </div>
        </div>

        {/* Waitlists Notification */}
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-foreground-strong text-lg font-semibold mb-2">
                Waitlists
              </h3>
              <p className="text-foreground-muted text-sm">
                Get notification when there are New entries
              </p>
            </div>
            <ToggleSwitch
              enabled={settings?.waitlist_notifications}
              onToggle={() => handleToggle("waitlist_notifications", settings?.waitlist_notifications)}
              disabled={isUpdating}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSettings;
