import { DashboardSidebar } from "@/components/dashboard/Dashboard/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
const Dashboard = () => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="p-6  w-full">
        <main className="w-full">
          {/* <SidebarTrigger /> */}
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
