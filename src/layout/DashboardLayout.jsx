import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './../components/dashboard/Header';
import Sidebar from './../components/dashboard/Sidebar';

// Default user data
const userData = {
  name: 'Chris',
  fullName: 'Chris Miguel',
  role: 'Admin',
  image:
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
};

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
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
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0 transition-transform duration-200 ease-in-out
        `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          userName={userData.name}
          userImage={userData.image}
          userRole={userData.role}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="bg-grey-white flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
