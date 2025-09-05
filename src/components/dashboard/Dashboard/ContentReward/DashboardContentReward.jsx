import SingleRewardItem from "@/components/contentReward/SingleRewardItem";
import { useState } from "react";
import ContentRewardForm from "./ContentRewardForm";
import ContentRewardNav from "./ContentRewardNav";
import DashboardContentRewardBlank from "./DashboardContentRewardBlank";

const DashboardContentReward = () => {
  const [hasContentRewards, setHasContentRewards] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [rewards, setRewards] = useState([]);

  const handleCreateReward = () => {
    console.log("handleCreateReward called!");
    console.log("Current showForm state:", showForm);
    setShowForm(true);
    console.log("setShowForm(true) called");
  };

  const handleFormSubmit = (formData) => {
    // Add the new reward to the list
    const newReward = {
      id: Date.now(), // Simple ID generation
      ...formData,
      createdAt: new Date().toISOString(),
      status: "active",
    };

    setRewards((prev) => [...prev, newReward]);
    setHasContentRewards(true);
    setShowForm(false);

    // You can also send this data to your API here
    console.log("New reward created:", newReward);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="">
      {/* Tabs Navigation */}
      <ContentRewardNav />

      {/* Debug State */}
      <div className="mb-4 p-2 bg-yellow-100 dark:bg-yellow-900 rounded text-sm">
        Debug: showForm={showForm.toString()}, hasContentRewards=
        {hasContentRewards.toString()}
      </div>

      {showForm ? (
        <ContentRewardForm
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      ) : hasContentRewards ? (
        <div>
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">
              You have {rewards.length} active content reward
              {rewards.length !== 1 ? "s" : ""}
            </p>
            <button
              onClick={handleCreateReward}
              className="bg-[#003933] dark:bg-[#003933] text-white px-4 py-2 rounded-lg hover:bg-[#002822] dark:hover:bg-primary/90 transition font-medium"
            >
              Create New Reward
            </button>
          </div>
          {rewards.map((reward) => (
            <SingleRewardItem key={reward.id} reward={reward} />
          ))}
        </div>
      ) : (
        <DashboardContentRewardBlank onCreateReward={handleCreateReward} />
      )}
    </div>
  );
};

export default DashboardContentReward;
