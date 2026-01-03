import { useState } from "react";
import PayoutData from "./PayoutData";
import { PayoutTab } from "./PayoutTab";
import CampaignBudgets from "./CampaignBudgets";

const Payout = () => {
  const [activeTab, setActiveTab] = useState("withdrawal");

  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
  };
  return (
    <div>
      <h2 className="text-[24px] text-gray-900 dark:text-white font-semibold mb-3">
        Payout
      </h2>

      <CampaignBudgets />

      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="">
            <p
              className={`relative pb-2 text-sm font-medium transition-colorswithdrawal text-gray-900 dark:text-[#fff]`}
            >
              Withdrawals
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></span>
            </p>

            {/* <PayoutTab onTabChange={handleTabChange} /> */}
          </div>
          {/* <button className="bg-[#003933] dark:bg-[#003933] text-white px-4 py-2 sm:py-4 sm:px-10 rounded-3xl sm:rounded-full hover:bg-[#002822] dark:hover:bg-primary/90 transition font-medium cursor-pointer flex gap-2">
            Top Up
          </button> */}
        </div>

        <PayoutData />


        {/* Conditional rendering based on active tab */}
        {/* {activeTab === "withdrawal" && <PayoutData />}
        {activeTab === "payment-method" && (
          <div className="space-y-4"> */}
        {/* Stripe Setup Card */}
        {/* <div className="bg-white dark:bg-[#2E2E2E] rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4"> */}
        {/* Stripe Logo */}
        {/* <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
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
            </div> */}

        {/* senangPay Setup Card */}
        {/* <div className="bg-white dark:bg-[#2E2E2E] rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4"> */}
        {/* senangPay Logo */}
        {/* <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
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
        )} */}
      </div>
    </div>
  );
};
export default Payout;
