import { Bell, Search, Users } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Chat Title */}
        <h1 className="text-xl font-medium text-gray-900 dark:text-white">
          Chat
        </h1>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1">
          {/* Users/People Button */}
          <button className="rounded-lg hover:text-[#000000] dark:hover:text-white transition duration-300 ">
            <Users className="w-6 h-6" />
          </button>

          {/* Search Button */}
          <button className="p-2 rounded-lg hover:text-[#000000] dark:hover:text-white ">
            <Search className="w-6 h-6" />
          </button>

          {/* Notification Bell Button */}
          <button className="p-2 rounded-lg relative hover:text-[#000000] dark:hover:text-white">
            <Bell className="w-6 h-6" />
            {/* Optional notification dot */}
            {/* <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div> */}
          </button>
        </div>
      </div>
    </div>
  );
}
