const ToggleSwitch = ({ enabled, onToggle, disabled = false }) => (
    <button
        disabled={disabled}
        onClick={onToggle}
        className={`relative cursor-pointer disabled:cursor-progress inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#003933] focus:ring-offset-2 hover:scale-105 active:scale-95 ${enabled ? "bg-[#003933] shadow-lg" : "bg-gray-300 hover:bg-gray-400"
            }`}
    >
        <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-all duration-300 ease-in-out ${enabled ? "translate-x-6" : "translate-x-1"
                }`}
        />
    </button>
);

export default ToggleSwitch;