import { Upload, HelpCircle, DollarSign, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../../../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PaymentSetDialog from "./PaymentSetDialog";

const CampaignForm = ({
  setShowForm,
  initialData,
  onSubmit,
  onCancel,
  isEditMode = false,
}) => {
  const [formData, setFormData] = useState({
    thumbnailPreview: initialData?.thumbnailPreview || null,
    campaignName: initialData?.campaignName || "",
    type: initialData?.type || "",
    personalBrand: initialData?.personalBrand || "",
    campaignBudget: initialData?.campaignBudget || "",
    currency: initialData?.currency || "USD",
    rewardRate: initialData?.rewardRate || "",
    minPayout: initialData?.minPayout || "",
    maxPayout: initialData?.maxPayout || "",
    flatFeeBonus: initialData?.flatFeeBonus || "",
    platforms: initialData?.platforms || [],
    availableContent: initialData?.availableContent || "",
    contentRequirement: initialData?.contentRequirement || "",
    startDate: initialData?.startDate || undefined,
    endDate: initialData?.endDate || undefined,
  });

  const [errors, setErrors] = useState({});
  const [showPaymentsModal, setShowPaymentsModal] = useState(false);

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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          thumbnailPreview: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeThumbnail = () => {
    setFormData((prev) => ({
      ...prev,
      thumbnailPreview: null,
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
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log("Form submitted:", formData);
    }
    setShowPaymentsModal(true);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      console.log("Form cancelled");
    }
  };

  const date = new Date()
  console.log(date);

  return (
    <div className="max-w-3xl mx-auto p-6 dark:bg-[#1E1E1E] min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Upload Thumbnail */}
        <div className="space-y-3">
          {formData.thumbnailPreview ? (
            <div className="relative border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <img
                src={formData.thumbnailPreview}
                alt="Thumbnail preview"
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("thumbnail-upload").click()
                  }
                  className="px-4 py-2 text-sm bg-gray-100 dark:bg-[#2E2E2E] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-[#2E2E2E] transition-colors"
                >
                  Change Image
                </button>
                <button
                  type="button"
                  onClick={removeThumbnail}
                  className="px-4 py-2 text-sm bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
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
            <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 sm:p-10 text-center hover:border-gray-300 dark:hover:border-gray-600 transition-colors cursor-pointer">
              <div className="flex flex-col items-center space-y-3">
                <div className="">
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("thumbnail-upload").click()
                    }
                    className="dark:bg-[#2E2E2E]  text-sm font-medium text-black dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex gap-3 px-5 py-2 bg-white rounded-lg"
                  >
                    <Upload className="w-5 h-5 text-black dark:text-gray-400" />
                    Upload thumbnail
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
            </div>
          )}
        </div>

        {/* Campaign name */}
        <div className="space-y-6">
          <label className="text-sm font-medium text-[#364152] dark:text-gray-300 mb-4 inline-block">
            Campaign name*
          </label>
          <input
            type="text"
            value={formData.campaignName}
            onChange={(e) => handleInputChange("campaignName", e.target.value)}
            placeholder="Enter campaign"
            className="w-full px-3 py-3 bg-white dark:bg-[#2E2E2E] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
          />
        </div>

        {/* Type and Personal Brand */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#364152] dark:text-gray-300 mb-4 inline-block">
              Type*
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              className="w-full px-3 py-3 bg-white dark:bg-[#2E2E2E] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
            >
              <option value="">UGC</option>
              <option value="UGC">UGC</option>
              <option value="Sponsored">Sponsored</option>
              <option value="Review">Review</option>
              <option value="Tutorial">Tutorial</option>
              <option value="Unboxing">Unboxing</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#364152] dark:text-gray-300 mb-4 inline-block">
              Personal brand*
            </label>
            <input
              type="text"
              value={formData.personalBrand}
              onChange={(e) =>
                handleInputChange("personalBrand", e.target.value)
              }
              placeholder="Personal brand"
              className="w-full px-3 py-3 bg-white dark:bg-[#2E2E2E] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
            />
          </div>
        </div>

        {/* Campaign budget */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#364152] dark:text-gray-300 mb-4 inline-block">
            Campaign budget*
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"></span>
              <input
                type="number"
                value={formData.campaignBudget}
                onChange={(e) =>
                  handleInputChange("campaignBudget", e.target.value)
                }
                placeholder="10000"
                className="w-full px-3 py-3  bg-white dark:bg-[#2E2E2E] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
              />
            </div>
            <select
              value={formData.currency}
              onChange={(e) => handleInputChange("currency", e.target.value)}
              className="px-3 py-3  bg-white dark:bg-[#2E2E2E] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>

        {/* Reward rate */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#364152] dark:text-gray-300 mb-4 inline-block">
            Reward rate* (per 1k views)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
              $
            </span>
            <input
              type="number"
              value={formData.rewardRate}
              onChange={(e) => handleInputChange("rewardRate", e.target.value)}
              placeholder="3"
              className="w-full pl-8 px-3 py-3  bg-white dark:bg-[#2E2E2E] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
            />
          </div>
        </div>

        {/* Min and Max payout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#364152] dark:text-gray-300 mb-4 flex items-center gap-2">
              Minimum payout
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
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                $
              </span>
              <input
                type="number"
                value={formData.minPayout}
                onChange={(e) => handleInputChange("minPayout", e.target.value)}
                placeholder="3"
                className="w-full pl-8 px-3 py-3  bg-white dark:bg-[#2E2E2E] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#364152] dark:text-gray-300 mb-4 flex items-center gap-2">
              Maximum payout
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
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                $
              </span>
              <input
                type="number"
                value={formData.maxPayout}
                onChange={(e) => handleInputChange("maxPayout", e.target.value)}
                placeholder="100"
                className="w-full pl-8 px-3 py-3 bg-white dark:bg-[#2E2E2E] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
              />
            </div>
          </div>
        </div>

        {/* Flat fee bonus */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#364152] dark:text-gray-300 mb-4 flex items-center gap-2">
            Flat fee bonus (optional)
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
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
              $
            </span>
            <input
              type="number"
              value={formData.flatFeeBonus}
              onChange={(e) =>
                handleInputChange("flatFeeBonus", e.target.value)
              }
              placeholder="10"
              className="w-full pl-8 px-3 py-3 bg-white dark:bg-[#2E2E2E] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
            />
          </div>
        </div>

        {/* Platform */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-[#364152] dark:text-gray-300 mb-4 inline-block">
            Platform*
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Facebook", "Instagram", "Youtube", "Tiktok"].map((platform) => (
              <label
                key={platform}
                className="flex items-center space-x-3 cursor-pointer px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#2E2E2E] hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={formData.platforms.includes(platform)}
                  onChange={(e) =>
                    handlePlatformChange(platform, e.target.checked)
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
          <label className="text-sm font-medium text-[#364152] dark:text-gray-300 mb-4 inline-block">
            Available content
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            We suggest adding your guides, raw footage, and other materials for
            creators to edit with here via a Google Drive link
          </p>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
              $
            </span>
            <input
              type="text"
              value={formData.availableContent}
              onChange={(e) =>
                handleInputChange("availableContent", e.target.value)
              }
              placeholder="3"
              className="w-full pl-8 px-3 py-3 bg-white dark:bg-[#2E2E2E] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
            />
          </div>
        </div>

        {/* Content requirement */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#364152] dark:text-gray-300 mb-4 inline-block">
            Content requirement
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            We recommend including content guidelines for users to follow.
          </p>
          <textarea
            value={formData.contentRequirement}
            onChange={(e) =>
              handleInputChange("contentRequirement", e.target.value)
            }
            placeholder="Enter campaign"
            rows={4}
            className="w-full px-3 py-3 bg-white dark:bg-[#2E2E2E] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
          />
        </div>

        {/* Campaign Duration */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-[#364152] dark:text-gray-300 mb-4 flex items-center gap-2">
            Campaign duration* (Min 30days)
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
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white dark:bg-[#2E2E2E] border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700",
                      !formData.startDate && "text-gray-500 dark:text-gray-400"
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
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white dark:bg-[#2E2E2E] border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700",
                      !formData.endDate && "text-gray-500 dark:text-gray-400"
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
            <div className="mt-3 p-4 bg-gradient-to-br from-[#003933]/5 to-[#003933]/10 dark:from-[#003933]/10 dark:to-[#003933]/20 border border-[#003933]/20 dark:border-[#003933]/30 rounded-lg">
              <p className="text-sm text-[#003933] dark:text-[#00b89f] font-semibold flex items-center gap-2">
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

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="submit"
            className="bg-[#003933] dark:bg-[#003933] text-white hover:bg-[#002822] dark:hover:bg-primary/90 transition font-medium px-6 py-4 rounded-lg"
          >
            {isEditMode ? "Update Campaign" : "Create Campaign"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-4 rounded-lg"
          >
            Cancel
          </Button>
        </div>
      </form>

      {/* dialog  */}
      <PaymentSetDialog
        showPaymentsModal={showPaymentsModal}
        setShowForm={setShowForm}
        setShowPaymentsModal={setShowPaymentsModal}
      />
    </div>
  );
};

export default CampaignForm;
