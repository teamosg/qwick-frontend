// Announcement.jsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { AnnouncementSidebar } from "../../components/announcement/AnnouncementSidebar";

const Announcement = () => {
  return (
    <SidebarProvider>
      <AnnouncementSidebar />
      <div className="p-6 w-full">
        <main className="w-full">
          {/* Mobile toggle button */}
          <div className="md:hidden mb-4">
            <SidebarTrigger
              isButtonShow={false}
              className="flex items-center justify-center rounded-lg border"
            >
              <span className="block">Show Community</span>
            </SidebarTrigger>
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
