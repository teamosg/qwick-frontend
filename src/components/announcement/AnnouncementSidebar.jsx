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
import { Link } from "react-router";
import CommunitySwitcher from "./CommunitySwitcher";
import { useCommunityStore } from "@/store/communityStore";

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
  const {
    isLoadingCommunityList,
    myCommunityList,
    selectedCreatorCommunity,
    setSelectedCreatorCommunity
  } = useCommunityStore()

  const bg = selectedCreatorCommunity?.banner_image || "/communityBG.png";




  const handleMenuItemClick = () => {
    // Close the sidebar on mobile when a menu item is clicked
    // Use a more reliable method by dispatching a keyboard event
    setTimeout(() => {
      // Simulate pressing Escape key to close sidebar
      const escapeEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        keyCode: 27,
        which: 27,
        bubbles: true,
        cancelable: true,
      });
      document.dispatchEvent(escapeEvent);

      // Also try clicking the trigger button
      const trigger = document.querySelector('button[aria-expanded="true"]');
      if (trigger) {
        trigger.click();
      }
    }, 150);
  };





  return (
    <>
      <Sidebar className="sticky  md:left-64 left-0">
        <SidebarHeader
          className="p-0 bg-center bg-cover bg-no-repeat h-[135px] relative"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="absolute inset-0 bg-black/30"></div>

          <CommunitySwitcher
            data={myCommunityList}
            isLoading={isLoadingCommunityList}
            selectedCommunity={selectedCreatorCommunity}
            setSelectedCommunity={setSelectedCreatorCommunity}
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
                        onClick={handleMenuItemClick}
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
    </>
  );
}
