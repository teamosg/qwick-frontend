import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import CampaignProgress from "../dashboard/Dashboard/ContentReward/CampaignProgress";

const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL;

const SingleRewardItem = ({ campaign }) => {
  const navigate = useNavigate();
  const { communityUsername } = useParams()
  if (!campaign) return null;



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
  } = campaign;

  const handleNavigate = () => {
    navigate(`/announcement/${communityUsername}/content-reward/reward-details/${id}`);
  };

  const fullThumbnail = thumbnail?.startsWith("http")
    ? thumbnail
    : `${MEDIA_BASE_URL}${thumbnail}`;

  return (
    <div
      onClick={handleNavigate}
      className=" dark:text-white dark:bg-zinc-900 p-4 rounded-xl shadow mb-4 bg-white cursor-pointer hover:shadow-md transition-shadow transition-transform hover:scale-[1.01]"
    >
      <div className="overflow-hidden flex flex-col sm:flex-row gap-4 w-full">
        <img
          src={thumbnail ? fullThumbnail : "https://placehold.co/150x150"}
          alt={name}
          className="w-full sm:w-[150px] h-[150px] object-cover rounded-xl"
        />
        <div className="flex-1">
          <div className="mb-2.5">

            <h4 className="text-[#090003] text-lg font-semibold mb-1.5 dark:text-white">
              {name}
            </h4>
            <p className="text-xs dark:text-zinc-400 flex gap-2 items-center mb-3.5">
              <span>
                Only views after you submit count towards payout. Submit as soon
                as you post to get paid for all of your views.
              </span>
            </p>
            <CampaignProgress
              totalUsersEarning={total_users_earning}
              initialBudget={initial_budget}
              budget={budget}
              showTitle={false}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-[#090003] text-xs mb-0.5 font-semibold dark:text-white uppercase opacity-70">
                Reward
              </p>
              <p className="text-sm dark:text-zinc-400 font-medium">${reward_rate}/1k</p>
            </div>
            <div>
              <p className="text-[#090003] text-xs mb-0.5 font-semibold dark:text-white uppercase opacity-70">
                Type
              </p>
              <p className="text-sm dark:text-zinc-400 font-medium">{campaign_type?.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-[#090003] text-xs mb-0.5 font-semibold dark:text-white uppercase opacity-70">
                Category
              </p>
              <p className="text-sm dark:text-zinc-400 font-medium">{category?.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-[#090003] text-xs mb-0.5 font-semibold dark:text-white uppercase opacity-70">
                Max Payout
              </p>
              <p className="text-sm dark:text-zinc-400 font-medium">${max_payout}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[#090003] text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                Platforms
              </p>
              <div className="flex gap-3 dark:text-zinc-400 text-[#003933]">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRewardItem;
