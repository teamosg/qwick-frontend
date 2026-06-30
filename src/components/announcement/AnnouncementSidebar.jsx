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
import { Link, useParams, useLocation } from "react-router";
import { useState } from "react";
import { Copy, Check, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import CommunitySwitcher from "./CommunitySwitcher";
import { useCommunityStore } from "@/store/communityStore";
import AvatarUser from "../ui/AvatarUser";

// Menu items.
const items = [
  {
    title: "Announcements",
    url: "",
  },
  {
    title: "Campaigns",
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
  const { communityUsername } = useParams();
  const location = useLocation();

  const {
    isLoadingCommunityList,
    myCommunityListAnnouncement,
    selectedCreatorCommunity,
    setSelectedCreatorCommunity
  } = useCommunityStore();
  const [copied, setCopied] = useState(false);

  const bg = selectedCreatorCommunity?.banner_image || "/communityBG.png";

  const handleMenuItemClick = () => {
    // ... same logic ...
    setTimeout(() => {
      const escapeEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        keyCode: 27,
        which: 27,
        bubbles: true,
        cancelable: true,
      });
      document.dispatchEvent(escapeEvent);

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

    const cleanDomain = domain.endsWith('/') ? domain.slice(0, -1) : domain;
    const shareLink = `${cleanDomain}/join-community/${selectedCreatorCommunity.username}`;

    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    toast.success("Community link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Sidebar className="relative h-full inset-auto md:w-64 border-r border-border">
        <SidebarHeader
          className="p-0 bg-center bg-cover bg-no-repeat h-[135px] relative"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="absolute inset-0 bg-black/30"></div>

          <div className="z-40 flex items-center justify-between gap-2 py-2.5 px-3 rounded-lg text-white focus-visible:outline-none">
            <AvatarUser
              src={selectedCreatorCommunity?.avatar}
              alt={selectedCreatorCommunity?.business_name}
              className="h-8 w-8"
            />
            <div className="text-start flex flex-col gap-1 leading-none w-full">
              <span className="text-base leading-none font-semibold truncate max-w-[17ch]">
                {selectedCreatorCommunity?.business_name?.slice(0, 15)}
                {selectedCreatorCommunity?.business_name?.length > 15 ? "..." : ""}
              </span>
              <span className="text-xs truncate max-w-[20ch]">
                @{selectedCreatorCommunity?.username}
              </span>
            </div>
          </div>
          {/* <CommunitySwitcher
                        data={myCommunityListAnnouncement}
                        isLoading={isLoadingCommunityList}
                        selectedCommunity={selectedCreatorCommunity}
                        setSelectedCommunity={setSelectedCreatorCommunity}
                    /> */}
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const currentPath = location.pathname;

                  const isActive = (() => {
                    if (item.url === "") {
                      return currentPath === `/announcement/${communityUsername}` ||
                             currentPath.startsWith(`/announcement/${communityUsername}/announcement`);
                    }
                    return currentPath === `/announcement/${communityUsername}/${item.url}` ||
                           currentPath.startsWith(`/announcement/${communityUsername}/${item.url}/`);
                  })();

                  return (
                    <SidebarMenuItem
                      key={item.title}
                      className="hover:hover:bg-none h-auto hover:shadow-none"
                    >
                      <SidebarMenuButton
                        asChild
                        className={`hover:shadow-none text-[16px] h-auto flex gap-4 hover:bg-transparent focus:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent ${isActive ? 'text-foreground' : 'text-foreground-subtle'}`}
                      >
                        <Link
                          className={`hover:bg-none hover:shadow-none inline-block px-5 py-3 relative ${isActive ? 'bg-accent/10 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-0.5 before:bg-primary before:rounded-full' : ''}`}
                          to={`/announcement/${communityUsername}/${item.url}`}
                          onClick={handleMenuItemClick}
                        >
                          <span className={`hover:bg-none hover:shadow-none font-medium ${isActive ? 'text-foreground' : ''}`}>
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                      <hr />
                    </SidebarMenuItem>
                  );
                })}

                {/* Copy Link Button */}
                {/* <SidebarMenuItem className="hover:hover:bg-none h-auto hover:shadow-none">
                  <SidebarMenuButton
                    onClick={handleCopyLink}
                    className="text-foreground-strong hover:shadow-none text-[16px] h-auto flex gap-4 hover:bg-transparent focus:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent w-full group"
                  >
                    <div className="px-3 py-2 w-full flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold capitalize">
                          {copied ? "Link Copied!" : "Community link"}
                        </span>
                        <LinkIcon size={18} className={copied ? "text-success" : "text-foreground-strong"} />
                      </div>
                      {copied && <Check size={16} className="text-success" />}
                    </div>
                  </SidebarMenuButton>
                  <hr />
                </SidebarMenuItem> */}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </>
  );
}

