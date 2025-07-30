import React, { useEffect, useRef, useState } from 'react';
import {
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
  Smile,
  Image as ImageIcon,
  Clock,
  Globe,
  Users,
  Edit,
  Trash2,
  Send,
  X,
} from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

const Post = ({ post, onLike, onSave, onDelete, onEdit, onCommentSubmit }) => {
  const [commentText, setCommentText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
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

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [post.id]);

  const dropdownItems = [
    {
      label: 'Edit',
      icon: <Edit size={16} className="mr-2" />,
      action: () => onEdit(post.id),
    },
    {
      label: 'Delete',
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
      setCommentText('');
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
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
              <h3 className="font-semibold">{post.author}</h3>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full flex items-center">
                {post.postType === 'group' ? (
                  <>
                    <Users size={12} className="mr-1" /> {post.group}
                  </>
                ) : (
                  <>
                    <Globe size={12} className="mr-1" /> Public
                  </>
                )}
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
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
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
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
      <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">
        {post.content}
      </p>

      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="rounded-lg mb-4 w-full h-auto max-h-96 object-cover"
        />
      )}

      {/* Post Stats */}
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        <span>{post.likes} Likes</span>
        <span className="mx-2">•</span>
        <span>{post.comments.length} Comments</span>
        <span className="mx-2">•</span>
        <span>{post.shares} Shares</span>
      </div>

      {/* Post Actions */}
      <div className="border-t border-b border-gray-200 dark:border-gray-700 py-2 mb-4">
        <div className="flex justify-between">
          <button
            onClick={() => onLike(post.id)}
            className={`flex items-center space-x-1 px-3 py-1 rounded-md ${
              post.isLiked
                ? 'text-blue-500'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <ThumbsUp size={18} />
            <span>Like</span>
          </button>
          <button
            onClick={() =>
              document.getElementById(`comment-${post.id}`).focus()
            }
            className="flex items-center space-x-1 px-3 py-1 rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <MessageSquare size={18} />
            <span>Comment</span>
          </button>
          <button
            onClick={() => onSave(post.id)}
            className={`flex items-center space-x-1 px-3 py-1 rounded-md ${
              post.isSaved
                ? 'text-blue-500'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Bookmark size={18} />
            <span>Save</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-1 rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="space-y-3 mb-4">
        {post.comments.map((comment, index) => (
          <div key={index} className="flex space-x-2">
            <img
              src={comment.userImage || 'https://i.pravatar.cc/150?img=3'}
              alt={comment.user}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex-1">
              <div className="font-medium text-sm">{comment.user}</div>
              <div className="text-gray-700 dark:text-gray-300 text-sm">
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
                    ? 'text-primary'
                    : 'text-gray-400'
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
