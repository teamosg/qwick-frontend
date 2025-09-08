import ProfileBalance from "@/components/dashboard/Profile/Balance";
import ConnectedAccounts from "@/components/dashboard/Profile/ConnectedAccounts";
import ProfileGeneral from "@/components/dashboard/Profile/General";
import PaymentMethod from "@/components/dashboard/Profile/PaymentMethod";
import ProfileBillingHistory from "@/components/dashboard/Profile/ProfileBillingHistory";
import ProfileDangerZone from "@/components/dashboard/Profile/ProfileDangerZone";
import ProfileMySubmission from "@/components/dashboard/Profile/ProfileMySubmission";
import SecurityPrivacy from "@/components/dashboard/Profile/SecurityPrivacy";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Captions,
  CircleAlert,
  CreditCard,
  DollarSign,
  Link2,
  Lock,
  Menu,
  Settings,
  X,
} from "lucide-react";
import { useState } from "react";
import { FaFileInvoice } from "react-icons/fa";

const tabs = [
  {
    name: "General",
    value: "general",
    icon: Settings,
    content: <ProfileGeneral />,
  },
  {
    name: "Connected accounts",
    value: "connected-accounts",
    icon: Link2,
    content: <ConnectedAccounts />,
  },
  {
    name: "Security & Privacy",
    value: "accounts-privacy",
    icon: Lock,
    content: <SecurityPrivacy />,
  },
  {
    name: "Payment method",
    value: "payment-method",
    icon: CreditCard,
    content: <PaymentMethod />,
  },
  {
    name: "Balance",
    value: "balance",
    icon: DollarSign,
    content: <ProfileBalance />,
  },
  {
    name: "Billing history",
    value: "billing-history",
    icon: FaFileInvoice,
    content: <ProfileBillingHistory />,
  },
  {
    name: "My submission",
    value: "my-submission",
    icon: Captions,
    content: <ProfileMySubmission />,
  },
  {
    name: "Danger zone",
    value: "danger-zone",
    icon: CircleAlert,
    content: <ProfileDangerZone />,
  },
];

const Profile = () => {
  const [isTabsOpen, setIsTabsOpen] = useState(false);

  return (
    <div className="p-6 min-h-screen bg-[#f9fafb] dark:bg-zinc-950">
      {/* Mobile Toggle Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsTabsOpen(!isTabsOpen)}
          className="text-gray-700 dark:text-white p-2 rounded-md border border-gray-300 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <Tabs
        orientation="vertical"
        defaultValue={tabs[0].value}
        className="w-full flex flex-col md:flex-row gap-6 h-auto"
      >
        {/* Tabs List */}
        <div
          className={`${
            isTabsOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          } md:translate-x-0 md:opacity-100 fixed md:relative top-0 left-0 z-50 md:z-auto w-80 md:w-64 h-full md:h-auto bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-700 shadow-lg md:shadow-none transition-all duration-300 ease-in-out`}
        >
          {/* Mobile Close Button */}
          <div className="md:hidden flex justify-between items-center p-4 border-b border-gray-200 dark:border-zinc-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Profile Settings
            </h2>
            <button
              onClick={() => setIsTabsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Tabs List Content */}
          <div className="p-6 md:p-0">
            <div className="p-4 mb-6">
              <img
                alt="Linda smith"
                class="h-16 w-16 rounded-full object-cover border border-border mb-2"
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
              ></img>
              <h4 className="font-semibold text-base text-[#191919] dark:text-white">
                Linda smith
              </h4>
            </div>
            <TabsList className="shrink-0 grid grid-cols-1 gap-2 p-0 bg-transparent w-full">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="!w-full data-[state=active]:rounded-none hover:rounded-none data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-none data-[state=active]:border-none data-[state=active]:text-[#090003] dark:data-[state=active]:text-white justify-start dark:text-gray-400 p-3  hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all duration-200"
                  onClick={() => setIsTabsOpen(false)} // close on mobile when tab clicked
                >
                  <tab.icon className="h-5 w-5 me-3" /> {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        {/* Mobile Overlay */}
        {isTabsOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={() => setIsTabsOpen(false)}
          />
        )}

        {/* Tabs Content */}
        <div className="flex-1 rounded-lg dark:bg-zinc-900 font-medium text-muted-foreground min-h-[600px]">
          {tabs.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="flex sm:block w-full h-auto p-6"
            >
              {tab.content}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default Profile;
