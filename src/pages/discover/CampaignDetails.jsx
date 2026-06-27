import { useNavigate, useParams } from "react-router";
import { useProfile } from "@/hooks/auth.hook";
import { useGetSingleCampaign } from "@/hooks/campaign.hook";
import { Spinner } from "@/components/ui/spinner";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaGoogleDrive } from "react-icons/fa";
import { DollarSign, Users, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import CampaignProgress from "@/components/dashboard/Dashboard/ContentReward/CampaignProgress";

const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL;

const CampaignDetails = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { data: campaign, isLoading: isCampaignLoading } = useGetSingleCampaign(campaignId);
  const { data: currentUser, isLoading: isUserLoading } = useProfile();

  const isLoading = isCampaignLoading || isUserLoading;

  const handleProceed = () => {
    if (!campaign) return;

    const isEnded = campaign.end_date && new Date(campaign.end_date) < new Date();
    if (isEnded) {
      toast.error("This campaign has ended.");
      return;
    }

    const communityUsername = campaign.community?.username;

    if (!communityUsername) {
      toast.error("Community information not found.");
      return;
    }

    // Check if user is the campaign creator
    if (campaign?.creator?.username === currentUser?.username) {
      navigate(`/dashboard/${communityUsername}/content-reward/edit/${campaign.id}`);
      return;
    }

    // Check if user is a member
    if (campaign.is_member) {
      navigate(`/announcement/${communityUsername}/content-reward/reward-details/${campaign.id}`);
      return;
    }

    // Neither creator nor member — redirect to join
    navigate(`/join-community/${communityUsername}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-6">
        <Spinner className="size-10 text-foreground-strong" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-6">
        <p className="text-muted-foreground text-lg">Campaign not found.</p>
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
    content_requirement,
    available_content,
    end_date,
    currency,
    community,
    creator,
    flat_fee_bonus,
  } = campaign;

  const isEnded = end_date && new Date(end_date) < new Date();
  const currentBudget = initial_budget || budget || 0;
  const earning = parseFloat(total_users_earning || 0);
  const progress = currentBudget > 0
    ? Math.min(Math.max((earning / parseFloat(currentBudget)) * 100, 0), 100)
    : 0;
  const isFull = progress >= 100;

  const fullThumbnail = thumbnail?.startsWith("http")
    ? thumbnail
    : `${MEDIA_BASE_URL}${thumbnail}`;

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-background dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate("/discover")}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Discover
        </button>

        {/* Content Reward Details exact design layout */}
        <div className="text-foreground-subtle">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl text-foreground dark:text-white font-bold">
              Campaign Details
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
                  <div className="flex flex-col">
                    <span className="text-base font-semibold text-gray-900 dark:text-white transition capitalize leading-tight">
                      {name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      by {community?.business_name || community?.username || "N/A"}
                    </span>
                  </div>
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
                      totalUsersEarning={total_users_earning}
                      initialBudget={initial_budget}
                      budget={budget}
                      showTitle={false}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 py-6 border-y border-gray-50 dark:border-zinc-800/50">
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
                      Category
                    </p>
                    <p className="text-foreground text-sm font-medium dark:text-foreground">
                      {category?.name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-foreground-subtle dark:text-muted-foreground mb-1 font-bold uppercase tracking-wider">
                      Platforms
                    </p>
                    <div className="flex gap-2 text-foreground dark:text-foreground">
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
                      Max Payout
                    </p>
                    <p className="text-foreground text-sm font-medium dark:text-foreground">
                      ${max_payout || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-foreground-subtle dark:text-muted-foreground mb-1 font-bold uppercase tracking-wider">
                      Min Payout
                    </p>
                    <p className="text-foreground text-sm font-medium dark:text-foreground">
                      ${min_payout || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-foreground-subtle dark:text-muted-foreground mb-1 font-bold uppercase tracking-wider">
                      Flat Bonus
                    </p>
                    <p className="text-foreground text-sm font-medium dark:text-foreground">
                      ${flat_fee_bonus || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-foreground-subtle dark:text-muted-foreground mb-1 font-bold uppercase tracking-wider">
                      Currency
                    </p>
                    <p className="text-foreground text-sm font-medium dark:text-foreground">
                      {currency || "USD"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-foreground-subtle dark:text-muted-foreground mb-1 font-bold uppercase tracking-wider">
                      Budget Remaining
                    </p>
                    <p className="text-foreground text-sm font-medium dark:text-foreground">
                      ${parseFloat(budget || 0).toFixed(2)}
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

                  <a
                    href={available_content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-200 dark:shadow-none active:scale-95 group cursor-pointer"
                  >
                    Access Materials
                    <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            )}

            {/* Summary Card */}
            <div className="dark:text-foreground bg-card dark:bg-card p-5 sm:p-6 rounded-2xl shadow-sm border border-border dark:border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-gray-900 dark:text-white text-sm font-bold mb-4">
                    Summary for this campaign
                  </h3>
                  <ul className="space-y-3">
                    {[
                      `Verified campaign for ${category?.name}`,
                      "Fast approval process",
                      `Support for ${platforms?.map(p => p.name).join(", ")}`,
                      creator?.username ? `Created by ${creator?.username}` : null,
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
                  <button
                    onClick={handleProceed}
                    disabled={isEnded}
                    className={`w-full text-center text-white text-lg font-bold py-3.5 rounded-2xl transition duration-300 shadow-lg ${isEnded
                      ? "bg-muted cursor-not-allowed opacity-50"
                      : "bg-foreground-strong hover:bg-foreground active:scale-[0.98] cursor-pointer"
                      }`}
                  >
                    {isEnded ? "Campaign Ended" : "Proceed"}
                  </button>
                  <button
                    onClick={() => navigate("/discover")}
                    className="w-full text-center text-muted-foreground dark:text-muted-foreground text-sm font-semibold hover:text-gray-700 dark:hover:text-zinc-200 transition cursor-pointer"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
