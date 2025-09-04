// src/components/dashboard/Home/AnnouncementPostForm.jsx
import EmojiPicker from "emoji-picker-react";
import { Image as ImageIcon, Paperclip, Smile, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router";

const AnnouncementPostForm = ({
  postText,
  setPostText,
  imagePreviewUrls,
  setImagePreviewUrls,
  selectedImages,
  setSelectedImages,
  fileInputRef,
  handleImageUpload,
  removeImage,
  handlePostSubmit,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const { openImageModal, uploadedImage, setUploadedImage } =
    useOutletContext() || {};

  // Add uploaded image to preview URLs when it's available
  useEffect(() => {
    if (uploadedImage && uploadedImage.previewUrl) {
      // Add the uploaded image to the preview URLs
      const newPreviewUrl = uploadedImage.previewUrl;

      // Check if the image is not already in the preview URLs
      if (imagePreviewUrls && !imagePreviewUrls.includes(newPreviewUrl)) {
        // Add the new image to the preview URLs
        setImagePreviewUrls((prev) => [...prev, newPreviewUrl]);

        // Also add the file to the selected images
        if (uploadedImage.file) {
          setSelectedImages((prev) => [...prev, uploadedImage.file]);
        }
      }

      // Clear the uploaded image from context
      setUploadedImage(null);
    }
  }, [uploadedImage, imagePreviewUrls, setImagePreviewUrls, setUploadedImage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postText.trim() || imagePreviewUrls.length > 0) {
      handlePostSubmit();
    }
  };

  const handleEmojiClick = (emojiData) => {
    setPostText((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleImageIconClick = () => {
    if (openImageModal) {
      openImageModal();
    } else {
      // Fallback to the original file input if modal is not available
      triggerFileInput();
    }
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
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
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
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={handleImageIconClick}
                  className="text-gray-500 hover:text-primary p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
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
                  className="text-gray-500 hover:text-primary p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Paperclip size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="text-gray-500 hover:text-primary p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Smile size={20} />
                </button>
              </div>
              <button
                type="submit"
                disabled={!postText.trim() && imagePreviewUrls.length === 0}
                className={`px-4 py-2 rounded-full ${
                  postText.trim() || imagePreviewUrls.length > 0
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

export default AnnouncementPostForm;
