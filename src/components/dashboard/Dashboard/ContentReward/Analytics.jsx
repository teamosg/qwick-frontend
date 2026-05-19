import { ShoppingBag, TrendingUp, Users, DollarSign, Loader2 } from "lucide-react";
import ContentRewardNav from "./ContentRewardNav";
import ContentRewardsTable from "./ContentRewardsTable";
import { useCommunityStore } from "@/store/communityStore";
import { useGetCampaignBudgets } from "@/hooks/community.hook";
import { useGetCommunitySubmissions } from "@/hooks/campaign.hook";
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";

const Analytics = () => {
  const { selectedBrandCommunity } = useCommunityStore();
  const communityId = selectedBrandCommunity?.id;

  const { data: budgetData, isLoading: budgetsLoading } = useGetCampaignBudgets(communityId);
  const { data: submissionData, isLoading: submissionsLoading } = useGetCommunitySubmissions(communityId);

  const stats = useMemo(() => {
    if (!submissionData?.submissions) return { totalViews: 0, totalPayout: 0, totalSubmissions: 0, totalCampaigns: 0 };

    const submissions = submissionData.submissions;
    const totalViews = submissions.reduce((acc, sub) => acc + (sub.views || 0), 0);
    const totalPayout = submissions.reduce((acc, sub) => acc + parseFloat(sub.payout || 0), 0);
    const totalSubmissions = submissionData.total_submissions || 0;
    const totalCampaigns = budgetData?.total_campaigns || 0;

    return { totalViews, totalPayout, totalSubmissions, totalCampaigns };
  }, [submissionData, budgetData]);

  // Map campaign names to submissions for the table
  const mappedSubmissions = useMemo(() => {
    if (!submissionData?.submissions || !budgetData?.campaigns) return submissionData?.submissions || [];

    return submissionData.submissions.map(sub => {
      const campaign = budgetData.campaigns.find(c => c.campaign_id === sub.campaign);
      return {
        ...sub,
        campaign_name: campaign?.campaign_name || `Campaign #${sub.campaign}`
      };
    });
  }, [submissionData, budgetData]);

  const isLoading = budgetsLoading || submissionsLoading;

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#003933]" />
        <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      <ContentRewardNav />

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {/* Total Campaigns */}
        <Card className="border-0 shadow-sm bg-white dark:bg-zinc-900 overflow-hidden group hover:shadow-md transition-all rounded-2xl">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 md:gap-4 text-center sm:text-left">
              <div className="p-2.5 sm:p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform shrink-0">
                <ShoppingBag size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Campaigns</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white tabular-nums leading-tight">
                  {stats.totalCampaigns}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Views */}
        <Card className="border-0 shadow-sm bg-white dark:bg-zinc-900 overflow-hidden group hover:shadow-md transition-all rounded-2xl">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 md:gap-4 text-center sm:text-left">
              <div className="p-2.5 sm:p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform shrink-0">
                <TrendingUp size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Views</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white tabular-nums leading-tight">
                  {stats.totalViews >= 1000000 ? `${(stats.totalViews / 1000000).toFixed(1)}M` : stats.totalViews.toLocaleString()}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Submissions */}
        <Card className="border-0 shadow-sm bg-white dark:bg-zinc-900 overflow-hidden group hover:shadow-md transition-all rounded-2xl">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 md:gap-4 text-center sm:text-left">
              <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform shrink-0">
                <Users size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Submissions</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white tabular-nums leading-tight">
                  {stats.totalSubmissions}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Paid */}
        <Card className="border-0 shadow-sm bg-white dark:bg-zinc-900 overflow-hidden group hover:shadow-md transition-all rounded-2xl">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 md:gap-4 text-center sm:text-left">
              <div className="p-2.5 sm:p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform shrink-0">
                <DollarSign size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Payout</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white tabular-nums leading-tight">
                  ${stats.totalPayout.toFixed(0)}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 md:mt-12">
        <div className="mb-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Submission History</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage and track all user rewards</p>
        </div>
        <ContentRewardsTable data={mappedSubmissions} />
      </div>
    </div>
  );
};

export default Analytics;
