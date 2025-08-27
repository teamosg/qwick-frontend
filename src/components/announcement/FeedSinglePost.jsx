import { Heart, MessageCircle, Share } from "lucide-react";
import { useState } from "react";

export default function FeedSinglePost() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(2);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="bg-white shadow rounded-[12px] p-6 mb-8">
      {/* Post Header */}
      <div className="flex items-center space-x-3 mb-4">
        <img
          src="http://placehold.co/120x120"
          alt="Adam Smith"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex gap-4">
          <h3 className="font-semibold text-[#003933] text-lg">Adam Smith</h3>
          <p className="text-[16px]">43m</p>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-base leading-relaxed mb-3">
          Social media website template. Love that idea — I think journaling
          could really help me stay motivated. Appreciate the tip, Sam!
        </p>

        {/* Link Preview */}
        <a
          href="https://whop.com/joined/oddsjam/announcements-x5RfvG6BHgs9rP/app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 underline text-sm break-all"
        >
          https://whop.com/joined/oddsjam/announcements-x5RfvG6BHgs9rP/app/
        </a>
      </div>

      {/* Images */}
      <div className="mb-4 flex gap-3">
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop"
            alt="Abstract art"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=400&h=300&fit=crop"
            alt="Fireworks"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors group"
          >
            <Heart
              className={`w-5 h-5 ${
                liked ? "fill-red-500 text-red-500" : "group-hover:text-red-500"
              }`}
            />
            <span className="text-sm font-medium">{likeCount}k Like</span>
          </button>

          {/* Comment Button */}
          <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors group">
            <MessageCircle className="w-5 h-5 group-hover:text-blue-500" />
            <span className="text-sm font-medium">2k comment</span>
          </button>
        </div>

        {/* Share Button */}
        <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors group">
          <Share className="w-5 h-5 group-hover:text-green-500" />
          <span className="text-sm font-medium">Share</span>
        </button>
      </div>
    </div>
  );
}
