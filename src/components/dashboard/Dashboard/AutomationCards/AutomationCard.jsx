import { Check, MessageCircle, MoveRight, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useEditCommunity } from "@/hooks/community.hook";

const AutomationCard = ({
    title,
    description,
    communityUsername,
    isEnabled,
    messageText,
    statusKey,
    textKey,
}) => {
    const [enabled, setEnabled] = useState(isEnabled);
    const [text, setText] = useState(messageText || "");
    const { mutate: editCommunity, isPending } = useEditCommunity();
    const [saved, setSaved] = useState(false);

    // Sync state with props
    useEffect(() => {
        setEnabled(isEnabled);
        setText(messageText || "");
    }, [isEnabled, messageText]);

    const handleSave = () => {
        const payload = new FormData();
        payload.append(statusKey, enabled);
        payload.append(textKey, text);

        editCommunity(
            { communityUsername, payload },
            {
                onSuccess: () => {
                    setSaved(true);
                    setTimeout(() => setSaved(false), 3000);
                },
            }
        );
    };

    const toggleEnabled = () => {
        const newStatus = !enabled;
        setEnabled(newStatus);

        // If turning off, call API to update status to false immediately
        if (!newStatus) {
            const payload = new FormData();
            payload.append(statusKey, "false");

            editCommunity(
                { communityUsername, payload },
                {
                    onSuccess: () => {
                        // Optional: Add success toast or logic if needed, but UI already reflects the change
                    },
                }
            );
        }
    };

    const handleEnableAutomation = () => {
        const payload = new FormData();
        payload.append(statusKey, "true");

        editCommunity(
            { communityUsername, payload },
            {
                onSuccess: () => {
                    setEnabled(true);
                },
            }
        );
    }

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-10 w-full mx-auto">
            {enabled ? (
                <>
                    {/* Header with toggle */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold text-[#003933] dark:text-white">
                            {title}
                        </h2>
                        <div className="flex items-center">
                            <button
                                onClick={toggleEnabled}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? "bg-[#003933]" : "bg-gray-200"
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? "translate-x-6" : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                    <p className="text-[#717171] text-base mb-6">{description}</p>

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
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#003933] dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                            placeholder="Enter your automated message..."
                        />
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleSave}
                            disabled={isPending}
                            className="bg-[#003933] hover:bg-[#002822] text-white font-medium px-8 py-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-200 min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? "Saving..." : "Save"}
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {/* Icon Flow */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="flex items-center space-x-4">
                            {/* User Icon */}
                            <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center transition-all duration-300">
                                <User className="w-6 h-6 text-gray-600" />
                            </div>

                            {/* Arrow */}
                            <div className="text-gray-300">
                                <MoveRight className="w-8 h-8" />
                            </div>

                            {/* Message Icon */}
                            <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center transition-all duration-300">
                                <MessageCircle className="w-6 h-6 text-gray-600" />
                            </div>
                        </div>
                    </div>

                    {/* Title and Description */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold text-[#003933] dark:text-white mb-3">
                            {title}
                        </h2>
                        <p className="text-[#717171] text-base leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleEnableAutomation}
                            className="bg-[#003933] dark:bg-[#003933] hover:bg-[#002822] dark:hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-200 min-w-[180px]"
                        >
                            Enable automation
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AutomationCard;