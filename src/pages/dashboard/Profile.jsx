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
    name: "My Submissions",
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
    name: "Saved Posts",
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

  const userName = profile?.username || "User Name";
  const userAvatar = profile?.avatar;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-background dark:bg-background overflow-hidden relative">
      <div className="md:hidden p-4 bg-card dark:bg-card border-b dark:border-border">
        <button
          onClick={() => setIsTabsOpen(!isTabsOpen)}
          className="text-foreground dark:text-foreground p-2 rounded-md border border-border dark:border-border hover:bg-accent dark:hover:bg-accent transition-colors"
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
            } md:translate-x-0 md:opacity-100 fixed md:relative top-0 left-0 z-50 md:z-auto w-80 md:w-64 h-full md:h-auto bg-card dark:bg-card border-r border-border dark:border-border shadow-lg md:shadow-none transition-all duration-300 ease-in-out flex flex-col min-h-0`}
        >
          {/* Mobile Close Button */}
          <div className="md:hidden flex justify-between items-center p-4 border-b border-border dark:border-border">
            <h2 className="text-lg font-semibold text-foreground dark:text-foreground">
              Profile Settings
            </h2>
            <button
              onClick={() => setIsTabsOpen(false)}
              className="text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground p-1 rounded-md hover:bg-accent dark:hover:bg-accent transition-colors"
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

              <h4 className="font-semibold text-base text-foreground dark:text-white mt-3">
                {isProfileLoading ? "Loading..." : userName}
              </h4>
            </div>

            {/* Tabs Menu */}
            <TabsList className="shrink-0 grid grid-cols-1 gap-2 h-auto p-0 bg-transparent w-full">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="cursor-pointer flex items-center gap-x-2 !w-full data-[state=active]:rounded-none hover:rounded-none data-[state=active]:bg-accent dark:data-[state=active]:bg-accent data-[state=active]:shadow-none data-[state=active]:border-none data-[state=active]:text-foreground-strong dark:data-[state=active]:text-foreground justify-start dark:text-muted-foreground p-3 hover:bg-accent dark:hover:bg-accent transition-all duration-200"
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
        <div className="flex-1 overflow-y-auto min-h-0 bg-card dark:bg-card/50 p-4 md:p-6 lg:p-8">
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
