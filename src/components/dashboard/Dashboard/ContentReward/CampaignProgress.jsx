import ProgressStatus from "@/components/discover/ProgressStatus";

const CampaignProgress = ({ totalUsersEarning, initialBudget, budget, showTitle = true }) => {
    const currentBudget = initialBudget || budget || 0;
    const earning = parseFloat(totalUsersEarning || 0);

    const progress = currentBudget > 0
        ? Math.min(Math.max((earning / parseFloat(currentBudget)) * 100, 0), 100)
        : 0;

    return (
        <div className="mb-2.5">
            {showTitle && (
                <h4 className="text-foreground text-sm mb-2.5 dark:text-white uppercase font-semibold">
                    Campaign Progress
                </h4>
            )}
            <p className="text-foreground-subtle text-xs flex justify-between dark:text-zinc-400 mb-2 font-medium">
                <span className=""> ${earning.toFixed(2)} of ${currentBudget}</span>
                <span>{progress.toFixed(0)}%</span>
            </p>
            <ProgressStatus progress={progress} />
        </div>
    );
};

export default CampaignProgress;
