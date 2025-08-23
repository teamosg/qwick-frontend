import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ChartSpline, ChevronDown, ShoppingBag } from "lucide-react";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { Link } from "react-router";

// Menu items.
const items = [
  {
    title: "Community hub",
    url: "community-hub",
    icon: ChartSpline,
  },
  {
    title: "Edit store page",
    url: "edit-store",
    icon: ShoppingBag,
  },
  {
    title: "Content Reward",
    url: "content-reward",
    icon: ChartSpline,
  },
];
export function DashboardSidebar() {
  return (
    <Sidebar className={"sticky left-64"}>
      <SidebarHeader>
        <div className="">
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <img src="/dashboardProfile.png" alt="" />
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-[#191919]">
                  Darren Chua
                </h2>
                <p className="text-sm text-gray-600">@lofttypayoff</p>
              </div>
            </div>
            <div>
              <ChevronDown />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full border border-white hover:bg-gray-50 transition-colors">
              <span className="text-xs font-medium text-[#090003]">
                Upload banner
              </span>
            </button>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-[#717171] text-[16px] flex gap-4"
                  >
                    <Link
                      className=" hover:bg-none hover:shadow-none"
                      to={item.url}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarGroup>
                <Collapsible defaultOpen className="group/collapsible p-0">
                  <SidebarGroup
                    className={" p-0 text-[#090003] text-[16px] flex"}
                  >
                    <SidebarGroupLabel className="p-0" asChild>
                      <CollapsibleTrigger className="text-[#090003] text-[16px]">
                        Chat
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <Link href="/">
                              <img
                                src="/dashboardProfile.png"
                                className="w-6 h-6 rounded-full"
                                alt=""
                              />
                              Chat
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
              </SidebarGroup>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
