import { Upload, HelpCircle, DollarSign, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useGetCampaignTypes, useGetCategories } from "@/hooks/campaign.hook";
import { useGetCurrencies } from "@/hooks/payment.hook";
import { Button } from "../../../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import CommonAlert from "@/components/Alerts/CommonAlert";

const CampaignForm = ({
  initialData,
  onSubmit,
  onCancel,
  isEditMode = false,
  isSubmitting = false,
  alert,
  setAlert,
}) => {
  const { data: campaignTypesData, isLoading: isTypesLoading } = useGetCampaignTypes();
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategories();
  const { data: currenciesData, isLoading: isCurrenciesLoading } = useGetCurrencies();

  const isInitialLoading = isTypesLoading || isCategoriesLoading || isCurrenciesLoading;
  const isFormDisabled = isInitialLoading || isSubmitting;

  const campaignTypes = campaignTypesData?.data || [];
  const categories = categoriesData?.data || [];
  const currencies = currenciesData || [];

  const [formData, setFormData] = useState({
    thumbnailPreview: initialData?.thumbnailPreview || null,
    thumbnailFile: null,
    campaignName: initialData?.campaignName || "",
    type: initialData?.type || "",
    category: initialData?.category || "",
    campaignBudget: initialData?.campaignBudget || "",
    currency: initialData?.currency || "USD",
    rewardRate: initialData?.rewardRate || "",
    minPayout: initialData?.minPayout || "",

    maxPayout: initialData?.maxPayout || "",
    flatFeeBonus: initialData?.flatFeeBonus || "",
    platforms: initialData?.platforms || [],
    availableContent: initialData?.availableContent,
    contentRequirement: initialData?.contentRequirement || "",
    startDate: initialData?.startDate || undefined,
    endDate: initialData?.endDate || undefined,
    termsAccepted: isEditMode, // Always true in edit mode since it's already accepted or not needed
  });

  const selectedCurrency = currencies.find(
    (c) => c.code.toUpperCase() === (formData?.currency?.toUpperCase() || "USD")
  );
  const currencySymbol = selectedCurrency?.symbol || "$";

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        // Ensure arrays are copied
        platforms: initialData.platforms ? [...initialData.platforms] : prev.platforms,
      }));
    }
  }, [initialData]);

  useEffect(() => {
    const validate = () => {
      const requiredFields = [
        formData.campaignName?.trim(),
        formData.type,
        formData.category,
        formData.campaignBudget,
        formData.rewardRate,
        formData.minPayout,
        formData.maxPayout,
        formData.contentRequirement?.trim(),
        formData.startDate,
        formData.endDate,
      ];

      const isBasicAndNumericValid = requiredFields.every((field) => field);

      let isDurationValid = false;
      if (formData.startDate && formData.endDate) {
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
        isDurationValid = duration >= 30;
      }

      const isPlatformsValid = formData.platforms.length > 0;
      const isBudgetValid = Number(formData.campaignBudget) > 0;
      const isRewardRateValid = Number(formData.rewardRate) > 0;

      const isGoogleDriveLink = (url) => {
        if (!url) return true; // Optional field
        return /^(https?:\/\/)?(www\.)?(drive|docs)\.google\.com\/.+$/.test(url);
      };

      const isContentLinkValid = isGoogleDriveLink(formData.availableContent);
      const isTermsAccepted = formData.termsAccepted;
      const isFlatFeeValid = !formData.flatFeeBonus || Number(formData.flatFeeBonus) <= (Number(formData.campaignBudget) * 0.1);

      setIsFormValid(
        isBasicAndNumericValid &&
        isDurationValid &&
        isPlatformsValid &&
        isBudgetValid &&
        isRewardRateValid &&
        isContentLinkValid &&
        isTermsAccepted &&
        isFlatFeeValid
      );
    };

    validate();
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const calculateViews = (payout, rate) => {
    if (!payout || !rate || Number(rate) === 0) return null;
    const views = (Number(payout) / Number(rate)) * 1000;
    if (views >= 1000000) return `~${(views / 1000000).toFixed(1)}M views`;
    if (views >= 1000) return `~${Math.round(views / 1000)}k views`;
    return `~${Math.round(views)} views`;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          thumbnailPreview: e.target.result,
          thumbnailFile: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeThumbnail = () => {
    setFormData((prev) => ({
      ...prev,
      thumbnailPreview: null,
      thumbnailFile: null,
    }));
    const fileInput = document.getElementById("thumbnail-upload");
    if (fileInput) fileInput.value = "";
  };

  const handlePlatformChange = (platform, checked) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        platforms: [...prev.platforms, platform],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        platforms: prev.platforms.filter((p) => p !== platform),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid && onSubmit) {
      onSubmit(formData);
    } else {
      console.log("Form invalid or no submit handler");
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      console.log("Form cancelled");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 dark:bg-zinc-900 min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Upload Thumbnail */}
        <div className="space-y-3">
          {formData.thumbnailPreview ? (
            <div className="relative border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden group">
              <div className="aspect-[16/9] w-full">
                <img
                  src={formData.thumbnailPreview}
                  alt="Thumbnail preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  disabled={isFormDisabled}
                  onClick={() =>
                    document.getElementById("thumbnail-upload").click()
                  }
                  className="px-4 py-2 text-sm bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Change Image
                </button>
                <button
                  type="button"
                  disabled={isFormDisabled}
                  onClick={removeThumbnail}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Remove
                </button>
              </div>

              <input
                id="thumbnail-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div 
              onClick={() => document.getElementById("thumbnail-upload").click()}
              className="border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl aspect-[16/9] w-full flex items-center justify-center bg-gray-50/50 dark:bg-zinc-900/30 hover:bg-gray-50 dark:hover:bg-zinc-900/50 hover:border-gray-300 dark:hover:border-zinc-700 transition-all cursor-pointer group"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-gray-100 dark:border-zinc-700 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-foreground-strong dark:text-emerald-500" />
                </div>
                <div className="text-center px-4">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Upload thumbnail</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Recommended size: 1280x720 (16:9)</p>
                </div>

                <input
                  id="thumbnail-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          )}
        </div>

        {/* Campaign name */}
        <div className="space-y-6">
          <label className="text-sm font-medium text-foreground-muted dark:text-gray-300 mb-4 inline-block">
            Campaign name*
          </label>
          <input
            type="text"
            disabled={isFormDisabled}
            value={formData.campaignName}
            onChange={(e) => handleInputChange("campaignName", e.target.value)}
            placeholder="Campaign Name"
            className="w-full px-3 py-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-foreground-muted focus:border-transparent transition-all outline-none text-gray-900 dark:text-white placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Type and Personal Brand */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground-muted dark:text-gray-300 mb-4 inline-block">
              Type*
            </label>
            <div className="relative w-full">
              <select
                value={formData.type}
                disabled={isFormDisabled}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="w-full px-3 py-3 pr-10 bg-white dark:text-white dark:bg-zinc-800 
               border border-gray-200 dark:border-gray-700 rounded-lg
               focus:ring-2 focus:ring-foreground-muted focus:border-transparent
               transition-all outline-none appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">{isTypesLoading ? "Loading types..." : "Select Type"}</option>
                {campaignTypes.map((type) => (
                  <option key={type.name} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>

              {/* Custom arrow */}
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                <ChevronDown />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground-muted dark:text-gray-300 mb-4 inline-block">
              Category*
            </label>
            <div className="relative w-full">
              <select
                value={formData.category}
                disabled={isFormDisabled}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full px-3 py-3 pr-10 bg-white dark:text-white dark:bg-zinc-800
               border border-gray-200 dark:border-gray-700 rounded-lg
               focus:ring-2 focus:ring-foreground-muted focus:border-transparent
               transition-all outline-none appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">{isCategoriesLoading ? "Loading categories..." : "Select Category"}</option>
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Custom dropdown icon */}
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                <ChevronDown />
              </div>
            </div>

          </div>
        </div>

        {/* Campaign budget */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground-muted dark:text-gray-300 mb-4 inline-block">
            Campaign Budget*
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"></span>
              <input
                type="number"
                disabled={isFormDisabled}
                value={formData.campaignBudget}
                onChange={(e) =>
                  handleInputChange("campaignBudget", e.target.value)
                }
                placeholder="0.00"
                className="w-full px-3 py-3 text-gray-900 dark:text-white bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-foreground-muted focus:border-transparent transition-all outline-none placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div className="relative">
              <select
                value={formData.currency}
                disabled={isFormDisabled}
                onChange={(e) => handleInputChange("currency", e.target.value)}
                className="px-3 py-3 pr-10 bg-white dark:text-white dark:bg-zinc-800
               border border-gray-200 dark:border-gray-700 rounded-lg
               focus:ring-2 focus:ring-foreground-muted focus:border-transparent
               transition-all outline-none appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">{isCurrenciesLoading ? "Loading..." : "Select Currency"}</option>
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code.toUpperCase()}>
                    {currency.code.toUpperCase()} ({currency.symbol})
                  </option>
                ))}
              </select>

              {/* Custom dropdown icon */}
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                <ChevronDown />
              </div>
            </div>

          </div>
        </div>

        {/* Reward rate */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground-muted dark:text-gray-300 mb-4 inline-block">
            Reward Rate* (per 1k views)
          </label>
          <div className="relative">
            <input
              type="number"
              disabled={isFormDisabled}
              value={formData.rewardRate}
              onChange={(e) => handleInputChange("rewardRate", e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-3 text-gray-900 dark:text-white bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-foreground-muted focus:border-transparent transition-all outline-none placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Min and Max payout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground-muted dark:text-gray-300 mb-2 flex items-center gap-2">
              Minimum Payout*
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" tabIndex={-1}>
                    <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-72 text-sm">
                  If enabled, users must reach this minimum amount before
                  becoming eligible for payout.
                </PopoverContent>
              </Popover>
            </label>
            <div className="relative">
              <input
                type="number"
                disabled={isFormDisabled}
                value={formData.minPayout}
                onChange={(e) => handleInputChange("minPayout", e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-3 text-gray-900 dark:text-white bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-foreground-muted focus:border-transparent transition-all outline-none placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            {formData.minPayout && formData.rewardRate && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 ml-1 font-medium">
                {calculateViews(formData.minPayout, formData.rewardRate)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground-muted dark:text-gray-300 mb-2 flex items-center gap-2">
              Maximum Payout*
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" tabIndex={-1}>
                    <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-72 text-sm">
                  If enabled, users cannot earn more than this specified amount
                  for each submission.
                </PopoverContent>
              </Popover>
            </label>
            <div className="relative">
              <input
                type="number"
                disabled={isFormDisabled}
                value={formData.maxPayout}
                onChange={(e) => handleInputChange("maxPayout", e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-3 text-gray-900 dark:text-white bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-foreground-muted focus:border-transparent transition-all outline-none placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            {formData.maxPayout && formData.rewardRate && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 ml-1 font-medium">
                {calculateViews(formData.maxPayout, formData.rewardRate)}
              </p>
            )}
          </div>
        </div>

        {/* Flat fee bonus */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground-muted dark:text-gray-300 mb-4 flex items-center gap-2">
            Flat Fee Bonus (Optional) - Max 10% of the Total Budget
            <Popover>
              <PopoverTrigger asChild>
                <button type="button" tabIndex={-1}>
                  <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-72 text-sm">
                This is a fixed bonus amount per submission, which will be paid
                once the submission is approved.
              </PopoverContent>
            </Popover>
          </label>
          <div className="relative">
            <input
              type="number"
              disabled={isFormDisabled}
              value={formData.flatFeeBonus}
              onChange={(e) =>
                handleInputChange("flatFeeBonus", e.target.value)
              }
              placeholder="0.00"
              className={cn(
                "w-full px-3 py-3 text-gray-900 dark:text-white bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-foreground-muted focus:border-transparent transition-all outline-none placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed",
                formData.flatFeeBonus && Number(formData.flatFeeBonus) > (Number(formData.campaignBudget) * 0.1) && "border-red-500 focus:ring-red-500"
              )}
            />
            {formData.flatFeeBonus && Number(formData.flatFeeBonus) > (Number(formData.campaignBudget) * 0.1) && (
              <p className="text-xs text-red-500 mt-1">
                Flat fee bonus cannot exceed 10% of the total budget (${(Number(formData.campaignBudget) * 0.1).toFixed(2)})
              </p>
            )}
          </div>
        </div>

        {/* Platform */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground-muted dark:text-gray-300 mb-4 inline-block">
            Platform*
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Instagram", "TikTok", "Youtube"].map((platform) => (
              <label
                key={platform}
                className="flex items-center space-x-3 cursor-pointer px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <input
                  type="checkbox"
                  disabled={isFormDisabled}
                  checked={formData.platforms.includes(platform)}
                  onChange={(e) =>
                    handlePlatformChange(platform, e.target.checked)
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {platform}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Available content */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground-muted dark:text-gray-300 mb-4 inline-block">
            Available Content
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            We suggest adding your guides, raw footage, and other materials for
            creators to edit with here via a Google Drive link
          </p>
          <div className="relative">
            <input
              type="text"
              disabled={isFormDisabled}
              value={formData.availableContent}
              onChange={(e) =>
                handleInputChange("availableContent", e.target.value)
              }
              placeholder="e.g. https://drive.google.com/drive/folders/..."
              className="w-full px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-foreground-muted focus:border-transparent transition-all outline-none placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {formData.availableContent && !/^(https?:\/\/)?(www\.)?(drive|docs)\.google\.com\/.+$/.test(formData.availableContent) && (
              <p className="text-xs text-red-500 mt-1">Please enter a valid Google Drive link</p>
            )}
          </div>
        </div>

        {/* Content requirement */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground-muted dark:text-gray-300 mb-4 inline-block">
            Content Requirement*
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            We recommend including content guidelines for users to follow.
          </p>
          <textarea
            value={formData.contentRequirement}
            disabled={isFormDisabled}
            onChange={(e) =>
              handleInputChange("contentRequirement", e.target.value)
            }
            placeholder="Enter Requirement"
            rows={4}
            className="w-full px-3 text-gray-900 dark:text-white py-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-foreground-muted focus:border-transparent transition-all outline-none placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Campaign Duration */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground-muted dark:text-gray-300 mb-4 flex items-center gap-2">
            Campaign Duration (Min 30 Days)
            <Popover>
              <PopoverTrigger asChild>
                <button type="button" tabIndex={-1}>
                  <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-72 text-sm">
                Set the start and end dates for your campaign. The campaign will
                only be active during this period.
              </PopoverContent>
            </Popover>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Start Date */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Start date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={isFormDisabled}
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white dark:bg-zinc-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white",
                      !formData.startDate && "text-gray-400 dark:text-gray-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? (
                      format(formData.startDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => handleInputChange("startDate", date)}
                    disabled={(date) => {
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)

                      const d = new Date(date)
                      date.setHours(0, 0, 0, 0)

                      return d < today
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                End date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={isFormDisabled}
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white dark:bg-zinc-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white",
                      !formData.endDate && "text-gray-400 dark:text-gray-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? (
                      format(formData.endDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => handleInputChange("endDate", date)}
                    disabled={(date) => {
                      const selectedDate = formData.startDate
                      const startDate = new Date(selectedDate)
                      startDate.setHours(0, 0, 0, 0)

                      const endDate = new Date(selectedDate)
                      endDate.setDate(startDate.getDate() + 30)
                      endDate.setHours(0, 0, 0, 0)

                      return selectedDate
                        ? date < endDate
                        : true
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Duration Display */}
          {formData.startDate && formData.endDate && (
            <div className="mt-3 p-4 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border border-foreground-muted/20 dark:border-foreground-muted/30 rounded-lg">
              <p className="text-sm text-foreground-strong dark:text-foreground-strong font-semibold flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Campaign duration:{" "}
                {Math.ceil(
                  (new Date(formData.endDate) - new Date(formData.startDate)) /
                  (1000 * 60 * 60 * 24)
                )}{" "}
                days
              </p>
            </div>
          )}
        </div>
        {alert && (
          typeof alert === 'object' ? (
            <CommonAlert alert={alert} onClose={() => setAlert(null)} />
          ) : (
            <div className="text-sm text-red-500 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
              {alert}
            </div>
          )
        )}
        {/* Terms and Conditions */}
        {!isEditMode && (
          <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-100 dark:border-gray-800 transition-colors">
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
              <label htmlFor="terms" className="font-medium text-gray-700 dark:text-zinc-300 cursor-pointer">
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
              <p className="text-gray-500 dark:text-zinc-400 mt-1 text-xs">
                You must accept the terms before creating a new content reward campaign.
              </p>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="submit"
            disabled={!isFormValid || isFormDisabled}
            className={`transition font-medium px-6 py-4 rounded-lg text-white ${isFormValid && !isFormDisabled
              ? "bg-foreground-strong dark:bg-foreground-strong hover:bg-foreground dark:hover:bg-foreground-strong/90"
              : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-50"
              }`}
          >
            {isSubmitting ? "Processing..." : isEditMode ? "Update Campaign" : "Create Campaign"}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isFormDisabled}
            onClick={handleCancel}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </Button>
        </div>
      </form >
    </div >
  );
};

export default CampaignForm;
