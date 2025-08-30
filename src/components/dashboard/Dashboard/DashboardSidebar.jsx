// DashboardSidebar.jsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import DashboardSwitcher from "./DashboardSwitcher";

// Menu items.
const items = [
  {
    title: "Users",
    url: "",
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
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar className="sticky md:left-64 left-0">
      <SidebarHeader className="p-0 bg-[url(https://placehold.co/400x250)] bg-center bg-cover bg-no-repeat h-[135px] relative">
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Mobile close button */}

        {/* <div className="absolute inset-0 p-2.5 flex flex-col justify-between">
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
        </div> */}
        <DashboardSwitcher />
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

// Main export - use this when you need the sidebar with its own provider
export function DashboardSidebar() {
  return (
    <SidebarProvider>
      <DashboardSidebarContent />
    </SidebarProvider>
  );
}
