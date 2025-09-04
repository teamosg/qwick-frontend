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
import { Image as ImageIcon } from "lucide-react";
import { Link, useOutletContext } from "react-router";
import CommunitySwitcher from "./CommunitySwitcher";

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
  const { openImageModal } = useOutletContext() || {};

  return (
    <Sidebar className="sticky  md:left-64 left-0">
      <SidebarHeader className="p-0 bg-[url(https://placehold.co/400x250)] bg-center bg-cover bg-no-repeat h-[135px] relative">
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Image Upload Button */}
        <div className="absolute top-2 right-2">
          <button
            onClick={openImageModal}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            title="Edit banner"
          >
            <ImageIcon size={16} className="text-white" />
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
  );
}
