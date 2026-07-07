import { Image as ImageIcon, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

const ImageUploadModal = ({ isOpen, onClose, onImageUpload }) => {
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  const bannerInputRef = useRef(null);
  const profileInputRef = useRef(null);

  const handleFile = (file, type) => {
    if (file && file.type.startsWith("image/")) {
      if (type === "banner") {
        setBannerImage(file);
        const reader = new FileReader();
        reader.onload = (e) => setBannerPreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        setProfileImage(file);
        const reader = new FileReader();
        reader.onload = (e) => setProfilePreview(e.target.result);
        reader.readAsDataURL(file);
      }
    }
  };

  const removeImage = (e, type) => {
    e.stopPropagation();
    if (type === "banner") {
      setBannerImage(null);
      setBannerPreview(null);
      if (bannerInputRef.current) bannerInputRef.current.value = "";
    } else {
      setProfileImage(null);
      setProfilePreview(null);
      if (profileInputRef.current) profileInputRef.current.value = "";
    }
  };

  const handleUpload = () => {
    if (bannerImage) onImageUpload(bannerImage, "banner");
    if (profileImage) onImageUpload(profileImage, "profile");

    onClose();
    setBannerImage(null);
    setBannerPreview(null);
    setProfileImage(null);
    setProfilePreview(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col border border-border">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground-strong">
            Edit community images
          </h2>
          <button onClick={onClose} className="text-foreground-muted hover:text-foreground-strong transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Profile Section */}
          <div className="flex flex-col items-center">
            <label className="w-full text-sm font-medium text-foreground-strong mb-2">
              Community Icon
            </label>
            <div
              onClick={() => profileInputRef.current.click()}
              className="relative w-20 h-20 border-2 border-dashed border-foreground-muted rounded-full flex items-center justify-center cursor-pointer bg-secondary hover:bg-secondary/80 transition-colors group"
            >
              {profilePreview ? (
                <>
                  <img src={profilePreview} alt="Profile Preview" className="w-full h-full rounded-full object-cover" />
                  <button
                    onClick={(e) => removeImage(e, "profile")}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </>
              ) : (
                <Upload className="h-6 w-6 text-foreground-muted" />
              )}
            </div>
            <input ref={profileInputRef} type="file" accept="image/*" onChange={(e) => handleFile(e.target.files[0], "profile")} className="hidden" />
          </div>

          {/* Banner Section */}
          <div>
            <label className="block text-sm font-medium text-foreground-strong mb-2">
              Banner Image
            </label>
            <div
              onClick={() => bannerInputRef.current.click()}
              className="relative border-2 border-dashed border-foreground-muted rounded-lg text-center cursor-pointer bg-secondary hover:bg-secondary/80 transition-colors group"
            >
              {bannerPreview ? (
                <>
                  <img src={bannerPreview} alt="Banner Preview" className="mx-auto max-h-24 rounded-lg object-contain" />
                  <button
                    onClick={(e) => removeImage(e, "banner")}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </>
              ) : (
                <div className="py-2">
                  <ImageIcon className="mx-auto h-6 w-6 text-foreground-muted mb-1" />
                  <p className="text-[10px] text-foreground-muted">Upload Banner</p>
                </div>
              )}
            </div>
            <input ref={bannerInputRef} type="file" accept="image/*" onChange={(e) => handleFile(e.target.files[0], "banner")} className="hidden" />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <button
            onClick={handleUpload}
            disabled={!bannerImage && !profileImage}
            className={`w-full py-3 px-4 rounded-full text-white font-medium transition-colors ${bannerImage || profileImage
                ? "bg-foreground-strong dark:bg-accent hover:bg-foreground dark:hover:bg-accent/80 cursor-pointer"
                : "bg-secondary text-foreground-muted cursor-not-allowed"
              }`}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
