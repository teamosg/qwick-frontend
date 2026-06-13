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
    <Card className="bg-white dark:bg-zinc-900 border-0 shadow-sm rounded-2xl sm:rounded-3xl overflow-hidden">
      <CardContent className="p-6 sm:p-12 text-center">
        <div className="py-4">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
              No Active Campaigns
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xs sm:max-w-md mx-auto text-sm sm:text-base leading-relaxed">
              You haven’t created a campaign yet. Start one to reward your users.
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleClick}
              type="button"
              className="w-full sm:w-auto bg-foreground-strong dark:bg-accent text-white px-6 py-3.5 sm:px-10 sm:py-4 rounded-full hover:bg-foreground dark:hover:bg-accent/80 transition-all font-semibold text-sm sm:text-base shadow-lg shadow-foreground-strong/10 cursor-pointer"
            >
              Create Campaign
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardContentRewardBlank;
