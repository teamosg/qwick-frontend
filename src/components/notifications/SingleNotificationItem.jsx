import { Link } from "react-router";
import { SelectSeparator } from "../ui/select";

const SingleNotificationItem = () => {
  const posts = [
    {
      id: 1,
      user: "QTT",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      action: "posted",
      description: "Complete 100% - CPI Clipping",
      time: "Today, 05:09",
    },
    {
      id: 2,
      user: "Tyler",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      action: "NEW DEAL WITH $5 RPM",
      description: "https://whop.com/steve-larsen-and-marley-jaxx/",
      time: "Today, 05:09",
      handle: "@everyone",
    },
    {
      id: 3,
      user: "QTT",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      action: "posted",
      description: "Complete 100% - CPI Clipping",
      time: "Today, 05:09",
    },
  ];

  return (
    <div className="bg-white mb-5">
      {/* Date Header */}
      <div className="mb-2 text-sm font-medium  text-black">
        Sat, 9 Nov 2024
      </div>
      <SelectSeparator />

      {/* Posts */}

      <Link to="#">
        <div className="divide-y divide-gray-100 p-3">
          {posts.map((post) => (
            <>
              {" "}
              <div
                key={post.id}
                className="p-4 hover:bg-[#e7f5ff] transition-colors"
              >
                <div className="flex items-center justify-center space-x-3">
                  {/* Avatar */}
                  <img
                    src={post.avatar}
                    alt={`${post.user} avatar`}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-black">
                          {post.user}
                        </span>
                        <span className="text-[#6F6F6F] text-base">
                          {post.action}
                        </span>
                      </div>
                      <span className="text-xs text-[#6F6F6F]">
                        {post.time}
                      </span>
                    </div>

                    {/* Handle for Tyler's post */}
                    {post.handle && (
                      <div className="mt-1">
                        <span className="text-blue-600 text-sm">
                          {post.handle}
                        </span>
                      </div>
                    )}

                    {/* Description */}
                    <div className="mt-1">
                      {post.description.startsWith("https://") ? (
                        <a
                          href={post.description}
                          className="text-blue-600 hover:text-blue-800 text-sm break-all"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {post.description}
                        </a>
                      ) : (
                        <span className="text-[#6F6F6F] text-sm">
                          {post.description}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </Link>
      <SelectSeparator />
    </div>
  );
};

export default SingleNotificationItem;
