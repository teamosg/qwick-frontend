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
      console.log('ok');
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
  }, [createdCommunityList]);



  if (isLoadingMyCommunityList) {
    return <DashboardSkeleton />
  }


  if (!selectedBrandCommunity) {
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
