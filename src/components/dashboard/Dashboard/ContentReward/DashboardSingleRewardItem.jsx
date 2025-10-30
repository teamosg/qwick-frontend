import { Progress } from "@/components/ui/progress";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router";

const DashboardSingleRewardItem = () => {
  return (
    <Link to={`/dashboard/content-reward/edit/1`}>
      <div className="hover:scale-101 hover:shadow-lg transition-all duration-300 ease-in-out dark:text-white dark:bg-zinc-900 p-4 rounded-xl items-center justify-center mx-auto shadow mb-4 bg-white">
        <div className="flex flex-row gap-4 w-full">
          <img
            src="https://placehold.co/400x500"
            alt=""
            className="w-[150px] h-[150px] object-cover rounded-xl"
          />
          <div className="flex-1">
            <div className="mb-2.5">
              <h4 className="text-[#090003] text-sm mb-2.5 dark:text-white">
                Destroying 1on1's Clips
              </h4>
              <p className="text-xs dark:text-zinc-400 flex gap-2 items-center mb-3.5">
                <span>
                  Only views after you submit count towards payout. Submit as
                  soon as you post to get paid for all of your views.
                </span>
              </p>
              <p className="text-xs flex justify-between dark:text-zinc-400">
                <span className=""> $1673.18 of $14968.30</span> <span>7%</span>
              </p>
            </div>
            <Progress value={7} indicatorColor="red" className="mb-3.5" />
            <div className="grid grid-cols-2 gap-3 sm:flex sm:justify-between mb-9">
              <div>
                <p className="text-[#090003] text-sm mb-1 font-semibold dark:text-white">
                  Reward
                </p>
                <p className="text-sm dark:text-zinc-400">$3.00/1k</p>
              </div>
              <div>
                <p className="text-[#090003] text-sm mb-1 font-semibold dark:text-white">
                  Type
                </p>
                <p className="text-sm dark:text-zinc-400">Clipping</p>
              </div>
              <div>
                <p className="text-[#090003] text-sm mb-1 font-semibold dark:text-white">
                  Clipping
                </p>
                <p className="text-sm dark:text-zinc-400">$3.00/1k</p>
              </div>
              <div>
                <p className="text-[#090003] text-sm mb-1 font-semibold dark:text-white">
                  Maximum Payout
                </p>
                <p className="text-sm dark:text-zinc-400">$3.00/1k</p>
              </div>
              <div>
                <p className="text-[#090003] text-sm mb-1 font-semibold  dark:text-white">
                  Platforms
                </p>
                <p className="text-[#003933] text-sm">
                  <span className="flex gap-2 dark:text-zinc-400">
                    <FaInstagram size={20} /> <FaFacebook size={20} />
                    <FaYoutube size={20} />
                  </span>
                </p>
              </div>
              <div>
                <p className="text-[#090003] text-sm mb-1 font-semibold dark:text-white">
                  Category
                </p>
                <p className="text-sm dark:text-zinc-400">$3.00/1k</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DashboardSingleRewardItem;
