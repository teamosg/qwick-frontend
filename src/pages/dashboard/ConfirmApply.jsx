import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router";

const ConfirmApply = () => {
  return (
    <div className="p-6 text-[#717171]">
      <div className="mb-9 inline-block">
        <Link
          to="#"
          className=" px-4 py-2.5 bg-[#3fa796] rounded-2xl text-white text-[16px] font-light flex gap-1.5 "
        >
          <ArrowLeft />
          Back to rewards
        </Link>
      </div>
      <div className="dark:text-white dark:bg-zinc-900  p-6 rounded-xl items-center justify-center mx-auto shadow mb-6 max-w-5xl">
        <div className="mb-6">
          <img
            src="/confirm-apply.png"
            alt=""
            className="w-full h-auto object-cover mb-7 rounded-xl"
          />
          <p className="text-[#717171] text-xs mb-7 dark:text-zinc-400">
            Only views after you submit count towards payout. Submit as soon as
            you post to get paid for all of your views.
          </p>
          <div className="mb-2.5">
            <h4 className="text-[#090003] text-sm mb-2.5 dark:text-white">
              PAID OUT
            </h4>
            <p className="text-[#717171] text-xs flex justify-between dark:text-zinc-400">
              <span className=""> $1673.18 of $14968.30</span> <span>7%</span>
            </p>
          </div>
          <Progress value={7} indicatorColor="red" className="mb-3.5" />
        </div>
        <div className="flex gap-6 md:gap-0 justify-between mb-9">
          <div>
            <p className="text-[#090003] text-sm mb-1 font-semibold dark:text-white">
              Reward
            </p>
            <p className="text-[#717171] text-sm dark:dark:text-zinc-400">
              $3.00/1k
            </p>
          </div>
          <div>
            <p className="text-[#090003] text-sm mb-1 font-semibold dark:text-white">
              Type
            </p>
            <p className="text-[#717171] text-sm dark:dark:text-zinc-400">
              Clipping
            </p>
          </div>
          <div>
            <p className="text-[#090003] text-sm mb-1 font-semibold dark:text-white">
              Clipping
            </p>
            <p className="text-[#717171] text-sm dark:dark:text-zinc-400">
              $3.00/1k
            </p>
          </div>
          <div>
            <p className="text-[#090003] text-sm mb-1 font-semibold dark:text-white">
              Maximum Payout
            </p>
            <p className="text-[#717171] text-sm dark:dark:text-zinc-400">
              $3.00/1k
            </p>
          </div>
          <div>
            <p className="text-[#090003] text-sm mb-1 font-semibold  dark:text-white">
              Platforms
            </p>
            <p className="text-[#003933] text-sm">
              <span className="flex gap-2 dark:dark:text-zinc-400">
                <FaInstagram size={20} /> <FaFacebook size={20} />
                <FaYoutube size={20} />
              </span>
            </p>
          </div>
          <div>
            <p className="text-[#090003] text-sm mb-1 font-semibold dark:text-white">
              Category
            </p>
            <p className="text-[#717171] text-sm">$3.00/1k</p>
          </div>
        </div>
        <div className="text-center flex items-end justify-end ">
          <button className="w-sm mb-2.5 text-white bg-[#003933] dark:bg-[#3fa796] dark:hover:bg-[#0dc4a5]  text-[18px] font-semibold p-2.5 rounded-full cursor-pointer hover:bg-emerald-700  transition">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmApply;
