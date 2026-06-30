import { CircleAlert, X, ExternalLink, Calendar as LucideCalendar, Wallet, CalendarIcon, Pencil } from "lucide-react";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaGoogleDrive } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import ContentRewardNav from "./ContentRewardNav";
import { useGetSingleCampaign, useExtendCampaign, useWithdrawCampaign, useUpdateCampaign } from "@/hooks/campaign.hook";
import { Spinner } from "@/components/ui/spinner";
import CampaignProgress from "./CampaignProgress";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL;

const ContentRewardDetailsEdit = () => {
  const { id } = useParams();
  const { data: campaign, isLoading } = useGetSingleCampaign(id);

  const { mutate: extendCampaign, isPending: isExtending } = useExtendCampaign(id);
  const { mutate: withdrawCampaign, isPending: isWithdrawing } = useWithdrawCampaign(id);
  const { mutate: updateCampaign, isPending: isUpdating } = useUpdateCampaign(id);

  const [showExtendModal, setShowExtendModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [newEndDate, setNewEndDate] = useState("");
  const [addBudget, setAddBudget] = useState("");
  const [contentLink, setContentLink] = useState("");


  const handleExtendSubmit = () => {
    if (!newEndDate || !addBudget) return;

    if (Number(addBudget) < (budget * 0.5)) {
      toast.error(`Minimum additional budget required is $${(budget * 0.5).toFixed(2)}`);
      return;
    }

    extendCampaign({ end_date: newEndDate, add_budget: addBudget }, {
      onSuccess: () => setShowExtendModal(false)
    });
  };

  const handleWithdrawClick = () => {
    setShowWithdrawModal(true);
  };

  const handleWithdrawConfirm = () => {
    withdrawCampaign(null, {
      onSuccess: () => setShowWithdrawModal(false)
    });
  };

  const handleContentEditClick = () => {
    if (campaign?.available_content) {
      setContentLink(campaign.available_content);
    }
    setShowContentModal(true);
  };

  const handleContentSubmit = () => {
    if (!contentLink) return;

    if (!contentLink.includes("drive.google.com")) {
      toast.error("Please provide a valid Google Drive link");
      return;
    }

    const formData = new FormData();
    formData.append("available_content", contentLink);

    updateCampaign(formData, {
      onSuccess: () => {
        setShowContentModal(false);
        window.location.reload();
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Spinner className="size-10 text-foreground-strong" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex items-center justify-center p-20">
        <p className="text-gray-500">Campaign not found.</p>
      </div>
    );
  }

  const {
    name,
    thumbnail,
    reward_rate,
    campaign_type,
    category,
    platforms,
    budget,
    max_payout,
    min_payout,
    total_users_earning,
    initial_budget,
    available_content,
    end_date,
    is_withdrawn,
    flat_fee_bonus,
    currency,
    total_content_views,
    start_date,
  } = campaign;

  const isEnded = end_date ? new Date(end_date) < new Date() : false;

  const fullThumbnail = thumbnail?.startsWith("http")
    ? thumbnail
    : `${MEDIA_BASE_URL}${thumbnail}`;

  return (
    <div>
      {/* Tabs Navigation */}
      <ContentRewardNav />
      <div className="mt-6 text-foreground-subtle">
        <div className="dark:text-white dark:bg-zinc-900 p-4 sm:p-6 rounded-2xl items-center justify-center mx-auto shadow-sm mb-6 max-w-5xl bg-white border border-gray-100 dark:border-zinc-800">
          <div className="mb-6">
            <img
              src={thumbnail ? fullThumbnail : "/confirm-apply.png"}
              alt={name}
              className="w-full h-[300px] object-cover mb-7 rounded-xl"
            />
            <p className="text-foreground-subtle text-xs mb-7 dark:text-zinc-400 flex gap-2 items-center">
              <span>
                <CircleAlert className="text-warning" />
              </span>
              <span>
                Only views after you submit count towards payout. Submit as soon
                as you post to get paid for all of your views.
              </span>
            </p>
            <CampaignProgress
              totalUsersEarning={total_users_earning}
              initialBudget={initial_budget}
              budget={budget}
              showTitle={true}
            />
            {end_date && (
              <p className={`text-xs mt-3 font-medium ${isEnded ? "text-red-500" : "text-gray-500 dark:text-zinc-400"}`}>
                {isEnded ? "Ended on" : "Ends on"} {end_date}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 py-6 border-y border-gray-100 dark:border-zinc-800/50 mb-9 text-foreground-subtle">
            <div>
              <p className="text-foreground text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                Reward
              </p>
              <p className="text-foreground-subtle text-sm dark:text-zinc-400 font-medium">
                ${reward_rate}/1k
              </p>
            </div>
            <div>
              <p className="text-foreground text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                Type
              </p>
              <p className="text-foreground-subtle text-sm dark:text-zinc-400 font-medium">
                {campaign_type?.name || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-foreground text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                Category
              </p>
              <p className="text-foreground-subtle text-sm dark:text-zinc-400 font-medium">
                {category?.name || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-foreground text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                Platforms
              </p>
              <div className="flex gap-2 dark:text-zinc-400 text-foreground-strong">
                {platforms?.map((p, idx) => {
                  const pName = p.name?.toLowerCase();
                  if (pName === 'instagram') return <FaInstagram key={idx} size={20} />;
                  if (pName === 'facebook') return <FaFacebook key={idx} size={20} />;
                  if (pName === 'youtube') return <FaYoutube key={idx} size={20} />;
                  if (pName === 'tiktok') return <FaTiktok key={idx} size={20} />;
                  return null;
                })}
              </div>
            </div>
            <div>
              <p className="text-foreground text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                Minimum Payout
              </p>
              <p className="text-foreground-subtle text-sm dark:text-zinc-400 font-medium">
                ${min_payout || 0}
              </p>
            </div>
            <div>
              <p className="text-foreground text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                Maximum Payout
              </p>
              <p className="text-foreground-subtle text-sm dark:text-zinc-400 font-medium">
                ${max_payout || 0}
              </p>
            </div>
            <div>
              <p className="text-foreground text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                Flat Fee Bonus
              </p>
              <p className="text-foreground-subtle text-sm dark:text-zinc-400 font-medium">
                ${flat_fee_bonus || 0}
              </p>
            </div>
            <div>
              <p className="text-foreground text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                Currency
              </p>
              <p className="text-foreground-subtle text-sm dark:text-zinc-400 font-medium">
                {currency || "USD"}
              </p>
            </div>
            <div>
              <p className="text-foreground text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                Total Content Views
              </p>
              <p className="text-foreground-subtle text-sm dark:text-zinc-400 font-medium">
                {total_content_views?.toLocaleString() || 0}
              </p>
            </div>
            <div>
              <p className="text-foreground text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                Start Date
              </p>
              <p className="text-foreground-subtle text-sm dark:text-zinc-400 font-medium">
                {start_date || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-foreground text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                Budget Remaining
              </p>
              <p className="text-foreground-subtle text-sm dark:text-zinc-400 font-medium">
                ${parseFloat(budget || 0).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Campaign Assets Box */}
          <div className="bg-indigo-50 dark:bg-zinc-800/50 text-indigo-900 dark:text-indigo-400 p-5 sm:p-6 rounded-2xl border border-indigo-100 dark:border-zinc-700 shadow-sm transition-all hover:bg-indigo-100/50 dark:hover:bg-zinc-800/80 mb-9 relative group">
            <div className="absolute top-4 right-4">
              <button
                onClick={handleContentEditClick}
                className="p-2 bg-white dark:bg-zinc-700 text-indigo-600 dark:text-indigo-400 rounded-full shadow-sm hover:scale-110 transition-transform cursor-pointer border border-indigo-100 dark:border-zinc-600"
                title="Edit Assets"
              >
                <Pencil size={16} />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="bg-indigo-500/10 dark:bg-indigo-500/20 p-3 rounded-2xl text-indigo-600 dark:text-indigo-400 shrink-0">
                  <FaGoogleDrive size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-gray-900 dark:text-white leading-tight">Campaign Assets & Resources</h4>
                  <p className="text-xs text-indigo-700/70 dark:text-indigo-400/70 max-w-sm font-medium">
                    {available_content
                      ? "Download raw footage, brand logos, and creative guidelines to help you create your video."
                      : "No assets added yet. Click edit to add resources."}
                  </p>
                </div>
              </div>

              {available_content && (
                <Link
                  to={available_content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-200 dark:shadow-none active:scale-95 group"
                >
                  Access Materials
                  <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-end">
            {
              !is_withdrawn && (
                <button
                  onClick={() => setShowExtendModal(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 text-white bg-foreground-strong dark:bg-accent hover:bg-foreground dark:hover:bg-accent/80 text-[16px] font-semibold px-8 py-3 rounded-full cursor-pointer transition shadow-lg shadow-foreground-strong/10"
                >
                  <LucideCalendar size={18} />
                  Extend Date
                </button>
              )
            }
            {is_withdrawn ? (
              <div className="px-6 py-2 bg-red-50 text-red-600 rounded-full text-sm font-bold border border-red-100 flex items-center gap-2">
                <Wallet size={16} />
                Campaign Withdrawn
              </div>
            ) : isEnded ? (
              <button
                onClick={handleWithdrawClick}
                disabled={isWithdrawing}
                className="w-full sm:w-auto flex items-center justify-center gap-2 text-foreground-strong bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 text-[16px] font-semibold px-8 py-3 rounded-full cursor-pointer transition"
              >
                <Wallet size={18} />
                {isWithdrawing ? "Withdrawing..." : "Withdraw Remaining"}
              </button>
            ) : (
              <div className="px-6 py-2 bg-emerald-50 text-foreground-strong rounded-full text-sm font-bold border border-emerald-100">
                Active Campaign
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Extend Date Modal */}
      {showExtendModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-md mx-auto relative overflow-hidden shadow-2xl border border-gray-100 dark:border-zinc-800 animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center bg-gray-50/50 dark:bg-zinc-800/20">
              <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
                <LucideCalendar className="text-foreground-strong dark:text-foreground-strong" size={22} />
                Extend Campaign
              </h2>
              <button
                onClick={() => setShowExtendModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Select New End Date
                </label>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-14 rounded-2xl border-2 border-gray-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white hover:border-gray-200 dark:hover:border-zinc-600 transition-all focus:border-border-strong dark:focus:border-border-strong",
                        !newEndDate && "text-gray-400 dark:text-gray-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-5 w-5 text-gray-400" />
                      {newEndDate ? (
                        format(new Date(newEndDate), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newEndDate ? new Date(newEndDate) : undefined}
                      onSelect={(date) => setNewEndDate(date ? format(date, 'yyyy-MM-dd') : "")}
                      disabled={(date) => {
                        if (!end_date) {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today;
                        }
                        const limitDate = new Date(end_date);
                        limitDate.setHours(0, 0, 0, 0);
                        const compareDate = new Date(date);
                        compareDate.setHours(0, 0, 0, 0);
                        return compareDate <= limitDate;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Add Budget (Must be ≥ 50% of budget: ${(budget * 0.5).toFixed(2)})
                </label>
                <Input
                  type="number"
                  placeholder="Enter additional budget"
                  value={addBudget}
                  onChange={(e) => setAddBudget(e.target.value)}
                  className="h-14 rounded-2xl border-2 border-gray-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white hover:border-gray-200 dark:hover:border-zinc-600 transition-all focus:border-border-strong dark:focus:border-border-strong"
                />
              </div>

              <div className="flex gap-4 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100/50 dark:border-blue-900/20">
                <CircleAlert className="text-blue-500 shrink-0" size={20} />
                <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed font-medium">
                  Extending the date allows creators to continue applying and submitting content for this campaign.
                </p>
              </div>
            </div>

            <div className="p-6 flex gap-3 bg-gray-50/50 dark:bg-zinc-800/20 mt-2">
              <button
                onClick={() => setShowExtendModal(false)}
                className="flex-1 px-6 py-3.5 rounded-2xl font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-all border border-gray-200 dark:border-zinc-700"
              >
                Cancel
              </button>
              <button
                onClick={handleExtendSubmit}
                disabled={isExtending || !newEndDate || !addBudget}
                className="flex-[1.5] px-6 py-3.5 rounded-2xl font-bold text-white bg-foreground-strong dark:bg-accent hover:bg-foreground dark:hover:bg-accent/80 shadow-lg shadow-foreground-strong/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isExtending ? "Extending..." : "Confirm Extension"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Content Modal */}
      {showContentModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-md mx-auto relative overflow-hidden shadow-2xl border border-gray-100 dark:border-zinc-800 animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center bg-gray-50/50 dark:bg-zinc-800/20">
              <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
                <FaGoogleDrive className="text-foreground-strong dark:text-foreground-strong" size={22} />
                Update Assets
              </h2>
              <button
                onClick={() => setShowContentModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-3">
                <Label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Assets URL (Google Drive/Dropbox)
                </Label>
                <Input
                  type="url"
                  placeholder="https://drive.google.com/..."
                  value={contentLink || ""}
                  onChange={(e) => setContentLink(e.target.value)}
                  className="h-14 rounded-2xl border-2 border-gray-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white hover:border-gray-200 dark:hover:border-zinc-600 transition-all focus:border-border-strong dark:focus:border-border-strong"
                />
              </div>

              <div className="flex gap-4 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100/50 dark:border-blue-900/20">
                <CircleAlert className="text-blue-500 shrink-0" size={20} />
                <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed font-medium">
                  Provide a direct link to a folder where influencers can download the necessary assets for this campaign.
                </p>
              </div>
            </div>

            <div className="p-6 flex gap-3 bg-gray-50/50 dark:bg-zinc-800/20 mt-2">
              <button
                onClick={() => setShowContentModal(false)}
                className="flex-1 px-6 py-3.5 rounded-2xl font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-all border border-gray-200 dark:border-zinc-700"
              >
                Cancel
              </button>
              <button
                onClick={handleContentSubmit}
                disabled={isUpdating || !contentLink}
                className="flex-[1.5] px-6 py-3.5 rounded-2xl font-bold text-white bg-foreground-strong dark:bg-accent hover:bg-foreground dark:hover:bg-accent/80 shadow-lg shadow-foreground-strong/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isUpdating ? "Updating..." : "Update Assets"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Confirmation Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-md mx-auto relative overflow-hidden shadow-2xl border border-gray-100 dark:border-zinc-800 animate-in zoom-in-95 duration-300">
            <div className="p-8 text-center space-y-6">
              <div className="mx-auto w-20 h-20 bg-red-50 dark:bg-red-900/10 rounded-full flex items-center justify-center text-red-600 border border-red-100 dark:border-red-900/20 animate-bounce">
                <Wallet size={40} />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold dark:text-white">Withdraw Balance?</h2>
                <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed px-4">
                  Are you sure you want to withdraw the remaining balance from this campaign? This action will transfer unspent funds back to your wallet.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="flex-1 px-6 py-3.5 rounded-2xl font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-all border border-gray-200 dark:border-zinc-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWithdrawConfirm}
                  disabled={isWithdrawing}
                  className="flex-[1.5] px-6 py-3.5 rounded-2xl font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-900/20 disabled:opacity-50 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isWithdrawing ? "Processing..." : "Yes, Withdraw"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentRewardDetailsEdit;
