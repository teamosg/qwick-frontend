import SingleRewardItem from "@/components/contentReward/SingleRewardItem";
import { useState } from "react";
import ContentRewardForm from "./ContentRewardForm";
import ContentRewardNav from "./ContentRewardNav";
import DashboardContentRewardBlank from "./DashboardContentRewardBlank";

const DashboardContentReward = () => {
  const [hasContentRewards, setHasContentRewards] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rewards, setRewards] = useState([
    {
      id: 1,
      name: "Content Reward 1",
      description: "Description 1",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: "Content Reward 2",
      description: "Description 2",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 3,
      name: "Content Reward 3",
      description: "Description 3",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 4,
      name: "Content Reward 4",
      description: "Description 4",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

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
      {/* <div className="mb-4 p-2 bg-yellow-100 dark:bg-yellow-900 rounded text-sm">
        Debug: showForm={showForm.toString()}, hasContentRewards=
        {hasContentRewards.toString()}
      </div> */}

      {showForm ? (
        <ContentRewardForm
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      ) : hasContentRewards ? (
        <div>
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">
              Active {rewards.length} content reward
              {rewards.length !== 1 ? "s" : ""}
            </p>
            <button
              onClick={handleCreateReward}
              className="bg-[#003933] dark:bg-[#003933] text-white px-4 py-2 sm:py-4 sm:px-10 rounded-3xl sm:rounded-full hover:bg-[#002822] dark:hover:bg-primary/90 transition font-medium cursor-pointer flex gap-2"
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
