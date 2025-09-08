import { ArrowRight, Check, MessageCircle, User } from "lucide-react";
import { useState } from "react";

const AutomatedMessage = () => {
  const automationCards = [
    {
      id: 1,
      title: "User Joined",
      description: "Send a message when a user joins this community",
      icon: (
        <div className="flex items-center space-x-2">
          <User className="w-6 h-6 text-primary" />
          <ArrowRight className="w-4 h-4 text-primary" />
          <MessageCircle className="w-6 h-6 text-primary" />
        </div>
      ),
    },
    {
      id: 2,
      title: "User Left",
      description: "Send a message when a user left this community",
      icon: (
        <div className="flex items-center space-x-2">
          <User className="w-6 h-6 text-primary" />
          <ArrowRight className="w-4 h-4 text-primary" />
          <MessageCircle className="w-6 h-6 text-primary" />
        </div>
      ),
    },
    {
      id: 3,
      title: "Lead",
      description: "Send a message when a user joins this community",
      icon: (
        <div className="flex items-center space-x-2">
          <User className="w-6 h-6 text-primary" />
          <ArrowRight className="w-4 h-4 text-primary" />
          <MessageCircle className="w-6 h-6 text-primary" />
        </div>
      ),
    },
  ];

  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEnableAutomation = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsEnabled(true);
    setIsLoading(false);
  };

  const handleDisableAutomation = () => {
    setIsEnabled(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Automated Messages
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-10 max-w-md w-full mx-auto">
          {/* Icon Flow */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {/* User Icon */}
              <div
                className={`bg-gray-100 rounded-lg p-3 flex items-center justify-center transition-all duration-300 ${
                  isEnabled ? "bg-emerald-100" : ""
                }`}
              >
                <User
                  className={`w-6 h-6 transition-colors duration-300 ${
                    isEnabled ? "text-emerald-600" : "text-gray-600"
                  }`}
                />
              </div>

              {/* Arrow */}
              <div
                className={`transition-colors duration-300 ${
                  isEnabled ? "text-emerald-400" : "text-gray-300"
                }`}
              >
                <ArrowRight className="w-6 h-6" />
              </div>

              {/* Message Icon */}
              <div
                className={`bg-gray-100 rounded-lg p-3 flex items-center justify-center transition-all duration-300 ${
                  isEnabled ? "bg-emerald-100" : ""
                }`}
              >
                <MessageCircle
                  className={`w-6 h-6 transition-colors duration-300 ${
                    isEnabled ? "text-emerald-600" : "text-gray-600"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Title and Description */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-3">
              User Joined
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Send a message when a user joins
              <br />
              this community
            </p>
          </div>

          {/* Status Badge */}
          {isEnabled && (
            <div className="flex justify-center mb-6">
              <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Automation enabled</span>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-center">
            {!isEnabled ? (
              <button
                onClick={handleEnableAutomation}
                disabled={isLoading}
                className="bg-[#003933] dark:bg-[#003933] hover:bg-[#002822] dark:hover:bg-primary/90  disabled:bg-emerald-400 text-white font-medium px-8 py-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed min-w-[180px]"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Enabling...</span>
                  </div>
                ) : (
                  "Enable automation"
                )}
              </button>
            ) : (
              <button
                onClick={handleDisableAutomation}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-8 py-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
              >
                Disable automation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomatedMessage;
