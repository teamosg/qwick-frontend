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
import { useState } from "react";
import { Copy, Check, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
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
  // {
  //   title: "Withdraw",
  //   url: "withdraw",
  // },
];

export function AnnouncementSidebar() {
  const {
    isLoadingCommunityList,
    myCommunityList,
    selectedCreatorCommunity,
    setSelectedCreatorCommunity
  } = useCommunityStore();
  const [copied, setCopied] = useState(false);

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

  const handleCopyLink = () => {
    if (!selectedCreatorCommunity?.username) {
      toast.error("No community selected");
      return;
    }

    const domain = import.meta.env.DEV
      ? window.location.origin
      : (import.meta.env.VITE_DOMAIN_NAME || window.location.origin);

    // Ensure domain doesn't end with slash if we're adding one
    const cleanDomain = domain.endsWith('/') ? domain.slice(0, -1) : domain;
    const shareLink = `${cleanDomain}/join-community/${selectedCreatorCommunity.username}`;

    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    toast.success("Community link copied!");
    setTimeout(() => setCopied(false), 2000);
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

                {/* Copy Link Button */}
                <SidebarMenuItem className="hover:hover:bg-none h-auto hover:shadow-none">
                  <SidebarMenuButton
                    onClick={handleCopyLink}
                    className="text-[#003933] dark:text-[#00b89f] hover:shadow-none text-[16px] h-auto flex gap-4 hover:bg-transparent focus:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent w-full group"
                  >
                    <div className="px-3 py-2 w-full flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold capitalize">
                          {copied ? "Link Copied!" : "Community link"}
                        </span>
                        <LinkIcon size={18} className={copied ? "text-emerald-500" : "text-[#003933] dark:text-[#00b89f]"} />
                      </div>
                      {copied && <Check size={16} className="text-emerald-500" />}
                    </div>
                  </SidebarMenuButton>
                  <hr />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </>
  );
}

