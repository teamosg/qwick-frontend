import { useState } from "react";
import ContentRewardForm from "./ContentRewardForm";
import ContentRewardNav from "./ContentRewardNav";
import DashboardContentRewardBlank from "./DashboardContentRewardBlank";
import DashboardSingleRewardItem from "./DashboardSingleRewardItem";
import { useCommunityStore } from "@/store/communityStore";
import { useCreateCampaign } from "@/hooks/campaign.hook";
import { format } from "date-fns";

const DashboardContentReward = () => {
  const { selectedBrandCommunity } = useCommunityStore();
  const { mutate: createCampaign } = useCreateCampaign(selectedBrandCommunity?.id);

  const [hasContentRewards, setHasContentRewards] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rewards, setRewards] = useState([
    {
      id: 1,
      name: "Content Reward 1",
      description: "Description 1",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: "Content Reward 2",
      description: "Description 2",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 3,
      name: "Content Reward 3",
      description: "Description 3",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 4,
      name: "Content Reward 4",
      description: "Description 4",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  const handleCreateReward = () => {
    // console.log("handleCreateReward called!");
    // console.log("Current showForm state:", showForm);
    setShowForm(true);
    // console.log("setShowForm(true) called");
  };

  const handleFormSubmit = (formData) => {
    const payload = new FormData();

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
      "Facebook": 1,
      "Instagram": 2,
      "Youtube": 3,
      "Tiktok": 4
    };

    if (formData.thumbnailFile) {
      payload.append("thumbnail", formData.thumbnailFile);
    }

    payload.append("name", formData.campaignName);
    payload.append("campaign_type", typeMap[formData.type] || 1);
    payload.append("category", categoryMap[formData.category] || 1); // Default Other?
    payload.append("budget", Number(formData.campaignBudget) || 0);
    payload.append("reward_rate", Number(formData.rewardRate) || 0);
    payload.append("min_payout", Number(formData.minPayout) || 0);
    payload.append("max_payout", Number(formData.maxPayout) || 0);
    payload.append("flat_fee_bonus", Number(formData.flatFeeBonus) || 0); // optional
    payload.append("available_content", parseInt(formData.availableContent) || 1); // IntegerField default=1
    payload.append("content_requirement", formData.contentRequirement);

    if (formData.startDate) {
      payload.append("start_date", format(formData.startDate, "yyyy-MM-dd"));
    }
    if (formData.endDate) {
      payload.append("end_date", format(formData.endDate, "yyyy-MM-dd"));
    }

    // Platforms
    // Backend expects an array of strings/ids
    if (formData.platforms && formData.platforms.length > 0) {
      formData.platforms.forEach(p => {
        const id = platformMap[p];
        if (id) payload.append("platforms", id.toString());
      });
    }


    for (const [key, value] of payload.entries()) {
      console.log(`${key}:`, value);
    }


    createCampaign(payload, {
      onSuccess: () => {
        setShowForm(false);
        setHasContentRewards(true);
      }
    });

    // Keeping local update for immediate UI feedback (simulated)
    const newReward = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
      status: "active",
    };
    setRewards((prev) => [...prev, newReward]);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="">
      {/* Tabs Navigation */}
      <ContentRewardNav />

      {/* Debug State */}
      {/* <div className="mb-4 p-2 bg-yellow-100 dark:bg-yellow-900 rounded text-sm">
        Debug: showForm={showForm.toString()}, hasContentRewards=
        {hasContentRewards.toString()}
      </div> */}

      {showForm ? (
        <ContentRewardForm
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          setShowForm={setShowForm}
        />
      ) : hasContentRewards ? (
        <div>
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">
              Active {rewards.length} content reward
              {rewards.length !== 1 ? "s" : ""}
            </p>
            <button
              onClick={handleCreateReward}
              className="bg-[#003933] dark:bg-[#003933] text-white px-4 py-2 sm:py-4 sm:px-10 rounded-3xl sm:rounded-full hover:bg-[#002822] dark:hover:bg-primary/90 transition font-medium cursor-pointer flex gap-2"
            >
              Create New Reward
            </button>
          </div>
          {rewards.map((reward) => (
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
