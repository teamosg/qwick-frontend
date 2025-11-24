import { DashboardSidebarContent } from "@/components/dashboard/Dashboard/DashboardSidebar";
import NoCommunityDashboardPage from "@/components/dashboard/Dashboard/EmptyPages/NoCommunityDashboardPage";
import DashboardSkeleton from "@/components/dashboard/Dashboard/skeletons/DashboardSkeleton";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useGetMyCommunityList } from "@/hooks/community.hook";
import { useJoinedCommunityStore } from "@/store/communityStore";
import { useEffect } from "react";
import { Outlet } from "react-router";

const Dashboard = () => {
  const { selectedJoinedCommunity, setSelectedJoinedCommunity } = useJoinedCommunityStore((state) => state);
  const {
    data: communityList,
    isLoading: isLoadingMyCommunityList,
    isError: isErrorMyCommunityList,
  } = useGetMyCommunityList();

  const myCommunityList = communityList?.created_communities


  useEffect(() => {
    console.log(myCommunityList);
    if (
      myCommunityList?.length &&
      !isLoadingMyCommunityList &&
      !isErrorMyCommunityList
    ) {
      setSelectedJoinedCommunity(myCommunityList[0]);
    } else {
      setSelectedJoinedCommunity(null);
    }
  }, [myCommunityList, isLoadingMyCommunityList, isErrorMyCommunityList]);



  if (isLoadingMyCommunityList) {
    return <DashboardSkeleton />
  }


  if (!selectedJoinedCommunity) {
    return <NoCommunityDashboardPage />;
  }

  return (
    <SidebarProvider>
      <DashboardSidebarContent />
      <div className="p-6 w-full bg-[#f9fafb] dark:bg-zinc-950 h-full">
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
