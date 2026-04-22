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
import { CheckCircle2, HelpCircle, Trash2, Landmark } from "lucide-react";
import { useState, useEffect } from "react";
import { useWithdraw, useGetSavedMethods, useDeleteSavedMethod } from "@/hooks/payment.hook";

const WithdrawModal = ({ open, setOpen }) => {
    const { mutate: withdraw, isPending: withdrawLoading } = useWithdraw();
    const { data: savedMethods, isLoading: savedMethodsLoading } = useGetSavedMethods();
    const { mutate: deleteSavedMethod, isPending: deletingMethod } = useDeleteSavedMethod();

    const [amount, setAmount] = useState("");
    const [connectedAccountId, setConnectedAccountId] = useState("");
    const [method, setMethod] = useState("bank_account");
    const [bankData, setBankData] = useState({
        bank_name: "",
        bank_account_number: "",
        account_holder_name: ""
    });
    const [withdrawalData, setWithdrawalData] = useState(null);

    const handleSelectSavedMethod = (m) => {
        setBankData({
            bank_name: m.bank_name,
            bank_account_number: m.last4,
            account_holder_name: m.account_holder_name
        });
    };

    // Reset state whenever the modal is closed
    useEffect(() => {
        if (!open) {
            setWithdrawalData(null);
            setAmount("");
            setConnectedAccountId("");
            setMethod("bank_account");
            setBankData({
                bank_name: "",
                bank_account_number: "",
                account_holder_name: ""
            });
        }
    }, [open]);

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

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md space-y-4">
                <DialogHeader>
                    <DialogTitle>{withdrawalData ? "Request Status" : "Withdraw Funds"}</DialogTitle>
                </DialogHeader>

                {!withdrawalData ? (
                    <div className="space-y-4">
                        {/* Method Selector */}
                        <div className="flex p-1 bg-gray-100 dark:bg-zinc-800/50 rounded-xl border border-gray-200 dark:border-zinc-700">

                            <button
                                onClick={() => setMethod("bank_account")}
                                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${method === "bank_account"
                                    ? "bg-white dark:bg-zinc-700 shadow-sm text-[#003933] dark:text-[#00b89f]"
                                    : "text-gray-500 dark:text-zinc-500 hover:text-gray-700"
                                    }`}
                            >
                                Bank Transfer
                            </button>
                            <button
                                onClick={() => setMethod("connected_account")}
                                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${method === "connected_account"
                                    ? "bg-white dark:bg-zinc-700 shadow-sm text-[#003933] dark:text-[#00b89f]"
                                    : "text-gray-500 dark:text-zinc-500 hover:text-gray-700"
                                    }`}
                            >
                                Stripe Connected
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

                                {/* Saved Methods Section */}
                                {savedMethodsLoading ? (
                                    <div className="flex items-center justify-center py-4">
                                        <Spinner className="w-5 h-5 text-[#003933]" />
                                    </div>
                                ) : (
                                    savedMethods && savedMethods.length > 0 && (
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Saved Methods</label>
                                            </div>
                                            <div className="grid gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                                                {savedMethods.map((m) => (
                                                    <div
                                                        key={m.id}
                                                        onClick={() => handleSelectSavedMethod(m)}
                                                        className="group relative flex items-center justify-between p-3 bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl hover:border-[#003933] dark:hover:border-[#00b89f]/50 transition-all cursor-pointer"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-zinc-700 flex items-center justify-center text-[#003933] dark:text-[#00b89f]">
                                                                <Landmark size={16} />
                                                            </div>
                                                            <div className="text-left">
                                                                <p className="text-xs font-bold text-gray-900 dark:text-white leading-none">{m.bank_name}</p>
                                                                <p className="text-[10px] text-gray-500 mt-1 font-medium">**** {m.last4} • {m.account_holder_name}</p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                if (window.confirm("Delete this saved method?")) {
                                                                    deleteSavedMethod(m.id);
                                                                }
                                                            }}
                                                            className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                )}

                                <div className="relative py-2">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-gray-100 dark:border-zinc-800" />
                                    </div>
                                    <div className="relative flex justify-center text-[10px] uppercase tracking-tighter">
                                        <span className="bg-white dark:bg-[#1C1C1C] px-2 text-gray-400 font-bold">Manual Entry</span>
                                    </div>
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
                        <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
                            <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-10 h-10 text-green-500" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {withdrawalData?.message || "Withdrawal request submitted"}
                                </h3>
                                <p className="text-sm text-gray-500">Your request has been received</p>
                            </div>

                            <div className="w-full bg-gray-50 dark:bg-zinc-800/50 rounded-2xl p-4 border border-gray-100 dark:border-zinc-700/50 space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Withdrawal ID</span>
                                    <span className="font-mono font-bold text-gray-900 dark:text-white">
                                        #{withdrawalData?.withdrawal_id}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Status</span>
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 capitalize">
                                        {withdrawalData?.status || "pending"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={handleCancel}
                            className="w-full h-12 rounded-xl bg-[#003933] hover:bg-[#002822] text-white shadow-lg shadow-[#003933]/10"
                        >
                            Close
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default WithdrawModal;
