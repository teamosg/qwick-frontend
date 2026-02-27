import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { HelpCircle } from "lucide-react";
import { useState } from "react";
import { useWithdraw, useProcessWithdrawal } from "@/hooks/payment.hook";

const WithdrawModal = ({ open, setOpen }) => {
    const { mutate: withdraw, isPending: withdrawLoading } = useWithdraw();
    const { mutate: processWithdraw, isPending: isProcessing } = useProcessWithdrawal();

    const [amount, setAmount] = useState("");
    const [connectedAccountId, setConnectedAccountId] = useState("");
    const [method, setMethod] = useState("connected_account");
    const [bankData, setBankData] = useState({
        bank_name: "",
        bank_account_number: "",
        account_holder_name: ""
    });
    const [withdrawalData, setWithdrawalData] = useState(null);

    const handleWithdraw = () => {
        const payload = {
            amount: amount,
            destination_type: method,
        };

        if (method === "connected_account") {
            payload.connected_account_id = connectedAccountId;
        } else {
            payload.bank_name = bankData.bank_name;
            payload.bank_account_number = bankData.bank_account_number;
            payload.account_holder_name = bankData.account_holder_name;
            payload.routing_number = "110000000";
        }

        withdraw(
            payload,
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
                        setMethod("connected_account");
                        setBankData({
                            bank_name: "",
                            bank_account_number: "",
                            account_holder_name: ""
                        });
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
                        {/* Method Selector */}
                        <div className="flex p-1 bg-gray-100 dark:bg-zinc-800/50 rounded-xl border border-gray-200 dark:border-zinc-700">
                            <button
                                onClick={() => setMethod("connected_account")}
                                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${method === "connected_account"
                                    ? "bg-white dark:bg-zinc-700 shadow-sm text-[#003933] dark:text-[#00b89f]"
                                    : "text-gray-500 dark:text-zinc-500 hover:text-gray-700"
                                    }`}
                            >
                                Stripe Connected
                            </button>
                            <button
                                onClick={() => setMethod("bank_account")}
                                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${method === "bank_account"
                                    ? "bg-white dark:bg-zinc-700 shadow-sm text-[#003933] dark:text-[#00b89f]"
                                    : "text-gray-500 dark:text-zinc-500 hover:text-gray-700"
                                    }`}
                            >
                                Bank Transfer
                            </button>
                        </div>

                        {/* Amount */}
                        <div>
                            <label className="text-sm font-bold text-gray-700 dark:text-zinc-300">Amount</label>
                            <Input
                                type="number"
                                placeholder="Enter amount (e.g. 10.00)"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="mt-1.5 h-12 rounded-xl bg-gray-50 dark:bg-zinc-800 border-none focus-visible:ring-2 focus-visible:ring-[#003933]/20"
                            />
                        </div>

                        {method === "connected_account" ? (
                            /* Connected Account ID */
                            <div>
                                <label className="text-sm font-bold text-gray-700 dark:text-zinc-300 flex items-center gap-2">
                                    Stripe Connected Account ID
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button type="button" tabIndex={-1}>
                                                <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-72 text-sm">
                                            Your account must be connected with Stripe to receive funds via this method.
                                        </PopoverContent>
                                    </Popover>
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Enter Account ID (e.g. acct_...)"
                                    value={connectedAccountId}
                                    onChange={(e) => setConnectedAccountId(e.target.value)}
                                    className="mt-1.5 h-12 rounded-xl bg-gray-50 dark:bg-zinc-800 border-none focus-visible:ring-2 focus-visible:ring-[#003933]/20"
                                />
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-xl flex items-start gap-3">
                                    <HelpCircle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                                    <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed font-medium">
                                        Your account needs to be connected with Stripe even for bank transfers to process your payout securely.
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-700 dark:text-zinc-300">Bank Name</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter Bank Name"
                                        value={bankData.bank_name}
                                        onChange={(e) => setBankData({ ...bankData, bank_name: e.target.value })}
                                        className="mt-1.5 h-12 rounded-xl bg-gray-50 dark:bg-zinc-800 border-none focus-visible:ring-2 focus-visible:ring-[#003933]/20"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-700 dark:text-zinc-300">Account Holder Name</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter Name"
                                        value={bankData.account_holder_name}
                                        onChange={(e) => setBankData({ ...bankData, account_holder_name: e.target.value })}
                                        className="mt-1.5 h-12 rounded-xl bg-gray-50 dark:bg-zinc-800 border-none focus-visible:ring-2 focus-visible:ring-[#003933]/20"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-700 dark:text-zinc-300">Account Number</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter Account Number"
                                        value={bankData.bank_account_number}
                                        onChange={(e) => setBankData({ ...bankData, bank_account_number: e.target.value })}
                                        className="mt-1.5 h-12 rounded-xl bg-gray-50 dark:bg-zinc-800 border-none focus-visible:ring-2 focus-visible:ring-[#003933]/20"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Submit */}
                        <Button
                            onClick={handleWithdraw}
                            disabled={
                                !amount ||
                                (method === "connected_account" ? !connectedAccountId : (!bankData.bank_name || !bankData.account_holder_name || !bankData.bank_account_number)) ||
                                withdrawLoading
                            }
                            className="w-full h-12 rounded-xl bg-[#003933] hover:bg-[#002822] text-white mt-2 shadow-lg shadow-[#003933]/10"
                        >
                            {withdrawLoading ? <Spinner className="w-4 h-4" /> : "Request Withdrawal"}
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
