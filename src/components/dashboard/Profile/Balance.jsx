import { Button } from "@/components/ui/button";
import ProfileBalanceData from "./ProfileBalanceData";
import { useGetWalletBalance } from "@/hooks/payment.hook";
import BalanceCardSkeleton from "./components/BalanceCardSkeleton";
import { FetchErrorAlert } from "@/components/Alerts/FetchErrorAlerts";
import WithdrawModal from "./components/WithdrawModal";
import DepositModal from "./components/DepositModal";
import { useState } from "react";

const ProfileBalance = () => {
  const {
    data: walletBalance,
    isLoading: isLoadingBalance,
    isError: isErrorBalance,
  } = useGetWalletBalance();

  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [openDeposit, setOpenDeposit] = useState(false);

  if (isErrorBalance)
    return (
      <FetchErrorAlert message="Unable to load wallet balance. Please refresh." />
    );

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {isLoadingBalance ? (
        <BalanceCardSkeleton />
      ) : (
        <div className="p-6 text-left text-[#717171] dark:text-white text-sm mb-4 sm:mb-4.5 w-full shadow rounded-[16px] sm:rounded-[24px] bg-white dark:bg-[#2E2E2E]">
          <p>Total Balance</p>

          <h3 className="py-3 text-[20px] text-[#090003] dark:text-white">
            ${walletBalance?.balance || 0}
          </h3>

          <p>${walletBalance?.balance || 0} available to withdraw</p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            {/* Withdraw */}
            <Button
              onClick={() => setOpenWithdraw(true)}
              className="bg-[#003933] text-white hover:bg-[#002822] rounded-full"
            >
              Withdraw
            </Button>

            {/* Deposit */}
            <Button
              onClick={() => setOpenDeposit(true)}
              variant="outline"
              className="border-[#003933] text-[#003933] dark:text-white dark:border-white rounded-full"
            >
              Deposit
            </Button>
          </div>
        </div>
      )}

      <WithdrawModal open={openWithdraw} setOpen={setOpenWithdraw} />
      <DepositModal open={openDeposit} setOpen={setOpenDeposit} />

      <ProfileBalanceData />
    </div>
  );
};

export default ProfileBalance;
