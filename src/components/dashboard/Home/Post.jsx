import EmojiPicker from "emoji-picker-react";
import {
  Bookmark,
  Clock,
  Edit,
  Image as ImageIcon,
  MessageSquare,
  MoreHorizontal,
  Send,
  Smile,
  ThumbsUp,
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
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 mb-6">
      {/* Post Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={post.authorImage}
            alt={post.author}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-base dark:text-white">
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
              <Clock size={12} className="mr-1" /> {post.time}
            </div>
          </div>
        </div>

        {/* Three-dot menu */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <MoreHorizontal size={20} />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-md shadow-lg z-10 border border-gray-200 dark:border-zinc-700">
              <div className="py-1">
                {dropdownItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      item.action();
                      setShowDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
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
      <p className="dark:text-gray-300 mb-4 whitespace-pre-line">
        {post.content}
      </p>

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

      {/* Post Stats */}
      <div className="text-sm flex justify-between dark:text-gray-400 mb-4  font-semibold">
        <div class="*:border-background flex justify-center -space-x-2 *:border-2">
          {recentLikers.slice(0, 4).map((liker) => (
            <span
              key={liker.id}
              data-slot="avatar"
              class="relative flex shrink-0 overflow-hidden rounded-full size-8"
            >
              <img
                alt={`${liker.name} avatar`}
                src={liker.avatar}
                className="w-full h-full object-cover"
              />
            </span>
          ))}
          {likeCount > 4 && (
            <span
              data-slot="avatar"
              class="relative flex items-center justify-center text-white shrink-0 overflow-hidden rounded-full size-8 bg-[#4e5d78]"
            >
              +{likeCount - 4}
            </span>
          )}
        </div>
        <div className="flex gap-7 text-[#959eae]">
          {/* <span>{likeCount} Likes</span> */}
          <span>{post.comments.length} Comments</span>
          <span>{post.shares} Shares</span>
        </div>
      </div>

      {/* Post Actions */}
      <div className="border-t border-b border-gray-200 dark:border-gray-700 py-2 mb-4 font-semibold">
        <div className="flex justify-between">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 px-3 py-1 rounded-md cursor-pointer ${
              isLiked
                ? "text-[#003933]"
                : "text-gray-500 hover:text-[#003933] dark:hover:text-gray-300"
            }`}
          >
            <ThumbsUp size={18} />
            <span>{isLiked ? "Liked" : "Like"}</span>
          </button>

          <button
            onClick={() =>
              document.getElementById(`comment-${post.id}`).focus()
            }
            className="flex cursor-pointer items-center space-x-1 px-3 py-1 rounded-md hover:text-[#003933] dark:hover:text-gray-300"
          >
            <MessageSquare size={18} />
            <span>Comment</span>
          </button>
          <button
            onClick={() => onSave(post.id)}
            className={`flex items-center space-x-1 px-3 py-1 rounded-md cursor-pointer ${
              post.isSaved
                ? "text-[#003933]"
                : "text-gray-500 hover:text-[#003933] dark:hover:text-gray-300"
            }`}
          >
            <Bookmark size={18} />
            <span>Save</span>
          </button>
          <PostShare />
        </div>
      </div>

      {/* Comments Section */}
      <div className="space-y-3 mb-4">
        {post.comments.map((comment, index) => (
          <div key={index} className="flex space-x-2">
            <img
              src={comment.userImage || "https://i.pravatar.cc/150?img=3"}
              alt={comment.user}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex-1">
              <div className="font-medium text-sm dark:text-white">
                {comment.user}
              </div>
              <div className="text-gray-700 dark:text-zinc-400 text-sm">
                {comment.text}
              </div>
              {comment.image && (
                <img
                  src={comment.image}
                  alt="Comment"
                  className="mt-2 rounded-lg max-h-40 object-cover"
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
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex-1 relative">
          <div className="relative">
            <input
              id={`comment-${post.id}`}
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="w-full bg-gray-100 dark:bg-gray-700 rounded-full py-2 px-4 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary pr-24"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-gray-400 hover:text-primary p-1"
              >
                <Smile size={18} />
              </button>
              <label className="text-gray-400 hover:text-primary p-1 cursor-pointer">
                <ImageIcon size={18} />
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
                <Send size={18} />
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
                <Smile size={18} />
              </button>
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                width={300}
                height={350}
                previewConfig={{ showPreview: false }}
              />
            </div>
          )}

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-2 relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="rounded-lg max-h-40 object-cover"
              />
              <button
                onClick={() => setImagePreview(null)}
                className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white rounded-full p-1"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Post;
