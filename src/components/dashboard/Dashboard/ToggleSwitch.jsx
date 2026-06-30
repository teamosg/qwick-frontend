import { Loader2 } from "lucide-react";

const ToggleSwitch = ({ enabled, onToggle, disabled = false }) => (
    <button
        disabled={disabled}
        onClick={onToggle}
        className={`relative cursor-pointer disabled:cursor-not-allowed inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${enabled ? "bg-foreground-strong shadow-lg" : "bg-muted hover:bg-muted"
            } ${disabled ? "opacity-60 grayscale-[0.5]" : "hover:scale-105 active:scale-95"}`}
    >
        <span
            className={`flex items-center justify-center h-4 w-4 transform rounded-full bg-white shadow-md transition-all duration-300 ease-in-out ${enabled ? "translate-x-6" : "translate-x-1"
                }`}
        >
            {disabled && <Loader2 className="w-2.5 h-2.5 animate-spin text-foreground-strong" />}
        </span>
    </button>
);

export default ToggleSwitch;