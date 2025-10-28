import { Card, CardContent } from "@/components/ui/card";

const DashboardContentRewardBlank = ({ onCreateReward }) => {
  const handleClick = () => {
    console.log("Button clicked!");
    console.log("onCreateReward prop:", onCreateReward);
    if (onCreateReward && typeof onCreateReward === "function") {
      onCreateReward();
    } else {
      console.error("onCreateReward is not a function or is undefined");
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-900 border-0 shadow-sm">
      <CardContent className="p-12 text-center">
        <div>
          <div className="overflow-hidden p-10">
            <h2 className="text-2xl font-bold dark:text-white mb-3.5">
              No active Content Payouts
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              You don't have any active content payouts. Create one to start
              paying out users
            </p>
          </div>
          <div className="mt-8 max-w-md text-center mx-auto">
            <button
              onClick={handleClick}
              type="button"
              className="bg-[#003933] dark:bg-[#003933] text-white px-4 py-2 sm:py-4 sm:px-10 rounded-3xl sm:rounded-full hover:bg-[#002822] dark:hover:bg-primary/90 transition font-medium cursor-pointer"
            >
              Create content payouts
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardContentRewardBlank;
