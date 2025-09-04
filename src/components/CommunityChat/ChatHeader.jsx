import { Bell, Search, Users, X } from "lucide-react";
import { useState } from "react";

export default function ChatHeader({ onSearch, searchQuery, setSearchQuery }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  // Sample users data - in a real app this would come from props or API
  const users = [
    {
      id: 1,
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/40?img=5",
      status: "online",
      role: "Admin",
    },
    {
      id: 2,
      name: "John Doe",
      avatar: "https://i.pravatar.cc/40?img=1",
      status: "online",
      role: "Member",
    },
    {
      id: 3,
      name: "Alice Johnson",
      avatar: "https://i.pravatar.cc/40?img=2",
      status: "offline",
      role: "Member",
    },
    {
      id: 4,
      name: "Bob Wilson",
      avatar: "https://i.pravatar.cc/40?img=3",
      status: "online",
      role: "Member",
    },
    {
      id: 5,
      name: "Carol Brown",
      avatar: "https://i.pravatar.cc/40?img=4",
      status: "away",
      role: "Member",
    },
    {
      id: 6,
      name: "David Lee",
      avatar: "https://i.pravatar.cc/40?img=6",
      status: "online",
      role: "Member",
    },
    {
      id: 7,
      name: "Emma Davis",
      avatar: "https://i.pravatar.cc/40?img=7",
      status: "offline",
      role: "Member",
    },
    {
      id: 8,
      name: "Frank Miller",
      avatar: "https://i.pravatar.cc/40?img=8",
      status: "online",
      role: "Member",
    },
    {
      id: 9,
      name: "Grace Taylor",
      avatar: "https://i.pravatar.cc/40?img=9",
      status: "away",
      role: "Member",
    },
    {
      id: 10,
      name: "Henry Anderson",
      avatar: "https://i.pravatar.cc/40?img=10",
      status: "online",
      role: "Member",
    },
  ];

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
    }
  };

  const handleUsersClick = () => {
    setIsUsersOpen(!isUsersOpen);
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

  const handleCloseUsers = () => {
    setIsUsersOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "online":
        return "Online";
      case "away":
        return "Away";
      case "offline":
        return "Offline";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700 px-6 py-4 relative">
      <div className="flex items-center justify-between">
        {/* Chat Title */}
        <h1 className="text-xl font-medium text-gray-900 dark:text-white">
          Chat
        </h1>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1">
          {/* Users/People Button */}
          <button
            onClick={handleUsersClick}
            className="p-2 rounded-lg hover:text-[#000000] dark:hover:text-white transition duration-300"
          >
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

      {/* Users Popup */}
      {isUsersOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Group Members ({users.length})
            </h3>
            <button
              onClick={handleCloseUsers}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Users List */}
          <div className="max-h-96 overflow-y-auto">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-zinc-900 ${getStatusColor(
                        user.status
                      )}`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {getStatusText(user.status)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {user.role === "Admin" && (
                    <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                      {user.role}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-zinc-700">
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>
                {users.filter((u) => u.status === "online").length} online
              </span>
              <span>{users.length} total members</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
