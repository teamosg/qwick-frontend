import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const ProfileBillingHistory = () => {
  const transactions = [
    {
      id: 1,
      name: "Lovable",
      amount: "$0.00",
      time: "1 month ago",
      avatar: "/image.png",
    },
    {
      id: 2,
      name: "Lovable",
      amount: "$0.00",
      time: "1 month ago",
      avatar: "/image.png",
    },
    {
      id: 3,
      name: "Lovable",
      amount: "$0.00",
      time: "1 month ago",
      avatar: "/image.png",
    },
    {
      id: 4,
      name: "Lovable",
      amount: "$0.00",
      time: "1 month ago",
      avatar: "/image.png",
    },
    {
      id: 5,
      name: "Lovable",
      amount: "$0.00",
      time: "1 month ago",
      avatar: "/image.png",
    },
    {
      id: 6,
      name: "Lovable",
      amount: "$0.00",
      time: "1 month ago",
      avatar: "/image.png",
    },
    {
      id: 7,
      name: "Lovable",
      amount: "$0.00",
      time: "1 month ago",
      avatar: "/image.png",
    },
    {
      id: 8,
      name: "Lovable",
      amount: "$0.00",
      time: "1 month ago",
      avatar: "/image.png",
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
        Billing history
      </h1>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-white" />
        <Input
          type="text"
          placeholder="Search"
          className="pl-10 pr-4 py-2 w-full rounded-lg border-gray-300 dark:bg-[#2E2E2E] dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Transaction List */}
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 sm:p-4 bg-[#f5f5f5] dark:bg-[#2E2E2E] hover:bg-gray-50 rounded-lg transition-colors"
          >
            {/* Left side - Avatar and Details */}
            <div className="flex items-center gap-4 flex-1">
              <div className="relative">
                <img
                  src={transaction.avatar}
                  className="w-10 h-10 object-cover"
                  alt=""
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-medium text-[#717171] dark:text-white text-base">
                  {transaction.name}
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#AAAAAA] dark:text-white mt-1">
                  <span>{transaction.amount}</span>
                  <span>{transaction.time}</span>
                </div>
              </div>
            </div>

            {/* Right side - Status Badge */}
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 border-green-200 rounded-full px-3 py-1 text-xs font-medium ml-4"
            >
              Paid
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileBillingHistory;
