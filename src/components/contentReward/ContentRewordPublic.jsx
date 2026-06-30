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
      <div className="flex items-center justify-center p-10 bg-card dark:bg-card rounded-xl shadow">
        <p className="text-muted-foreground dark:text-muted-foreground font-medium">
          As the creator of this community, you cannot view or join these campaigns.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-40 bg-accent dark:bg-accent animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-[24px] text-foreground dark:text-white font-semibold mb-3">
        Campaigns
      </h2>
      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
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
