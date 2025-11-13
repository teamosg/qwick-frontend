import Comment from "@/assets/svg/Comment";
import Like from "@/assets/svg/Like";
import Photo from "@/assets/svg/Photo";
import Save from "@/assets/svg/Save";
import EmojiPicker from "emoji-picker-react";
import {
  Clock,
  Edit,
  MoreHorizontal,
  Send,
  Smile,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PostShare } from "./PostShare";

const Post = ({ post, onLike, onSave, onDelete, onEdit, onCommentSubmit }) => {
  const [commentText, setCommentText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [recentLikers, setRecentLikers] = useState(post.recentLikers || []);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        const emojiButton = document.querySelector(
          `.comment-emoji-button-${post.id}`
        );
        if (!emojiButton || !emojiButton.contains(event.target)) {
          setShowEmojiPicker(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [post.id]);

  // Initialize with sample likers if none exist
  useEffect(() => {
    if (recentLikers.length === 0 && likeCount > 0) {
      const sampleLikers = [
        {
          id: "user1",
          name: "Alice Johnson",
          avatar: "https://bundui-images.netlify.app/avatars/01.png",
        },
        {
          id: "user2",
          name: "Bob Smith",
          avatar: "https://bundui-images.netlify.app/avatars/03.png",
        },
        {
          id: "user3",
          name: "Carol Davis",
          avatar: "https://bundui-images.netlify.app/avatars/05.png",
        },
        {
          id: "user5",
          name: "David Wilson",
          avatar: "https://bundui-images.netlify.app/avatars/06.png",
        },
        {
          id: "user4",
          name: "David Wilson",
          avatar: "https://bundui-images.netlify.app/avatars/06.png",
        },
      ].slice(0, Math.min(likeCount, 4));
      setRecentLikers(sampleLikers);
    }
  }, [likeCount, recentLikers.length]);

  const dropdownItems = [
    {
      label: "Edit",
      icon: <Edit size={16} className="mr-2" />,
      action: () => onEdit(post.id),
    },
    {
      label: "Delete",
      icon: <Trash2 size={16} className="mr-2" />,
      action: () => onDelete(post.id),
    },
  ];

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() || imagePreview) {
      onCommentSubmit(post.id, {
        text: commentText,
        image: imagePreview,
      });
      setCommentText("");
      setImagePreview(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setCommentText((prev) => prev + emojiData.emoji);
  };

  const handleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
      // Remove current user from recent likers
      setRecentLikers((prev) =>
        prev.filter((liker) => liker.id !== "current-user")
      );
    } else {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
      // Add current user to recent likers (most recent first)
      const currentUser = {
        id: "current-user",
        name: "You", // or get from user context
        avatar: "https://i.pravatar.cc/150?img=5", // or get from user context
      };
      setRecentLikers((prev) => [currentUser, ...prev.slice(0, 3)]);
    }
    // Call the parent onLike function if provided
    if (onLike) {
      onLike(post.id);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow p-3 sm:p-6 mb-4 sm:mb-6">
      {/* Post Header */}
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <img
            src={post.authorImage}
            alt={post.author}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-sm sm:text-base dark:text-white truncate">
                {post.author}
              </h3>
              {/* <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full flex items-center">
                {post.postType === "group" ? (
                  <>
                    <Users size={12} className="mr-1" /> {post.group}
                  </>
                ) : (
                  <>
                    <Globe size={12} className="mr-1" /> Public
                  </>
                )}
              </span> */}
            </div>
            <div className="text-xs text-[#AAAAAA] dark:text-gray-400 flex items-center">
              <Clock size={10} className="mr-1" /> {post.time}
            </div>
          </div>
        </div>

        {/* Three-dot menu */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
          >
            <MoreHorizontal size={18} />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white dark:bg-zinc-900 rounded-md shadow-lg z-10 border border-gray-200 dark:border-zinc-700">
              <div className="py-1">
                {dropdownItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      item.action();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-3 sm:px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <p className="dark:text-gray-300 mb-3 sm:mb-4 whitespace-pre-line text-sm sm:text-base leading-relaxed">
        {post.content}
      </p>

      {/* Images - only show if images exist */}
      {post.images && post.images.length > 0 && (
        <div className="mb-3 sm:mb-4">
          {post.images.length === 1 ? (
            // Single image - responsive width
            <div className="flex justify-center">
              <div className="w-full">
                <img
                  src={post.images[0]}
                  alt="Post image"
                  className="w-full object-cover rounded-lg max-h-[450px]"
                />
              </div>
            </div>
          ) : (
            // Multiple images - responsive grid
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {post.images.map((image, index) => (
                <div key={index} className="w-full">
                  <img
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="w-full h-48 sm:h-64 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Post Stats */}
      <div className="border-t border-b border-gray-200 dark:border-gray-700 py-2 mb-3 sm:mb-4 font-semibold bg-white dark:bg-zinc-900">
        <div className="flex justify-between gap-2 sm:gap-0">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex sm:items-center sm:justify-center space-x-1 px-2 sm:px-3 py-2 sm:py-1 rounded-md cursor-pointer text-sm sm:text-base transition-colors
        ${
          isLiked
            ? "text-[#003933] dark:text-emerald-400"
            : "text-gray-500 dark:text-gray-400 hover:text-[#003933] hover:dark:text-emerald-300"
        }`}
            aria-label={isLiked ? "Liked" : "Like"}
          >
            <Like isLiked={isLiked} />
            <span className="sm:hidden">{isLiked ? "Liked" : "Like"}</span>
          </button>

          {/* Comment Button */}
          <button
            onClick={() =>
              document.getElementById(`comment-${post.id}`).focus()
            }
            className="flex cursor-pointer sm:items-center sm:justify-center space-x-1 px-2 sm:px-3 py-2 sm:py-1 rounded-md text-sm sm:text-base text-gray-500 dark:text-gray-400 hover:text-[#003933] hover:dark:text-emerald-300 transition-colors"
            aria-label="Comment"
          >
            <Comment />
          </button>

          {/* Share Button/Component */}
          <div className="sm:col-span-1">
            <PostShare />
          </div>

          {/* Save Button */}
          <button
            onClick={() => onSave(post.id)}
            className={`flex sm:items-center sm:justify-center px-2 sm:px-3 py-2 sm:py-1 rounded-md cursor-pointer text-sm sm:text-base transition-colors
        ${
          post.isSaved
            ? "text-[#003933] dark:text-emerald-400"
            : "text-gray-500 dark:text-gray-400 hover:text-[#003933] hover:dark:text-emerald-300"
        }`}
            aria-label={post.isSaved ? "Saved" : "Save"}
          >
            <Save />
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
        {post.comments.map((comment, index) => (
          <div key={index} className="flex space-x-2">
            <img
              src={comment.userImage || "https://i.pravatar.cc/150?img=3"}
              alt={comment.user}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 sm:p-3 flex-1 min-w-0">
              <div className="font-medium text-xs sm:text-sm dark:text-white truncate">
                {comment.user}
              </div>
              <div className="text-gray-700 dark:text-zinc-400 text-xs sm:text-sm break-words">
                {comment.text}
              </div>
              {comment.image && (
                <img
                  src={comment.image}
                  alt="Comment"
                  className="mt-2 rounded-lg max-h-32 sm:max-h-40 object-cover w-full"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Comment Input */}
      <form onSubmit={handleCommentSubmit} className="flex space-x-2">
        <img
          src="https://i.pravatar.cc/150?img=5"
          alt="User"
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 relative">
          <div className="relative">
            <input
              id={`comment-${post.id}`}
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg py-2 px-3 sm:px-4 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary pr-16 sm:pr-24 text-sm sm:text-base"
            />
            <div className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-gray-400 hover:text-primary p-1"
              >
                <Smile />
              </button>
              <label className="text-gray-400 hover:text-primary p-1 cursor-pointer">
                <Photo />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              <button
                type="submit"
                disabled={!commentText.trim() && !imagePreview}
                className={`p-1 ${
                  commentText.trim() || imagePreview
                    ? "text-primary"
                    : "text-gray-400"
                }`}
              >
                <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div
              className="absolute bottom-10 right-0 z-10"
              ref={emojiPickerRef}
            >
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className={`comment-emoji-button-${post.id} text-gray-400 hover:text-primary p-1`}
              >
                <Smile size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
              <div className="w-[280px] sm:w-[300px]">
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  width={280}
                  height={300}
                  previewConfig={{ showPreview: false }}
                />
              </div>
            </div>
          )}

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-2 relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="rounded-lg max-h-32 sm:max-h-40 object-cover w-full"
              />
              <button
                onClick={() => setImagePreview(null)}
                className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white rounded-full p-1"
              >
                <X size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Post;
