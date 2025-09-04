// Announcement.jsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import { Outlet } from "react-router";
import { AnnouncementSidebar } from "../../components/announcement/AnnouncementSidebar";
import ImageUploadModal from "../../components/announcement/ImageUploadModal";

const Announcement = () => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (imageFile) => {
    // Convert the uploaded image to a preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage({
        file: imageFile,
        previewUrl: e.target.result,
      });
    };
    reader.readAsDataURL(imageFile);

    // Close the modal after successful upload
    setIsImageModalOpen(false);
  };

  return (
    <SidebarProvider>
      <AnnouncementSidebar />
      <div className="p-6 w-full bg-[#f9fafb] dark:bg-zinc-950 min-h-screen">
        <main className="w-full">
          {/* Mobile toggle button */}
          <div className="md:hidden mb-4">
            <div className="md:hidden mb-4">
              <SidebarTrigger className="flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium"></SidebarTrigger>
            </div>
          </div>

          <div className="w-full">
            <Outlet
              context={{
                openImageModal: () => setIsImageModalOpen(true),
                uploadedImage,
                setUploadedImage,
              }}
            />
          </div>
        </main>
      </div>

      {/* Image Upload Modal */}
      <ImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onImageUpload={handleImageUpload}
      />
    </SidebarProvider>
  );
};

export default Announcement;
