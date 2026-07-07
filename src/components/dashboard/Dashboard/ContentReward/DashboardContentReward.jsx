import { useState, useMemo } from "react";
import ContentRewardForm from "./ContentRewardForm";
import ContentRewardNav from "./ContentRewardNav";
import DashboardContentRewardBlank from "./DashboardContentRewardBlank";
import DashboardSingleRewardItem from "./DashboardSingleRewardItem";
import { useCommunityStore } from "@/store/communityStore";
import { useCreateCampaign, useGetAllCampaigns } from "@/hooks/campaign.hook";
import { Spinner } from "@/components/ui/spinner";
import CampaignCheckoutModal from "./CampaignCheckoutModal";

const DashboardContentReward = () => {
  const [alert, setAlert] = useState(null);

  const { selectedBrandCommunity } = useCommunityStore();
  const { mutate: createCampaign, isPending: isSubmitting } = useCreateCampaign(selectedBrandCommunity?.id, setAlert);
  const { data: campaignRes, isLoading } = useGetAllCampaigns();

  const [checkoutDetails, setCheckoutDetails] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const filteredRewards = useMemo(() => {
    if (!campaignRes?.campaigns || !selectedBrandCommunity?.id) return [];
    return campaignRes.campaigns.filter(c => c.community === selectedBrandCommunity.id);
  }, [campaignRes, selectedBrandCommunity?.id]);

  const handleCreateReward = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
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
      "TikTok": 3,
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
    payload.append("currency", formData.currency || "USD");
    payload.append("reward_rate", Number(formData.rewardRate) || 0);
    payload.append("min_payout", Number(formData.minPayout) || 0);
    payload.append("max_payout", Number(formData.maxPayout) || 0);
    payload.append("available_content", formData.availableContent || "");
    payload.append("content_requirement", formData.contentRequirement);
    payload.append("flat_fee_bonus", Number(formData.flatFeeBonus) || 0);

    if (formData.startDate) {
      const date = new Date(formData.startDate);
      payload.append("start_date", date.toISOString().split('T')[0]);
    }
    if (formData.endDate) {
      const date = new Date(formData.endDate);
      payload.append("end_date", date.toISOString().split('T')[0]);
    }

    const platforms = formData.platforms || [];
    platforms.forEach((p) => {
      const id = platformMap[p];
      if (id) {
        payload.append("platform_ids", id);
      }
    });

    createCampaign(payload, {
      onSuccess: (data) => {
        setShowForm(false);
        if (data?.checkout_url) {
          setCheckoutDetails(data);
          setShowCheckoutModal(true);
        }
      }
    });
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Spinner className="size-10 text-foreground-strong" />
      </div>
    );
  }

  return (
    <div className="p-0">
      {/* Tabs Navigation */}
      <ContentRewardNav />

      {showForm ? (
        <div className="mt-6">
          <ContentRewardForm
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            setShowForm={setShowForm}
            isSubmitting={isSubmitting}
            alert={alert}
            setAlert={setAlert}
          />
        </div>
      ) : filteredRewards.length > 0 ? (
        <div className="w-full">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-6 mt-6">
            <p className="text-foreground-muted text-sm sm:text-base">
              Active {filteredRewards.length} content reward
              {filteredRewards.length !== 1 ? "s" : ""}
            </p>
            <button
              onClick={handleCreateReward}
              className="w-full sm:w-auto bg-foreground-strong dark:bg-accent text-white px-6 py-3 sm:py-3.5 sm:px-8 rounded-full hover:bg-foreground dark:hover:bg-accent/80 transition-all font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-foreground-strong/10"
            >
              Create Campaign
            </button>
          </div>
          <div className="space-y-4 pb-6 mt-6">
            {filteredRewards.map((reward) => (
              <DashboardSingleRewardItem key={reward.id} reward={reward} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <DashboardContentRewardBlank onCreateReward={handleCreateReward} />
        </div>
      )}

      <CampaignCheckoutModal
        open={showCheckoutModal}
        setOpen={setShowCheckoutModal}
        checkoutDetails={checkoutDetails}
      />
    </div>
  );
};

export default DashboardContentReward;
