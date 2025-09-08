import { ArrowUpRight, ShoppingCart, Undo2 } from "lucide-react";
import { AnalyticsChart } from "./AnalyticsChart";

const Analytics = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <div className="shadow p-4 rounded-lg bg-white">
          <div className="flex flex-col gap-3 p-6">
            <h3 className="flex items-center gap-2">
              <span className="bg-[#003933] w-8 h-8 rounded-full  flex items-center justify-center">
                <ShoppingCart className="text-white" size={18} />
              </span>
              <span className="text-[#858D9D] font-semibold text-sm">
                New users
              </span>
            </h3>

            <h2 className="text-[#090003] text-2xl font-semibold">3</h2>
            <div className="flex items-center gap-2">
              <span className="flex items-center border-r">
                <span className="text-sm font-semibold text-primary">24%</span>
                <ArrowUpRight />
              </span>
              <h3 className="text-[#858D9D] text-sm">From last week</h3>
            </div>
          </div>
        </div>

        <div className="shadow p-4 rounded-lg bg-white">
          <div className="flex flex-col gap-3 p-6">
            <h3 className="flex items-center gap-2">
              <span className="bg-[#ec3131] w-8 h-8 rounded-full  flex items-center justify-center">
                <Undo2 className="text-white" size={18} />
              </span>
              <span className="text-[#858D9D] font-semibold text-sm">
                Total views
              </span>
            </h3>

            <h2 className="text-[#090003] text-2xl font-semibold">1.2M</h2>
            <div className="flex items-center gap-2">
              <span className="flex items-center border-r">
                <span className="text-sm font-semibold text-primary">24%</span>
                <ArrowUpRight />
              </span>
              <h3 className="text-[#858D9D] text-sm">From last week</h3>
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-5 shadow bg-white rounded-xl">
            <div className="w-10 h-10 rounded-full bg-[#1BC285] flex items-center justify-center mb-4">
              <DollarSign color="#fff" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-[#212B36] dark:text-white mb-1">
              12,489
            </h2>
            <p className="text-xs text-gray-600 dark:text-zinc-400">
              Total Balance
            </p>
          </div>
          <div className="p-5 shadow bg-white rounded-xl">
            <div className="w-10 h-10 rounded-full bg-[#1BC285] flex items-center justify-center mb-4">
              <DollarSign color="#fff" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-[#212B36] dark:text-white mb-1">
              12,489
            </h2>
            <p className="text-xs text-gray-600 dark:text-zinc-400">
              Total Cash in
            </p>
          </div>
        </div> */}
        {/* <ContentRewardNav />
      <Card className="bg-white dark:bg-gray-900 border-0 shadow-sm">
        <CardContent className="p-12 text-center">
          <div>
            <div className="overflow-hidden p-10">
              <h2 className="text-2xl font-bold dark:text-white mb-3.5">
                No analytics data
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Analytics data will appear here once you start creating and
                managing content rewards.
              </p>
            </div>
            <div className="mt-8 max-w-md text-center mx-auto">
              <Link
                to="/dashboard/content-reward"
                className="bg-[#003933] dark:bg-[#003933] text-white px-4 py-2 sm:py-4 sm:px-10 rounded-3xl sm:rounded-full hover:bg-[#002822] dark:hover:bg-primary/90 transition font-medium cursor-pointer"
              >
                Create your first reward
              </Link>
            </div>
          </div>
        </CardContent>
      </Card> */}
      </div>
      <AnalyticsChart />
    </div>
  );
};

export default Analytics;
