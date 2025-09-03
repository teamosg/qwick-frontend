// Announcement.jsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { AnnouncementSidebar } from "../../components/announcement/AnnouncementSidebar";

const Announcement = () => {
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
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Announcement;
