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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Post = ({ post, onLike, onSave, onDelete, onEdit, onCommentSubmit }) => {
  const [commentText, setCommentText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [likeCount, setLikeCount] = useState(post.like_count || 0);
  const [isLiked, setIsLiked] = useState(post.is_liked || false);
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
    } else {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
    }
    if (onLike) onLike(post.id);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow p-3 sm:p-6 mb-4 sm:mb-6">
      {/* Post Header */}
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <img
            src={post.author.avatar}
            alt={post.author.first_name}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-sm sm:text-base dark:text-white truncate">
                {post.author.first_name} {post.author.last_name}
              </h3>
            </div>
            <div className="text-xs text-[#AAAAAA] dark:text-gray-400 flex items-center">
              <Clock size={10} className="mr-1" />{" "}
              {new Date(post.created_at).toLocaleString()}
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

      {/* Post Files/Images */}
      {post.files && post.files.length > 0 && (
        <div className="mb-3 sm:mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {post.files.map((file) => (
            <div key={file.id} className="w-full">
              <img
                src={file.file}
                alt="Post file"
                className="w-full h-48 sm:h-64 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}

      {/* Post Stats */}
      <div className="border-t border-b border-gray-200 dark:border-gray-700 py-2 mb-3 sm:mb-4 font-semibold bg-white dark:bg-zinc-900">
        <div className="flex justify-between gap-2 sm:gap-0">
          <button
            onClick={handleLike}
            className={`flex sm:items-center sm:justify-center space-x-1 px-2 sm:px-3 py-2 sm:py-1 rounded-md cursor-pointer text-sm sm:text-base transition-colors
        ${isLiked
                ? "text-[#003933] dark:text-emerald-400"
                : "text-gray-500 dark:text-gray-400 hover:text-[#003933] hover:dark:text-emerald-300"
              }`}
            aria-label={isLiked ? "Liked" : "Like"}
          >
            <Like isLiked={isLiked} />
            <span className="sm:hidden">{isLiked ? "Liked" : "Like"}</span>
          </button>

          <button
            onClick={() =>
              document.getElementById(`comment-${post.id}`).focus()
            }
            className="flex cursor-pointer sm:items-center sm:justify-center space-x-1 px-2 sm:px-3 py-2 sm:py-1 rounded-md text-sm sm:text-base text-gray-500 dark:text-gray-400 hover:text-[#003933] hover:dark:text-emerald-300 transition-colors"
            aria-label="Comment"
          >
            <Comment />
          </button>

          <div className="sm:col-span-1">
            <PostShare />
          </div>

          <button
            onClick={() => onSave(post.id)}
            className={`flex sm:items-center sm:justify-center px-2 sm:px-3 py-2 sm:py-1 rounded-md cursor-pointer text-sm sm:text-base transition-colors
        ${post.isSaved
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
        {post.comments.map((comment) => {
          return (
            <div key={comment.id} className="flex space-x-2 relative">
              <img
                src={comment.author.avatar || "https://i.pravatar.cc/150?img=3"}
                alt={comment.author.first_name}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0"
              />

              <div className="bg-gray-100 dark:bg-[#2E2E2E] rounded-lg p-2 sm:p-3 flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div className="font-medium text-xs sm:text-sm dark:text-white truncate">
                    {comment.author.first_name} {comment.author.last_name}
                  </div>

                  {/* ✅ ShadCN Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1">
                        <MoreHorizontal size={16} />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="w-32 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700"
                    >
                      <DropdownMenuItem
                        onClick={() => onDelete(comment.id)}
                        className="cursor-pointer text-red-600 focus:text-red-600"
                      >
                        <Trash2 size={16} className="mr-2 text-red-600" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="text-gray-700 dark:text-zinc-400 text-xs sm:text-sm break-words">
                  {comment.content}
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
          );
        })}
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
              className="w-full bg-gray-100 dark:bg-[#2E2E2E] rounded-lg py-2 px-3 sm:px-4 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary pr-16 sm:pr-24 text-sm sm:text-base"
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
                className={`p-1 ${commentText.trim() || imagePreview
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
