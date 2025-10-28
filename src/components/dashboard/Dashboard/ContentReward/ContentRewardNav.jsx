import { Link, useLocation } from "react-router";

const ContentRewardNav = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop() || "content-payout";

  return (
    <div className="grid max-w-xl grid-cols-1 sm:grid-cols-3 bg-transparent dark:bg-gray-800 mb-6 rounded-full gap-2 sm:gap-0">
      <Link
        to="/dashboard/content-payout"
        className={` py-2  rounded-full dark:bg-transparent text-center transition-colors text-sm sm:text-base ${
          currentPath === "content-payout" || currentPath == "dashboard"
            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-[#e4e4e7] shadow-none "
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        Content Payout
      </Link>
      <Link
        to="/dashboard/my-submissions"
        className={` py-2  rounded-full text-center transition-colors text-sm sm:text-base ${
          currentPath === "my-submissions"
            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-[#e4e4e7] shadow-none"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        My submissions
      </Link>
      <Link
        to="/dashboard/analytics"
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
