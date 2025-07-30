// src/components/dashboard/Home/PostForm.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Image as ImageIcon,
  Paperclip,
  Smile,
  Globe,
  Users,
  ChevronDown,
  X,
} from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

const PostForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('public');
  const [selectedGroup, setSelectedGroup] = useState('Theory 2');
  const [previewImage, setPreviewImage] = useState(null);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const postTypes = [
    { value: 'public', label: 'Public', icon: <Globe size={16} /> },
    { value: 'group', label: 'Group', icon: <Users size={16} /> },
  ];

  const groups = [
    'Theory 1',
    'Theory 2',
    'Research Group',
    'Academic Discussions',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      content,
      postType,
      group: postType === 'group' ? selectedGroup : null,
      image: previewImage,
    });
    setContent('');
    setPreviewImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setContent((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          emojiPickerRef.current &&
          !emojiPickerRef.current.contains(event.target)
        ) {
          // Check if click was on the emoji button
          const emojiButton = document.querySelector('.emoji-button');
          if (!emojiButton || !emojiButton.contains(event.target)) {
            setShowEmojiPicker(false);
          }
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-3">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            {/* Post Type Dropdown */}
            <div className="relative mb-3">
              <button
                type="button"
                onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                className="flex items-center space-x-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1"
              >
                {postTypes.find((t) => t.value === postType)?.icon}
                <span>
                  {postTypes.find((t) => t.value === postType)?.label}
                </span>
                {postType === 'group' && (
                  <span className="ml-1">• {selectedGroup}</span>
                )}
                <ChevronDown size={16} className="ml-1" />
              </button>

              {showTypeDropdown && (
                <div className="absolute z-10 mt-1 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="py-1">
                    {postTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => {
                          setPostType(type.value);
                          setShowTypeDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                          postType === type.value
                            ? 'bg-gray-100 dark:bg-gray-700 text-primary'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <span className="mr-2">{type.icon}</span>
                        {type.label}
                      </button>
                    ))}
                  </div>
                  {postType === 'group' && (
                    <div className="border-t border-gray-200 dark:border-gray-700 py-1">
                      {groups.map((group) => (
                        <button
                          key={group}
                          type="button"
                          onClick={() => {
                            setSelectedGroup(group);
                            setShowTypeDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                            selectedGroup === group
                              ? 'bg-gray-100 dark:bg-gray-700 text-primary'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          <span className="ml-6">{group}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Content Textarea */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={3}
            />

            {/* Image Preview */}
            {previewImage && (
              <div className="relative mb-3">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="rounded-lg max-h-60 object-cover w-full"
                />
                <button
                  type="button"
                  onClick={() => setPreviewImage(null)}
                  className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white rounded-full p-1"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="text-gray-500 hover:text-primary p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Smile size={20} />
                </button>
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="text-gray-500 hover:text-primary p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <ImageIcon size={20} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <button
                  type="button"
                  className="text-gray-500 hover:text-primary p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Paperclip size={20} />
                </button>
              </div>
              <button
                type="submit"
                disabled={!content.trim() && !previewImage}
                className={`px-4 py-2 rounded-full ${
                  content.trim() || previewImage
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                Post
              </button>
            </div>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute z-10 mt-1" ref={emojiPickerRef}>
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  width={300}
                  height={350}
                  previewConfig={{ showPreview: false }}
                />
                {/* <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="emoji-button text-gray-500 hover:text-primary p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Smile size={20} />
                </button> */}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
