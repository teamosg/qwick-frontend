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
    <div className="bg-card border-b border-border px-6 py-4 relative">
      <div className="flex items-center justify-between">
        {/* Chat Title */}
        <h1 className="text-xl font-medium text-foreground-strong">
          Chat
        </h1>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1">
          {/* Users/People Button */}
          {/* <button
            onClick={handleUsersClick}
            className="p-2 rounded-lg hover:text-black dark:hover:text-white transition duration-300"
          >
            <Users className="w-6 h-6" />
          </button> */}

          {/* Search Button/Input */}
          {/* {isSearchOpen ? (
            <div className="flex items-center space-x-2 bg-secondary rounded-lg px-3 py-1">
              <Search className="w-4 h-4 text-foreground-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search messages..."
                className="bg-transparent border-none outline-none text-sm text-foreground placeholder-foreground-muted w-48"
                autoFocus
              />
              <button
                onClick={handleCloseSearch}
                className="text-foreground-muted hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleSearchClick}
              className="p-2 rounded-lg hover:text-black dark:hover:text-white"
            >
              <Search className="w-6 h-6" />
            </button>
          )} */}

          {/* Notification Bell Button */}
          {/* <button className="p-2 rounded-lg relative hover:text-[#000000] dark:hover:text-white">
            <Bell className="w-6 h-6" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          </button> */}
        </div>
      </div>

      {/* Users Popup */}
      {isUsersOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-card rounded-lg shadow-lg border border-border z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground-strong">
              Group Members ({users.length})
            </h3>
            <button
              onClick={handleCloseUsers}
              className="text-foreground-muted hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Users List */}
          <div className="max-h-96 overflow-y-auto">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(
                        user.status
                      )}`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground-strong">
                      {user.name}
                    </p>
                    <p className="text-xs text-foreground-muted">
                      {getStatusText(user.status)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {user.role === "Admin" && (
                    <span className="px-2 py-1 text-xs bg-secondary text-primary rounded-full">
                      {user.role}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between text-sm text-foreground-muted">
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
