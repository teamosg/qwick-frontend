import { DashboardSidebarContent } from "@/components/dashboard/Dashboard/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <DashboardSidebarContent />
      <div className="p-6 w-full bg-[#f9fafb] dark:bg-zinc-950 min-h-screen">
        <main className="w-full">
          {/* Mobile toggle button */}
          <div className="md:hidden mb-4">
            <SidebarTrigger className="flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium"></SidebarTrigger>
          </div>

          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
