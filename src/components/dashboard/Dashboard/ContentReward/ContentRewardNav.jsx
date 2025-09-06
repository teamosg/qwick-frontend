import { Link, useLocation } from "react-router";

const ContentRewardNav = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop() || "content-reward";

  return (
    <div className="grid max-w-xl grid-cols-3 bg-transparent dark:bg-gray-800 mb-6">
      <Link
        to="/dashboard/content-reward"
        className={`px-4 py-3 rounded-full text-center transition-colors ${
          currentPath === "content-reward" || currentPath == "dashboard"
            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-[#e4e4e7] shadow-none"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        Content Reward
      </Link>
      <Link
        to="/dashboard/my-submissions"
        className={`px-4 py-3 rounded-full text-center transition-colors ${
          currentPath === "my-submissions"
            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-[#e4e4e7] shadow-none"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        My submissions
      </Link>
      <Link
        to="/dashboard/analytics"
        className={`px-4 py-3 rounded-full text-center transition-colors ${
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
