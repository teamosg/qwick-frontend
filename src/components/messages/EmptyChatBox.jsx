import React from "react";

const EmptyChatBox = () => {
  return (
    <div className="h-full flex-1 py-20 flex items-center justify-center bg-background dark:bg-background">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-qwick-gray-100 dark:bg-qwick-gray-800 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-foreground-subtle"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground dark:text-foreground mb-2">
          Select a conversation
        </h3>
        <p className="text-qwick-gray-500 dark:text-qwick-gray-400">
          Choose a chat from the list to start messaging
        </p>
      </div>
    </div>
  );
};

export default EmptyChatBox;
