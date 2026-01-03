/* eslint-disable react/prop-types */
import { Progress } from "@/components/ui/progress";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { Link } from "react-router";

const MEDIA_BASE_URL = "https://darrenchua.softvencealpha.com";

const DashboardSingleRewardItem = ({ reward }) => {
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
  } = reward;

  const fullThumbnail = thumbnail?.startsWith("http")
    ? thumbnail
    : `${MEDIA_BASE_URL}${thumbnail}`;

  return (
    <Link to={`/dashboard/content-reward/edit/${id}`}>
      <div className="hover:scale-101 hover:shadow-lg transition-all duration-300 ease-in-out dark:text-white dark:bg-zinc-900 p-4 rounded-xl items-center justify-center mx-auto shadow mb-4 bg-white">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <img
            src={thumbnail ? fullThumbnail : "https://placehold.co/150x150"}
            alt={name}
            className="w-full sm:w-[150px] h-[150px] object-cover rounded-xl"
          />
          <div className="flex-1">
            <div className="mb-2.5">
              <h4 className="text-[#090003] text-sm mb-2.5 font-semibold dark:text-white">
                {name}
              </h4>
              <p className="text-xs dark:text-zinc-400 flex gap-2 items-center mb-3.5">
                <span>
                  Only views after you submit count towards payout. Submit as
                  soon as you post to get paid for all of your views.
                </span>
              </p>
              <p className="text-xs flex justify-between dark:text-zinc-400">
                <span className=""> $0.00 of ${budget}</span> <span>0%</span>
              </p>
            </div>
            <Progress value={0} indicatorColor="red" className="mb-3.5" />
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <div>
                <p className="text-[#090003] text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                  Reward
                </p>
                <p className="text-sm dark:text-zinc-400 font-medium">${reward_rate}/1k</p>
              </div>
              <div>
                <p className="text-[#090003] text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                  Type
                </p>
                <p className="text-sm dark:text-zinc-400 font-medium">{campaign_type?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-[#090003] text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                  Maximum Payout
                </p>
                <p className="text-sm dark:text-zinc-400 font-medium">${max_payout}</p>
              </div>
              <div>
                <p className="text-[#090003] text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                  Platforms
                </p>
                <div className="flex gap-2 dark:text-zinc-400 text-[#003933]">
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
                <p className="text-[#090003] text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                  Category
                </p>
                <p className="text-sm dark:text-zinc-400 font-medium">{category?.name || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DashboardSingleRewardItem;
