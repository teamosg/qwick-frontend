import { Button } from "@/components/ui/button";
import ProfileBalanceData from "./ProfileBalanceData";

const ProfileBalance = () => {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Two-factor authentication section */}
      <div className="p-6 text-left text-[#717171] text-sm mb-4 sm:mb-4.5 w-full shadow rounded-[16px] sm:rounded-[24px]">
        <p>Total Balance</p>
        <h3 className="py-3 text-[20px] text-[#090003] dark:text-white">$0.00</h3>
        <p>$0.00 available to withdraw</p>
        {/* Sign In Button */}
        <Button className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-900 text-white rounded-full py-4 sm:py-6 text-base sm:text-lg font-medium mt-4 sm:mt-8 px-6 sm:px-8">
          Withdraw
        </Button>
      </div>
      <ProfileBalanceData />
    </div>
  );
};

export default ProfileBalance;
