import { MoreVertical } from "lucide-react";
import { useState } from "react";

export default function CampaignProgress() {
  const [progress, setProgress] = useState(66);
  const totalBars = 30;
  const filledBars = Math.round((progress / 100) * totalBars);

  // Calculate change vs last period
  const lastPeriodProgress = 36;
  const change = progress - lastPeriodProgress;

  // Determine color based on progress
  const getProgressColor = () => {
    if (progress >= 70) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getMessage = () => {
    if (progress >= 80)
      return "You are on track to finish the goal three days early";
    if (progress >= 60) return "You are on track to finish the goal on time";
    if (progress >= 40) return "You are slightly behind on your goal";
    return "You are behind on your goal, consider adjusting your pace";
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Progress Card */}
        <div className="bg-black rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-white text-xl font-semibold">
              Progress Indicator
            </h2>
            <button className="text-gray-400 hover:text-white transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Message */}
          <p className="text-gray-400 text-sm mb-8">{getMessage()}</p>

          {/* Progress Stats */}
          <div className="flex items-center gap-4 mb-6">
            <div className="text-white text-5xl font-bold">{progress}%</div>
            <div
              className={`px-3 py-1 rounded-full border ${
                change >= 0
                  ? "border-green-500 text-green-500"
                  : "border-red-500 text-red-500"
              } text-sm font-medium flex items-center gap-1`}
            >
              <span>{change >= 0 ? "↑" : "↓"}</span>
              <span>{Math.abs(change)}%</span>
            </div>
            <div className="text-gray-400 text-sm">vs. the last period</div>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-1">
            {Array.from({ length: totalBars }).map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-16 rounded-sm transition-all duration-300 ${
                  index < filledBars ? getProgressColor() : "bg-gray-800"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Controls */}
        {/* <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <label className="text-white text-sm font-medium block mb-3">
            Adjust Progress: {progress}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, ${
                progress >= 70
                  ? "#10b981"
                  : progress >= 50
                  ? "#3b82f6"
                  : progress >= 30
                  ? "#eab308"
                  : "#ef4444"
              } 0%, ${
                progress >= 70
                  ? "#10b981"
                  : progress >= 50
                  ? "#3b82f6"
                  : progress >= 30
                  ? "#eab308"
                  : "#ef4444"
              } ${progress}%, #374151 ${progress}%, #374151 100%)`,
            }}
          />
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div> */}
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: white;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: white;
          cursor: pointer;
          border-radius: 50%;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}
