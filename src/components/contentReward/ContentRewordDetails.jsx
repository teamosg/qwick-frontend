import { Progress } from "@/components/ui/progress";
import { DollarSign, Users } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router";
import { useGetAllCampaigns } from "@/hooks/campaign.hook";
import { useCommunityStore } from "@/store/communityStore";
import { useMemo } from "react";

const MEDIA_BASE_URL = "https://darrenchua.softvencealpha.com";

const ContentRewardDetails = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { selectedCreatorCommunity } = useCommunityStore();
  const { data: campaignRes, isLoading } = useGetAllCampaigns();

  const campaign = useMemo(() => {
    return campaignRes?.campaigns?.find(c => c.id === parseInt(campaignId));
  }, [campaignRes, campaignId]);

  const isCreator = selectedCreatorCommunity?.can_edit;

  if (isCreator) {
    return (
      <div className="flex items-center justify-center p-10 mt-10">
        <p className="text-gray-500">Access denied for community creators.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-10 h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003933]"></div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex items-center justify-center p-10 h-screen">
        <p>Campaign not found or has been removed.</p>
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
    content_requirement,
    creator,
  } = campaign;

  const fullThumbnail = thumbnail?.startsWith("http")
    ? thumbnail
    : `${MEDIA_BASE_URL}${thumbnail}`;

  return (
    <div className="p-6 text-[#717171]">
      <h2 className="text-[24px] text-[#191919] dark:text-white font-semibold mb-3">
        Content Reward Details
      </h2>
      <div className="dark:text-white bg-white dark:bg-zinc-900 p-6 rounded-xl max-w-2xl items-center justify-center mx-auto shadow mb-6">
        <div className="flex justify-between mb-3.5">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img
              src={fullThumbnail || "https://i.pravatar.cc/36"}
              alt="Profile"
              className="w-8 h-8 rounded-full border border-gray-100 object-cover"
            />
            <span className="text-sm font-medium text-[#717171] dark:text-white transition capitalize">
              {name}
            </span>
          </div>

          <span className="font-semibold text-[#003933] text-sm">${reward_rate}/1k</span>
        </div>
        <div>
          <h3 className="text-[#090003] text-lg font-bold mb-1.5 dark:text-white">
            {name}
          </h3>
          <p className="text-xs mb-3.5 dark:text-zinc-400">
            {content_requirement || "No specific requirements mentioned."}
          </p>
          <div className="text-xs flex justify-between mb-2.5">
            <span className="">$0.00 of ${budget}</span>
            <span>0%</span>
          </div>
          <Progress value={0} indicatorColor="red" className="mb-3.5" />
          <div className="flex flex-wrap gap-6 md:gap-12 mb-6">
            <div>
              <p className="text-[#090003] text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                Type
              </p>
              <p className="text-[#717171] text-sm dark:text-zinc-400">
                {campaign_type?.name || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-[#090003] text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                Platforms
              </p>
              <div className="flex gap-3 dark:text-zinc-400 text-[#003933]">
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
              <p className="text-[#090003] text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                Category
              </p>
              <p className="text-[#717171] text-sm dark:text-zinc-400">
                {category?.name || "N/A"}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-sm text-[#090003] font-bold mb-1.5 dark:text-white">
              Requirements
            </h3>
            <p className="text-xs text-[#717171] dark:text-zinc-400 leading-relaxed">
              {content_requirement}
            </p>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2 p-3 bg-[#3fa796] text-white rounded-2xl">
              <div className="mb-2 flex gap-2.5">
                <Users size={18} />
                <h2 className="text-sm font-semibold">Applications Process</h2>
              </div>
              <p className="text-[10px] opacity-90">Quick approval, usually within 24 hours</p>
            </div>
            <div className="w-1/2 p-3 bg-[#3fa796] text-white rounded-2xl">
              <div className="mb-2 flex gap-2.5">
                <DollarSign size={18} />
                <h2 className="text-sm font-semibold">Payment Terms</h2>
              </div>
              <p className="text-[10px] opacity-90">
                Payments sent within 7 days verified views
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="dark:text-white bg-white dark:bg-zinc-900 p-6 rounded-xl max-w-2xl items-center justify-center mx-auto shadow mb-6">
        <div className="mb-5">
          <h3 className="text-[#090003] dark:text-white text-sm font-bold mb-4">
            Summary for this reward
          </h3>
          <ul className="flex flex-col gap-3 ">
            <li className="flex gap-2 items-center">
              <DollarSign color="#003933" size={16} className="bg-[#e6f2f0] rounded-full p-0.5" />
              <span className="text-[#090003] dark:text-white text-[12px]">
                Verified campaign for {category?.name}
              </span>
            </li>
            <li className="flex gap-2 items-center">
              <DollarSign color="#003933" size={16} className="bg-[#e6f2f0] rounded-full p-0.5" />
              <span className="text-[#090003] dark:text-white text-[12px]">
                Fast approval process
              </span>
            </li>
            <li className="flex gap-2 items-center">
              <DollarSign color="#003933" size={16} className="bg-[#e6f2f0] rounded-full p-0.5" />
              <span className="text-[#090003] dark:text-white text-[12px]">
                Support for {platforms?.map(p => p.name).join(", ")}
              </span>
            </li>
          </ul>
        </div>
        <div className="text-center">
          <Link
            to={`/content-reward/reward-details-payment/${campaignId}`}
            className="block mb-2.5 w-full text-white bg-[#003933] hover:bg-[#002822] text-[18px] font-semibold p-2.5 rounded-full cursor-pointer transition shadow-lg"
          >
            Apply
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContentRewardDetails;
