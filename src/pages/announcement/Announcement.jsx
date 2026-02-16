// Announcement.jsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router";
import { AnnouncementSidebar } from "../../components/announcement/AnnouncementSidebar";
import { useCommunityStore } from "@/store/communityStore";
import DashboardSkeleton from "@/components/dashboard/Dashboard/skeletons/DashboardSkeleton";
import NoAnnouncementDashboardPage from "@/components/dashboard/Dashboard/EmptyPages/NoAnnoouncementDashboardPage";
import { useEffect } from "react";


const Announcement = () => {
  const {
    isLoadingCommunityList,
    myCommunityList,
    selectedCreatorCommunity,
    setSelectedCreatorCommunity
  } = useCommunityStore()
  const location = useLocation();
  const isChat = location.pathname.includes("community-chat");


  const selectedCreatorCommunityExist = myCommunityList?.find(
    community => community.id === selectedCreatorCommunity?.id
  )


  useEffect(() => {
    if (!myCommunityList?.length) return


    if (selectedCreatorCommunityExist) {
      setSelectedCreatorCommunity(selectedCreatorCommunityExist)
    } else {
      if (myCommunityList?.length && !isLoadingCommunityList) {
        setSelectedCreatorCommunity(myCommunityList[0])
      } else {
        setSelectedCreatorCommunity(null)
      }
    }
  }, [myCommunityList, isLoadingCommunityList, selectedCreatorCommunityExist, setSelectedCreatorCommunity])




  if (isLoadingCommunityList) {
    return <DashboardSkeleton />
  }



  if (!myCommunityList?.length) {
    return <NoAnnouncementDashboardPage />;
  }

  // Announcement.jsx
  return (
    <SidebarProvider className="flex-1 flex min-h-0 overflow-hidden">
      <AnnouncementSidebar />

      <main className="flex-1 flex flex-col min-h-0 bg-[#f9fafb] dark:bg-zinc-950 overflow-hidden relative">
        {/* Mobile Toggle - Only visible on small screens since the sidebar is hidden then */}
        <div className="flex-none md:hidden p-4 border-b dark:border-zinc-800">
          <SidebarTrigger />
        </div>

        {/* THE CONTENT AREA */}
        <div className={`flex-1 flex flex-col min-h-0 ${isChat ? 'overflow-hidden' : 'overflow-y-auto p-4 sm:p-6'}`}>
          <div className={`flex-1 flex flex-col min-h-0 ${!isChat ? 'max-w-6xl mx-auto w-full' : ''}`}>
            <Outlet />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Announcement;