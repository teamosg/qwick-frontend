import { useState } from "react";

const NotificationsSettings = () => {
  const [joinsEnabled, setJoinsEnabled] = useState(true);
  const [paymentsEnabled, setPaymentsEnabled] = useState(true);
  const [waitlistsEnabled, setWaitlistsEnabled] = useState(true);

  const ToggleSwitch = ({ enabled, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#003933] focus:ring-offset-2 hover:scale-105 active:scale-95 ${
        enabled ? "bg-[#003933] shadow-lg" : "bg-gray-300 hover:bg-gray-400"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-all duration-300 ease-in-out ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div className="p-6">
      <h2 className="text-[24px] text-gray-900 dark:text-white font-bold mb-6">
        Notification Settings
      </h2>

      <div className="space-y-4">
        {/* Joins Notification */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-[#003933] text-lg font-semibold mb-2">
                Joins
              </h3>
              <p className="text-gray-600 text-sm">
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
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-[#003933] text-lg font-semibold mb-2">
                Payments
              </h3>
              <p className="text-gray-600 text-sm">
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
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-[#003933] text-lg font-semibold mb-2">
                Waitlists
              </h3>
              <p className="text-gray-600 text-sm">
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
