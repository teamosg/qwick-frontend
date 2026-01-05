import { Progress } from "@/components/ui/progress";
import { DollarSign, Users } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router";
import { useGetAllCampaigns } from "@/hooks/campaign.hook";
import { useCommunityStore } from "@/store/communityStore";
import { useMemo } from "react";
import CampaignDetailsSkeleton from "./CampaignDetailsSkeleton";

const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL;

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
      <div className="flex items-center justify-center p-6 mt-10">
        <p className="text-gray-500 dark:text-zinc-400">Access denied for community creators.</p>
      </div>
    );
  }

  if (isLoading) {
    return <CampaignDetailsSkeleton />;
  }

  if (!campaign) {
    return (
      <div className="flex items-center justify-center p-10 h-[60vh]">
        <p className="text-gray-500 dark:text-zinc-400">Campaign not found or has been removed.</p>
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
  } = campaign;

  const fullThumbnail = thumbnail?.startsWith("http")
    ? thumbnail
    : `${MEDIA_BASE_URL}${thumbnail}`;

  return (
    <div className="p-4 sm:p-6 text-[#717171] max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl text-[#191919] dark:text-white font-bold mb-4 sm:mb-6">
        Content Reward Details
      </h2>

      <div className="space-y-6">
        {/* Main Details Card */}
        <div className="dark:text-white bg-white dark:bg-zinc-900 p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
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

            <span className="font-bold text-[#003933] dark:text-[#00b89f] text-lg">
              ${reward_rate}/1k
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-gray-900 text-lg font-bold mb-2 dark:text-white">
                {name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-zinc-400 mb-4 leading-relaxed">
                {content_requirement || "No specific requirements mentioned."}
              </p>

              <div className="space-y-2">
                <div className="text-xs sm:text-sm flex justify-between font-medium text-gray-500 dark:text-zinc-400">
                  <span>$0.00 of ${budget}</span>
                  <span>0%</span>
                </div>
                <Progress value={0} indicatorColor="red" className="h-2" />
              </div>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 py-6 border-y border-gray-50 dark:border-zinc-800/50">
              <div>
                <p className="text-[10px] text-gray-400 dark:text-zinc-500 mb-1 font-bold uppercase tracking-wider">
                  Type
                </p>
                <p className="text-gray-800 text-sm font-medium dark:text-zinc-300">
                  {campaign_type?.name || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 dark:text-zinc-500 mb-1 font-bold uppercase tracking-wider">
                  Platforms
                </p>
                <div className="flex gap-3 text-gray-700 dark:text-zinc-300">
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
                <p className="text-[10px] text-gray-400 dark:text-zinc-500 mb-1 font-bold uppercase tracking-wider">
                  Category
                </p>
                <p className="text-gray-800 text-sm font-medium dark:text-zinc-300">
                  {category?.name || "N/A"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-900 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-900/20">
                <div className="mb-2 flex items-center gap-2">
                  <Users size={18} />
                  <h2 className="text-sm font-bold">Applications Process</h2>
                </div>
                <p className="text-xs opacity-80 leading-relaxed font-medium">Quick approval, usually within 24 hours</p>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-900 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-900/20">
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

        {/* Summary Card */}
        <div className="dark:text-white bg-white dark:bg-zinc-900 p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-gray-900 dark:text-white text-sm font-bold mb-4">
                Summary for this reward
              </h3>
              <ul className="space-y-3">
                {[
                  `Verified campaign for ${category?.name}`,
                  "Fast approval process",
                  `Support for ${platforms?.map(p => p.name).join(", ")}`
                ].map((item, i) => (
                  <li key={i} className="flex gap-2.5 items-center">
                    <div className="bg-[#003933]/10 p-1 rounded-full">
                      <DollarSign className="text-[#003933] dark:text-[#00b89f]" size={14} />
                    </div>
                    <span className="text-gray-700 dark:text-zinc-300 text-xs font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                to={`/content-reward/reward-details-payment/${campaignId}`}
                className="w-full text-center text-white bg-[#003933] hover:bg-[#002822] text-lg font-bold py-3.5 rounded-2xl transition duration-300 shadow-lg active:scale-[0.98]"
              >
                Apply Now
              </Link>
              <button
                onClick={() => navigate(-1)}
                className="w-full text-center text-gray-500 dark:text-zinc-400 text-sm font-semibold hover:text-gray-700 dark:hover:text-zinc-200 transition"
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
