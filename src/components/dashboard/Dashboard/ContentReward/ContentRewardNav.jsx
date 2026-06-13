import { Link, useLocation, useParams } from "react-router";

const ContentRewardNav = () => {
  const { communityUsername } = useParams();
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop() || "content-payout";

  return (
    <div className="flex flex-nowrap overflow-x-auto sm:grid sm:grid-cols-3 max-w-2xl bg-accent/50 dark:bg-accent/50 p-1 mb-6 rounded-2xl sm:rounded-full gap-1 no-scrollbar border border-border/50 dark:border-border/50">
      <Link
        to={`/dashboard/${communityUsername}/content-payout`}
        className={`px-4 py-2 rounded-xl sm:rounded-full text-center transition-all text-xs sm:text-sm font-medium whitespace-nowrap flex-shrink-0 ${
          currentPath === "content-payout" || currentPath === communityUsername
            ? "bg-card dark:bg-card text-foreground dark:text-foreground shadow-sm border border-border dark:border-border"
            : "text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground hover:bg-card/50 dark:hover:bg-accent/50"
        }`}
      >
        My Campaigns
      </Link>
      <Link
        to={`/dashboard/${communityUsername}/all-submissions`}
        className={`px-4 py-2 rounded-xl sm:rounded-full text-center transition-all text-xs sm:text-sm font-medium whitespace-nowrap flex-shrink-0 ${
          currentPath === "all-submissions"
            ? "bg-card dark:bg-card text-foreground dark:text-foreground shadow-sm border border-border dark:border-border"
            : "text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground hover:bg-card/50 dark:hover:bg-accent/50"
        }`}
      >
        All Submissions
      </Link>
      <Link
        to={`/dashboard/${communityUsername}/analytics`}
        className={`px-4 py-2 rounded-xl sm:rounded-full text-center transition-all text-xs sm:text-sm font-medium whitespace-nowrap flex-shrink-0 ${
          currentPath === "analytics"
            ? "bg-card dark:bg-card text-foreground dark:text-foreground shadow-sm border border-border dark:border-border"
            : "text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground hover:bg-card/50 dark:hover:bg-accent/50"
        }`}
      >
        Analytics
      </Link>
    </div>
  );
};

export default ContentRewardNav;
