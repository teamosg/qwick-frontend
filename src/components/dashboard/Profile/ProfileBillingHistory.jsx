import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useGetMyWithdrawals } from "@/hooks/earnings.hook";
import { useState } from "react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileBillingHistory = () => {
  const { data: withdrawals = [], isLoading } = useGetMyWithdrawals();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = withdrawals.filter((t) =>
    t.community?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.amount?.toString().includes(searchQuery)
  );

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase();
    const commonClasses = "rounded-full px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-medium ml-2 sm:ml-4 whitespace-nowrap";

    if (s === "approved") {
      return (
        <Badge variant="outline" className={`bg-green-100/10 text-green-500 border-green-500/20 ${commonClasses}`}>
          Approved
        </Badge>
      );
    }
    if (s === "rejected") {
      return (
        <Badge variant="outline" className={`bg-red-100/10 text-red-500 border-red-500/20 ${commonClasses}`}>
          Rejected
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className={`bg-yellow-100/10 text-yellow-500 border-yellow-500/20 ${commonClasses}`}>
        Pending
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 space-y-4 sm:space-y-6">
        <Skeleton className="h-8 w-48 mb-6" />
        <Skeleton className="h-10 w-full mb-6 rounded-lg" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
        Billing history
      </h1>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
        <Input
          type="text"
          placeholder="Search by community or amount..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-lg border-gray-300 dark:border-zinc-800 dark:bg-[#2E2E2E] dark:text-white focus:border-[#003933] focus:ring-1 focus:ring-[#003933]"
        />
      </div>

      {/* Transaction List */}
      <div className="space-y-3">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 sm:p-4 bg-[#f5f5f5] dark:bg-[#2E2E2E] hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors border border-transparent dark:border-zinc-800"
            >
              {/* Left side - Icon and Details */}
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-[#003933]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#003933] font-bold text-sm">
                    {transaction.community?.charAt(0).toUpperCase()}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[#0D0D12] dark:text-white text-base truncate">
                    {transaction.community}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#717171] dark:text-zinc-400 mt-1">
                    <span className="font-medium text-[#003933] dark:text-[#00b89f]">
                      ${transaction.amount.toFixed(2)}
                    </span>
                    <span>
                      {transaction.requested_at
                        ? format(new Date(transaction.requested_at), "MMM d, yyyy • h:mm a")
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right side - Status Badge */}
              <div className="shrink-0">
                {getStatusBadge(transaction.status)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 dark:text-zinc-500">
            No billing history found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileBillingHistory;
