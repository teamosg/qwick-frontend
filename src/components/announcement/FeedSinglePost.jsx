import { Heart, MessageCircle, Share } from "lucide-react";

export default function FeedSinglePost({ post, onLike }) {
  const handleLike = () => {
    onLike();
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-[12px] p-6 mb-8 border border-gray-200 dark:border-gray-700">
      {/* Post Header */}
      <div className="flex items-center space-x-3 mb-4">
        <img
          src={post.avatar}
          alt={post.author}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex gap-4">
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
            {post.author}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-[16px]">
            {post.timestamp}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-base leading-relaxed mb-3 text-gray-700 dark:text-gray-200">
          {post.content}
        </p>

        {/* Link Preview - only show if link exists */}
        {post.link && (
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline text-sm break-all"
          >
            {post.link}
          </a>
        )}
      </div>

      {/* Images - only show if images exist */}
      {post.images && post.images.length > 0 && (
        <div className="mb-4">
          {post.images.length === 1 ? (
            // Single image - centered with 50% width
            <div className="flex justify-center">
              <div className="w-1/2">
                <img
                  src={post.images[0]}
                  alt="Post image"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          ) : (
            // Multiple images - 2 per row with 50% width each
            <div className="grid grid-cols-2 gap-3">
              {post.images.map((image, index) => (
                <div key={index} className="w-full">
                  <img
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center space-x-6">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors group"
          >
            <Heart
              className={`w-5 h-5 ${
                post.isLiked
                  ? "fill-red-500 text-red-500"
                  : "group-hover:text-red-500 dark:group-hover:text-red-400"
              }`}
            />
            <span className="text-sm font-medium">{post.likes}k Like</span>
          </button>

          {/* Comment Button */}
          <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors group">
            <MessageCircle className="w-5 h-5 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
            <span className="text-sm font-medium">
              {post.comments}k comment
            </span>
          </button>
        </div>

        {/* Share Button */}
        <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors group">
          <Share className="w-5 h-5 group-hover:text-green-500 dark:group-hover:text-green-400" />
          <span className="text-sm font-medium">Share</span>
        </button>
      </div>
    </div>
  );
}
