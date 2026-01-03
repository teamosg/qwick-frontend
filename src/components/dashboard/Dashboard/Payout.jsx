import { DollarSign } from "lucide-react";
import { useState } from "react";
import PayoutData from "./PayoutData";
import { PayoutTab } from "./PayoutTab";
import { useCommunityStore } from "@/store/communityStore";
import { useGetCommunityWithdrawals } from "@/hooks/community.hook";
import { Skeleton } from "@/components/ui/skeleton";

const Payout = () => {
  const [activeTab, setActiveTab] = useState("withdrawal");
  const { selectedBrandCommunity } = useCommunityStore();
  // Using the hook here primarily for loading state check, assuming cards might eventually be dynamic
  // or simple visual consistency if data is being fetched for the page.
  const { isLoading } = useGetCommunityWithdrawals(selectedBrandCommunity?.id);

  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
  };
  return (
    <div>
      <h2 className="text-[24px] text-gray-900 dark:text-white font-semibold mb-3">
        Payout
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="p-5 shadow bg-white dark:bg-[#2E2E2E] rounded-xl">
          <div className="w-10 h-10 rounded-full bg-[#1BC285] flex items-center justify-center mb-4">
            <DollarSign color="#fff" size={24} />
          </div>
          {isLoading ? (
            <Skeleton className="h-9 w-24 mb-1" />
          ) : (
            <h2 className="text-3xl font-bold text-[#212B36] dark:text-white mb-1">
              12,489
            </h2>
          )}
          <p className="text-xs text-gray-600 dark:text-zinc-400">
            Total Balance
          </p>
        </div>
        <div className="p-5 shadow bg-white dark:bg-[#2E2E2E] rounded-xl">
          <div className="w-10 h-10 rounded-full bg-red-400 flex items-center justify-center mb-4">
            <DollarSign color="#fff" size={24} />
          </div>
          {isLoading ? (
            <Skeleton className="h-9 w-24 mb-1" />
          ) : (
            <h2 className="text-3xl font-bold text-[#212B36] dark:text-white mb-1">
              12,489
            </h2>
          )}
          <p className="text-xs text-gray-600 dark:text-zinc-400">
            Total Withdrawal
          </p>
        </div>{" "}
        <div className="p-5 shadow bg-white dark:bg-[#2E2E2E] rounded-xl">
          <div className="w-10 h-10 rounded-full bg-red-400 flex items-center justify-center mb-4">
            <DollarSign color="#fff" size={24} />
          </div>
          {isLoading ? (
            <Skeleton className="h-9 w-24 mb-1" />
          ) : (
            <h2 className="text-3xl font-bold text-[#212B36] dark:text-white mb-1">
              12,489
            </h2>
          )}
          <p className="text-xs text-gray-600 dark:text-zinc-400">
            Total Transfer
          </p>
        </div>{" "}
        <div className="p-5 shadow bg-white dark:bg-[#2E2E2E] rounded-xl">
          <div className="w-10 h-10 rounded-full bg-[#1BC285] flex items-center justify-center mb-4">
            <DollarSign color="#fff" size={24} />
          </div>
          {isLoading ? (
            <Skeleton className="h-9 w-24 mb-1" />
          ) : (
            <h2 className="text-3xl font-bold text-[#212B36] dark:text-white mb-1">
              12,489
            </h2>
          )}
          <p className="text-xs text-gray-600 dark:text-zinc-400">
            Total Cash in
          </p>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="">
            <PayoutTab onTabChange={handleTabChange} />
          </div>
          <button className="bg-[#003933] dark:bg-[#003933] text-white px-4 py-2 sm:py-4 sm:px-10 rounded-3xl sm:rounded-full hover:bg-[#002822] dark:hover:bg-primary/90 transition font-medium cursor-pointer flex gap-2">
            Top Up
          </button>
        </div>

        {/* Conditional rendering based on active tab */}
        {activeTab === "withdrawal" && <PayoutData />}
        {activeTab === "payment-method" && (
          <div className="space-y-4">
            {/* Stripe Setup Card */}
            <div className="bg-white dark:bg-[#2E2E2E] rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Stripe Logo */}
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold text-sm bg-purple-600 px-2 py-1 rounded">
                      stripe
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-[#fff]">
                      Setup Stripe
                    </h3>
                  </div>
                </div>
                <div className="text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* senangPay Setup Card */}
            <div className="bg-white dark:bg-[#2E2E2E] rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* senangPay Logo */}
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-700 dark:text-[#fff] font-semibold text-xs">
                      <div className="text-center">
                        <div>senang</div>
                        <div className="text-xs">Pay</div>
                      </div>
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-[#fff]">
                      Setup senangPay
                    </h3>
                  </div>
                </div>
                <div className="text-gray-400 dark:text-[#fff]">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Payout;
