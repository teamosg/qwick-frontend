import { useState } from "react";

export function PayoutTab({ onTabChange }) {
  const [activeTab, setActiveTab] = useState("withdrawal");

  const handleTabChange = (value) => {
    setActiveTab(value);
    if (onTabChange) {
      onTabChange(value);
    }
  };

  return (
    <div className="flex items-center">
      {/* Custom tab design matching the image */}
      <div className="flex space-x-8">
        <button
          onClick={() => handleTabChange("withdrawal")}
          className={`relative pb-2 text-sm font-medium transition-colors ${
            activeTab === "withdrawal"
              ? "text-gray-900 dark:text-[#fff]"
              : "text-gray-500 hover:text-gray-700 dark:text-[#b6b6b6]"
          }`}
        >
          Withdrawals
          {activeTab === "withdrawal" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
          )}
        </button>
        <button
          onClick={() => handleTabChange("payment-method")}
          className={`relative pb-2 text-sm font-medium transition-colors ${
            activeTab === "payment-method"
              ? "text-gray-900 dark:text-[#fff]"
              : "text-gray-500 hover:text-gray-700 dark:text-[#b6b6b6]"
          }`}
        >
          Payment method
          {activeTab === "payment-method" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
          )}
        </button>
      </div>

      {/* Bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
    </div>
  );
}
