import { useCommunityStore } from "@/store/communityStore";
import { useGetCampaignBudgets } from "@/hooks/community.hook";
import PayoutStats from "./PayoutStats";
import { DollarSign, LayoutDashboard } from "lucide-react";

const CampaignBudgets = () => {
    const { selectedBrandCommunity } = useCommunityStore();
    const { data, isLoading } = useGetCampaignBudgets(selectedBrandCommunity?.id);

    const totalBudget = data?.campaigns?.reduce((acc, campaign) => acc + parseFloat(campaign.current_budget || 0), 0) || 0;
    const totalCampaigns = data?.total_campaigns || 0;

    const stats = [
        {
            label: "Total Budget",
            value: `$${totalBudget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            icon: DollarSign,
            bgColor: "bg-success",
        },
        {
            label: "Total Campaigns",
            value: totalCampaigns,
            icon: LayoutDashboard,
            bgColor: "bg-blue-400",
        },
        /* 
        // Hidden as per user request (missing info in campaign-budgets API)
        {
          label: "Total Withdrawal",
          value: "0.00",
          icon: DollarSign,
          bgColor: "bg-red-400",
        },
        {
          label: "Total Transfer",
          value: "0.00",
          icon: DollarSign,
          bgColor: "bg-red-400",
        },
        {
          label: "Total Cash in",
          value: "0.00",
          icon: DollarSign,
          bgColor: "bg-success",
        } 
        */
    ];

    return <PayoutStats isLoading={isLoading} stats={stats} />;
};

export default CampaignBudgets;
