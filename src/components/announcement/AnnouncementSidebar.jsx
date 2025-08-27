// AnnouncementSidebar.jsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { SelectSeparator } from "@/components/ui/select";
import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import ExampleCombobox from "./CommunitySwitcher";

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
  return (
    <Sidebar className="sticky left-64 md:left-64 left-0">
      <SidebarHeader className="p-0 bg-[url(https://placehold.co/400x250)] bg-center bg-cover bg-no-repeat h-[135px] relative">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 p-2.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#fff]">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <img src="/dashboardProfile.png" alt="" />
              </div>
              <div className="hidden sm:block">
                <h2 className="text-[16px] font-semibold ">Darren Chua</h2>
                <p className="text-sm">@lofttypayoff</p>
              </div>
            </div>
            <div className="hidden sm:block">
              <ExampleCombobox />
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-[#717171] text-[16px] flex gap-4 "
                  >
                    <Link
                      className="hover:bg-none hover:shadow-none inline-block px-5 py-3 "
                      to={item.url}
                    >
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  <SelectSeparator />
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
