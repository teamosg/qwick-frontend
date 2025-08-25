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
    <div className="p-6 h-screen">
      {/* Mobile Toggle Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsTabsOpen(!isTabsOpen)}
          className="text-gray-700 dark:text-white p-2 rounded-md border border-gray-300 dark:border-gray-600"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <Tabs
        orientation="vertical"
        defaultValue={tabs[0].value}
        className="w-full flex flex-col md:flex-row gap-4 h-auto"
      >
        {/* Tabs List */}
        <div
          className={`${
            isTabsOpen ? "block" : "hidden"
          } shrink-0 md:grid grid-cols-1 gap-4 p-0 bg-background`}
        >
          <TabsList className="shrink-0 grid grid-cols-1 gap-4 p-0 bg-background">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:bg-none data-[state=active]:shadow-none data-[state=active]:border-none data-[state=active]:text-[#090003] justify-start text-[#9096A2] p-0"
                onClick={() => setIsTabsOpen(false)} // close on mobile when tab clicked
              >
                <tab.icon className="h-5 w-5 me-2" /> {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Tabs Content */}
        <div className="flex-1 border rounded-md font-medium text-muted-foreground">
          {tabs.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="flex sm:block w-full h-auto"
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
