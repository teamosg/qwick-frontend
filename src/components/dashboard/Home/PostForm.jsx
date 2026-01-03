import { useCommunityStore } from "@/store/communityStore";
import EmojiPicker from "emoji-picker-react";
import { ChevronDown, Image as ImageIcon, Smile, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCreateAnnouncements } from "@/hooks/announcement.hook";
import { useProfile } from "@/hooks/auth.hook";
import AvatarUser from "@/components/ui/AvatarUser";
import { toast } from "sonner";

const PostForm = () => {
  const { data: profileData } = useProfile()
  const { myCommunityList } = useCommunityStore();
  const [content, setContent] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(
    myCommunityList?.[0]?.business_name || ""
  );
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);

  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const selectedCommunityData = myCommunityList?.find(
    (c) => c.business_name === selectedCommunity
  );

  const { mutate: createAnnouncement, isPending: isCreatingAnnouncement } = useCreateAnnouncements(selectedCommunityData?.username);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (content.trim() || selectedImages.length > 0) {
      const formData = new FormData();
      if (content.trim()) formData.append("content", content);
      selectedImages.forEach((file) => formData.append("files", file));
      
      createAnnouncement(formData, {
        onSuccess: () => {
          setContent("");
          setSelectedImages([]);
          setImagePreviewUrls([]);
        },
      });
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files).filter((file) =>
      file.type.startsWith("image/")
    );
    if (selectedImages.length + files.length > 4) {
      toast.error("Maximum 4 images allowed!");
      return;
    }

    setSelectedImages((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreviewUrls((prev) => [...prev, e.target.result]);
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEmojiClick = (emojiData) => {
    setContent((prev) => prev + emojiData.emoji);
  };

  const triggerFileInput = () => fileInputRef.current.click();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        !event.target.closest(".emoji-button")
      ) {
        setShowEmojiPicker(false);
      }

      if (
        !event.target.closest(".community-dropdown")
      ) {
        setShowCommunityDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-xl dark:bg-zinc-900 rounded-2lg shadow p-3 sm:p-4 mb-6">
      <form onSubmit={handlePostSubmit}>
        <div className="flex items-start space-x-2 sm:space-x-3">
          <AvatarUser
            src={profileData?.avatar}
            alt={profileData?.first_name}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            {/* Content Textarea */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full bg-gray-100 dark:placeholder:text-zinc-400 dark:bg-[#2E2E2E] dark:text-gray-300 rounded-lg p-2 sm:p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm sm:text-base"
              rows={3}
            />

            {/* Image Preview */}
            {imagePreviewUrls.length > 0 && (
              <div className="mb-3 grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2">
                {imagePreviewUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="rounded-lg max-h-48 sm:max-h-60 object-cover w-full"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-gray-800 bg-opacity-50 text-white rounded-full p-1"
                    >
                      <X size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                {/* Media & Emoji */}
                <div className="flex gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="text-gray-500 hover:text-primary p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2E2E2E] transition-colors"
                  >
                    <ImageIcon size={18} className="sm:w-5 sm:h-5" />
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
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="text-gray-500 hover:text-primary p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2E2E2E] transition-colors emoji-button"
                  >
                    <Smile size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Community Dropdown */}
                <div className="relative community-dropdown">
                  <button
                    type="button"
                    onClick={() => setShowCommunityDropdown(!showCommunityDropdown)}
                    className="flex items-center dark:text-gray-300 space-x-1 text-xs sm:text-sm bg-gray-100 dark:bg-[#2E2E2E] rounded-full px-2 sm:px-3 py-1 w-full sm:w-auto justify-center sm:justify-start"
                  >
                    <span className="dark:text-gray-300 truncate">
                      {selectedCommunity}
                    </span>
                    <ChevronDown
                      size={14}
                      className="ml-1 sm:w-4 sm:h-4 flex-shrink-0"
                    />
                  </button>

                  {showCommunityDropdown && (
                    <div className="absolute z-10 mt-1 w-full sm:w-48 bg-white dark:bg-zinc-900 rounded-md shadow-lg border border-gray-200 dark:border-zinc-700">
                      <div className="py-1">
                        {myCommunityList?.map((community) => (
                          <button
                            key={community.id}
                            type="button"
                            onClick={() => {
                              setSelectedCommunity(community.business_name);
                              setShowCommunityDropdown(false);
                            }}
                            className={`w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm flex items-center ${selectedCommunity === community.business_name
                              ? "bg-gray-100 dark:bg-[#2E2E2E] text-primary"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2E2E2E]"
                              }`}
                          >
                            {community.business_name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={!content.trim() && imagePreviewUrls.length === 0 || isCreatingAnnouncement}
                className={`disabled:cursor-not-allowed disabled:opacity-70 px-4 sm:px-8 py-2 rounded-full text-sm sm:text-base font-medium transition-colors ${content.trim() || imagePreviewUrls.length > 0
                  ? "bg-[#003933] text-white cursor-pointer hover:bg-[#002a26]"
                  : "bg-[#003933] dark:bg-[#2E2E2E] text-white cursor-not-allowed opacity-50"
                  }`}
              >
                {isCreatingAnnouncement ? "Posting..." : "Post"}
              </button>
            </div>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute z-10 mt-1 left-0 sm:left-auto" ref={emojiPickerRef}>
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  width={280}
                  height={320}
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
