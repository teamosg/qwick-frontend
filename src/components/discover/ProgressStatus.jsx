import React from "react";

const ProgressStatus = ({ progress = 0 }) => {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  // Each bar represents 20%
  const filledBars = Math.floor(clampedProgress / 20);
  const partialFill = (clampedProgress % 20) / 20; // value between 0–1

  return (
    <div className="grid grid-cols-5 gap-3 w-full">
      {[...Array(5)].map((_, index) => {
        const isFilled = index < filledBars;
        const isPartial = index === filledBars && partialFill > 0;

        return (
          <div
            key={index}
            className="relative  h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden"
          >
            {(isFilled || isPartial) && (
              <div
                className="absolute top-0 left-0 h-full hover:bg-[#002822] bg-[#003933] transition-all duration-300"
                style={{
                  width: isFilled ? "100%" : `${partialFill * 100}%`,
                }}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressStatus;
