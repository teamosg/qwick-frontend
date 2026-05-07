// src/components/dashboard/Home/AnnouncementPostForm.jsx
import EmojiPicker from "emoji-picker-react";
import { Image as ImageIcon, Paperclip, Smile, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router";
import AvatarUser from "../ui/AvatarUser";
import { useProfile } from "@/hooks/auth.hook";

const AnnouncementPostForm = ({
  isPosting,
  postText,
  setPostText,
  imagePreviewUrls,
  setImagePreviewUrls,
  setSelectedImages,
  fileInputRef,
  handleImageUpload,
  removeImage,
  handlePostSubmit,
}) => {
  const { data: user } = useProfile()

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const { openImageModal, uploadedImage, setUploadedImage } = useOutletContext() || {};

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
          <AvatarUser
            src={user?.avatar}
            alt={user?.full_name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            {/* Content Textarea */}
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full bg-gray-100 dark:placeholder:text-zinc-400 dark:bg-[#2E2E2E]  rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-[#003933] resize-none"
              rows={5}
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
                        className="rounded-lg max-h-40 object-cover w-full"
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
                  className="text-gray-500 hover:text-primary p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2E2E2E] "
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
                {/* <button
                  type="button"
                  className="text-gray-500 hover:text-primary p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2E2E2E] "
                >
                  <Paperclip size={20} />
                </button> */}
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="text-gray-500 hover:text-primary p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2E2E2E] "
                >
                  <Smile size={20} />
                </button>
              </div>
              <button
                type="submit"
                disabled={isPosting || (!postText.trim() && imagePreviewUrls.length === 0)}
                className={`px-4 sm:px-8 py-2 rounded-full text-sm sm:text-base font-medium transition-colors 
                  bg-[#003933] text-white cursor-pointer hover:bg-[#002a26]
                  disabled:bg-[#003933] disabled:dark:bg-[#2E2E2E]  disabled:text-white disabled:cursor-not-allowed disabled:opacity-50
                  `}
              >
                {isPosting ? "Posting..." : "Post"}
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
