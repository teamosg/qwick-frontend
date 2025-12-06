import { Check, Image, MessageCircle, MoveRight, User } from "lucide-react";


const AutomationCard = ({ title, description }) => {
    const isEnabled = true
    const isLoading = false
    const saved = false


    return (
        <div
            className="bg-white dark:bg-zinc-900 rounded-xl shadow p-10 w-full mx-auto"
        >
            {
                isEnabled
                    ? <>
                        {/* Header with toggle */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold text-[#003933] dark:text-white">
                                {title}
                            </h2>
                            <div className="flex items-center">
                                <button
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isEnabled ? "bg-[#003933]" : "bg-gray-200"
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnabled ? "translate-x-6" : "translate-x-1"
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        <p className="text-[#717171] text-base mb-6">
                            {description}
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
                                className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#003933] dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                                placeholder="Enter your automated message..."
                            />
                        </div>

                        {/* Add Media Button */}
                        {/* <div className="mb-6">
                            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-zinc-600 dark:hover:bg-zinc-800 transition-colors">
                                <Image className="w-4 h-4" />
                                <span>Add image or videos</span>
                            </button>
                        </div> */}

                        {/* Email Checkbox */}
                        {/* <div className="mb-6">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-[#003933] border-gray-300 rounded focus:ring-[#003933]"
                                />
                                <span className="text-gray-700 dark:text-gray-300">
                                    Send email to user when triggered
                                </span>
                            </label>
                        </div> */}

                        {/* Save Button */}
                        <div className="flex justify-center">
                            <button
                                className="bg-[#003933] hover:bg-[#002822] text-white font-medium px-8 py-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-200 min-w-[120px]"
                            >
                                Save
                            </button>
                        </div>
                    </>
                    :
                    <>
                        {/* Icon Flow */}
                        <div className="flex items-center justify-center mb-8">
                            <div className="flex items-center space-x-4">
                                {/* User Icon */}
                                <div
                                    className={`bg-gray-100 rounded-lg p-3 flex items-center justify-center transition-all duration-300 ${isEnabled ? "bg-emerald-100" : ""
                                        }`}
                                >
                                    <User
                                        className={`w-6 h-6 transition-colors duration-300 ${isEnabled ? "text-[#003933]" : "text-gray-600"
                                            }`}
                                    />
                                </div>

                                {/* Arrow */}
                                <div
                                    className={`transition-colors duration-300 ${isEnabled ? "text-[#003933]" : "text-gray-300"
                                        }`}
                                >
                                    <MoveRight className="w-8 h-8" />
                                </div>

                                {/* Message Icon */}
                                <div
                                    className={`bg-gray-100 rounded-lg p-3 flex items-center justify-center transition-all duration-300 ${isEnabled ? "bg-emerald-100" : ""
                                        }`}
                                >
                                    <MessageCircle
                                        className={`w-6 h-6 transition-colors duration-300 ${isEnabled ? "text-[#003933]" : "text-gray-600"
                                            }`}
                                    />
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
                        </div>
                    </>
            }
        </div>
    );
};

export default AutomationCard;