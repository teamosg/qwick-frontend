import { Button } from "@/components/ui/button";
import ProfileBalanceData from "./ProfileBalanceData";
import { useGetWalletBalance } from "@/hooks/payment.hook";
import BalanceCardSkeleton from "./components/BalanceCardSkeleton";
import { FetchErrorAlert } from "@/components/Alerts/FetchErrorAlerts";

const ProfileBalance = () => {
  const {
    data: walletBalance,
    isLoading: isLoadingBalance,
    isError: isErrorBalance,
  } = useGetWalletBalance();

  if (isErrorBalance)
    return (
      <FetchErrorAlert message="Unable to load wallet balance. Please refresh." />
    );
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Two-factor authentication section */}
      {isLoadingBalance ? (
        <BalanceCardSkeleton />
      ) : (
        <div className="p-6 text-left text-[#717171] dark:text-white text-sm mb-4 sm:mb-4.5 w-full shadow rounded-[16px] sm:rounded-[24px] bg-white dark:bg-[#2E2E2E]">
          <p>Total Balance</p>
          <h3 className="py-3 text-[20px] text-[#090003] dark:text-white">
            ${walletBalance?.balance || 0}
          </h3>
          <p>$0.00 available to withdraw</p>
          {/* Sign In Button */}
          <Button className="items-center justify-center whitespace-nowrap text-sm disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs h-9 has-[>svg]:px-3 bg-[#003933] dark:bg-[#003933] text-white px-4 py-2 sm:py-6 sm:px-10 rounded-3xl sm:rounded-full hover:bg-[#002822] dark:hover:bg-primary/90 transition font-medium cursor-pointer flex gap-2 m-auto text-center">
            Withdraw
          </Button>
        </div>
      )}
      <ProfileBalanceData />
    </div>
  );
};

export default ProfileBalance;
