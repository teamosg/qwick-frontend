import { DashboardSidebarContent } from "@/components/dashboard/Dashboard/DashboardSidebar";
import NoCommunityDashboardPage from "@/components/dashboard/Dashboard/EmptyPages/NoCommunityDashboardPage";
import DashboardSkeleton from "@/components/dashboard/Dashboard/skeletons/DashboardSkeleton";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useGetMyCommunityList } from "@/hooks/community.hook";
import { useCommunityStore } from "@/store/communityStore";
import { useEffect } from "react";
import { Outlet } from "react-router";

const Dashboard = () => {
  const { selectedBrandCommunity, setSelectedBrandCommunity } = useCommunityStore((state) => state);
  const {
    data: communityList,
    isLoading: isLoadingMyCommunityList,
    isError: isErrorMyCommunityList,
  } = useGetMyCommunityList();
  const createdCommunityList = communityList?.created_communities



  const selectedBrandCommunityExist = createdCommunityList?.find(
    (community) => community?.id === selectedBrandCommunity?.id
  );

  useEffect(() => {
    if (!selectedBrandCommunityExist) setSelectedBrandCommunity(null)
    if (!createdCommunityList?.length) return


    if (selectedBrandCommunityExist) {
      setSelectedBrandCommunity(selectedBrandCommunityExist);
    } else {
      if (
        createdCommunityList?.length &&
        !isLoadingMyCommunityList &&
        !isErrorMyCommunityList
      ) {
        setSelectedBrandCommunity(createdCommunityList[0]);
      } else {
        setSelectedBrandCommunity(null);
      }
    }
  }, [createdCommunityList, isLoadingMyCommunityList, isErrorMyCommunityList, selectedBrandCommunityExist, setSelectedBrandCommunity]);



  if (isLoadingMyCommunityList) {
    return <DashboardSkeleton />
  }


  if (!selectedBrandCommunity) {
    return <NoCommunityDashboardPage />;
  }

  return (
    <SidebarProvider className="flex-1 flex min-h-0 overflow-hidden">
      <DashboardSidebarContent />

      <main className="flex-1 flex flex-col min-h-0 bg-[#f9fafb] dark:bg-zinc-950 overflow-hidden relative">
        {/* Mobile toggle button */}
        <div className="flex-none md:hidden p-4 border-b dark:border-zinc-800">
          <SidebarTrigger />
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Dashboard;
