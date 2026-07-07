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
import { CheckCircle2, HelpCircle, Trash2, Landmark, ChevronLeft, ArrowRight, Plus } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useWithdraw, useGetSavedMethods, useDeleteSavedMethod } from "@/hooks/payment.hook";

const WithdrawModal = ({ open, setOpen }) => {
    const { mutate: withdraw, isPending: withdrawLoading } = useWithdraw();
    const { data: savedMethods, isLoading: savedMethodsLoading } = useGetSavedMethods();
    const { mutate: deleteSavedMethod, isPending: deletingMethod } = useDeleteSavedMethod();

    const [view, setView] = useState("main"); // "main" | "saved_methods"
    const [amount, setAmount] = useState("");
    const [connectedAccountId, setConnectedAccountId] = useState("");
    const [method, setMethod] = useState("bank_account");
    const [bankData, setBankData] = useState({
        bank_name: "",
        bank_account_number: "",
        account_holder_name: ""
    });
    const [selectedMethodId, setSelectedMethodId] = useState(null);
    const [showManual, setShowManual] = useState(false);
    const [withdrawalData, setWithdrawalData] = useState(null);

    const hasSavedMethods = useMemo(() => savedMethods && savedMethods.length > 0, [savedMethods]);

    const handleSelectSavedMethod = (m) => {
        setBankData({
            bank_name: m.bank_name,
            bank_account_number: m.last4,
            account_holder_name: m.account_holder_name
        });
        setSelectedMethodId(m.id);
        setShowManual(false);
        setView("main");
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
            setSelectedMethodId(null);
            setShowManual(false);
            setView("main");
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
            <DialogContent className="sm:max-w-md p-0 overflow-hidden flex flex-col max-h-[95vh] border border-border bg-card">
                <DialogHeader className="p-6 pb-2 shrink-0">
                    <div className="flex items-center gap-2">
                        {view === "saved_methods" && (
                            <button
                                onClick={() => setView("main")}
                                className="p-2 -ml-2 hover:bg-secondary rounded-full transition-colors cursor-pointer"
                            >
                                <ChevronLeft size={20} className="text-foreground-muted" />
                            </button>
                        )}
                        <DialogTitle className="text-xl font-bold">
                            {withdrawalData ? "Request Status" : view === "saved_methods" ? "Saved Methods" : "Withdraw Funds"}
                        </DialogTitle>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-6 pt-2 custom-scrollbar">
                    {!withdrawalData ? (
                        view === "main" ? (
                            <div className="space-y-6">
                                {/* Method Selector */}
                                <div className="flex p-1 bg-secondary rounded-xl border border-border">
                                    <button
                                        onClick={() => setMethod("bank_account")}
                                        className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${method === "bank_account"
                                            ? "bg-card shadow-sm text-foreground-strong dark:text-white"
                                            : "text-foreground-muted hover:text-foreground"
                                            }`}
                                    >
                                        Bank Transfer
                                    </button>
                                    <button
                                        onClick={() => setMethod("connected_account")}
                                        className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${method === "connected_account"
                                            ? "bg-card shadow-sm text-foreground-strong dark:text-white"
                                            : "text-foreground-muted hover:text-foreground"
                                            }`}
                                    >
                                        Stripe Connected
                                    </button>
                                </div>

                                {/* Amount */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-foreground-muted uppercase tracking-wider">Amount to Withdraw</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted font-bold">$</div>
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="h-14 pl-8 rounded-2xl bg-secondary border-border focus-visible:ring-2 focus-visible:ring-primary/20 text-lg font-bold text-foreground"
                                        />
                                    </div>
                                </div>

                                {method === "connected_account" ? (
                                    /* Connected Account ID */
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-foreground-muted uppercase tracking-wider flex items-center gap-2">
                                            Stripe Connected Account ID
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <button type="button" tabIndex={-1} className="cursor-pointer">
                                                        <HelpCircle className="w-3.5 h-3.5 text-foreground-muted hover:text-foreground" />
                                                    </button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-72 text-xs bg-card border border-border text-foreground shadow-xl">
                                                    Your account must be connected with Stripe to receive funds via this method. You can find this in your Stripe Dashboard.
                                                </PopoverContent>
                                            </Popover>
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="acct_..."
                                            value={connectedAccountId}
                                            onChange={(e) => setConnectedAccountId(e.target.value)}
                                            className="h-12 rounded-xl bg-secondary border-border focus-visible:ring-2 focus-visible:ring-primary/20 text-foreground"
                                        />
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="p-3 bg-warning-bg border border-warning/20 rounded-xl flex items-start gap-3">
                                            <HelpCircle className="text-warning shrink-0 mt-0.5" size={16} />
                                            <p className="text-[11px] text-warning leading-relaxed font-medium">
                                                Funds are securely processed via Stripe. Your bank details are encrypted and never stored in plain text.
                                            </p>
                                        </div>

                                        {/* Saved Methods Preview or Selection */}
                                        {hasSavedMethods && !showManual && (
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-xs font-bold text-foreground-muted uppercase tracking-wider">Bank Details</label>
                                                    <button
                                                        onClick={() => setView("saved_methods")}
                                                        className="text-[10px] font-bold text-foreground hover:underline cursor-pointer"
                                                    >
                                                        View All
                                                    </button>
                                                </div>

                                                {selectedMethodId ? (
                                                    <div
                                                        onClick={() => setView("saved_methods")}
                                                        className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl cursor-pointer hover:border-foreground-muted transition-all"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-foreground-strong dark:text-white">
                                                                <Landmark size={20} />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold text-foreground-strong dark:text-white leading-tight">{bankData.bank_name}</p>
                                                                <p className="text-xs text-foreground-muted mt-0.5">**** {bankData.bank_account_number}</p>
                                                            </div>
                                                        </div>
                                                        <ArrowRight size={16} className="text-foreground-muted" />
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setView("saved_methods")}
                                                        className="w-full flex items-center gap-3 p-4 bg-secondary border border-dashed border-border rounded-2xl hover:bg-secondary-hover transition-all cursor-pointer"
                                                    >
                                                        <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-foreground-muted">
                                                            <Landmark size={20} />
                                                        </div>
                                                        <div className="text-left">
                                                            <p className="text-sm font-bold text-foreground-strong dark:text-white">Choose a saved bank</p>
                                                            <p className="text-xs text-foreground-muted">Select from your previously used accounts</p>
                                                        </div>
                                                    </button>
                                                )}

                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={() => {
                                                            setShowManual(true);
                                                            setSelectedMethodId(null);
                                                            setBankData({ bank_name: "", bank_account_number: "", account_holder_name: "" });
                                                        }}
                                                        className="text-[11px] font-bold text-foreground-muted hover:text-foreground transition-colors flex items-center gap-1 cursor-pointer"
                                                    >
                                                        <Plus size={12} /> Enter Details Manually
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {(!hasSavedMethods || showManual) && (
                                            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-xs font-bold text-foreground-muted uppercase tracking-wider">Manual Entry</label>
                                                    {hasSavedMethods && (
                                                        <button
                                                            onClick={() => setShowManual(false)}
                                                            className="text-[10px] font-bold text-foreground hover:underline cursor-pointer"
                                                        >
                                                            Use Saved Method
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="grid gap-3">
                                                    <div>
                                                        <label className="text-xs font-bold text-foreground-strong dark:text-white mb-1.5 block">Bank Name</label>
                                                        <Input
                                                            type="text"
                                                            placeholder="e.g. Chase Bank"
                                                            value={bankData.bank_name}
                                                            onChange={(e) => setBankData({ ...bankData, bank_name: e.target.value })}
                                                            className="h-11 rounded-xl bg-secondary border-border focus-visible:ring-2 focus-visible:ring-primary/20 text-foreground"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-bold text-foreground-strong dark:text-white mb-1.5 block">Account Holder Name</label>
                                                        <Input
                                                            type="text"
                                                            placeholder="Full name on account"
                                                            value={bankData.account_holder_name}
                                                            onChange={(e) => setBankData({ ...bankData, account_holder_name: e.target.value })}
                                                            className="h-11 rounded-xl bg-secondary border-border focus-visible:ring-2 focus-visible:ring-primary/20 text-foreground"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-bold text-foreground-strong dark:text-white mb-1.5 block">Account Number</label>
                                                        <Input
                                                            type="text"
                                                            placeholder="Enter full account number"
                                                            value={bankData.bank_account_number}
                                                            onChange={(e) => setBankData({ ...bankData, bank_account_number: e.target.value })}
                                                            className="h-11 rounded-xl bg-secondary border-border focus-visible:ring-2 focus-visible:ring-primary/20 text-foreground"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
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
                                    className="w-full h-14 rounded-2xl bg-primary hover:bg-primary-hover text-primary-foreground mt-4 shadow-xl text-base font-bold transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                                >
                                    {withdrawLoading ? <Spinner className="w-5 h-5 text-primary-foreground" /> : "Request Withdrawal"}
                                </Button>
                            </div>
                        ) : (
                            /* Saved Methods View */
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300 pb-4">
                                {savedMethodsLoading ? (
                                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                        <Spinner className="w-8 h-8 text-primary" />
                                        <p className="text-sm text-foreground-muted font-medium">Loading your methods...</p>
                                    </div>
                                ) : (
                                    <div className="grid gap-3">
                                        {savedMethods.map((m) => (
                                            <div
                                                key={m.id}
                                                onClick={() => handleSelectSavedMethod(m)}
                                                className={`group relative flex items-center justify-between p-4 rounded-2xl transition-all cursor-pointer border-2 ${selectedMethodId === m.id
                                                    ? "bg-secondary border-primary"
                                                    : "bg-card border-border hover:border-foreground-muted"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${selectedMethodId === m.id
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-secondary text-foreground-muted border border-border"
                                                        }`}>
                                                        <Landmark size={24} />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-sm font-bold text-foreground-strong dark:text-white">{m.bank_name}</p>
                                                        <p className="text-xs text-foreground-muted mt-1 font-medium">**** {m.last4} • {m.account_holder_name}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (window.confirm("Delete this saved method?")) {
                                                                deleteSavedMethod(m.id);
                                                            }
                                                        }}
                                                        className="p-2 text-foreground-muted hover:text-error transition-all rounded-xl hover:bg-error-bg cursor-pointer"
                                                        title="Delete method"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedMethodId === m.id
                                                        ? "bg-primary border-primary"
                                                        : "border-border"
                                                        }`}>
                                                        {selectedMethodId === m.id && <CheckCircle2 size={14} className="text-primary-foreground" />}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            onClick={() => {
                                                setShowManual(true);
                                                setSelectedMethodId(null);
                                                setBankData({ bank_name: "", bank_account_number: "", account_holder_name: "" });
                                                setView("main");
                                            }}
                                            className="w-full py-4 rounded-2xl border-2 border-dashed border-border text-foreground-muted font-bold text-sm hover:bg-secondary/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            <Plus size={18} /> Add New Bank Account
                                        </button>
                                    </div>
                                )}
                            </div>
                        )
                    ) : (
                        <div className="space-y-8 py-4">
                            <div className="flex flex-col items-center justify-center text-center space-y-6">
                                <div className="relative">
                                    <div className="w-20 h-20 bg-success-bg rounded-full flex items-center justify-center animate-in zoom-in-50 duration-500">
                                        <CheckCircle2 className="w-12 h-12 text-success" />
                                    </div>
                                    <div className="absolute -inset-2 bg-success/20 rounded-full blur-xl animate-pulse" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-foreground-strong">
                                        Request Submitted!
                                    </h3>
                                    <p className="text-sm text-foreground-muted max-w-[240px] mx-auto leading-relaxed">
                                        {withdrawalData?.message || "We've received your request and are processing it."}
                                    </p>
                                </div>

                                <div className="w-full bg-background rounded-3xl p-6 border border-border space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-foreground-muted font-medium">Transaction ID</span>
                                        <span className="font-mono font-bold text-foreground-strong bg-secondary px-2.5 py-1 rounded-lg border border-border">
                                            #{withdrawalData?.withdrawal_id}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-foreground-muted font-medium">Current Status</span>
                                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-warning-bg text-warning border border-warning/20">
                                            {withdrawalData?.status || "pending"}
                                        </span>
                                    </div>

                                    <div className="h-px bg-border my-2" />

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-foreground-muted font-medium">Requested Amount</span>
                                        <span className="font-bold text-foreground-strong">
                                            ${withdrawalData?.amount ? Number(withdrawalData.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-foreground-muted font-medium">Platform Fee</span>
                                        <span className="font-bold text-foreground-strong">
                                            -${withdrawalData?.platform_fee ? Number(withdrawalData.platform_fee).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-foreground-muted font-medium">Processing Fee</span>
                                        <span className="font-bold text-foreground-strong">
                                            -${withdrawalData?.processing_fee ? Number(withdrawalData.processing_fee).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}
                                        </span>
                                    </div>

                                    <div className="h-px bg-border my-2" />

                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-foreground-strong font-bold">Net Amount</span>
                                        <span className="text-base font-extrabold text-primary">
                                            ${withdrawalData?.net_amount ? Number(withdrawalData.net_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}
                                        </span>
                                    </div>

                                    <div className="pt-2 border-t border-border flex justify-between items-center text-sm">
                                        <span className="text-foreground-muted font-medium">Estimated Time</span>
                                        <span className="text-foreground-strong font-bold">7 - 10 Business Days</span>
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={handleCancel}
                                className="w-full h-14 rounded-2xl bg-primary hover:bg-primary-hover text-primary-foreground shadow-xl shadow-primary/10 font-bold text-base transition-all active:scale-[0.98] border-0 cursor-pointer"
                            >
                                Done
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default WithdrawModal;
