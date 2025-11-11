import { Button } from "@/components/ui/button";
import {
  Instagram,
  MessageCircle,
  Music,
  Plus,
  Send,
  TrendingUp,
  X,
  Youtube,
} from "lucide-react";

const ConnectedAccounts = () => {
  const accounts = [
    { name: "Discord", icon: MessageCircle },
    { name: "Telegram", icon: Send },
    { name: "TradingView", icon: TrendingUp },
    { name: "X", icon: X },
    { name: "Instagram", icon: Instagram },
    { name: "YouTube", icon: Youtube },
    { name: "TikTok", icon: Music },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center text-[#717171] dark:text-white text-[16px] mb-8 py-10 px-4 w-full shadow rounded-[24px] ">
        <p> No Accounts connected yet</p>
      </div>

      {/* Add new account section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Add new account
        </h2>

        {/* Accounts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {accounts.map((account) => (
            <Button
              key={account.name}
              variant="outline"
              className="flex items-center justify-between w-full p-4 h-12 rounded-full border-gray-300 dark:border-[#364152] dark:hover:border-[#404b5a] hover:bg-gray-50 dark:hover:bg-[#2E2E2E]"
            >
              <div className="flex items-center gap-3">
                <account.icon className="h-5 w-5 text-gray-600 dark:text-white" />
                <span className="text-gray-700 dark:text-white font-medium">
                  {account.name}
                </span>
              </div>
              <Plus className="h-4 w-4 text-gray-600 dark:text-white" />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectedAccounts;
