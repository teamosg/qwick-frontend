import { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";

const NotificationsSettings = () => {
  const [joinsEnabled, setJoinsEnabled] = useState(true);
  const [paymentsEnabled, setPaymentsEnabled] = useState(true);
  const [waitlistsEnabled, setWaitlistsEnabled] = useState(true);

  return (
    <div className="p-6">
      <h2 className="text-[24px] text-gray-900 dark:text-white font-bold mb-6">
        Notification Settings
      </h2>

      <div className="space-y-4">
        {/* Joins Notification */}
        <div className="bg-white dark:bg-[#2E2E2E] rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-[#003933] dark:text-white text-lg font-semibold mb-2">
                Joins
              </h3>
              <p className="text-gray-600 dark:text-white text-sm">
                Get notification when new members that join your community
              </p>
            </div>
            <ToggleSwitch
              enabled={joinsEnabled}
              onToggle={() => setJoinsEnabled(!joinsEnabled)}
            />
          </div>
        </div>

        {/* Payments Notification */}
        <div className="bg-white dark:bg-[#2E2E2E] rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-[#003933] dark:text-white text-lg font-semibold mb-2">
                Payments
              </h3>
              <p className="text-gray-600 dark:text-white text-sm">
                Get notification when Purchases and subscription renewals
              </p>
            </div>
            <ToggleSwitch
              enabled={paymentsEnabled}
              onToggle={() => setPaymentsEnabled(!paymentsEnabled)}
            />
          </div>
        </div>

        {/* Waitlists Notification */}
        <div className="bg-white dark:bg-[#2E2E2E] rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-[#003933] dark:text-white text-lg font-semibold mb-2">
                Waitlists
              </h3>
              <p className="text-gray-600 dark:text-white text-sm">
                Get notification when there are New entries
              </p>
            </div>
            <ToggleSwitch
              enabled={waitlistsEnabled}
              onToggle={() => setWaitlistsEnabled(!waitlistsEnabled)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSettings;
