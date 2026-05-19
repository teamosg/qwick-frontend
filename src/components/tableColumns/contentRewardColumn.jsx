import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";

const contentRewardColumn = [
  {
    accessorKey: "campaign_name",
    header: "Campaign",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900 dark:text-gray-100 truncate max-w-[150px] inline-block">
        {row.original.campaign_name || row.original.campaign?.name || `Campaign #${row.original.campaign}`}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status?.toLowerCase();
      const variants = {
        approved: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
        rejected: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
        pending: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800",
      };
      return (
        <Badge variant="outline" className={`${variants[status] || ""} rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize`}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => (
      <span className="text-gray-600 dark:text-gray-400 font-medium">
        {row.original.views?.toLocaleString()}
      </span>
    ),
  },
  {
    id: "submission",
    header: "Submission",
    cell: ({ row }) => {
      const stats = row.original.platform_stats || {};
      
      let platformName = "";
      let link = "";
      let icon = null;

      if (stats.youtube?.link) {
        platformName = "YouTube";
        link = stats.youtube.link;
        icon = <FaYoutube className="text-red-600 size-3.5" />;
      } else if (stats.tiktok?.link) {
        platformName = "TikTok";
        link = stats.tiktok.link;
        icon = <FaTiktok className="text-black dark:text-white size-3.5" />;
      } else if (stats.instagram?.link) {
        platformName = "Instagram";
        link = stats.instagram.link;
        icon = <FaInstagram className="text-pink-600 size-3.5" />;
      }

      return link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm font-semibold group cursor-pointer"
        >
          {icon}
          <span>{platformName}</span>
          <ExternalLink size={12} className="text-gray-400 group-hover:text-current transition-colors" />
        </a>
      ) : (
        <span className="text-gray-400 italic text-xs">No link</span>
      );
    },
  },
  {
    accessorKey: "payout",
    header: "Payout",
    cell: ({ row }) => {
      const payoutVal = row.original.payout;
      const amount = typeof payoutVal === "object" ? payoutVal?.total_earned : payoutVal;
      return (
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          ${parseFloat(amount || 0).toFixed(2)}
        </span>
      );
    },
  },
];

export default contentRewardColumn;
