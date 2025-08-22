import ProfileGeneral from "@/components/dashboard/Profile/General";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Captions,
  CircleAlert,
  CreditCard,
  DollarSign,
  Link2,
  Lock,
  Settings,
} from "lucide-react";
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
    content: "Connected accounts content goes here",
  },
  {
    name: "Security & Privacy",
    value: "accounts-privacy",
    icon: Lock,
    content: "Security & Privacy content goes here",
  },
  {
    name: "Payment method",
    value: "payment-method",
    icon: CreditCard,
    content: "Payment method content goes here",
  },
  {
    name: "Balance",
    value: "balance",
    icon: DollarSign,
    content: "Balance content goes here",
  },
  {
    name: "Billing history",
    value: "billing-history",
    icon: FaFileInvoice,
    content: "Billing history content goes here",
  },
  {
    name: "My submission",
    value: "my-submission",
    icon: Captions,
    content: "My submission content goes here",
  },
  {
    name: "Danger zone",
    value: "danger-zone",
    icon: CircleAlert,
    content: "Danger zone content goes here",
  },
];

const Profile = () => {
  return (
    <div className="p-6 h-screen">
      <Tabs
        orientation="vertical"
        defaultValue={tabs[0].value}
        className="w-full flex flex-row gap-4 h-full"
      >
        <TabsList className="shrink-0 grid grid-cols-1 gap-4 p-0 bg-background">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:bg-none data-[state=active]:shadow-none data-[state=active]:border-none data-[state=active]:text-[#090003] justify-start text-[#9096A2] p-0"
            >
              <tab.icon className="h-5 w-5 me-2" /> {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="flex-1 border rounded-md font-medium text-muted-foreground">
          {tabs.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="flex sm:block w-full sm:w-3xl h-full"
            >
              {tab?.content}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default Profile;
