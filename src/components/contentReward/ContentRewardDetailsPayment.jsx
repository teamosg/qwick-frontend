import { Progress } from "@/components/ui/progress";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";

import { CircleAlert, X } from "lucide-react";
import { useState, useMemo } from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router";
import { useGetAllCampaigns, useSubmitCampaignContent } from "@/hooks/campaign.hook";
import { useCommunityStore } from "@/store/communityStore";

const MEDIA_BASE_URL = "https://darrenchua.softvencealpha.com";

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

  // Filter available platforms from campaign data
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

    // Check if at least one available platform has a link
    const hasAnyLink = Object.entries(formData).some(([key, val]) => {
      const platformKey = key.replace("_link", "");
      return availablePlatforms.includes(platformKey) && val.trim() !== "";
    });

    if (!hasAnyLink && availablePlatforms.length > 0) {
      newErrors.general = "Please provide at least one social media link for the available platforms.";
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

    // Only append links for available platforms
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
      <div className="flex items-center justify-center p-10 mt-10">
        <p className="text-gray-500">Access denied for community creators.</p>
      </div>
    );
  }

  if (isLoadingCampaigns) {
    return (
      <div className="flex items-center justify-center p-10 h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003933]"></div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex items-center justify-center p-10 h-screen">
        <p>Campaign data not found.</p>
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
    budget,
    max_payout
  } = campaign;

  const fullThumbnail = thumbnail?.startsWith("http")
    ? thumbnail
    : `${MEDIA_BASE_URL}${thumbnail}`;

  return (
    <>
      <div className="p-6 text-[#717171]">
        <div className="dark:text-white dark:bg-zinc-900 p-6 rounded-xl items-center justify-center mx-auto shadow mb-6 max-w-5xl bg-white">
          <div className="mb-6">
            <img
              src={fullThumbnail || "/confirm-apply.png"}
              alt={name}
              className="w-full h-[300px] object-cover mb-7 rounded-xl"
            />
            <p className="text-[#717171] text-xs mb-7 dark:text-zinc-400 flex gap-2 items-center">
              <span>
                <CircleAlert className="text-[#FEC260]" size={18} />
              </span>
              <span>
                Only views after you submit count towards payout. Submit as soon
                as you post to get paid for all of your views.
              </span>
            </p>
            <div className="mb-2.5">
              <h4 className="text-[#090003] text-sm mb-2.5 dark:text-white font-semibold uppercase">
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
              <p className="text-[#717171] text-sm dark:text-zinc-400">
                ${reward_rate}/1k
              </p>
            </div>
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
                Category
              </p>
              <p className="text-[#717171] text-sm dark:text-zinc-400">
                {category?.name || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-[#090003] text-xs mb-1 font-semibold dark:text-white uppercase opacity-70">
                Max Payout
              </p>
              <p className="text-[#717171] text-sm dark:text-zinc-400">
                ${max_payout}
              </p>
            </div>
            <div>
              <p className="text-[#090003] text-xs mb-1 font-semibold  dark:text-white uppercase opacity-70">
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
          </div>
          <div className="text-center flex items-end justify-end ">
            <button
              onClick={handleApplyClick}
              className="w-[200px] mb-2.5 text-white bg-[#003933] hover:bg-[#002822] text-[18px] font-semibold p-2.5 rounded-full cursor-pointer transition shadow-lg"
            >
              Submit Content
            </button>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-800 rounded-3xl w-full max-w-2xl mx-auto relative overflow-y-auto max-h-[95vh] sm:p-8 p-6 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={handleClosePopup}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Create Submission
                </h2>
                <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                  Share your results for <strong>{name}</strong>
                </p>
              </div>

              {/* General Error Message */}
              {(errors.general || errors.non_field_errors) && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 flex items-start gap-2">
                  <CircleAlert className="text-red-600 size-4 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-red-800 dark:text-red-200">
                    {errors.general && <p>{errors.general}</p>}
                    {errors.non_field_errors && (
                      <ul className="list-disc ml-4">
                        {Array.isArray(errors.non_field_errors)
                          ? errors.non_field_errors.map((err, i) => <li key={i}>{err}</li>)
                          : <li>{errors.non_field_errors}</li>
                        }
                      </ul>
                    )}
                  </div>
                </div>
              )}

              {/* Info Alert */}
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-start gap-3">
                <CircleAlert className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                  Only views after you submit count towards payout. Submit as
                  soon as you post to get paid for all of your views.
                </p>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                {/* Link Inputs - Dynamically rendered based on available platforms */}
                <div className="space-y-5">
                  {availablePlatforms.includes("youtube") && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        YouTube Link
                      </label>
                      <input
                        type="url"
                        value={formData.youtube_link}
                        onChange={(e) => handleInputChange("youtube_link", e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#3fa796] focus:border-transparent dark:bg-zinc-700/50 dark:text-white outline-none transition-all placeholder:text-gray-400 ${errors.youtube_link ? "border-red-500" : "border-gray-200 dark:border-zinc-700"
                          }`}
                      />
                      {errors.youtube_link && (
                        <p className="text-red-500 text-xs mt-1">
                          {Array.isArray(errors.youtube_link) ? errors.youtube_link[0] : errors.youtube_link}
                        </p>
                      )}
                    </div>
                  )}

                  {availablePlatforms.includes("instagram") && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Instagram Link
                      </label>
                      <input
                        type="url"
                        value={formData.instagram_link}
                        onChange={(e) => handleInputChange("instagram_link", e.target.value)}
                        placeholder="https://www.instagram.com/reels/..."
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#3fa796] focus:border-transparent dark:bg-zinc-700/50 dark:text-white outline-none transition-all placeholder:text-gray-400 ${errors.instagram_link ? "border-red-500" : "border-gray-200 dark:border-zinc-700"
                          }`}
                      />
                      {errors.instagram_link && (
                        <p className="text-red-500 text-xs mt-1">
                          {Array.isArray(errors.instagram_link) ? errors.instagram_link[0] : errors.instagram_link}
                        </p>
                      )}
                    </div>
                  )}

                  {availablePlatforms.includes("tiktok") && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        TikTok Link
                      </label>
                      <input
                        type="url"
                        value={formData.tiktok_link}
                        onChange={(e) => handleInputChange("tiktok_link", e.target.value)}
                        placeholder="https://www.tiktok.com/@user/video/..."
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#3fa796] focus:border-transparent dark:bg-zinc-700/50 dark:text-white outline-none transition-all placeholder:text-gray-400 ${errors.tiktok_link ? "border-red-500" : "border-gray-200 dark:border-zinc-700"
                          }`}
                      />
                      {errors.tiktok_link && (
                        <p className="text-red-500 text-xs mt-1">
                          {Array.isArray(errors.tiktok_link) ? errors.tiktok_link[0] : errors.tiktok_link}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Media Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Media File<span className="text-red-500">*</span>
                  </label>

                  <div className={`border-2 border-dashed rounded-2xl p-6 transition-all ${errors.files ? 'border-red-400 bg-red-50/50' : 'border-emerald-200 bg-emerald-50/10'}`}>
                    <div className="flex flex-col items-center">
                      <Dropzone
                        maxFiles={1}
                        onDrop={handleDrop}
                        onError={(err) => toast.error(err)}
                        src={files}
                        className="w-full border-0 bg-transparent"
                      >
                        <DropzoneEmptyState className="py-4">
                          <div className="text-center">
                            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-400">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500 mt-1">Upload the original media file you posted</p>
                          </div>
                        </DropzoneEmptyState>
                        <DropzoneContent />
                      </Dropzone>
                    </div>
                  </div>
                  {errors.files && <p className="text-red-500 text-xs mt-2">{errors.files}</p>}
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-[#003933] hover:bg-[#002822] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContentRewardDetailsPayment;
