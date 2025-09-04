// src/components/dashboard/Home/PostForm.jsx
import EmojiPicker from "emoji-picker-react";
import {
  ChevronDown,
  Image as ImageIcon,
  Paperclip,
  Smile,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PostForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const [selectedCommunity, setSelectedCommunity] = useState("Twenty8");
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);
  const [selectedTag, setSelectedTag] = useState("Theory 2");
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  const communities = [
    "Twenty8",
    "Twenty8_News",
    "General Discussion",
    "ThirtyThirty",
    "SixtySixty",
  ];

  const communityTags = {
    Twenty8: ["Research Group", "Academic Discussions"],
    Twenty8_News: ["News", "Events", "Updates", "Announcements"],
    ThirtyThirty: ["News", "Events", "Updates", "Announcements"],
    SixtySixty: ["General", "Important", "Updates", "Events"],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() || imagePreviewUrls.length > 0) {
      onSubmit({
        content,
        images: imagePreviewUrls,
      });
      setContent("");
      setSelectedImages([]);
      setImagePreviewUrls([]);
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    // Filter for image files
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    // Limit to 4 images
    if (selectedImages.length + imageFiles.length > 4) {
      alert("Maximum 4 images allowed");
      return;
    }

    setSelectedImages((prev) => [...prev, ...imageFiles]);

    // Create preview URLs
    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviewUrls((prev) => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
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
        const emojiButton = document.querySelector(".emoji-button");
        if (!emojiButton || !emojiButton.contains(event.target)) {
          setShowEmojiPicker(false);
        }
      }

      // Close dropdowns when clicking outside
      const communityDropdown = document.querySelector(".community-dropdown");
      const tagDropdown = document.querySelector(".tag-dropdown");

      if (communityDropdown && !communityDropdown.contains(event.target)) {
        setShowCommunityDropdown(false);
      }

      if (tagDropdown && !tagDropdown.contains(event.target)) {
        setShowTagDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-3">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="flex-1">
            {/* Content Textarea */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full bg-gray-100 dark:placeholder:text-zinc-400 dark:bg-gray-700 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={3}
            />

            {/* Image Preview */}
            {imagePreviewUrls.length > 0 && (
              <div className="mb-3">
                <div className="grid grid-cols-2 gap-3">
                  {imagePreviewUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="rounded-lg max-h-60 object-cover w-full"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between ">
              <div className="flex justify-center gap-8">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    // className="text-gray-500 hover:text-primary p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ImageIcon size={20} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <button
                    type="button"
                    // className="text-gray-500 hover:text-primary p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Paperclip size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    // className="text-gray-500 hover:text-primary p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Smile size={20} />
                  </button>
                </div>
                {/* Post Type and Community Dropdowns */}
                <div className="flex space-x-3">
                  {/* Community Dropdown */}
                  <div className="relative community-dropdown">
                    <button
                      type="button"
                      onClick={() =>
                        setShowCommunityDropdown(!showCommunityDropdown)
                      }
                      className="flex items-center space-x-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1"
                    >
                      <span>{selectedCommunity}</span>
                      <ChevronDown size={16} className="ml-1" />
                    </button>

                    {showCommunityDropdown && (
                      <div className="absolute z-10 mt-1 w-48 bg-white dark:bg-zinc-900 rounded-md shadow-lg border border-gray-200 dark:border-zinc-700">
                        <div className="py-1">
                          {communities.map((community) => (
                            <button
                              key={community}
                              type="button"
                              onClick={() => {
                                setSelectedCommunity(community);
                                setSelectedTag(communityTags[community][0]); // Set first tag as default
                                setShowCommunityDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                                selectedCommunity === community
                                  ? "bg-gray-100 dark:bg-gray-700 text-primary"
                                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                              }`}
                            >
                              {community}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Community Tags Dropdown */}
                  <div className="relative tag-dropdown">
                    <button
                      type="button"
                      onClick={() => setShowTagDropdown(!showTagDropdown)}
                      className="flex items-center space-x-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1"
                    >
                      <span>{selectedTag}</span>
                      <ChevronDown size={16} className="ml-1" />
                    </button>

                    {showTagDropdown && (
                      <div className="absolute z-10 mt-1 w-48 bg-white dark:bg-zinc-900 rounded-md shadow-lg border border-gray-200 dark:border-zinc-700">
                        <div className="py-1">
                          {communityTags[selectedCommunity]?.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => {
                                setSelectedTag(tag);
                                setShowTagDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                                selectedTag === tag
                                  ? "bg-gray-100 dark:bg-gray-700 text-primary"
                                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                              }`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!content.trim() && imagePreviewUrls.length === 0}
                className={`px-4 py-2 rounded-full ${
                  content.trim() || imagePreviewUrls.length > 0
                    ? "bg-[#003933] text-white cursor-pointer"
                    : "bg-[#003933] dark:bg-gray-700 text-white cursor-not-allowed"
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
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
