import { useCommunityStore } from "@/store/communityStore";
import SingleRewardItem from "./SingleRewardItem";
import { useGetAllCampaigns } from "@/hooks/campaign.hook";
import { useMemo } from "react";

const ContentRewordPublic = () => {
  const { selectedCreatorCommunity } = useCommunityStore()
  const { data: campaignRes, isLoading } = useGetAllCampaigns();

  const communityId = selectedCreatorCommunity?.id;
  const isCreator = selectedCreatorCommunity?.can_edit; // Using can_edit as a flag for creator

  const filteredCampaigns = useMemo(() => {
    if (!campaignRes?.campaigns || !communityId) return [];
    return campaignRes.campaigns.filter(c => c.community === communityId);
  }, [campaignRes, communityId]);

  if (isCreator) {
    return (
      <div className="flex items-center justify-center p-10 bg-white dark:bg-zinc-900 rounded-xl shadow">
        <p className="text-gray-500 dark:text-zinc-400 font-medium">
          As the creator of this community, you cannot view or join these campaigns.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-40 bg-gray-100 dark:bg-zinc-800 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-[24px] text-[#191919] dark:text-white font-semibold mb-3">
        Content Reward
      </h2>
      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No active campaigns for this community.
        </div>
      ) : (
        filteredCampaigns.map(campaign => (
          <SingleRewardItem key={campaign.id} campaign={campaign} />
        ))
      )}
    </div>
  );
};

export default ContentRewordPublic;
