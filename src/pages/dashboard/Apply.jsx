import { Progress } from "@/components/ui/progress";
import { ArrowLeft, DollarSign, Users } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router";

const Apply = () => {
  return (
    <div className="p-6 text-foreground-subtle bg-background dark:bg-zinc-950 min-h-screen">
      <div className="mb-9 inline-block">
        <Link
          to="#"
          className="px-4 py-2.5 bg-foreground-strong rounded-2xl text-white text-[16px] font-light flex gap-1.5 "
        >
          <ArrowLeft />
          Back to rewards
        </Link>
      </div>
      <div className="dark:text-white dark:bg-zinc-900  p-6 rounded-xl max-w-2xl items-center justify-center mx-auto shadow mb-6 border border-gray-200 dark:border-zinc-700">
        <div className="flex justify-between mb-3.5">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img
              src="https://i.pravatar.cc/36"
              alt="Profile"
              className="w-7 h-7 rounded-full"
            />
            <Link to="">
              <span className="text-sm font-medium text-foreground-subtle dark:text-white hover:text-foreground-strong transition capitalize">
                Prothinidi Thomas
              </span>
            </Link>
          </div>

          <span className="font-semibold text-foreground-strong text-xs">$5.00/1k</span>
        </div>
        <div>
          <h3 className="text-foreground-strong text-sm mb-1.5 dark:text-white">
            Destroying 1on1’s Clips{" "}
          </h3>
          <p className="text-xs mb-3.5 dark:text-zinc-400">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking...
          </p>
          <div className="text-xs flex justify-between mb-2.5">
            <span className="">$1673.18 of $14968.30</span>
            <span>7%</span>
          </div>
          <Progress value={7} indicatorColor="red" className="mb-3.5" />
          <div className="flex gap-6 md:gap-15 mb-6">
            <div>
              <p className="text-foreground-strong text-sm mb-1 font-semibold dark:text-white">
                Type
              </p>
              <p className="text-foreground-subtle text-sm dark:text-zinc-400">
                Clipping
              </p>
            </div>
            <div>
              <p className="text-foreground-strong text-sm mb-1 font-semibold  dark:text-white">
                Platforms
              </p>
              <p className="text-foreground-strong text-sm">
                <span className="flex gap-2 dark:text-zinc-400">
                  <FaInstagram size={20} /> <FaFacebook size={20} />
                  <FaYoutube size={20} />
                </span>
              </p>
            </div>
            <div>
              <p className="text-foreground-strong text-sm mb-1 font-semibold dark:text-white">
                Views
              </p>
              <p className="text-foreground-subtle text-sm">47,116</p>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-sm text-foreground-strong mb-1.5 dark:text-white">
              Requirements
            </h3>
            <p className="text-xs text-foreground-subtle dark:text-zinc-400">
              Must include #destrtroing and website link
            </p>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2 p-3 bg-foreground-strong text-white rounded-2xl">
              <div className="mb-2 flex gap-2.5">
                <Users />
                <h2 className="text-sm">Applications Process</h2>
              </div>
              <p className="text-xs">Quick approval, usually within 24 hours</p>
            </div>
            <div className="w-1/2 p-3 bg-foreground-strong text-white rounded-2xl">
              <div className="mb-2 flex gap-2.5">
                <DollarSign />
                <h2 className="text-sm">Payment Terms</h2>
              </div>
              <p className="text-xs">
                Payments sent within 7 days verified views
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="dark:text-white dark:bg-zinc-900  p-6 rounded-xl max-w-2xl items-center justify-center mx-auto shadow mb-6 border border-gray-200 dark:border-zinc-700">
        <div className="mb-3.5">
          <h3 className="text-foreground-strong dark:text-white text-sm font-semibold mb-4">
            Apply for this reward
          </h3>
          <ul className="flex flex-col gap-2 ">
            <li className="flex gap-1 items-center">
              <span>
                <DollarSign className="text-foreground-strong" size={18} />
              </span>
              <span className="text-foreground-strong dark:text-white text-[12px]">
                Verified campaign
              </span>
            </li>
            <li className="flex gap-1 items-center">
              <span>
                <DollarSign className="text-foreground-strong" size={18} />
              </span>
              <span className="text-foreground-strong dark:text-white text-[12px]">
                Fast approval process
              </span>
            </li>
            <li className="flex gap-1 items-center">
              <span>
                <DollarSign className="text-foreground-strong" size={18} />
              </span>
              <span className="text-foreground-strong dark:text-white text-[12px]">
                47,116 views generated
              </span>
            </li>
          </ul>
        </div>
        <div className="text-center">
          <Link
            to="/confirm-apply"
            className="block mb-2.5 w-full text-white bg-foreground-strong hover:bg-foreground text-[18px] font-semibold p-2.5 rounded-full cursor-pointer  transition"
          >
            Apply
          </Link>
          <Link to="/" className="text-foreground-strong text-xs dark:text-zinc-400">
            Save for later
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Apply;
