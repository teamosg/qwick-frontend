import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, useLocation, useParams, useNavigate } from "react-router";
import { AnnouncementSidebar } from "../../components/announcement/AnnouncementSidebar";
import { useCommunityStore } from "@/store/communityStore";
import { useGetMyCommunityList } from "@/hooks/community.hook";
import DashboardSkeleton from "@/components/dashboard/Dashboard/skeletons/DashboardSkeleton";
import NoAnnouncementDashboardPage from "@/components/dashboard/Dashboard/EmptyPages/NoAnnoouncementDashboardPage";
import { useEffect, useMemo } from "react";


const Announcement = () => {
  const { communityUsername } = useParams();
  const navigate = useNavigate();
  const { selectedCreatorCommunity, setSelectedCreatorCommunity } = useCommunityStore();

  const {
    data: communityList,
    isLoading,
  } = useGetMyCommunityList();

  const location = useLocation();
  const isChat = location.pathname.includes("community-chat");

  // Combine created and joined communities for the creator view
  const myCommunityList = useMemo(() => [
    ...(communityList?.created_communities || []),
    ...(communityList?.joined_communities || [])
  ], [communityList]);

  useEffect(() => {
    if (isLoading) return;

    if (myCommunityList.length > 0) {
      // If no communityUsername in params, redirect to the first one
      if (!communityUsername) {
        navigate(`/announcement/${myCommunityList[0].username}`, { replace: true });
        return;
      }

      // Find the community that matches the username in URL, fallback to the first one
      const targetCommunity = myCommunityList.find((c) => c.username === communityUsername) || myCommunityList[0];

      // Update store only if different
      if (selectedCreatorCommunity?.id !== targetCommunity.id) {
        setSelectedCreatorCommunity(targetCommunity);
      }
    } else if (selectedCreatorCommunity !== null) {
      setSelectedCreatorCommunity(null);
    }
  }, [communityUsername, myCommunityList, isLoading, setSelectedCreatorCommunity, selectedCreatorCommunity?.id, navigate]);


  if (isLoading) {
    return <DashboardSkeleton />
  }



  if (myCommunityList.length === 0) {
    return <NoAnnouncementDashboardPage />;
  }

  // Announcement.jsx
  return (
    <SidebarProvider className="flex-1 flex min-h-0 overflow-hidden">
      <AnnouncementSidebar />

      <main className="flex-1 flex flex-col min-h-0 bg-background dark:bg-zinc-950 overflow-hidden relative">
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