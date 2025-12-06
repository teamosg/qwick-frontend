// DashboardSidebar.jsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
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
import ImageUploadModal from "../../announcement/ImageUploadModal";
import DashboardSwitcher from "./DashboardSwitcher";
import { useEditCommunity, useGetMyCommunityList } from "@/hooks/community.hook";
import { Spinner } from "@/components/ui/spinner";
import { useCommunityStore } from "@/store/communityStore";

// Menu items.
const items = [
  {
    title: "Content Payout",
    url: "content-payout",
  },
  {
    title: "Users",
    url: "users",
  },
  {
    title: "Wait list",
    url: "wait-list",
  },
  {
    title: "Payments",
    url: "payments",
  },
  {
    title: "Payout",
    url: "payout",
  },
  {
    title: "Automated Message",
    url: "automated-message",
  },
  {
    title: "Dashboard Settings",
    url: "dashboard-settings",
  },
];

// Main sidebar content component
export function DashboardSidebarContent() {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const { mutate: editCommunity, isPending } = useEditCommunity();
  
  const { selectedBrandCommunity, setSelectedBrandCommunity } = useCommunityStore();
  const {
    data: communityList,
    isLoading: isLoadingMyCommunityList,
  } = useGetMyCommunityList();

  const myCommunityList = communityList?.created_communities


  const handleImageUpload = (imageFile) => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("banner_image", imageFile);

    editCommunity({
      communityUsername: selectedBrandCommunity?.username,
      payload: formData,
    });
  };

  const openImageModal = () => {
    setIsImageModalOpen(true);
  };

  const bg = selectedBrandCommunity?.banner_image || "/communityBG.png";


  return (
    <>
      <Sidebar className="sticky md:left-64 left-0">
        <SidebarHeader
          className="p-0 bg-center bg-cover bg-no-repeat h-[135px] relative"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Image Upload Button */}
          <div className="absolute bottom-2 right-2">
            <button
              disabled={isPending}
              onClick={openImageModal}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              title="Edit banner"
            >
              {
                isPending
                  ? <Spinner className={'text-white'} />
                  : <PencilIcon size={16} className="text-white" />
              }
            </button>
          </div>

          {/* Mobile close button */}

          {/* <div className="absolute inset-0 p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#fff]">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <img src="/dashboardProfile.png" alt="" />
                </div>
                <div className="hidden sm:block">
                  <h2 className="text-[16px] font-semibold text-gray-900 dark:text-white">Darren Chua</h2>
                  <p className="text-sm text-gray-600 dark:text-zinc-400">@lofttypayoff</p>
                </div>
              </div>
              <div className="hidden sm:block">
                <ExampleCombobox />
              </div>
            </div>
          </div> */}
          <DashboardSwitcher
            data={myCommunityList}
            isLoading={isLoadingMyCommunityList}
            selectedCommunity={selectedBrandCommunity}
            setSelectedCommunity={setSelectedBrandCommunity}
          />
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

// Main export - use this when you need the sidebar with its own provider
export function DashboardSidebar() {
  return (
    <SidebarProvider>
      <DashboardSidebarContent />
    </SidebarProvider>
  );
}
