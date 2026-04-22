import { AlertCircle, CheckCircle2, X } from "lucide-react";

/**
 * CommonAlert Component
 * Displays a styled alert message with optional child errors list.
 * 
 * @param {Object} props
 * @param {Object} props.alert - { type: 'success' | 'error', message: string, errors: Object }
 * @param {Function} props.onClose - Function to clear the alert
 */
const CommonAlert = ({ alert, onClose }) => {
    if (!alert) return null;

    const { type, message, errors } = alert;
    const isSuccess = type === "success";

    return (
        <div
            className={`relative w-full p-4 rounded-xl border flex items-start gap-3 transition-all animate-in fade-in slide-in-from-top-2 duration-300 ${isSuccess
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400"
                    : "bg-red-50 border-red-200 text-red-800 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-400"
                }`}
        >
            <div className="mt-0.5">
                {isSuccess ? (
                    <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                    <AlertCircle className="size-5 text-red-600 dark:text-red-400" />
                )}
            </div>

            <div className="flex-1 space-y-1">
                <h5 className="font-semibold leading-none tracking-tight">
                    {message}
                </h5>

                {errors && (
                    <div className="text-sm opacity-90">
                        {typeof errors === "object" ? (
                            <ul className="list-disc list-inside space-y-0.5">
                                {Object.entries(errors).map(([key, value]) => (
                                    <li key={key}>
                                        <span className="capitalize">{key.replace(/_/g, ' ')}</span>: {
                                            Array.isArray(value) ? value.join(", ") : value
                                        }
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>{errors}</p>
                        )}
                    </div>
                )}
            </div>

            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute right-2 top-2 p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                    <X className="size-4" />
                </button>
            )}
        </div>
    );
};

export default CommonAlert;
