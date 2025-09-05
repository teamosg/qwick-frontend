import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";
import ContentRewardNav from "./ContentRewardNav";

const MySubmissions = () => {
  return (
    <div>
      <ContentRewardNav />
      <Card className="bg-white dark:bg-gray-900 border-0 shadow-sm">
        <CardContent className="p-12 text-center">
          <div>
            <div className="overflow-hidden p-10">
              <h2 className="text-2xl font-bold dark:text-white mb-3.5">
                No submissions yet
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                You haven't submitted any content for rewards yet. Start by
                creating a content reward campaign.
              </p>
            </div>
            <div className="mt-8 max-w-md text-center mx-auto">
              <Link
                to="/dashboard/content-reward"
                className="bg-[#003933] dark:bg-[#003933] text-white px-4 py-2 sm:py-4 sm:px-10 rounded-3xl sm:rounded-full hover:bg-[#002822] dark:hover:bg-primary/90 transition font-medium cursor-pointer"
              >
                View available rewards
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MySubmissions;
