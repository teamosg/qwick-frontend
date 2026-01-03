import { useState } from "react";
import { useCommunityStore } from "@/store/communityStore";
import { useWithdrawal } from "@/hooks/community.hook";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DollarSign, Wallet2, Loader2, Landmark } from "lucide-react";

const Withdraw = () => {
    const { selectedCreatorCommunity } = useCommunityStore();
    const communityId = selectedCreatorCommunity?.id;
    const [amount, setAmount] = useState("");

    const { mutate: withdraw, isPending } = useWithdrawal(communityId);

    const handleWithdraw = (e) => {
        e.preventDefault();
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) return;

        withdraw({ amount: parseFloat(amount) }, {
            onSuccess: (data) => {
                if (data?.status) setAmount("");
            }
        });
    };

    return (
        <div className="max-w-xl mx-auto py-10 px-4 sm:px-6">
            <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
                {/* Header Section */}
                <div className="bg-[#002822]/5 dark:bg-[#002822]/10 p-6 border-b border-gray-200 dark:border-zinc-800">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#002822]/10 dark:bg-[#002822]/20 rounded-xl">
                            <Landmark className="h-6 w-6 text-[#002822] dark:text-[#002822]" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Withdraw Funds</h1>
                            <p className="text-sm text-gray-500 dark:text-zinc-400">Withdraw your community earnings easily.</p>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <form onSubmit={handleWithdraw} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="amount" className="text-sm font-semibold text-gray-700 dark:text-zinc-300 ml-1">
                                Withdrawal Amount
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#002822] transition-colors">
                                    <DollarSign className="h-5 w-5" />
                                </div>
                                <Input
                                    id="amount"
                                    type="number"
                                    placeholder="0.00"
                                    step="0.01"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="pl-12 py-6 text-lg rounded-xl border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-[#002822]/20 focus:border-[#002822] dark:bg-zinc-900/50 dark:text-white transition-all font-semibold"
                                    required
                                />
                            </div>
                            <p className="text-[11px] text-gray-400 dark:text-zinc-500 ml-1">
                                Enter the amount you wish to withdraw to your linked payment method.
                            </p>
                        </div>

                        <Button
                            disabled={isPending || !amount}
                            type="submit"
                            className="w-full py-6 text-base font-bold bg-[#002822] hover:bg-[#002822]/90 text-white rounded-xl shadow-lg shadow-[#002822]/10 transition-all group border-none"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Wallet2 className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                    Withdraw Now
                                </>
                            )}
                        </Button>
                    </form>
                </div>

                {/* Footer Info */}
                {/* <div className="px-8 py-4 bg-gray-50/30 dark:bg-zinc-800/20 border-t border-gray-100 dark:border-zinc-800/50">
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 dark:text-zinc-500">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#002822] animate-pulse" />
                        <span>Secure withdrawal processed within 3-5 business days.</span>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Withdraw;
