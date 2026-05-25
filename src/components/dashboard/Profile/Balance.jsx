import { Button } from "@/components/ui/button";
import ProfileBalanceData from "./ProfileBalanceData";
import { useGetWalletBalance } from "@/hooks/payment.hook";
import BalanceCardSkeleton from "./components/BalanceCardSkeleton";
import { FetchErrorAlert } from "@/components/Alerts/FetchErrorAlerts";
import WithdrawModal from "./components/WithdrawModal";
import { useState } from "react";
import WithdrawList from "./components/WithdrawList";

const ProfileBalance = () => {
  const {
    data: walletBalance,
    isLoading: isLoadingBalance,
    isError: isErrorBalance,
  } = useGetWalletBalance();

  const [openWithdraw, setOpenWithdraw] = useState(false);

  if (isErrorBalance)
    return (
      <FetchErrorAlert message="Unable to load wallet balance. Please refresh." />
    );

  return (
    <div className="p-4 md:p-6 space-y-4 sm:space-y-6">
      {isLoadingBalance ? (
        <BalanceCardSkeleton />
      ) : (
        <div className="p-6 text-left text-foreground-subtle dark:text-white text-sm mb-4 sm:mb-4.5 w-full shadow rounded-[16px] sm:rounded-[24px] bg-white dark:bg-zinc-800">
          <p>Total Balance</p>

          <h3 className="py-3 text-[20px] text-foreground dark:text-white">
            ${walletBalance?.balance || 0}
          </h3>

          <p>${walletBalance?.balance || 0} available to withdraw</p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            {/* Withdraw */}
            <Button
              onClick={() => setOpenWithdraw(true)}
              className="bg-foreground-strong text-white hover:bg-foreground rounded-full"
            >
              Withdraw
            </Button>
          </div>
        </div>
      )}

      <WithdrawModal open={openWithdraw} setOpen={setOpenWithdraw} />

      {/* <ProfileBalanceData /> */}

      <WithdrawList />
    </div>
  );
};

export default ProfileBalance;
