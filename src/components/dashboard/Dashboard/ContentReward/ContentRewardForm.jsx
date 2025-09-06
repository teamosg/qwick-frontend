import { Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../ui/button";

const CampaignForm = () => {
  const [formData, setFormData] = useState({
    thumbnailPreview: null,
    campaignName: "",
    type: "",
    personalBrand: "",
    campaignBudget: "",
    currency: "USD",
    rewardRate: "",
    minPayout: "",
    maxPayout: "",
    flatFeeBonus: "",
    platforms: [],
    availableContent: "",
    contentRequirement: "",
  });

  const [errors, setErrors] = useState({});

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
    console.log("Form submitted:", formData);
  };

  const handleCancel = () => {
    console.log("Form cancelled");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 dark:bg-gray-900 min-h-screen">
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
                  className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
                    className="text-sm font-medium text-black dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex gap-3 px-5 py-2 bg-white rounded-full"
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
            className="w-full px-3 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
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
              className="w-full px-3 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
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
              className="w-full px-3 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
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
                className="w-full px-3 py-3  bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
              />
            </div>
            <select
              value={formData.currency}
              onChange={(e) => handleInputChange("currency", e.target.value)}
              className="w-full sm:w-20 px-3 py-3  bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
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
              className="w-full pl-8 px-3 py-3  bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
            />
          </div>
        </div>

        {/* Min and Max payout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#364152] dark:text-gray-300 mb-4 inline-block">
              Minimum payout
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
                className="w-full pl-8 px-3 py-3  bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#364152] dark:text-gray-300 mb-4 inline-block">
              Maximum payout
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
                className="w-full pl-8 px-3 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
              />
            </div>
          </div>
        </div>

        {/* Flat fee bonus */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#364152] dark:text-gray-300 mb-4 inline-block">
            Flat fee bonus
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
              className="w-full pl-8 px-3 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
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
                className="flex items-center space-x-3 cursor-pointer px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
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
            We recommended you add guides and raw footage here.
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
              className="w-full pl-8 px-3 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
            />
          </div>
        </div>

        {/* Content requirement */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#364152] dark:text-gray-300 mb-4 inline-block">
            Content requirement
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Add content guidelines for user to follow.
          </p>
          <textarea
            value={formData.contentRequirement}
            onChange={(e) =>
              handleInputChange("contentRequirement", e.target.value)
            }
            placeholder="Enter campaign"
            rows={4}
            className="w-full px-3 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
          />
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="submit"
            className="bg-[#003933] dark:bg-[#003933] text-white hover:bg-[#002822] dark:hover:bg-primary/90 transition font-medium px-6 py-4 rounded-full"
          >
            Create Campaign
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-4 rounded-full"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CampaignForm;
