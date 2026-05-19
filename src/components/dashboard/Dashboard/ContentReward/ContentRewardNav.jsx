import { Link, useLocation, useParams } from "react-router";

const ContentRewardNav = () => {
  const { communityUsername } = useParams();
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop() || "content-payout";

  return (
    <div className="flex flex-nowrap overflow-x-auto sm:grid sm:grid-cols-3 max-w-2xl bg-gray-100/50 dark:bg-zinc-900/50 p-1 mb-6 rounded-2xl sm:rounded-full gap-1 no-scrollbar border border-gray-200/50 dark:border-zinc-800/50">
      <Link
        to={`/dashboard/${communityUsername}/content-payout`}
        className={`px-4 py-2 rounded-xl sm:rounded-full text-center transition-all text-xs sm:text-sm font-medium whitespace-nowrap flex-shrink-0 ${
          currentPath === "content-payout" || currentPath === communityUsername
            ? "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-zinc-700"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-zinc-800/50"
        }`}
      >
        My Campaigns
      </Link>
      <Link
        to={`/dashboard/${communityUsername}/all-submissions`}
        className={`px-4 py-2 rounded-xl sm:rounded-full text-center transition-all text-xs sm:text-sm font-medium whitespace-nowrap flex-shrink-0 ${
          currentPath === "all-submissions"
            ? "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-zinc-700"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-zinc-800/50"
        }`}
      >
        All Submissions
      </Link>
      <Link
        to={`/dashboard/${communityUsername}/analytics`}
        className={`px-4 py-2 rounded-xl sm:rounded-full text-center transition-all text-xs sm:text-sm font-medium whitespace-nowrap flex-shrink-0 ${
          currentPath === "analytics"
            ? "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-zinc-700"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-zinc-800/50"
        }`}
      >
        Analytics
      </Link>
    </div>
  );
};

export default ContentRewardNav;
