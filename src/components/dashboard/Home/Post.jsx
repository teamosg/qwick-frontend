import Comment from "@/assets/svg/Comment";
import Like from "@/assets/svg/Like";
import Save from "@/assets/svg/Save";
import { Clock, Edit, MoreHorizontal, Trash2, Send } from "lucide-react";
import { PostShare } from "./PostShare";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EmojiPicker from "emoji-picker-react";
import { Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";


const Post = ({ post }) => {
  const [commentText, setCommentText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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


  const handleEmojiClick = (emojiData) => {
    setCommentText((prev) => prev + emojiData.emoji);
  };



  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow p-3 sm:p-6 mb-4 sm:mb-6">
      {/* ================= POST HEADER ================= */}
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <img
            src={post.author.avatar}
            alt={post.author.first_name}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm sm:text-base dark:text-white truncate">
              {post.author.first_name} {post.author.last_name}
            </h3>
            <div className="text-xs text-[#AAAAAA] dark:text-gray-400 flex items-center">
              <Clock size={10} className="mr-1" />
              {new Date(post.created_at).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Three Dot Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1">
              <MoreHorizontal size={18} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-40 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700"
          >
            <DropdownMenuItem
              className="cursor-pointer"
            >
              <Edit size={16} className="mr-2" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <Trash2 size={16} className="mr-2 text-red-600" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ================= POST CONTENT ================= */}
      <p className="dark:text-gray-300 mb-3 sm:mb-4 whitespace-pre-line text-sm sm:text-base leading-relaxed">
        {post.content}
      </p>

      {/* ================= POST IMAGES ================= */}
      {post.files?.length > 0 && (
        <div className="mb-3 sm:mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {post.files.map((file) => (
            <img
              key={file.id}
              src={file.file}
              alt="Post file"
              className="w-full h-48 sm:h-64 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      {/* ================= POST ACTIONS ================= */}
      <div className="border-t border-b border-gray-200 dark:border-gray-700 py-2 mb-3 sm:mb-4 font-semibold bg-white dark:bg-zinc-900">
        <div className="flex justify-between gap-2">
          <button
            className={`flex items-center space-x-1 px-2 sm:px-3 py-2 sm:py-1 rounded-md cursor-pointer text-sm sm:text-base transition-colors
              ${post.is_liked
                ? "text-[#003933] dark:text-emerald-400"
                : "text-gray-500 dark:text-gray-400 hover:text-[#003933] hover:dark:text-emerald-300"
              }`}
          >
            <Like isLiked={post.is_liked} />
            <span className="sm:hidden">
              {post.is_liked ? "Liked" : "Like"}
            </span>
          </button>

          <button className="flex items-center space-x-1 px-2 sm:px-3 py-2 sm:py-1 rounded-md text-sm sm:text-base text-gray-500 dark:text-gray-400 hover:text-[#003933] hover:dark:text-emerald-300 transition-colors">
            <Comment />
          </button>

          <PostShare />

          <button
            className={`flex items-center px-2 sm:px-3 py-2 sm:py-1 rounded-md cursor-pointer text-sm sm:text-base transition-colors
              ${post.isSaved
                ? "text-[#003933] dark:text-emerald-400"
                : "text-gray-500 dark:text-gray-400 hover:text-[#003933] hover:dark:text-emerald-300"
              }`}
          >
            <Save />
          </button>
        </div>
      </div>

      {/* ================= COMMENTS ================= */}
      <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
        {post.comments.map((comment) => (
          <div key={comment.id} className="flex space-x-2 relative">
            <img
              src={comment.author.avatar}
              alt={comment.author.first_name}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
            />

            <div className="bg-gray-100 dark:bg-[#2E2E2E] rounded-lg p-2 sm:p-3 flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div className="font-medium text-xs sm:text-sm dark:text-white truncate">
                  {comment.author.first_name} {comment.author.last_name}
                </div>

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
                      className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="text-gray-700 dark:text-zinc-400 text-xs sm:text-sm break-words">
                {comment.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= COMMENT INPUT (NO IMAGE ICON) ================= */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!commentText.trim()) return;
          console.log(commentText);
          setCommentText("");
        }}
        className="flex space-x-2"
      >
        <img
          src="https://i.pravatar.cc/150?img=5"
          alt="User"
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
        />

        <div className="flex-1 relative">
          <input
            id={`comment-${post.id}`}
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="w-full bg-gray-100 dark:bg-[#2E2E2E] rounded-lg py-2 px-3 sm:px-4 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary pr-20 text-sm sm:text-base"
          />

          {/* ✅ Emoji + Send Buttons */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className={`comment-emoji-button-${post.id} text-gray-400 hover:text-primary p-1`}
            >
              <Smile size={16} />
            </button>

            <button type="submit" className="text-primary p-1">
              <Send size={16} />
            </button>
          </div>

          {/* ✅ Emoji Picker */}
          {showEmojiPicker && (
            <div
              className="absolute bottom-12 right-0 z-10"
              ref={emojiPickerRef}
            >
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
        </div>
      </form>

    </div>
  );
};

export default Post;
