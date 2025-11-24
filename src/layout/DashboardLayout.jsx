import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./../components/dashboard/Header";
import Sidebar from "./../components/dashboard/Sidebar";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - hidden on mobile, shown on medium screens and up */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30 w-64  transform 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0 transition-transform duration-200 ease-in-out
        `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#f9fafb] dark:dark:bg-zinc-950 ">
        <Header
          // userName={userData.name}
          // userImage={userData.image}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 flex flex-col overflow-auto p-4">
          <div className="flex-1">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
