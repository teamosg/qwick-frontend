// AnnouncementSidebar.jsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import CommunitySwitcher from "./CommunitySwitcher";
import ImageUploadModal from "./ImageUploadModal";

// Menu items.
const items = [
  {
    title: "Announcement",
    url: "announcement",
  },
  {
    title: "Content Reward",
    url: "content-reward",
  },
  {
    title: "Community Chat",
    url: "community-chat",
  },
];

export function AnnouncementSidebar() {
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

  const openImageModal = () => {
    setIsImageModalOpen(true);
  };

  return (
    <>
      <Sidebar className="sticky  md:left-64 left-0">
        <SidebarHeader
          className="p-0 bg-[url(https://placehold.co/400x250)] bg-center bg-cover bg-no-repeat h-[135px] relative"
          style={
            uploadedImage?.previewUrl
              ? { backgroundImage: `url(${uploadedImage.previewUrl})` }
              : {}
          }
        >
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Image Upload Button */}
          <div className="absolute bottom-2 right-2">
            <button
              onClick={openImageModal}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              title="Edit banner"
            >
              <PencilIcon size={16} className="text-white" />
            </button>
          </div>

          <CommunitySwitcher />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className="hover:hover:bg-none h-auto hover:shadow-none"
                  >
                    <SidebarMenuButton
                      asChild
                      className="text-[#717171] hover:shadow-none  text-[16px] h-auto flex gap-4 hover:bg-transparent focus:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent "
                    >
                      <Link
                        className="hover:bg-none hover:shadow-none inline-block px-5 py-3 "
                        to={item.url}
                      >
                        <span className="hover:bg-none hover:shadow-none font-medium">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                    <hr />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>

      {/* Image Upload Modal */}
      <ImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onImageUpload={handleImageUpload}
      />
    </>
  );
}
