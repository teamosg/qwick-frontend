import { Progress } from "@/components/ui/progress";
import { DollarSign, Users, ExternalLink, FileText } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaGoogleDrive } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router";
import { useGetAllCampaigns } from "@/hooks/campaign.hook";
import { useCommunityStore } from "@/store/communityStore";
import { useMemo } from "react";
import CampaignDetailsSkeleton from "./CampaignDetailsSkeleton";
import CampaignProgress from "@/components/dashboard/Dashboard/ContentReward/CampaignProgress";

const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL;

const ContentRewardDetails = () => {
  const { campaignId, communityUsername } = useParams();
  const navigate = useNavigate();
  const { selectedCreatorCommunity } = useCommunityStore();
  const { data: campaignRes, isLoading } = useGetAllCampaigns();

  const campaign = useMemo(() => {
    return campaignRes?.campaigns?.find(c => c.id === parseInt(campaignId));
  }, [campaignRes, campaignId]);

  const isCreator = selectedCreatorCommunity?.can_edit;


  const totalUsersEarning = campaign?.total_users_earning
  const initialBudget = campaign?.initial_budget
  const budget = campaign?.budget
  const currentBudget = initialBudget || budget || 0;
  const earning = parseFloat(totalUsersEarning || 0);

  const progress = currentBudget > 0
    ? Math.min(Math.max((earning / parseFloat(currentBudget)) * 100, 0), 100)
    : 0;



  if (isCreator) {
    return (
      <div className="flex items-center justify-center p-6 mt-10">
        <p className="text-muted-foreground dark:text-muted-foreground">Access denied for community creators.</p>
      </div>
    );
  }

  if (isLoading) {
    return <CampaignDetailsSkeleton />;
  }

  if (!campaign) {
    return (
      <div className="flex items-center justify-center p-10 h-[60vh]">
        <p className="text-muted-foreground dark:text-muted-foreground">Campaign not found or has been removed.</p>
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
    // budget,
    content_requirement,
    available_content,
  } = campaign;

  const fullThumbnail = thumbnail?.startsWith("http")
    ? thumbnail
    : `${MEDIA_BASE_URL}${thumbnail}`;

  const isEnded = campaign?.end_date && new Date(campaign.end_date) < new Date();
  const isFull = progress >= 100;

  return (
    <div className="p-4 sm:p-6 text-foreground-subtle max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl text-foreground dark:text-white font-bold">
          Content Reward Details
        </h2>
        {isEnded ? (
          <div className="px-3 py-1 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-full text-xs font-bold flex items-center gap-1.5 border border-red-200 dark:border-red-900/50">
            <div className="size-1.5 rounded-full bg-red-600 animate-pulse" />
            CAMPAIGN EXPIRED
          </div>
        ) : isFull ? (
          <div className="px-3 py-1 bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 rounded-full text-xs font-bold flex items-center gap-1.5 border border-amber-200 dark:border-amber-900/50">
            <div className="size-1.5 rounded-full bg-amber-600 animate-pulse" />
            BUDGET REACHED
          </div>
        ) : null}
      </div>

      <div className="space-y-6">
        {/* Main Details Card */}
        <div className="dark:text-foreground bg-card dark:bg-card p-5 sm:p-6 rounded-2xl shadow-sm border border-border dark:border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <img
                src={fullThumbnail || "https://i.pravatar.cc/36"}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-gray-100 dark:border-zinc-700 object-cover"
              />
              <span className="text-base font-semibold text-gray-900 dark:text-white transition capitalize">
                {name}
              </span>
            </div>

            <span className="font-bold text-foreground-strong dark:text-foreground-strong text-lg">
              ${reward_rate}/1k
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-foreground text-lg font-bold mb-2 dark:text-foreground">
                {name}
              </h3>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-4 leading-relaxed">
                {content_requirement || "No specific requirements mentioned."}
              </p>

              <div className="space-y-2">
                <CampaignProgress
                  totalUsersEarning={totalUsersEarning}
                  initialBudget={initialBudget}
                  budget={budget}
                  showTitle={false}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 py-6 border-y border-gray-50 dark:border-zinc-800/50">
              <div>
                <p className="text-[10px] text-foreground-subtle dark:text-muted-foreground mb-1 font-bold uppercase tracking-wider">
                  Type
                </p>
                <p className="text-foreground text-sm font-medium dark:text-foreground">
                  {campaign_type?.name || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-foreground-subtle dark:text-muted-foreground mb-1 font-bold uppercase tracking-wider">
                  Platforms
                </p>
                <div className="flex gap-3 text-foreground dark:text-foreground">
                  {platforms?.map((p, idx) => {
                    const pName = p.name?.toLowerCase();
                    if (pName === 'instagram') return <FaInstagram key={idx} size={18} />;
                    if (pName === 'facebook') return <FaFacebook key={idx} size={18} />;
                    if (pName === 'youtube') return <FaYoutube key={idx} size={18} />;
                    if (pName === 'tiktok') return <FaTiktok key={idx} size={18} />;
                    return null;
                  })}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-foreground-subtle dark:text-muted-foreground mb-1 font-bold uppercase tracking-wider">
                  Category
                </p>
                <p className="text-foreground text-sm font-medium dark:text-foreground">
                  {category?.name || "N/A"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
                <div className="mb-2 flex items-center gap-2">
                  <Users size={18} />
                  <h2 className="text-sm font-bold">Applications Process</h2>
                </div>
                <p className="text-xs opacity-80 leading-relaxed font-medium">Quick approval, usually within 24 hours</p>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
                <div className="mb-2 flex items-center gap-2">
                  <DollarSign size={18} />
                  <h2 className="text-sm font-bold">Payment Terms</h2>
                </div>
                <p className="text-xs opacity-80 leading-relaxed font-medium">
                  Payments sent within 7 days of verified views
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Assets Box */}
        {available_content && (
          <div className="bg-indigo-50 dark:bg-indigo-950/20 text-indigo-900 dark:text-indigo-400 p-5 sm:p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 shadow-sm transition-all hover:bg-indigo-100/50 dark:hover:bg-indigo-950/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="bg-indigo-500/10 dark:bg-indigo-500/20 p-3 rounded-2xl text-indigo-600 dark:text-indigo-400 shrink-0">
                  <FaGoogleDrive size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-foreground dark:text-foreground leading-tight">Campaign Assets & Resources</h4>
                  <p className="text-xs text-indigo-700/70 dark:text-indigo-400/70 max-w-sm font-medium">
                    Download raw footage, brand logos, and creative guidelines to help you create your video.
                  </p>
                </div>
              </div>

              <Link
                to={available_content}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-200 dark:shadow-none active:scale-95 group"
              >
                Access Materials
                <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        )}

        {/* Summary Card */}
        <div className="dark:text-foreground bg-card dark:bg-card p-5 sm:p-6 rounded-2xl shadow-sm border border-border dark:border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-gray-900 dark:text-white text-sm font-bold mb-4">
                Summary for this reward
              </h3>
              <ul className="space-y-3">
                {[
                  `Verified campaign for ${category?.name}`,
                  "Fast approval process",
                  `Support for ${platforms?.map(p => p.name).join(", ")}`,
                  campaign.end_date ? `Campaign ${isEnded ? "expired" : "ends"} on ${campaign.end_date}` : null
                ].filter(Boolean).map((item, i) => (
                  <li key={i} className="flex gap-2.5 items-center">
                    <div className="bg-foreground-strong/10 p-1 rounded-full">
                      <DollarSign className="text-foreground-strong dark:text-foreground-strong" size={14} />
                    </div>
                    <span className={`text-foreground dark:text-foreground text-xs font-medium ${item.includes("expired") ? "text-red-600 dark:text-red-400" : ""}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                to={(isEnded || isFull) ? "#" : `/announcement/${communityUsername}/content-reward/reward-details-payment/${campaignId}`}
                onClick={(e) => (isEnded || isFull) && e.preventDefault()}
                className={`w-full text-center text-white text-lg font-bold py-3.5 rounded-2xl transition duration-300 shadow-lg ${(isEnded || isFull)
                  ? "bg-muted cursor-not-allowed opacity-50"
                  : "bg-foreground-strong hover:bg-foreground active:scale-[0.98]"
                  }`}
              >
                {isEnded ? "Campaign Ended" : isFull ? "Budget Reached" : "Apply Now"}
              </Link>
              <button
                onClick={() => navigate(-1)}
                className="w-full text-center text-muted-foreground dark:text-muted-foreground text-sm font-semibold hover:text-gray-700 dark:hover:text-zinc-200 transition"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentRewardDetails;
