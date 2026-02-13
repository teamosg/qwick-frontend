// Announcement.jsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
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
  }, [myCommunityList])




  if (isLoadingCommunityList) {
    return <DashboardSkeleton />
  }



  if (!myCommunityList?.length) {
    return <NoAnnouncementDashboardPage />;
  }

  // Announcement.jsx
  return (
    <SidebarProvider
      /* Force the provider to be exactly the height of the 'main' above */
      className="h-full w-full flex overflow-hidden"
    >
      <AnnouncementSidebar />

      <div className="flex-1 flex flex-col min-h-0 bg-[#f9fafb] dark:bg-zinc-950">
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden">

          {/* Mobile Toggle */}
          <div className="flex-none md:hidden p-4 border-b">
            <SidebarTrigger />
          </div>

          {/* THE SCROLL BOX */}
          <div className="flex-1 flex flex-col overflow-y-auto p-6 min-h-0">
            {/* This extra div ensures the bottom padding is visible */}
            <div className="flex-1">
              <Outlet />
            </div>
          </div>

        </main>
      </div>
    </SidebarProvider>
  );
};

export default Announcement;