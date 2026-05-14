import ProfileBalance from "@/components/dashboard/Profile/Balance";
import ConnectedAccounts from "@/components/dashboard/Profile/ConnectedAccounts";
import ProfileGeneral from "@/components/dashboard/Profile/General";
import PaymentMethod from "@/components/dashboard/Profile/PaymentMethod";
import ProfileBillingHistory from "@/components/dashboard/Profile/ProfileBillingHistory";
import ProfileDangerZone from "@/components/dashboard/Profile/ProfileDangerZone";
import ProfileMyEarnings from "@/components/dashboard/Profile/ProfileMyEarnings";
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
  Loader2,
  Coins,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { FaFileInvoice } from "react-icons/fa";

import { useEditProfile, useProfile } from "@/hooks/auth.hook";
import { Bookmark } from "lucide-react";
import SavedPosts from "@/components/dashboard/Profile/SavedPosts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Save from "@/assets/svg/Save";

const tabs = [
  {
    name: "General",
    value: "general",
    icon: Settings,
    content: <ProfileGeneral />,
  },
  {
    name: "Connected Accounts",
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
  // {
  //   name: "Payment method",
  //   value: "payment-method",
  //   icon: CreditCard,
  //   content: <PaymentMethod />,
  // },
  {
    name: "Balance",
    value: "balance",
    icon: DollarSign,
    content: <ProfileBalance />,
  },
  {
    name: "Billing history",
    value: "Billing History",
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
    name: "My Earnings",
    value: "my-earnings",
    icon: Coins,
    content: <ProfileMyEarnings />,
  },
  {
    name: "Saved Post",
    value: "saved-post",
    icon: Save,
    content: <SavedPosts />,
  },
  // {
  //   name: "Sign Out",
  //   value: "sign-out",
  //   icon: LogOut,
  //   content: <ProfileDangerZone />,
  // },
];

const Profile = () => {
  const [isTabsOpen, setIsTabsOpen] = useState(false);

  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const { mutate: editProfile, isPending: isUploading } = useEditProfile();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Prepare FormData for upload
    const formData = new FormData();
    formData.append("avatar", file);

    editProfile(formData);
  };

  const userName = profile?.full_name || "User Name";
  const userAvatar = profile?.avatar;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#f9fafb] dark:bg-zinc-950 overflow-hidden relative">
      <div className="md:hidden p-4 bg-white dark:bg-zinc-900 border-b dark:border-zinc-800">
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
        className="flex-1 flex flex-col md:flex-row gap-6 min-h-0 overflow-hidden"
      >
        {/* Tabs Sidebar */}
        <div
          className={`${isTabsOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
            } md:translate-x-0 md:opacity-100 fixed md:relative top-0 left-0 z-50 md:z-auto w-80 md:w-64 h-full md:h-auto bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-700 shadow-lg md:shadow-none transition-all duration-300 ease-in-out flex flex-col min-h-0`}
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

          <div className="flex-1 overflow-y-auto p-6 md:p-0 no-scrollbar">
            {/* Profile Avatar + Name */}
            <div className="p-4 relative group text-center">
              <div className="relative inline-block">
                <Avatar className="h-20 w-20 rounded-full object-cover border border-border transition-all">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback>{userName.split("")[0]}</AvatarFallback>
                </Avatar>

                <label
                  htmlFor="profile-upload"
                  className="absolute inset-0 bg-black/50 text-white text-xs flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                >
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Change"
                  )}
                </label>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={isUploading}
                />
              </div>

              <h4 className="font-semibold text-base text-[#191919] dark:text-white mt-3">
                {isProfileLoading ? "Loading..." : userName}
              </h4>
            </div>

            {/* Tabs Menu */}
            <TabsList className="shrink-0 grid grid-cols-1 gap-2 h-auto p-0 bg-transparent w-full">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="cursor-pointer flex items-center gap-x-2 !w-full data-[state=active]:rounded-none hover:rounded-none data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-none data-[state=active]:border-none data-[state=active]:text-[#090003] dark:data-[state=active]:text-white justify-start dark:text-gray-400 p-3 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all duration-200"
                  onClick={() => setIsTabsOpen(false)}
                >
                  <tab.icon /> {tab.name}
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
        <div className="flex-1 overflow-y-auto min-h-0 bg-white dark:bg-zinc-900/50 p-4 md:p-6 lg:p-8">
          <div className="max-w-4xl">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="mt-0 focus-visible:outline-none focus-visible:ring-0"
              >
                {tab.content}
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Profile;
