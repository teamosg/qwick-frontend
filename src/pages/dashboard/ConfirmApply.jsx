import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Facebook,
  Instagram,
  Upload,
  X,
  Youtube,
} from "lucide-react";
import { useState } from "react";

const ConfirmApply = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [link, setLink] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleApplyClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setLink("");
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Submitting with link:", link);
    setShowPopup(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    // Handle file drop logic here
    const files = e.dataTransfer.files;
    console.log("Files dropped:", files);
  };

  return (
    <>
      <div className="p-6 text-[#717171]">
        <div className="mb-9 inline-block">
          <a
            href="#"
            className=" px-4 py-2.5 bg-[#3fa796] rounded-2xl text-white text-[16px] font-light flex gap-1.5 "
          >
            <ArrowLeft />
            Back to rewards
          </a>
        </div>
        <div className="dark:text-white dark:bg-zinc-900  p-6 rounded-xl items-center justify-center mx-auto shadow mb-6 max-w-5xl">
          <div className="mb-6">
            <img
              src="/confirm-apply.png"
              alt=""
              className="w-full h-auto object-cover mb-7 rounded-xl"
            />
            <p className="text-[#717171] text-xs mb-7 dark:text-zinc-400">
              Only views after you submit count towards payout. Submit as soon
              as you post to get paid for all of your views.
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
          <div className="flex gap-6 md:gap-0 justify-between mb-9">
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
                  <Instagram size={20} /> <Facebook size={20} />
                  <Youtube size={20} />
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
          <div className="text-center flex items-end justify-end ">
            <button
              onClick={handleApplyClick}
              className="w-sm mb-2.5 text-white bg-[#003933] dark:bg-[#3fa796] dark:hover:bg-[#0dc4a5]  text-[18px] font-semibold p-2.5 rounded-full cursor-pointer hover:bg-emerald-700  transition"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl w-full max-w-md mx-2 sm:mx-4 relative max-h-[95vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="p-4 sm:p-6">
              {/* Header */}
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1 pr-8">
                Create submission
              </h2>

              {/* Info Alert */}
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3 mb-6 flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <p className="text-sm text-orange-800 dark:text-orange-200 leading-relaxed">
                  Only views after you submit count towards payout. Submit as
                  soon as you post to get paid for all of your views.
                </p>
              </div>

              {/* Form Content */}
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Submit your social media post
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
                    Share your posts and the the original image or video below.
                    Once approved, you'll start earning rewards based on the
                    views your content generates
                  </p>
                </div>

                {/* Link Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Provide link<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Https/www"
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#3fa796] focus:border-transparent dark:bg-zinc-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm"
                  />
                </div>

                {/* Media Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Media<span className="text-red-500">*</span>
                  </label>

                  <div
                    className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center transition-colors ${
                      dragActive
                        ? "border-[#3fa796] bg-[#3fa796]/5"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center">
                      <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 dark:text-gray-500 mb-2 sm:mb-3" />
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 leading-relaxed">
                        Upload the original media file you posted (not a
                        screenshot). For videos, upload the video file. For
                        posts with multiple files, upload the first file
                      </p>
                      <button
                        type="button"
                        className="text-[#3fa796] hover:text-[#2d8574] font-medium text-xs sm:text-sm"
                      >
                        Upload Media
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#003933] hover:bg-emerald-700 dark:bg-[#3fa796] dark:hover:bg-[#0dc4a5] text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-colors text-sm sm:text-base"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmApply;
