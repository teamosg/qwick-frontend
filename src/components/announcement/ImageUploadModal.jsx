import { Image as ImageIcon, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

const ImageUploadModal = ({ isOpen, onClose, onImageUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type.startsWith("image/")) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      onImageUpload(selectedImage);
      onClose();
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-zinc-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Edit banner
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Media*
          </label>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-[#003933] bg-[#003933]/5"
                : "border-[#003933] bg-gray-50 dark:bg-zinc-800"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {imagePreview ? (
              <div className="space-y-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mx-auto max-h-48 rounded-lg object-contain"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedImage?.name}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Drag an image here
                </p>
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="inline-flex items-center px-4 py-2 bg-white dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-600 transition-colors"
                >
                  <Upload size={16} className="mr-2" />
                  Upload Media
                </button>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-zinc-700">
          <button
            onClick={handleUpload}
            disabled={!selectedImage}
            className={`w-full py-3 px-4 rounded-full text-white font-medium transition-colors ${
              selectedImage
                ? "bg-[#003933] hover:bg-[#002a26] cursor-pointer"
                : "bg-gray-300 dark:bg-zinc-700 cursor-not-allowed"
            }`}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
