import { Progress } from "@/components/ui/progress";
import { Link } from "react-router";

const Apply = () => {
  return (
    <div className="p-6 text-[#717171] ">
      <div className="bg-gray-100 dark:bg-zinc-950 p-6 rounded-xl max-w-2xl items-center justify-center mx-auto">
        <div className="flex justify-between mb-3.5">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img
              src="https://i.pravatar.cc/36"
              alt="Profile"
              className="w-7 h-7 rounded-full"
            />
            <Link to="">
              <span className="text-sm font-medium text-[#717171] dark:text-white capitalize">
                Prothinidi Thomas
              </span>
            </Link>
          </div>

          <span className="font-semibold text-[#003933] text-xs">$5.00/1k</span>
        </div>
        <div>
          <h3 className="text-[#090003] text-sm mb-1.5">
            Destroying 1on1’s Clips{" "}
          </h3>
          <p className="text-xs mb-3.5">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking...
          </p>
          <div className="text-xs flex justify-between mb-2.5">
            <span className="">$1673.18 of $14968.30</span>
            <span>7%</span>
          </div>
          <Progress value={7} indicatorColor="red" />
        </div>
      </div>
    </div>
  );
};

export default Apply;
