import { Image } from "lucide-react";
import { useState } from "react";
import FeedSinglePost from "./FeedSinglePost";
const AnnouncementFeed = () => {
  const [postText, setPostText] = useState("");

  const handlePostSubmit = () => {
    if (postText.trim()) {
      console.log("Posting:", postText);
      setPostText("");
    }
  };
  return (
    <div>
      <h2 className="text-[24px] text-[#191919] font-semibold mb-3">
        Announcement
      </h2>
      <div className="bg-white shadow rounded-[12px] p-4 mb-8">
        <div className="flex items-center gap-6">
          {/* Profile Avatar */}
          <div className="flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>

          {/* Text Input Area */}
          <div className="flex-1 bg-[#f5f5f5] rounded-full">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Write something"
              className="w-full resize-none border-none outline-none text-gray-700 placeholder-gray-400 text-base leading-relaxed min-h-[50px] px-5 py-5"
              rows="1"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-3 ">
          <div className="flex items-center justify-between">
            {/* Media Upload Button */}
            <button className="flex items-center justify-center w-8 h-8 rounded-lg ">
              <Image className="w-6 h-6 text-[#5050fa]" />
            </button>

            {/* Post Button */}
            <button
              onClick={handlePostSubmit}
              disabled={!postText.trim()}
              className="px-8 py-2 bg-transparent border border-[#e2e2e2] hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-[#003933] text-sm font-medium rounded-lg transition-colors "
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <FeedSinglePost />
      <FeedSinglePost />
    </div>
  );
};

export default AnnouncementFeed;
