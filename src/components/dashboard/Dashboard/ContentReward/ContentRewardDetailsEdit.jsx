import { Progress } from "@/components/ui/progress";
import { CircleAlert, X } from "lucide-react";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { useParams } from "react-router-dom";
import ContentRewardForm from "./ContentRewardForm";
import ContentRewardNav from "./ContentRewardNav";

const ContentRewardDetailsEdit = () => {
  const { id } = useParams();
  const [showFormModal, setShowFormModal] = useState(false);

  // Mock data for the reward - in real app, this would come from API
  const [rewardData] = useState({
    id: id,
    thumbnailPreview: "/confirm-apply.png",
    campaignName: "Destroying 1on1's Clips",
    type: "Clipping",
    personalBrand: "Gaming Brand",
    campaignBudget: "14968.30",
    currency: "USD",
    rewardRate: "3.00",
    minPayout: "3.00",
    maxPayout: "14968.30",
    flatFeeBonus: "10",
    platforms: ["Instagram", "Facebook", "Youtube"],
    availableContent: "Gaming clips and highlights",
    contentRequirement:
      "Create engaging gaming clips that showcase 1on1 gameplay moments",
  });

  // Log the reward ID for debugging/API calls

  const handleEditClick = () => {
    setShowFormModal(true);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
  };

  const handleFormSubmit = () => {
    // Here you would typically make an API call to update the reward
    setShowFormModal(false);
    alert("Reward updated successfully!");
  };

  const handleFormCancel = () => {
    setShowFormModal(false);
  };

  return (
    <div>
      {/* Tabs Navigation */}
      <ContentRewardNav />
      <div className="p-6 text-[#717171]">
        <div className="dark:text-white dark:bg-[#1E1E1E] p-6 rounded-xl items-center justify-center mx-auto shadow mb-6 max-w-5xl bg-white">
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
          <div className="text-center flex items-end justify-end ">
            <button
              onClick={handleEditClick}
              className="w-sm mb-2.5 text-white bg-[#003933] hover:bg-[#002822] dark:hover:bg-[#0dc4a5]  text-[18px] font-semibold p-2.5 rounded-full cursor-pointer transition"
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
                initialData={rewardData}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
                isEditMode={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentRewardDetailsEdit;
