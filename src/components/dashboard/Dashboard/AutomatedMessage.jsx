import { Check, Image, MessageCircle, MoveRight, User } from "lucide-react";
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
      acc[card.id] = {
        isEnabled: false,
        isLoading: false,
        message:
          "Hey {recipient_name}! We are stoked to have you as part of our community. If there's anything we can help you with, don't hesitate to reach out!",
        sendEmail: false,
        saved: false,
      };
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
      [cardId]: { ...prev[cardId], isEnabled: true, isLoading: false },
    }));
  };

  const handleDisableAutomation = (cardId) => {
    setAutomationStates((prev) => ({
      ...prev,
      [cardId]: { ...prev[cardId], isEnabled: false, saved: false },
    }));
  };

  const handleMessageChange = (cardId, message) => {
    setAutomationStates((prev) => ({
      ...prev,
      [cardId]: { ...prev[cardId], message, saved: false },
    }));
  };

  const handleEmailToggle = (cardId) => {
    setAutomationStates((prev) => ({
      ...prev,
      [cardId]: {
        ...prev[cardId],
        sendEmail: !prev[cardId].sendEmail,
        saved: false,
      },
    }));
  };

  const handleSave = async (cardId) => {
    // Simulate API call for saving
    await new Promise((resolve) => setTimeout(resolve, 500));

    setAutomationStates((prev) => ({
      ...prev,
      [cardId]: { ...prev[cardId], saved: true },
    }));

    // Auto-hide the success message after 3 seconds
    setTimeout(() => {
      setAutomationStates((prev) => ({
        ...prev,
        [cardId]: { ...prev[cardId], saved: false },
      }));
    }, 3000);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {automationCards.map((automatedCard) => {
          const cardState = automationStates[automatedCard.id];
          const { isEnabled, isLoading, message, sendEmail, saved } = cardState;

          return (
            <div
              key={automatedCard.id}
              className="bg-white dark:bg-zinc-900 rounded-xl shadow p-10 w-full mx-auto"
            >
              {/* Check if this is User Joined card (id: 1) and it's enabled */}
              {automatedCard.id === 1 && isEnabled ? (
                // Configuration view for User Joined only
                <>
                  {/* Header with toggle */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-[#003933] dark:text-white">
                      {automatedCard.title}
                    </h2>
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          handleDisableAutomation(automatedCard.id)
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          isEnabled ? "bg-[#003933]" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            isEnabled ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <p className="text-[#717171] text-base mb-6">
                    {automatedCard.description}
                  </p>

                  {/* Success Message */}
                  {saved && (
                    <div className="flex justify-center mb-6">
                      <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                        <Check className="w-4 h-4" />
                        <span>Settings saved successfully!</span>
                      </div>
                    </div>
                  )}

                  {/* Message Text Area */}
                  <div className="mb-6">
                    <textarea
                      value={message}
                      onChange={(e) =>
                        handleMessageChange(automatedCard.id, e.target.value)
                      }
                      className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#003933] dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                      placeholder="Enter your automated message..."
                    />
                  </div>

                  {/* Add Media Button */}
                  <div className="mb-6">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-zinc-600 dark:hover:bg-zinc-800 transition-colors">
                      <Image className="w-4 h-4" />
                      <span>Add image or videos</span>
                    </button>
                  </div>

                  {/* Email Checkbox */}
                  <div className="mb-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sendEmail}
                        onChange={() => handleEmailToggle(automatedCard.id)}
                        className="w-4 h-4 text-[#003933] border-gray-300 rounded focus:ring-[#003933]"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        Send email to user when triggered
                      </span>
                    </label>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleSave(automatedCard.id)}
                      className="bg-[#003933] hover:bg-[#002822] text-white font-medium px-8 py-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-200 min-w-[120px]"
                    >
                      Save
                    </button>
                  </div>
                </>
              ) : (
                // Default view for all cards (including User Joined when disabled)
                <>
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

                  {/* Status Badge for enabled cards */}
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
                        onClick={() =>
                          handleDisableAutomation(automatedCard.id)
                        }
                        className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-8 py-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
                      >
                        Disable automation
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AutomatedMessage;
