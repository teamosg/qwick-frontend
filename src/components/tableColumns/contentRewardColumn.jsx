import { Cell } from "recharts";

import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const contentRewardColumn = [
  {
    accessorKey: "campaign_name",
    header: "Campaign",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900 dark:text-gray-100 truncate max-w-[150px] inline-block">
        {row.original.campaign_name || `Campaign #${row.original.campaign}`}
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
      const link = row.original.tiktok_link || row.original.youtube_link || row.original.instagram_link;
      return link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-blue-500 hover:text-blue-600 transition-colors text-sm font-medium"
        >
          View <ExternalLink size={12} />
        </a>
      ) : (
        <span className="text-gray-400 italic text-xs">No link</span>
      );
    },
  },
  {
    accessorKey: "payout",
    header: "Payout",
    cell: ({ row }) => (
      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
        ${parseFloat(row.original.payout || 0).toFixed(2)}
      </span>
    ),
  },
];

export default contentRewardColumn;
