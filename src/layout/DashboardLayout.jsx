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
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* CRITICAL: This main must be flex-1 and min-h-0 */}
        <main className="flex-1 min-h-0 flex flex-col relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;

