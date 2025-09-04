import { Progress } from "@/components/ui/progress";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";

import { CircleAlert, X } from "lucide-react";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const ContentRewardApply = () => {
  const [files, setFiles] = useState();
  const handleDrop = (files) => {
    console.log(files);
    setFiles(files);
  };

  const [showPopup, setShowPopup] = useState(false);

  // Separate state for each social media platform
  const [formData, setFormData] = useState({
    youtube: "",
    instagram: "",
    tiktok: "",
    linkedin: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApplyClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setFormData({
      youtube: "",
      instagram: "",
      tiktok: "",
      linkedin: "",
    });
    setErrors({});
    setIsSubmitting(false);
  };

  const handleInputChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      [platform]: value,
    }));

    // Clear error when user starts typing
    if (errors[platform]) {
      setErrors((prev) => ({
        ...prev,
        [platform]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Check if at least one platform has a link
    const hasAnyLink = Object.values(formData).some(
      (link) => link.trim() !== ""
    );
    if (!hasAnyLink) {
      newErrors.general = "Please provide at least one social media link";
    }

    // Validate individual links (basic URL validation)
    Object.entries(formData).forEach(([platform, link]) => {
      if (link.trim() !== "" && !isValidUrl(link)) {
        newErrors[platform] = "Please enter a valid URL";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Submitting with links:", formData);

      // Reset form and close popup
      handleClosePopup();

      // You could add a success message here
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      setErrors({ general: "Failed to submit application. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  //   const handleDrop = (e) => {
  //     e.preventDefault();
  //     setDragActive(false);
  //     // Handle file drop logic here
  //     const files = e.dataTransfer.files;
  //     console.log("Files dropped:", files);
  //   };

  return (
    <>
      <div className="p-6">
        <div className="dark:text-white dark:bg-zinc-900  p-6 rounded-xl items-center justify-center mx-auto shadow mb-6 max-w-5xl">
          <div className="mb-6">
            <img
              src="/confirm-apply.png"
              alt=""
              className="w-full h-auto object-cover mb-7 rounded-xl"
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
              <h4 className="text-[#090003] text-sm mb-2.5 dark:text-white">
                PAID OUT
              </h4>
              <p className="text-[#717171] text-xs flex justify-between dark:text-zinc-400">
                <span className=""> $1673.18 of $14968.30</span> <span>7%</span>
              </p>
            </div>
            <Progress value={7} indicatorColor="red" className="mb-3.5" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:flex sm:justify-between mb-9">
            <div>
              <p className="text-[#090003] text-sm mb-1 font-semibold dark:text-white">
                Reward
              </p>
              <p className="text-[#717171] text-sm dark:text-zinc-400">
                $3.00/1k
              </p>
            </div>
            <div>
              <p className="text-[#090003] text-sm mb-1 font-semibold dark:text-white">
                Type
              </p>
              <p className="text-[#717171] text-sm dark:text-zinc-400">
                Clipping
              </p>
            </div>
            <div>
              <p className="text-[#090003] text-sm mb-1 font-semibold dark:text-white">
                Clipping
              </p>
              <p className="text-[#717171] text-sm dark:text-zinc-400">
                $3.00/1k
              </p>
            </div>
            <div>
              <p className="text-[#090003] text-sm mb-1 font-semibold dark:text-white">
                Maximum Payout
              </p>
              <p className="text-[#717171] text-sm dark:text-zinc-400">
                $3.00/1k
              </p>
            </div>
            <div>
              <p className="text-[#090003] text-sm mb-1 font-semibold  dark:text-white">
                Platforms
              </p>
              <p className="text-[#003933] text-sm">
                <span className="flex gap-2 dark:text-zinc-400">
                  <FaInstagram size={20} /> <FaFacebook size={20} />
                  <FaYoutube size={20} />
                </span>
              </p>
            </div>
            <div>
              <p className="text-[#090003] text-sm mb-1 font-semibold dark:text-white">
                Category
              </p>
              <p className="text-[#717171] text-sm dark:text-zinc-400">
                $3.00/1k
              </p>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={handleApplyClick}
              className="block text-white bg-[#003933] dark:bg-[#3fa796] dark:hover:bg-[#0dc4a5]  text-[18px] font-semibold p-2.5 rounded-full cursor-pointer hover:bg-emerald-700  transition  w-full "
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl w-full max-w-3xl mx-auto relative overflow-y-auto max-h-[90vh] sm:p-6 p-4">
            {/* Close Button */}
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="space-y-6 mt-2 sm:mt-0">
              {/* Header */}
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create submission
              </h2>

              {/* General Error Message */}
              {errors.general && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    {errors.general}
                  </p>
                </div>
              )}

              {/* Info Alert */}
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <p className="text-sm text-orange-800 dark:text-orange-200 leading-relaxed">
                  Only views after you submit count towards payout. Submit as
                  soon as you post to get paid for all of your views.
                </p>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Submit your social media post
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-zinc-400">
                    Share your posts and the original image or video below. Once
                    approved, you'll start earning rewards based on the views
                    your content generates.
                  </p>
                </div>

                {/* Link Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Provide YouTube link
                    </label>
                    <input
                      type="text"
                      value={formData.youtube}
                      onChange={(e) =>
                        handleInputChange("youtube", e.target.value)
                      }
                      placeholder="https://www.youtube.com/watch?v=..."
                      className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#3fa796] focus:border-transparent dark:bg-zinc-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                        errors.youtube
                          ? "border-red-300 dark:border-red-600"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    />
                    {errors.youtube && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.youtube}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Provide Instagram link
                    </label>
                    <input
                      type="text"
                      value={formData.instagram}
                      onChange={(e) =>
                        handleInputChange("instagram", e.target.value)
                      }
                      placeholder="https://www.instagram.com/p/..."
                      className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#3fa796] focus:border-transparent dark:bg-zinc-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                        errors.instagram
                          ? "border-red-300 dark:border-red-600"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    />
                    {errors.instagram && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.instagram}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Provide TikTok link
                    </label>
                    <input
                      type="text"
                      value={formData.tiktok}
                      onChange={(e) =>
                        handleInputChange("tiktok", e.target.value)
                      }
                      placeholder="https://www.tiktok.com/@user/video/..."
                      className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#3fa796] focus:border-transparent dark:bg-zinc-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                        errors.tiktok
                          ? "border-red-300 dark:border-red-600"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    />
                    {errors.tiktok && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.tiktok}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Provide LinkedIn link
                    </label>
                    <input
                      type="text"
                      value={formData.linkedin}
                      onChange={(e) =>
                        handleInputChange("linkedin", e.target.value)
                      }
                      placeholder="https://www.linkedin.com/posts/..."
                      className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#3fa796] focus:border-transparent dark:bg-zinc-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                        errors.linkedin
                          ? "border-red-300 dark:border-red-600"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    />
                    {errors.linkedin && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.linkedin}
                      </p>
                    )}
                  </div>
                </div>

                {/* Media Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Media<span className="text-red-500">*</span>
                  </label>

                  <div
                    className="border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-colors border-[#003933] dark:border-gray-600"
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Upload the original media file you posted (not a
                        screenshot). For videos, upload the video file. For
                        posts with multiple files, upload the first file.
                      </p>
                      <Dropzone
                        maxFiles={3}
                        onDrop={handleDrop}
                        onError={console.error}
                        src={files}
                        className="border-0"
                      >
                        <DropzoneEmptyState />
                        <DropzoneContent />
                      </Dropzone>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="block w-full bg-emerald-800 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-full text-center transition-colors"
                >
                  {isSubmitting ? "Submitting..." : "Apply"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContentRewardApply;
