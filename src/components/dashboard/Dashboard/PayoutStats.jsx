import { DollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const PayoutStatCard = ({ isLoading, label, value, icon: Icon = DollarSign, bgColor = "bg-success" }) => {
    return (
        <div className="p-5 shadow bg-card dark:bg-card rounded-xl">
            <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center mb-4`}>
                <Icon className="text-white" size={24} />
            </div>
            {isLoading ? (
                <Skeleton className="h-9 w-24 mb-1" />
            ) : (
                <h2 className="text-3xl font-bold text-foreground-strong dark:text-white mb-1">
                    {value}
                </h2>
            )}
            <p className="text-xs text-muted-foreground dark:text-muted-foreground">
                {label}
            </p>
        </div>
    );
};

const PayoutStats = ({ isLoading, stats = [] }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
                <PayoutStatCard
                    key={index}
                    isLoading={isLoading}
                    label={stat.label}
                    value={stat.value}
                    icon={stat.icon}
                    bgColor={stat.bgColor}
                />
            ))}
        </div>
    );
};

export default PayoutStats;
