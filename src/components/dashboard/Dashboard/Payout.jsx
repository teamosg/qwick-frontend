import { DollarSign } from "lucide-react";
import PayoutData from "./PayoutData";

const Payout = () => {
  return (
    <div>
      <h2 class="text-[24px] text-gray-900 dark:text-white font-semibold mb-3">
        Payout
      </h2>
      <div className="grid grid-cols-4 gap-4 mb-6">
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
          <div className="w-10 h-10 rounded-full bg-red-400 flex items-center justify-center mb-4">
            <DollarSign color="#fff" size={24} />
          </div>
          <h2 className="text-3xl font-bold text-[#212B36] dark:text-white mb-1">
            12,489
          </h2>
          <p className="text-xs text-gray-600 dark:text-zinc-400">
            Total Withdrawal
          </p>
        </div>{" "}
        <div className="p-5 shadow bg-white rounded-xl">
          <div className="w-10 h-10 rounded-full bg-red-400 flex items-center justify-center mb-4">
            <DollarSign color="#fff" size={24} />
          </div>
          <h2 className="text-3xl font-bold text-[#212B36] dark:text-white mb-1">
            12,489
          </h2>
          <p className="text-xs text-gray-600 dark:text-zinc-400">
            Total Transfer
          </p>
        </div>{" "}
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
      </div>
      <div>
        <PayoutData />
      </div>
    </div>
  );
};
export default Payout;
