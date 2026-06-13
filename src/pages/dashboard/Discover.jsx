import Card from "@/components/dashboard/Card";
import DiscoverFilter from "@/components/discover/Filter";
import Pagination from "@/components/discover/Pagination";
import { motion, AnimatePresence } from "framer-motion";
import { useGetAllCampaigns } from "@/hooks/campaign.hook";
import { useGetCommunityList, useGetMyCommunityList } from "@/hooks/community.hook";
import { useCommunityStore } from "@/store/communityStore";
import { useState, useMemo } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import DiscoverSkeleton from "@/components/discover/DiscoverSkeleton";
import { formatViewCount } from "@/lib/utils";
import { format } from "date-fns";

const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL;

const Discover = () => {
  const navigate = useNavigate();
  const { data: campaignRes, isLoading: isLoadingCampaigns } = useGetAllCampaigns();
  const { data: myCommunityRes, isLoading: isLoadingMyCommunities } = useGetMyCommunityList();
  const { data: allCommunities, isLoading: isLoadingAllCommunities } = useGetCommunityList();
  const { setSelectedCreatorCommunity } = useCommunityStore();

  const [selectedType, setSelectedType] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [typeOpen, setTypeOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [selectedType, selectedCategory, selectedSort]);

  // Sorting and Filtering Logic
  const processedCampaigns = useMemo(() => {
    let list = campaignRes?.campaigns || [];

    // Filter by Type
    if (selectedType !== "All") {
      list = list.filter(c => c.campaign_type?.name?.toLowerCase() === selectedType.toLowerCase());
    }

    // Filter by Category
    if (selectedCategory !== "All") {
      list = list.filter(c => c.category?.name?.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Sort
    list = [...list].sort((a, b) => {
      if (selectedSort === "Highest Available Budget") {
        return parseFloat(b.budget || 0) - parseFloat(a.budget || 0);
      }
      if (selectedSort === "Highest Budget") {
        return parseFloat(b.initial_budget || 0) - parseFloat(a.initial_budget || 0);
      }
      if (selectedSort === "Most Paid Out") {
        return parseFloat(b.total_users_earning || 0) - parseFloat(a.total_users_earning || 0);
      }
      if (selectedSort === "Highest CPM") {
        return parseFloat(b.reward_rate || 0) - parseFloat(a.reward_rate || 0);
      }
      if (selectedSort === "Newest" || selectedSort === "Most Creators") {
        return b.id - a.id;
      }
      return 0;
    });

    return list;
  }, [campaignRes, selectedType, selectedCategory, selectedSort]);

  const totalPages = Math.ceil(processedCampaigns.length / itemsPerPage);
  const currentCampaigns = processedCampaigns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCampaignClick = (campaign) => {
    const joinedCommunities = myCommunityRes?.joined_communities || [];
    const createdCommunities = myCommunityRes?.created_communities || [];

    const communityId = campaign.community;

    // Check if user is the creator
    const communityAsCreator = createdCommunities.find(c => c.id === communityId);

    // Check if campaign has ended
    const isEnded = campaign.end_date && new Date(campaign.end_date) < new Date();

    if (isEnded && !communityAsCreator) {
      toast.error("This campaign has ended.");
      return;
    }

    if (communityAsCreator) {
      navigate(`/announcement/${communityAsCreator?.username}/content-reward`);
      // toast.info("As the creator of this community, you cannot join as a member.");
      return;
    }

    // Check if user has joined
    const communityAsMember = joinedCommunities.find(c => c.id === communityId);

    if (communityAsMember) {
      // Already joined
      setSelectedCreatorCommunity(communityAsMember);
      navigate(`/announcement/${communityAsMember?.username}/content-reward`);
    } else {
      // Find community username from all communities to navigate to join page
      const targetCommunity = allCommunities?.find(c => c.id === communityId);
      if (targetCommunity?.username) {
        navigate(`/join-community/${targetCommunity.username}`);
      } else {
        toast.error("Community information not found.");
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  if (isLoadingCampaigns || isLoadingMyCommunities || isLoadingAllCommunities) {
    return (
      <div className="p-4">
        <DiscoverSkeleton />
      </div>
    );
  }

  return (
    <motion.div
      className=" p-4 bg-background dark:bg-zinc-950 min-h-0 flex-1 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Filters */}
      <div className="mb-4">
        <DiscoverFilter
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          typeOpen={typeOpen}
          setTypeOpen={setTypeOpen}
          categoryOpen={categoryOpen}
          setCategoryOpen={setCategoryOpen}
          sortOpen={sortOpen}
          setSortOpen={setSortOpen}
        />
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {currentCampaigns.map((campaign) => {
            const community = allCommunities?.find(c => c.id === campaign.community) || {};
            const isEnded = campaign.end_date && new Date(campaign.end_date) < new Date();

            return (
              <motion.div
                key={campaign.id}
                variants={cardVariants}
                whileHover={!isEnded ? {
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 },
                } : {}}
                whileTap={!isEnded ? { scale: 0.98 } : {}}
                className="w-full"
              >
                <Card
                  content={{
                    thumbnail: campaign?.thumbnail ? (campaign.thumbnail.startsWith('http') ? campaign.thumbnail : `${MEDIA_BASE_URL}${campaign.thumbnail}`) : null,
                    communityName: community.business_name || "Community",
                    communityAvatar: community.avatar ? (community.avatar.startsWith('http') ? community.avatar : `${MEDIA_BASE_URL}${community.avatar}`) : null,
                    postedDate: campaign.created_at ? format(new Date(campaign.created_at), 'MMM dd, yyyy') : "N/A",
                    views: campaign.total_content_views,
                    title: campaign.name,
                    socials: campaign.platforms?.map(p => {
                      if (p.name?.toLowerCase() === 'instagram') return { name: 'Instagram', icon: FaInstagram };
                      if (p.name?.toLowerCase() === 'facebook') return { name: 'Facebook', icon: FaFacebook };
                      if (p.name?.toLowerCase() === 'youtube') return { name: 'YouTube', icon: FaYoutube };
                      return null;
                    }).filter(Boolean),
                    progress: campaign.initial_budget > 0
                      ? Math.min(Math.max((parseFloat(campaign.total_users_earning || 0) / parseFloat(campaign.initial_budget)) * 100, 0), 100)
                      : 0,
                    compensation: `$${campaign.reward_rate} / 1K VIEWS`,
                    isEnded: isEnded,
                    endDate: campaign.end_date,
                  }}
                  onApply={() => handleCampaignClick(campaign)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {processedCampaigns.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No campaigns found matching your filters.
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </motion.div>
  );
};

export default Discover;
