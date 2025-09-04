import { Bell, Search, Users, X } from "lucide-react";
import { useState } from "react";

export default function ChatHeader({ onSearch, searchQuery, setSearchQuery }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    onSearch("");
  };

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

          {/* Search Button/Input */}
          {isSearchOpen ? (
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-zinc-800 rounded-lg px-3 py-1">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search messages..."
                className="bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 w-48"
                autoFocus
              />
              <button
                onClick={handleCloseSearch}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleSearchClick}
              className="p-2 rounded-lg hover:text-[#000000] dark:hover:text-white"
            >
              <Search className="w-6 h-6" />
            </button>
          )}

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
