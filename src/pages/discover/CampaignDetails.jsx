import { useNavigate, useParams } from "react-router";
import { useProfile } from "@/hooks/auth.hook";
import { useGetSingleCampaign } from "@/hooks/campaign.hook";
import { Spinner } from "@/components/ui/spinner";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { toast } from "sonner";

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

    const loggedInUserId = currentUser?.id;

    // Check if user is the campaign creator
    if (campaign.creator?.id === loggedInUserId) {
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
    start_date,
    end_date,
    currency,
    community,
    is_member,
    creator,
    flat_fee_bonus,
  } = campaign;

  const isEnded = end_date && new Date(end_date) < new Date();
  const progress = initial_budget > 0
    ? Math.min(Math.max((parseFloat(total_users_earning || 0) / parseFloat(initial_budget)) * 100, 0), 100)
    : 0;

  const fullThumbnail = thumbnail?.startsWith("http")
    ? thumbnail
    : `${MEDIA_BASE_URL}${thumbnail}`;

  const platformIcon = (name) => {
    const p = name?.toLowerCase();
    if (p === "instagram") return <FaInstagram size={20} className="text-pink-600" />;
    if (p === "facebook") return <FaFacebook size={20} className="text-blue-600" />;
    if (p === "youtube") return <FaYoutube size={20} className="text-red-600" />;
    if (p === "tiktok") return <FaTiktok size={20} />;
    return null;
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-background dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate("/discover")}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Discover
        </button>

        {/* Main card */}
        <div className="bg-card dark:bg-card rounded-2xl border border-border dark:border-border shadow-sm overflow-hidden">
          {/* Thumbnail */}
          <div className="relative">
            <img
              src={fullThumbnail}
              alt={name}
              className="w-full h-56 sm:h-72 object-cover"
            />
            {isEnded && (
              <div className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                Ended
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Title & Reward */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white">
                  {name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  by{" "}
                  <span className="font-semibold text-foreground dark:text-foreground">
                    {community?.business_name || community?.username}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-foreground-strong dark:text-foreground-strong">
                  ${reward_rate}
                  <span className="text-sm font-normal text-muted-foreground">/1k views</span>
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground font-medium">
                <span>Budget Progress</span>
                <span>${parseFloat(total_users_earning || 0).toFixed(2)} of ${parseFloat(initial_budget || 0).toFixed(2)}</span>
              </div>
              <div className="w-full bg-muted dark:bg-muted h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-foreground-strong dark:bg-accent h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{progress.toFixed(1)}% paid out</span>
                <span>{end_date ? `${isEnded ? "Ended" : "Ends"} ${end_date}` : ""}</span>
              </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 py-6 border-y border-border dark:border-border">
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Type</p>
                <p className="text-sm font-medium text-foreground">{campaign_type?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Category</p>
                <p className="text-sm font-medium text-foreground">{category?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Platforms</p>
                <div className="flex gap-2">
                  {platforms?.map((p, i) => (
                    <span key={i} title={p.name}>{platformIcon(p.name)}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Max Payout</p>
                <p className="text-sm font-medium text-foreground">${max_payout}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Min Payout</p>
                <p className="text-sm font-medium text-foreground">${min_payout}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Flat Bonus</p>
                <p className="text-sm font-medium text-foreground">${flat_fee_bonus}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Currency</p>
                <p className="text-sm font-medium text-foreground">{currency}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Budget Remaining</p>
                <p className="text-sm font-medium text-foreground">${parseFloat(budget || 0).toFixed(2)}</p>
              </div>
            </div>

            {/* Content requirement */}
            {content_requirement && (
              <div className="bg-accent dark:bg-accent/50 rounded-xl p-5 border border-border dark:border-border">
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-2">Content Requirements</p>
                <p className="text-sm text-foreground leading-relaxed">{content_requirement}</p>
              </div>
            )}

            {/* Available content link */}
            {available_content && (
              <div className="bg-indigo-50 dark:bg-indigo-950/20 text-indigo-900 dark:text-indigo-400 p-5 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
                <p className="text-xs font-bold uppercase tracking-wider mb-1">Campaign Assets</p>
                <a
                  href={available_content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium underline underline-offset-2 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                >
                  Access materials
                </a>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleProceed}
                disabled={isEnded}
                className="flex-1 bg-foreground-strong dark:bg-accent hover:bg-foreground dark:hover:bg-accent/80 text-white font-bold text-lg py-4 rounded-2xl transition-all shadow-lg shadow-foreground-strong/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                Proceed
              </button>
              <button
                onClick={() => navigate("/discover")}
                className="sm:w-auto px-8 py-4 rounded-2xl font-semibold text-muted-foreground hover:text-foreground border border-border dark:border-border hover:bg-accent dark:hover:bg-accent/50 transition-all"
              >
                Cancel
              </button>
            </div>

            {/* Status info */}
            <div className="flex flex-wrap gap-3 pt-2">
              {creator && (
                <span className="text-xs text-muted-foreground">
                  Created by <span className="font-semibold text-foreground">{creator?.username}</span>
                </span>
              )}
              {is_member && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-semibold border border-emerald-200 dark:border-emerald-900/40">
                  You're a member
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
