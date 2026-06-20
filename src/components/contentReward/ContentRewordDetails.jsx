import { useState, useMemo } from "react";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Users, ExternalLink, FileText, CircleAlert, Plus, X } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaGoogleDrive } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router";
import { toast } from "sonner";
import { useGetSingleCampaign, useSubmitCampaignContent } from "@/hooks/campaign.hook";
import { useCommunityStore } from "@/store/communityStore";
import CampaignDetailsSkeleton from "./CampaignDetailsSkeleton";
import CampaignProgress from "@/components/dashboard/Dashboard/ContentReward/CampaignProgress";

const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL;

const ContentRewardDetails = () => {
  const { campaignId, communityUsername } = useParams();
  const navigate = useNavigate();
  const { selectedCreatorCommunity } = useCommunityStore();
  const { data: campaign, isLoading } = useGetSingleCampaign(campaignId);

  const isCreator = selectedCreatorCommunity?.can_edit;


  const totalUsersEarning = campaign?.total_users_earning
  const initialBudget = campaign?.initial_budget
  const budget = campaign?.budget
  const currentBudget = initialBudget || budget || 0;
  const earning = parseFloat(totalUsersEarning || 0);

  const progress = currentBudget > 0
    ? Math.min(Math.max((earning / parseFloat(currentBudget)) * 100, 0), 100)
    : 0;

  // Modal state
  const { mutate: submitContent, isPending: isSubmitting } = useSubmitCampaignContent(campaignId);
  const [files, setFiles] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const availablePlatforms = useMemo(() => {
    return campaign?.platforms?.map(p => p.name?.toLowerCase()) || [];
  }, [campaign]);

  const [formData, setFormData] = useState({
    youtube_link: "",
    instagram_link: "",
    tiktok_link: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});

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
      termsAccepted: false,
    });
    setErrors({});
    setSelectedPlatform(null);
  };

  const handleInputChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      [platform]: value,
    }));

    if (platform === "termsAccepted") {
      setErrors((prev) => ({ ...prev, [platform]: "" }));
    }
  };

  const handlePlatformSelect = (platformId) => {
    setSelectedPlatform(platformId);
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
          navigate(`/announcement/${communityUsername}/content-reward`);
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
        <p className="text-muted-foreground dark:text-muted-foreground">Access denied for community creators.</p>
      </div>
    );
  }

  if (isLoading) {
    return <CampaignDetailsSkeleton />;
  }

  if (!campaign) {
    return (
      <div className="flex items-center justify-center p-10 h-[60vh]">
        <p className="text-muted-foreground dark:text-muted-foreground">Campaign not found or has been removed.</p>
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
    // budget,
    content_requirement,
    available_content,
  } = campaign;

  const fullThumbnail = thumbnail?.startsWith("http")
    ? thumbnail
    : `${MEDIA_BASE_URL}${thumbnail}`;

  const isEnded = campaign?.end_date && new Date(campaign.end_date) < new Date();
  const isFull = progress >= 100;

  return (
    <div className="p-4 sm:p-6 text-foreground-subtle max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl text-foreground dark:text-white font-bold">
          Content Reward Details
        </h2>
        {isEnded ? (
          <div className="px-3 py-1 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-full text-xs font-bold flex items-center gap-1.5 border border-red-200 dark:border-red-900/50">
            <div className="size-1.5 rounded-full bg-red-600 animate-pulse" />
            CAMPAIGN EXPIRED
          </div>
        ) : isFull ? (
          <div className="px-3 py-1 bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 rounded-full text-xs font-bold flex items-center gap-1.5 border border-amber-200 dark:border-amber-900/50">
            <div className="size-1.5 rounded-full bg-amber-600 animate-pulse" />
            BUDGET REACHED
          </div>
        ) : null}
      </div>

      <div className="space-y-6">
        {/* Main Details Card */}
        <div className="dark:text-foreground bg-card dark:bg-card p-5 sm:p-6 rounded-2xl shadow-sm border border-border dark:border-border">
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

            <span className="font-bold text-foreground-strong dark:text-foreground-strong text-lg">
              ${reward_rate}/1k
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-foreground text-lg font-bold mb-2 dark:text-foreground">
                {name}
              </h3>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-4 leading-relaxed">
                {content_requirement || "No specific requirements mentioned."}
              </p>

              <div className="space-y-2">
                <CampaignProgress
                  totalUsersEarning={totalUsersEarning}
                  initialBudget={initialBudget}
                  budget={budget}
                  showTitle={false}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 py-6 border-y border-gray-50 dark:border-zinc-800/50">
              <div>
                <p className="text-[10px] text-foreground-subtle dark:text-muted-foreground mb-1 font-bold uppercase tracking-wider">
                  Type
                </p>
                <p className="text-foreground text-sm font-medium dark:text-foreground">
                  {campaign_type?.name || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-foreground-subtle dark:text-muted-foreground mb-1 font-bold uppercase tracking-wider">
                  Platforms
                </p>
                <div className="flex gap-3 text-foreground dark:text-foreground">
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
                <p className="text-[10px] text-foreground-subtle dark:text-muted-foreground mb-1 font-bold uppercase tracking-wider">
                  Category
                </p>
                <p className="text-foreground text-sm font-medium dark:text-foreground">
                  {category?.name || "N/A"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
                <div className="mb-2 flex items-center gap-2">
                  <Users size={18} />
                  <h2 className="text-sm font-bold">Applications Process</h2>
                </div>
                <p className="text-xs opacity-80 leading-relaxed font-medium">Quick approval, usually within 24 hours</p>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
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

        {/* Campaign Assets Box */}
        {available_content && (
          <div className="bg-indigo-50 dark:bg-indigo-950/20 text-indigo-900 dark:text-indigo-400 p-5 sm:p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 shadow-sm transition-all hover:bg-indigo-100/50 dark:hover:bg-indigo-950/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="bg-indigo-500/10 dark:bg-indigo-500/20 p-3 rounded-2xl text-indigo-600 dark:text-indigo-400 shrink-0">
                  <FaGoogleDrive size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-foreground dark:text-foreground leading-tight">Campaign Assets & Resources</h4>
                  <p className="text-xs text-indigo-700/70 dark:text-indigo-400/70 max-w-sm font-medium">
                    Download raw footage, brand logos, and creative guidelines to help you create your video.
                  </p>
                </div>
              </div>

              <Link
                to={available_content}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-200 dark:shadow-none active:scale-95 group"
              >
                Access Materials
                <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        )}

        {/* Summary Card */}
        <div className="dark:text-foreground bg-card dark:bg-card p-5 sm:p-6 rounded-2xl shadow-sm border border-border dark:border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-gray-900 dark:text-white text-sm font-bold mb-4">
                Summary for this reward
              </h3>
              <ul className="space-y-3">
                {[
                  `Verified campaign for ${category?.name}`,
                  "Fast approval process",
                  `Support for ${platforms?.map(p => p.name).join(", ")}`,
                  campaign.end_date ? `Campaign ${isEnded ? "expired" : "ends"} on ${campaign.end_date}` : null
                ].filter(Boolean).map((item, i) => (
                  <li key={i} className="flex gap-2.5 items-center">
                    <div className="bg-foreground-strong/10 p-1 rounded-full">
                      <DollarSign className="text-foreground-strong dark:text-foreground-strong" size={14} />
                    </div>
                    <span className={`text-foreground dark:text-foreground text-xs font-medium ${item.includes("expired") ? "text-red-600 dark:text-red-400" : ""}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleApplyClick}
                disabled={isEnded || isFull}
                className={`w-full text-center text-white text-lg font-bold py-3.5 rounded-2xl transition duration-300 shadow-lg ${(isEnded || isFull)
                  ? "bg-muted cursor-not-allowed opacity-50"
                  : "bg-foreground-strong hover:bg-foreground active:scale-[0.98]"
                  }`}
              >
                {isEnded ? "Campaign Ended" : isFull ? "Budget Reached" : "Apply Now"}
              </button>
              <button
                onClick={() => navigate(-1)}
                className="w-full text-center text-muted-foreground dark:text-muted-foreground text-sm font-semibold hover:text-gray-700 dark:hover:text-zinc-200 transition"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 sm:p-4 backdrop-blur-sm">
          <div className="bg-card dark:bg-card rounded-[2rem] w-full max-w-xl mx-auto relative overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground dark:text-foreground">
                  Create Submission
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground mt-1">
                  Share your results for <span className="text-foreground-strong dark:text-foreground-strong font-semibold">{name}</span>
                </p>
              </div>
              <button
                onClick={handleClosePopup}
                className="p-2 bg-accent dark:bg-accent text-foreground-subtle hover:text-foreground dark:hover:text-foreground rounded-full transition-colors"
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

              <div className="space-y-6">
                {/* Platform Selector Grid */}
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-foreground dark:text-foreground uppercase tracking-wider">
                    Select Platform
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { id: "instagram", label: "Instagram", icon: <FaInstagram size={24} className="text-pink-600" /> },
                      { id: "tiktok", label: "TikTok", icon: <FaTiktok size={24} className="text-black dark:text-white" /> },
                      { id: "youtube", label: "YouTube", icon: <FaYoutube size={24} className="text-red-600" /> }
                    ].map((platform) => (
                      availablePlatforms.includes(platform.id) && (
                        <button
                          key={platform.id}
                          type="button"
                          onClick={() => handlePlatformSelect(platform.id)}
                          className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 gap-2 ${selectedPlatform === platform.id
                            ? "border-foreground-muted bg-foreground-strong/5 dark:bg-foreground-strong/20 ring-4 ring-primary/10"
                            : "border-border dark:border-border hover:border-border dark:hover:border-border bg-card dark:bg-accent/50"
                            }`}
                        >
                          {platform.icon}
                          <span className="text-xs font-bold text-foreground dark:text-foreground">{platform.label}</span>
                        </button>
                      )
                    ))}
                  </div>

                  {/* 24-hour upload notice */}
                  <div className="flex items-start gap-2.5 px-1">
                    <CircleAlert size={14} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium leading-relaxed">
                      Videos must be uploaded within 24 hours of submission. Content older than 24 hours cannot be submitted to campaigns.
                    </p>
                  </div>
                </div>

                {/* Conditional Platform Link Input */}
                {selectedPlatform && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="flex items-center gap-2 text-sm font-bold text-foreground dark:text-foreground capitalize">
                      {selectedPlatform === 'youtube' ? <FaYoutube className="text-red-600" /> :
                        selectedPlatform === 'instagram' ? <FaInstagram className="text-pink-600" /> :
                          <FaTiktok className="text-black dark:text-white" />}
                      {selectedPlatform} Link
                    </label>
                    <input
                      type="url"
                      value={formData[`${selectedPlatform}_link`]}
                      onChange={(e) => handleInputChange(`${selectedPlatform}_link`, e.target.value)}
                      placeholder={`https://www.${selectedPlatform}.com/...`}
                      className={`w-full px-4 py-3.5 bg-accent dark:bg-accent border-2 rounded-2xl focus:ring-4 focus:ring-ring/20 focus:border-border-strong outline-none transition-all placeholder:text-foreground-subtle dark:text-foreground font-medium ${errors[`${selectedPlatform}_link`] ? "border-red-400" : "border-transparent"
                        }`}
                    />
                    {errors[`${selectedPlatform}_link`] && (
                      <p className="text-red-500 text-[10px] font-bold px-1 uppercase tracking-tight">
                        {Array.isArray(errors[`${selectedPlatform}_link`]) ? errors[`${selectedPlatform}_link`][0] : errors[`${selectedPlatform}_link`]}
                      </p>
                    )}
                  </div>
                )}

                {/* Dropzone Container */}
                <div className="space-y-2 pt-2">
                  <label className="block text-sm font-bold text-foreground dark:text-foreground">
                    Official Media File <span className="text-foreground-subtle font-normal">(Optional)</span>
                  </label>
                  <div className={`p-4 rounded-3xl border-2 border-dashed transition-all ${errors.files
                    ? "border-red-400 bg-red-50/50 dark:bg-red-900/10"
                    : "border-foreground-muted/20 dark:border-zinc-800 bg-foreground-strong/5 dark:bg-zinc-800/20"
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
                          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Maximum file size: 50MB</p>
                        </div>
                      </DropzoneEmptyState>
                      <DropzoneContent />
                    </Dropzone>
                  </div>
                  {errors.files && <p className="text-red-500 text-[10px] font-bold px-1 uppercase">{errors.files}</p>}
                </div>

              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3 p-4 bg-accent dark:bg-accent rounded-xl border border-border dark:border-border transition-colors">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={(e) => handleInputChange("termsAccepted", e.target.checked)}
                    className="size-4 rounded border-gray-300 text-foreground-strong focus:ring-ring dark:bg-zinc-800 dark:border-zinc-700 cursor-pointer"
                  />
                </div>
                <div className="text-sm">
                  <label htmlFor="terms" className="font-medium text-foreground dark:text-foreground cursor-pointer">
                    I agree to the{" "}
                    <a
                      href="/terms-and-conditions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground-strong dark:text-foreground-strong hover:underline font-bold"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Terms & Conditions
                    </a>
                  </label>
                  <p className="text-muted-foreground dark:text-muted-foreground mt-1 text-xs">
                    You must accept the terms before submitting your content for reward.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 sm:p-8 bg-accent dark:bg-accent/50 border-t border-border dark:border-border">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.termsAccepted}
                className="w-full h-14 bg-foreground-strong hover:bg-foreground disabled:bg-muted dark:disabled:bg-muted text-white font-bold rounded-2xl transition duration-300 shadow-xl flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  "Submit for approval"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentRewardDetails;
