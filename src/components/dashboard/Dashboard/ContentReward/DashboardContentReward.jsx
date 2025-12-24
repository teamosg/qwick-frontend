import { useState, useMemo } from "react";
import ContentRewardForm from "./ContentRewardForm";
import ContentRewardNav from "./ContentRewardNav";
import DashboardContentRewardBlank from "./DashboardContentRewardBlank";
import DashboardSingleRewardItem from "./DashboardSingleRewardItem";
import { useCommunityStore } from "@/store/communityStore";
import { useCreateCampaign, useGetAllCampaigns } from "@/hooks/campaign.hook";
import { format } from "date-fns";
import { Spinner } from "@/components/ui/spinner";

const DashboardContentReward = () => {
  const { selectedBrandCommunity } = useCommunityStore();
  const { mutate: createCampaign } = useCreateCampaign(selectedBrandCommunity?.id);
  const { data: campaignRes, isLoading } = useGetAllCampaigns();

  const [showForm, setShowForm] = useState(false);

  const filteredRewards = useMemo(() => {
    if (!campaignRes?.campaigns || !selectedBrandCommunity?.id) return [];
    return campaignRes.campaigns.filter(c => c.community === selectedBrandCommunity.id);
  }, [campaignRes, selectedBrandCommunity?.id]);

  const handleCreateReward = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    // Mappings
    const typeMap = {
      "UGC": 1,
      "Sponsored": 2,
      "Review": 3,
      "Tutorial": 4,
      "Unboxing": 5
    };

    const categoryMap = {
      "Personal brand": 1,
      "Entertainment": 2,
      "Products": 3,
      "Music": 4,
      "Logo": 5,
      "Other": 6
    };

    const platformMap = {
      "Instagram": 2,
      "Tiktok": 3,
      "Youtube": 1
    };


    const payload = new FormData();

    if (formData.thumbnailFile) {
      payload.append("thumbnail", formData.thumbnailFile);
    }

    payload.append("name", formData.campaignName);
    payload.append("campaign_type_id", typeMap[formData.type] || 1);
    payload.append("category_id", categoryMap[formData.category] || 1);
    payload.append("budget", Number(formData.campaignBudget) || 0);
    payload.append("reward_rate", Number(formData.rewardRate) || 0);
    payload.append("min_payout", Number(formData.minPayout) || 0);
    payload.append("max_payout", Number(formData.maxPayout) || 0);
    payload.append("available_content", parseInt(formData.availableContent) || 1);
    payload.append("content_requirement", formData.contentRequirement);

    if (formData.startDate) {
      const date = new Date(formData.startDate);
      payload.append("start_date", date.toISOString().split('T')[0]);
    }
    if (formData.endDate) {
      const date = new Date(formData.endDate);
      payload.append("end_date", date.toISOString().split('T')[0]);
    }

    // Platforms
    const platforms = formData.platforms || [];
    platforms.forEach((p) => {
      const id = platformMap[p];
      if (id) {
        payload.append("platform_ids", id);
      }
    });

    createCampaign(payload, {
      onSuccess: () => {
        setShowForm(false);
      }
    });
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Spinner className="size-10 text-[#003933]" />
      </div>
    );
  }

  return (
    <div className="">
      {/* Tabs Navigation */}
      <ContentRewardNav />

      {showForm ? (
        <ContentRewardForm
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          setShowForm={setShowForm}
        />
      ) : filteredRewards.length > 0 ? (
        <div className="container mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">
              Active {filteredRewards.length} content reward
              {filteredRewards.length !== 1 ? "s" : ""}
            </p>
            <button
              onClick={handleCreateReward}
              className="bg-[#003933] dark:bg-[#003933] text-white px-4 py-2 sm:py-4 sm:px-10 rounded-3xl sm:rounded-full hover:bg-[#002822] dark:hover:bg-primary/90 transition font-medium cursor-pointer flex gap-2"
            >
              Create New Reward
            </button>
          </div>
          {filteredRewards.map((reward) => (
            <DashboardSingleRewardItem key={reward.id} reward={reward} />
          ))}
        </div>
      ) : (
        <DashboardContentRewardBlank onCreateReward={handleCreateReward} />
      )}
    </div>
  );
};

export default DashboardContentReward;
