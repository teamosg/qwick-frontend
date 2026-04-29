import { Link, useLocation, useParams } from "react-router";

const ContentRewardNav = () => {
  const { communityUsername } = useParams();
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop() || "content-payout";

  return (
    <div className="grid max-w-xl grid-cols-1 sm:grid-cols-3 bg-transparent dark:bg-[#1E1E1E] mb-6 rounded-full gap-2 sm:gap-0">
      <Link
        to={`/dashboard/${communityUsername}/content-payout`}
        className={` py-2  rounded-full dark:bg-transparent text-center transition-colors text-sm sm:text-base ${
          currentPath === "content-payout" || currentPath === communityUsername
            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-[#e4e4e7] shadow-none "
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        Content Payout
      </Link>
      <Link
        to={`/dashboard/${communityUsername}/all-submissions`}
        className={` py-2  rounded-full text-center transition-colors text-sm sm:text-base ${
          currentPath === "all-submissions"
            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-[#e4e4e7] shadow-none"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        All Submissions
      </Link>
      <Link
        to={`/dashboard/${communityUsername}/analytics`}
        className={` py-2  rounded-full text-center transition-colors text-sm sm:text-base ${
          currentPath === "analytics"
            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-[#e4e4e7] shadow-none"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        Analytics
      </Link>
    </div>
  );
};

export default ContentRewardNav;
