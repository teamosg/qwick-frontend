import { Check, MessageCircle, MoveRight, User } from "lucide-react";
import { useState } from "react";

const AutomatedMessage = () => {
  const automationCards = [
    {
      id: 1,
      title: "User Joined",
      description: "Send a message when a user joins this community",
    },
    {
      id: 2,
      title: "User Left",
      description: "Send a message when a user left this community",
    },
    {
      id: 3,
      title: "Lead",
      description: "Send a message when a user becomes a lead",
    },
  ];

  // Create individual state for each automation card
  const [automationStates, setAutomationStates] = useState(
    automationCards.reduce((acc, card) => {
      acc[card.id] = { isEnabled: false, isLoading: false };
      return acc;
    }, {})
  );

  const handleEnableAutomation = async (cardId) => {
    setAutomationStates((prev) => ({
      ...prev,
      [cardId]: { ...prev[cardId], isLoading: true },
    }));

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setAutomationStates((prev) => ({
      ...prev,
      [cardId]: { isEnabled: true, isLoading: false },
    }));
  };

  const handleDisableAutomation = (cardId) => {
    setAutomationStates((prev) => ({
      ...prev,
      [cardId]: { ...prev[cardId], isEnabled: false },
    }));
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {automationCards.map((automatedCard) => {
          const cardState = automationStates[automatedCard.id];
          const { isEnabled, isLoading } = cardState;

          return (
            <div
              key={automatedCard.id}
              className="bg-white dark:dark:bg-zinc-900 rounded-xl shadow p-10 w-full mx-auto"
            >
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
                        isEnabled ? "text-[#003933]" : "text-gray-600"
                      }`}
                    />
                  </div>

                  {/* Arrow */}
                  <div
                    className={`transition-colors duration-300 ${
                      isEnabled ? "text-[#003933]" : "text-gray-300"
                    }`}
                  >
                    <MoveRight className="w-8 h-8" />
                  </div>

                  {/* Message Icon */}
                  <div
                    className={`bg-gray-100 rounded-lg p-3 flex items-center justify-center transition-all duration-300 ${
                      isEnabled ? "bg-emerald-100" : ""
                    }`}
                  >
                    <MessageCircle
                      className={`w-6 h-6 transition-colors duration-300 ${
                        isEnabled ? "text-[#003933]" : "text-gray-600"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Title and Description */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-[#003933] dark:text-white mb-3">
                  {automatedCard.title}
                </h2>
                <p className="text-[#717171] text-base leading-relaxed">
                  {automatedCard.description}
                </p>
              </div>

              {/* Status Badge */}
              {isEnabled && (
                <div className="flex justify-center mb-6">
                  <div className="bg-[#003933] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                    <Check className="w-4 h-4" />
                    <span>Automation enabled</span>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="flex justify-center">
                {!isEnabled ? (
                  <button
                    onClick={() => handleEnableAutomation(automatedCard.id)}
                    disabled={isLoading}
                    className="bg-[#003933] dark:bg-[#003933] hover:bg-[#002822] dark:hover:bg-primary/90 disabled:bg-[#003933] text-white font-medium px-8 py-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed min-w-[180px]"
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
                    onClick={() => handleDisableAutomation(automatedCard.id)}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-8 py-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
                  >
                    Disable automation
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AutomatedMessage;
