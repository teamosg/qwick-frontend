import { Progress } from "@/components/ui/progress";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";

import { CircleAlert, Plus, X } from "lucide-react";
import { useState, useMemo } from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router";
import { useGetAllCampaigns, useSubmitCampaignContent } from "@/hooks/campaign.hook";
import { useCommunityStore } from "@/store/communityStore";
import CampaignDetailsSkeleton from "./CampaignDetailsSkeleton";
import CampaignProgress from "@/components/dashboard/Dashboard/ContentReward/CampaignProgress";

const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL;

const ContentRewardDetailsPayment = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { selectedCreatorCommunity } = useCommunityStore();
  const { data: campaignRes, isLoading: isLoadingCampaigns } = useGetAllCampaigns();
  const { mutate: submitContent, isPending: isSubmitting } = useSubmitCampaignContent(campaignId);

  const campaign = useMemo(() => {
    return campaignRes?.campaigns?.find(c => c.id === parseInt(campaignId));
  }, [campaignRes, campaignId]);

  const [files, setFiles] = useState();
  const [showPopup, setShowPopup] = useState(false);

  const availablePlatforms = useMemo(() => {
    return campaign?.platforms?.map(p => p.name?.toLowerCase()) || [];
  }, [campaign]);

  const [formData, setFormData] = useState({
    youtube_link: "",
    instagram_link: "",
    tiktok_link: "",
  });

  const [errors, setErrors] = useState({});

  const isCreator = selectedCreatorCommunity?.can_edit;

  const handleDrop = (droppedFiles) => {
    setFiles(droppedFiles);
  };

  const handleApplyClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setFormData({
      youtube_link: "",
      instagram_link: "",
      tiktok_link: "",
    });
    setErrors({});
  };

  const handleInputChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      [platform]: value,
    }));
    if (errors[platform]) {
      setErrors((prev) => ({ ...prev, [platform]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const hasAnyLink = Object.entries(formData).some(([key, val]) => {
      const platformKey = key.replace("_link", "");
      return availablePlatforms.includes(platformKey) && val.trim() !== "";
    });

    if (!hasAnyLink && availablePlatforms.length > 0) {
      newErrors.general = "Please provide at least one social media link.";
    }

    if (!files || files.length === 0) {
      newErrors.files = "Media file is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const payload = new FormData();
    if (files && files[0]) {
      payload.append("file", files[0]);
    }

    if (availablePlatforms.includes("youtube") && formData.youtube_link) payload.append("youtube_link", formData.youtube_link);
    if (availablePlatforms.includes("instagram") && formData.instagram_link) payload.append("instagram_link", formData.instagram_link);
    if (availablePlatforms.includes("tiktok") && formData.tiktok_link) payload.append("tiktok_link", formData.tiktok_link);

    submitContent(payload, {
      onSuccess: (data) => {
        if (data?.success || data?.status === 200 || data?.status === 201) {
          handleClosePopup();
          navigate("/content-reward");
        }
      },
      onError: (error) => {
        const apiErrors = error?.response?.data;
        if (apiErrors) {
          setErrors(apiErrors);
        }
      }
    });
  };

  if (isCreator) {
    return (
      <div className="flex items-center justify-center p-6 mt-10">
        <p className="text-gray-500 dark:text-zinc-400">Access denied for community creators.</p>
      </div>
    );
  }

  if (isLoadingCampaigns) {
    return <CampaignDetailsSkeleton />;
  }

  if (!campaign) {
    return (
      <div className="flex items-center justify-center p-10 h-[60vh]">
        <p className="text-gray-500 dark:text-zinc-400">Campaign data not found.</p>
      </div>
    )
  }

  const {
    name,
    thumbnail,
    reward_rate,
    campaign_type,
    category,
    platforms,
    // budget,
    max_payout
  } = campaign;

  const fullThumbnail = thumbnail?.startsWith("http")
    ? thumbnail
    : `${MEDIA_BASE_URL}${thumbnail}`;

  return (
    <>
      <div className="p-4 sm:p-6 text-[#717171] max-w-5xl mx-auto">
        <div className="dark:text-white dark:bg-zinc-900 p-4 sm:p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 bg-white">
          <div className="space-y-6">
            <div className="relative group overflow-hidden rounded-2xl">
              <img
                src={fullThumbnail || "/confirm-apply.png"}
                alt={name}
                className="w-full h-48 sm:h-64 md:h-[350px] object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 sm:p-6">
                <h3 className="text-white text-xl sm:text-2xl font-bold">{name}</h3>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 p-4 rounded-xl flex gap-3 items-start">
              <CircleAlert className="text-amber-500 shrink-0 mt-0.5" size={18} />
              <p className="text-[#003933] dark:text-amber-200 text-xs sm:text-sm font-medium leading-relaxed">
                Only views after you submit count towards payout. Submit as soon
                as you post to get paid for all of your views.
              </p>
            </div>

            <CampaignProgress
              totalUsersEarning={campaign?.total_users_earning}
              initialBudget={campaign?.initial_budget}
              budget={campaign?.budget}
              showTitle={true}
            />

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 py-6 border-y border-gray-50 dark:border-zinc-800/50">
              {[
                { label: "Reward", value: `$${reward_rate}/1k` },
                { label: "Type", value: campaign_type?.name || "N/A" },
                { label: "Category", value: category?.name || "N/A" },
                { label: "Max Payout", value: `$${max_payout}` },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-[10px] text-gray-400 dark:text-zinc-500 mb-1 font-bold uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-gray-900 text-sm font-semibold dark:text-zinc-300">
                    {stat.value}
                  </p>
                </div>
              ))}
              <div className="col-span-2 lg:col-span-1">
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
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200 text-sm font-semibold order-2 sm:order-1"
              >
                Go Back
              </button>
              <button
                onClick={handleApplyClick}
                className="w-full sm:w-auto px-10 py-3.5 text-white bg-[#003933] hover:bg-[#002822] text-lg font-bold rounded-2xl transition duration-300 shadow-xl active:scale-[0.98] order-1 sm:order-2"
              >
                Submit Content
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 sm:p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-[2rem] w-full max-w-xl mx-auto relative overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Create Submission
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-1">
                  Share your results for <span className="text-[#003933] dark:text-[#00b89f] font-semibold">{name}</span>
                </p>
              </div>
              <button
                onClick={handleClosePopup}
                className="p-2 bg-gray-50 dark:bg-zinc-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 scrollbar-hide">
              {/* Errors Container */}
              {(errors.general || errors.non_field_errors) && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl p-4 flex items-start gap-3">
                  <CircleAlert className="text-red-500 shrink-0 mt-0.5" size={18} />
                  <div className="text-xs sm:text-sm text-red-800 dark:text-red-200 whitespace-pre-wrap">
                    {errors.general || (Array.isArray(errors.non_field_errors) ? errors.non_field_errors[0] : errors.non_field_errors)}
                  </div>
                </div>
              )}

              <div className="space-y-5">
                {/* Dynamically render platform links */}
                {[
                  { id: "youtube", label: "YouTube Link", placeholder: "https://www.youtube.com/watch?v=...", icon: <FaYoutube className="text-red-600" /> },
                  { id: "instagram", label: "Instagram Link", placeholder: "https://www.instagram.com/reels/...", icon: <FaInstagram className="text-pink-600" /> },
                  { id: "tiktok", label: "TikTok Link", placeholder: "https://www.tiktok.com/@user/video/...", icon: <FaTiktok className="text-black dark:text-white" /> }
                ].map((input) => (
                  availablePlatforms.includes(input.id) && (
                    <div key={input.id} className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white italic">
                        {input.icon} {input.label}
                      </label>
                      <input
                        type="url"
                        value={formData[`${input.id}_link`]}
                        onChange={(e) => handleInputChange(`${input.id}_link`, e.target.value)}
                        placeholder={input.placeholder}
                        className={`w-full px-4 py-3.5 bg-gray-50 dark:bg-zinc-800 border-2 rounded-2xl focus:ring-4 focus:ring-[#3fa796]/20 focus:border-[#3fa796] outline-none transition-all placeholder:text-gray-400 dark:text-white font-medium ${errors[`${input.id}_link`] ? "border-red-400" : "border-transparent"
                          }`}
                      />
                      {errors[`${input.id}_link`] && (
                        <p className="text-red-500 text-[10px] font-bold px-1 uppercase tracking-tight">
                          {Array.isArray(errors[`${input.id}_link`]) ? errors[`${input.id}_link`][0] : errors[`${input.id}_link`]}
                        </p>
                      )}
                    </div>
                  )
                ))}

                {/* Dropzone Container */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-900 dark:text-white">
                    Official Media File <span className="text-red-500">*</span>
                  </label>
                  <div className={`p-4 rounded-3xl border-2 border-dashed transition-all ${errors.files
                    ? "border-red-400 bg-red-50/50 dark:bg-red-900/10"
                    : "border-emerald-200 dark:border-zinc-800 bg-emerald-50/10 dark:bg-zinc-800/20"
                    }`}>
                    <Dropzone
                      maxFiles={1}
                      onDrop={handleDrop}
                      onError={(err) => toast.error(err)}
                      src={files}
                      className="w-full border-0 bg-transparent min-h-[140px]"
                    >
                      <DropzoneEmptyState className="py-4">
                        <div className="text-center space-y-2">
                          <div className="mx-auto w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                            <Plus size={24} />
                          </div>
                          <p className="text-sm font-bold text-emerald-800 dark:text-emerald-400">Click to upload or drag</p>
                          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Maximum file size: 50MB</p>
                        </div>
                      </DropzoneEmptyState>
                      <DropzoneContent />
                    </Dropzone>
                  </div>
                  {errors.files && <p className="text-red-500 text-[10px] font-bold px-1 uppercase">{errors.files}</p>}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 sm:p-8 bg-gray-50 dark:bg-zinc-800/50 border-t border-gray-100 dark:border-zinc-800">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full h-14 bg-[#003933] hover:bg-[#002822] disabled:bg-gray-400 dark:disabled:bg-zinc-700 text-white font-bold rounded-2xl transition duration-300 shadow-xl flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  "Finalize Submission"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContentRewardDetailsPayment;
