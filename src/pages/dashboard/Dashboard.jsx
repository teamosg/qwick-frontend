import { DashboardSidebarContent } from "@/components/dashboard/Dashboard/DashboardSidebar";
import NoCommunityDashboardPage from "@/components/dashboard/Dashboard/EmptyPages/NoCommunityDashboardPage";
import DashboardSkeleton from "@/components/dashboard/Dashboard/skeletons/DashboardSkeleton";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useGetMyCommunityList } from "@/hooks/community.hook";
import { useCommunityStore } from "@/store/communityStore";
import { useEffect } from "react";
import { Outlet, useParams, useNavigate } from "react-router";

const Dashboard = () => {
  const { communityUsername } = useParams();
  const navigate = useNavigate();
  const { selectedBrandCommunity, setSelectedBrandCommunity } = useCommunityStore();

  const {
    data: communityList,
    isLoading,
  } = useGetMyCommunityList();

  const createdCommunityList = communityList?.created_communities || [];

  useEffect(() => {
    if (isLoading) return;

    if (createdCommunityList.length > 0) {
      // If no communityUsername in params, redirect to the first one
      if (!communityUsername) {
        navigate(`/dashboard/${createdCommunityList[0].username}`, { replace: true });
        return;
      }

      // Find the community that matches the username in URL, fallback to the first one
      const targetCommunity = createdCommunityList.find((c) => c.username === communityUsername) || createdCommunityList[0];

      // Update store only if different
      if (selectedBrandCommunity?.id !== targetCommunity.id) {
        setSelectedBrandCommunity(targetCommunity);
      }
    } else if (selectedBrandCommunity !== null) {
      setSelectedBrandCommunity(null);
    }
  }, [communityUsername, createdCommunityList, isLoading, setSelectedBrandCommunity, selectedBrandCommunity?.id, navigate]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (createdCommunityList.length === 0) {
    return <NoCommunityDashboardPage />;
  }

  return (
    <SidebarProvider className="flex-1 flex min-h-0 overflow-hidden">
      <DashboardSidebarContent />

      <main className="flex-1 flex flex-col min-h-0 bg-background dark:bg-zinc-950 overflow-hidden relative">
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
