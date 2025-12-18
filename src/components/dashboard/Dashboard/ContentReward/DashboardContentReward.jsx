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
      "Facebook": 1,
      "Instagram": 2,
      "Youtube": 3,
      "Tiktok": 4
    };

    const toBase64 = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

    let thumbnailBase64 = "";
    if (formData.thumbnailFile) {
      try {
        thumbnailBase64 = await toBase64(formData.thumbnailFile);
      } catch (error) {
        console.error("Error converting file to base64", error);
      }
    }

    // Map platforms to IDs as strings
    const platformIds = (formData.platforms || []).map(p => {
      const id = platformMap[p];
      return id ? id.toString() : null;
    }).filter(id => id !== null);

    const payload = {
      thumbnail: thumbnailBase64,
      name: formData.campaignName,
      campaign_type: typeMap[formData.type] || 1,
      category: categoryMap[formData.category] || 1,
      budget: Number(formData.campaignBudget) || 0,
      reward_rate: Number(formData.rewardRate) || 0,
      min_payout: Number(formData.minPayout) || 0,
      max_payout: Number(formData.maxPayout) || 0,
      flat_fee_bonus: Number(formData.flatFeeBonus) || 0,
      platforms: platformIds,
      available_content: parseInt(formData.availableContent) || 1,
      content_requirement: formData.contentRequirement,
      start_Date: formData.startDate ,
      end_date: formData.endDate 
    };

    console.log("Submitting payload:", payload);

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
