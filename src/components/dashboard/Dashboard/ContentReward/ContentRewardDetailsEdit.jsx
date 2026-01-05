import { Progress } from "@/components/ui/progress";
import { CircleAlert, X } from "lucide-react";
import { useState, useMemo } from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { useParams } from "react-router-dom";
import ContentRewardForm from "./ContentRewardForm";
import ContentRewardNav from "./ContentRewardNav";
import { toast } from "sonner";
import { useGetAllCampaigns, useUpdateCampaign } from "@/hooks/campaign.hook";
import { Spinner } from "@/components/ui/spinner";

const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL;

const ContentRewardDetailsEdit = () => {
  const { id } = useParams();
  const { data: campaignRes, isLoading } = useGetAllCampaigns();
  const { mutate: updateCampaign, isPending: isSubmitting } = useUpdateCampaign(id);
  const [showFormModal, setShowFormModal] = useState(false);

  const campaign = useMemo(() => {
    return campaignRes?.campaigns?.find(c => c.id === parseInt(id));
  }, [campaignRes, id]);

  const initialFormData = useMemo(() => {
    if (!campaign) return null;

    // Helper to normalize platform names to match Form expectations ("Instagram", "Tiktok", "Youtube")
    const normalizePlatform = (pName) => {
      const lower = pName?.toLowerCase();
      if (lower === 'instagram') return 'Instagram';
      if (lower === 'tiktok') return 'Tiktok';
      if (lower === 'youtube') return 'Youtube';
      return pName; // Fallback
    };

    // Helper to normalize Type
    const normalizeType = (tName) => {
      // Map API response to Form Options
      // Form Options: UGC, Sponsored, Review, Tutorial, Unboxing
      // Assuming API might return them differently, but if they match, we just ensure casing if needed.
      // If API returns "Ugc", we need "UGC".
      if (!tName) return "";
      const lower = tName.toLowerCase();
      if (lower === 'ugc') return 'UGC';
      return tName.charAt(0).toUpperCase() + tName.slice(1).toLowerCase(); // Standardize Capitalized
    };

    // Helper to normalize Category
    const normalizeCategory = (cName) => {
      // Form Options: Personal brand, Entertainment, Products, Music, Logo, Other
      if (!cName) return "";
      // Ensure "Personal brand" has lowercase 'b' if that's what form expects
      // Form options: "Personal brand"
      if (cName.toLowerCase() === 'personal brand') return 'Personal brand';
      return cName.charAt(0).toUpperCase() + cName.slice(1).toLowerCase();
    };

    return {
      thumbnailPreview: campaign.thumbnail
        ? (campaign.thumbnail.startsWith("http") ? campaign.thumbnail : `${MEDIA_BASE_URL}${campaign.thumbnail}`)
        : null,
      campaignName: campaign.name || "",
      type: normalizeType(campaign.campaign_type?.name),
      category: normalizeCategory(campaign.category?.name),
      campaignBudget: campaign.budget,
      currency: "USD",
      rewardRate: campaign.reward_rate,
      minPayout: campaign.min_payout,
      maxPayout: campaign.max_payout,
      flatFeeBonus: campaign.flat_fee || "",
      platforms: campaign.platforms?.map(p => normalizePlatform(p.name)) || [],
      availableContent: campaign.available_content,
      contentRequirement: campaign.content_requirement || "",
      startDate: campaign.start_date ? new Date(campaign.start_date) : undefined,
      endDate: campaign.end_date ? new Date(campaign.end_date) : undefined,
    };
  }, [campaign]);


  const handleEditClick = () => {
    setShowFormModal(true);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
  };

  const handleFormSubmit = (formData) => {
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

    // Check if flatFeeBonus exists in formData and append if necessary (optional in form)
    if (formData.flatFeeBonus) {
      payload.append("flat_fee", Number(formData.flatFeeBonus));
    }

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

    updateCampaign(payload, {
      onSuccess: () => {
        setShowFormModal(false);
        // toast.success handled in hook
      },
      // onError handled in hook
    });
  };

  const handleFormCancel = () => {
    setShowFormModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Spinner className="size-10 text-[#003933]" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex items-center justify-center p-20">
        <p className="text-gray-500">Campaign not found.</p>
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
    max_payout,
    content_requirement,
  } = campaign;

  const fullThumbnail = thumbnail?.startsWith("http")
    ? thumbnail
    : `${MEDIA_BASE_URL}${thumbnail}`;

  return (
    <div>
      {/* Tabs Navigation */}
      <ContentRewardNav />
      <div className="p-6 text-[#717171]">
        <div className="dark:text-white dark:bg-[#1E1E1E] p-6 rounded-xl items-center justify-center mx-auto shadow mb-6 max-w-5xl bg-white">
          <div className="mb-6">
            <img
              src={thumbnail ? fullThumbnail : "/confirm-apply.png"}
              alt={name}
              className="w-full h-[300px] object-cover mb-7 rounded-xl"
            />
            <p className="text-[#717171] text-xs mb-7 dark:text-zinc-400 flex gap-2 items-center">
              <span>
                <CircleAlert className="text-[#FEC260]" />
              </span>
              <span>
                Only views after you submit count towards payout. Submit as soon
                as you post to get paid for all of your views.
              </span>
            </p>
            <div className="mb-2.5">
              <h4 className="text-[#090003] text-sm mb-2.5 dark:text-white uppercase font-semibold">
                Campaign Progress
              </h4>
              <p className="text-[#717171] text-xs flex justify-between dark:text-zinc-400">
                <span className=""> $0.00 of ${budget}</span> <span>0%</span>
              </p>
            </div>
            <Progress value={0} indicatorColor="red" className="mb-3.5" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:flex sm:justify-between mb-9">
            <div>
              <p className="text-[#090003] text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                Reward
              </p>
              <p className="text-[#717171] text-sm dark:text-zinc-400 font-medium">
                ${reward_rate}/1k
              </p>
            </div>
            <div>
              <p className="text-[#090003] text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                Type
              </p>
              <p className="text-[#717171] text-sm dark:text-zinc-400 font-medium">
                {campaign_type?.name || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-[#090003] text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                Maximum Payout
              </p>
              <p className="text-[#717171] text-sm dark:text-zinc-400 font-medium">
                ${max_payout}
              </p>
            </div>
            <div>
              <p className="text-[#090003] text-xs mb-1 font-semibold  dark:text-white uppercase opacity-70">
                Platforms
              </p>
              <div className="flex gap-2 dark:text-zinc-400 text-[#003933]">
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
              <p className="text-[#717171] text-sm dark:text-zinc-400 font-medium">
                {category?.name || "N/A"}
              </p>
            </div>
          </div>
          <div className="text-center flex items-end justify-end ">
            <button
              onClick={handleEditClick}
              className="w-full mb-2.5 text-white bg-[#003933] hover:bg-[#002822] dark:hover:bg-[#0dc4a5]  text-[18px] font-semibold p-2.5 rounded-full cursor-pointer transition"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl w-full max-w-4xl mx-auto relative overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={handleCloseFormModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Form Content */}
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Edit Content Reward
              </h2>
              <ContentRewardForm
                initialData={initialFormData}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
                isEditMode={true}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentRewardDetailsEdit;
