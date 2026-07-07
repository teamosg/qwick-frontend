import CampaignProgress from "./CampaignProgress";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { Link, useParams } from "react-router";

const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL;

const DashboardSingleRewardItem = ({ reward }) => {
  const { communityUsername } = useParams();
  if (!reward) return null;

  const {
    id,
    name,
    thumbnail,
    reward_rate,
    campaign_type,
    category,
    platforms,
    budget,
    max_payout,
    total_users_earning,
    initial_budget,
    end_date,
    is_withdrawn,
  } = reward;

  const isEnded = end_date ? new Date(end_date) < new Date() : false;

  const fullThumbnail = thumbnail?.startsWith("http")
    ? thumbnail
    : `${MEDIA_BASE_URL}${thumbnail}`;

  return (
    <Link to={`/dashboard/${communityUsername}/content-reward/edit/${id}`}>
      <div className="hover:scale-101 hover:shadow-lg transition-all duration-300 ease-in-out dark:text-foreground dark:bg-card p-4 rounded-xl items-center justify-center mx-auto shadow mb-4 bg-card">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <img
            src={thumbnail ? fullThumbnail : "https://placehold.co/150x150"}
            alt={name}
            className="w-full sm:w-[150px] h-[150px] object-cover rounded-xl"
          />
          <div className="flex-1">
            <div className="mb-2.5">
              <h4 className="text-foreground text-sm mb-2.5 font-semibold text-foreground-strong">
                {name}
              </h4>
              <p className="text-xs text-foreground-muted flex gap-2 items-center mb-3.5">
                <span>
                  Only views after you submit count towards payout. Submit as
                  soon as you post to get paid for all of your views.
                </span>
              </p>
              {is_withdrawn ? (
                <p className="text-[11px] mt-2 font-bold text-error flex items-center gap-1">
                  <span>Withdrawn</span>
                </p>
              ) : end_date && (
                <p className={`text-[11px] mt-2 font-medium ${isEnded ? "text-error" : "text-foreground-muted"}`}>
                  {isEnded ? "Ended on" : "Ends on"} {end_date}
                </p>
              )}
            </div>
            {/* Progress Bar */}
            <CampaignProgress
              totalUsersEarning={total_users_earning}
              initialBudget={initial_budget}
              budget={budget}
              showTitle={false}
            />
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <div>
                <p className="text-foreground text-xs mb-1 font-semibold text-foreground-strong uppercase opacity-70">
                  Reward
                </p>
                <p className="text-sm text-foreground-muted font-medium">${reward_rate}/1k</p>
              </div>
              <div>
                <p className="text-foreground text-xs mb-1 font-semibold text-foreground-strong uppercase opacity-70">
                  Type
                </p>
                <p className="text-sm text-foreground-muted font-medium">{campaign_type?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-foreground text-xs mb-1 font-semibold text-foreground-strong uppercase opacity-70">
                  Maximum Payout
                </p>
                <p className="text-sm text-foreground-muted font-medium">${max_payout}</p>
              </div>
              <div>
                <p className="text-foreground text-xs mb-1 font-semibold text-foreground-strong uppercase opacity-70">
                  Platforms
                </p>
                <div className="flex gap-2 text-foreground-muted">
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
                <p className="text-foreground text-xs mb-1 font-semibold text-foreground-strong uppercase opacity-70">
                  Category
                </p>
                <p className="text-sm text-foreground-muted font-medium">{category?.name || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DashboardSingleRewardItem;
