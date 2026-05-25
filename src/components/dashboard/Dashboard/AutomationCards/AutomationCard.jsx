import { Check, MessageCircle, MoveRight, User, Loader2 } from "lucide-react";
import { useRef } from "react";
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
    const textRef = useRef(null);
    const { mutate: editCommunity, isPending } = useEditCommunity();

    const handleSave = () => {
        const payload = new FormData();
        // Since we are saving, we assume the user wants it enabled or we keep current status
        // But usually saving text implies keeping it enabled
        payload.append(statusKey, isEnabled);
        payload.append(textKey, textRef.current.value);

        editCommunity({ communityUsername, payload });
    };

    const toggleEnabled = () => {
        const newStatus = !isEnabled;
        const payload = new FormData();
        payload.append(statusKey, newStatus);

        editCommunity({ communityUsername, payload });
    };

    const handleEnableAutomation = () => {
        const payload = new FormData();
        payload.append(statusKey, "true");

        editCommunity({ communityUsername, payload });
    }

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 p-5 sm:p-6 md:p-8 w-full mx-auto relative overflow-hidden">
            {isPending && (
                <div className="absolute inset-0 bg-white/50 dark:bg-zinc-900/50 flex items-center justify-center z-10 rounded-xl">
                    <Loader2 className="w-8 h-8 animate-spin text-foreground-strong dark:text-white" />
                </div>
            )}
            {isEnabled ? (
                <>
                    {/* Header with toggle */}
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground-strong dark:text-white">
                            {title}
                        </h2>
                        <div className="flex items-center">
                            <button
                                onClick={toggleEnabled}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isEnabled ? "bg-foreground-strong" : "bg-gray-200"
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnabled ? "translate-x-6" : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                    <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mb-6 leading-relaxed">
                        {description}
                    </p>

                    <div className="mb-6">
                        <textarea
                            key={messageText} // Re-render when data arrives
                            ref={textRef}
                            defaultValue={messageText || ""}
                            className="w-full h-32 p-3 sm:p-4 border border-gray-200 dark:border-zinc-800 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-ring dark:bg-zinc-800 dark:text-white placeholder-gray-400 text-sm sm:text-base"
                            placeholder="Enter your automated message..."
                        />
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-center sm:justify-end">
                        <button
                            onClick={handleSave}
                            disabled={isPending}
                            className="w-full sm:w-auto bg-foreground-strong hover:bg-foreground text-white font-semibold px-8 py-3 rounded-full transition-all duration-200 shadow-md shadow-foreground-strong/10 min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                            {isPending ? "Saving..." : "Save Changes"}
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
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground-strong dark:text-white mb-2">
                            {title}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed px-4">
                            {description}
                        </p>
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleEnableAutomation}
                            className="w-full sm:w-auto bg-foreground-strong hover:bg-foreground text-white font-semibold px-10 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-foreground-strong/10 min-w-[200px] text-sm sm:text-base"
                        >
                            Enable Automation
                        </button>
                    </div>
                </>
            )
            }
        </div >
    );
};

export default AutomationCard;