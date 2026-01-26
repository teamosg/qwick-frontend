import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { useWithdraw, useProcessWithdrawal } from "@/hooks/payment.hook";

const WithdrawModal = ({ open, setOpen }) => {
    const { mutate: withdraw, isPending: withdrawLoading } = useWithdraw();
    const { mutate: processWithdraw, isPending: isProcessing } = useProcessWithdrawal();

    const [amount, setAmount] = useState("");
    const [connectedAccountId, setConnectedAccountId] = useState("");
    const [withdrawalData, setWithdrawalData] = useState(null);

    const handleWithdraw = () => {
        withdraw(
            {
                amount: amount,
                destination_type: "connected_account",
                connected_account_id: connectedAccountId
            },
            {
                onSuccess: (res) => {
                    // res is the full axios response object
                    if (res?.data?.success) {
                        setWithdrawalData(res.data);
                    }
                }
            }
        )
    };

    const handleConfirm = () => {
        processWithdraw(
            { withdrawal_id: withdrawalData.withdrawal_id },
            {
                onSuccess: (data) => {
                    if (data?.success) {
                        setOpen(false);
                        // Reset form
                        setWithdrawalData(null);
                        setAmount("");
                        setConnectedAccountId("");
                    }
                }
            }
        );
    };

    const handleCancel = () => {
        setOpen(false);
        setWithdrawalData(null);
    };

    return (
        <Dialog open={open} onOpenChange={(val) => {
            setOpen(val);
            if (!val) setWithdrawalData(null);
        }}>
            <DialogContent className="sm:max-w-md space-y-4">
                <DialogHeader>
                    <DialogTitle>{withdrawalData ? "Confirm Withdrawal" : "Withdraw Funds"}</DialogTitle>
                </DialogHeader>

                {!withdrawalData ? (
                    <div className="space-y-4">
                        {/* Amount */}
                        <div>
                            <label className="text-sm font-medium">Amount</label>
                            <Input
                                type="number"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="mt-1"
                            />
                        </div>

                        {/* Connected Account ID */}
                        <div>
                            <label className="text-sm font-medium">Stripe Connected Account ID</label>
                            <Input
                                type="text"
                                placeholder="Enter Account ID (e.g. acct_...)"
                                value={connectedAccountId}
                                onChange={(e) => setConnectedAccountId(e.target.value)}
                                className="mt-1"
                            />
                        </div>

                        {/* Submit */}
                        <Button
                            onClick={handleWithdraw}
                            disabled={!amount || !connectedAccountId || withdrawLoading}
                            className="w-full bg-[#003933] hover:bg-[#002822] text-white mt-2"
                        >
                            {withdrawLoading ? <Spinner className="w-4 h-4" /> : "Confirm Withdraw"}
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6 py-2">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Requested Amount</span>
                                <span className="font-semibold text-gray-900 dark:text-white">${withdrawalData.amount}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Processing Fee</span>
                                <span className="font-semibold text-gray-900 dark:text-white">${withdrawalData.processing_fee}</span>
                            </div>
                            <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
                            <div className="flex justify-between items-center">
                                <span className="text-base font-bold text-gray-900 dark:text-white">Net to Receive</span>
                                <span className="text-lg font-bold text-[#003933] dark:text-[#00c3b0]">${withdrawalData.net_amount}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button
                                variant="outline"
                                onClick={handleCancel}
                                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                                disabled={isProcessing}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleConfirm}
                                className="w-full bg-[#003933] hover:bg-[#002822] text-white"
                                disabled={isProcessing}
                            >
                                {isProcessing ? <Spinner className="w-4 h-4" /> : "Confirm"}
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default WithdrawModal;
