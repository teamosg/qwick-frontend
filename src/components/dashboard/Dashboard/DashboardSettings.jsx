import LegalSvg from "@/assets/svg/LegalSvg";
import { Bell, ChevronRight, Share2, Check } from "lucide-react";
import { Link } from "react-router";
import DeleteCommunityAlert from "./DeleteCommunityAlert";
import { useState } from "react";
import { useCommunityStore } from "@/store/communityStore";
import { useProfile } from "@/hooks/auth.hook";
import { toast } from "sonner";

const DashboardSettings = () => {
  const { selectedBrandCommunity } = useCommunityStore();
  const { data: user } = useProfile();
  const [copied, setCopied] = useState(false);

  const handleCopyRefLink = () => {
    if (!selectedBrandCommunity?.username) {
      toast.error("No community selected");
      return;
    }

    const baseUrl = window.location.origin;
    const refLink = `${baseUrl}/join-community/${selectedBrandCommunity.username}${user?.username ? `?ref=${user.username}` : ''}`;

    navigator.clipboard.writeText(refLink);
    setCopied(true);
    toast.success("Reference link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div>
      <h2 className="text-[24px] text-gray-900 dark:text-white font-bold mb-6">
        Dashboard Settings
      </h2>
      <div className=" space-y-3">
        <Link
          to={"/dashboard/dashboard-settings/notifications"}
          className="flex items-center justify-between bg-white dark:bg-[#2E2E2E] rounded-xl py-4 px-6 hover:shadow-lg transition-all duration-300 ease-in-out shadow-sm"
        >
          <div className="flex items-center justify-center gap-3">
            <Bell />
            <h3 className="text-[#003933] dark:text-white text-[20px] font-semibold ">
              Notifications
            </h3>
          </div>
          <ChevronRight />
        </Link>

        <div
          onClick={handleCopyRefLink}
          className="flex items-center justify-between bg-white dark:bg-[#2E2E2E] rounded-xl py-4 px-6 hover:shadow-lg transition-all duration-300 ease-in-out shadow-sm cursor-pointer"
        >
          <div className="flex items-center justify-center gap-3">
            {copied ? <Check className="text-emerald-500" /> : <Share2 />}
            <h3 className="text-[#003933] dark:text-white text-[20px] font-semibold ">
              {copied ? "Link Copied!" : "Generate Reference Link"}
            </h3>
          </div>
          <ChevronRight />
        </div>

        <Link
          to={""}
          className="flex items-center justify-between bg-white dark:bg-[#2E2E2E] rounded-xl py-4 px-6 hover:shadow-lg transition-all duration-300 ease-in-out shadow-sm"
        >
          <div className="flex items-center justify-center gap-3">
            <LegalSvg />
            <h3 className="text-[#003933] dark:text-white text-[20px] font-semibold ">Legal</h3>
          </div>
          <ChevronRight />
        </Link>

        <DeleteCommunityAlert />
      </div>
    </div>
  );
};

export default DashboardSettings;
