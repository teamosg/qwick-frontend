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

const WITHDRAW_FEE = 0.02; // 2%

const WithdrawModal = ({ open, setOpen }) => {
    const [amount, setAmount] = useState("");
    // const [method, setMethod] = useState("bank");
    const [loading, setLoading] = useState(false);

    // const fee = useMemo(() => amount * WITHDRAW_FEE || 0, [amount]);
    // const receiveAmount = useMemo(
    //     () => Math.max(amount - fee, 0),
    //     [amount, fee]
    // );

    const handleWithdraw = () => {
        setLoading(true);

        console.log("WITHDRAW DATA", {
            amount,
            // method,
            // fee,
            // receiveAmount,
        });

        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 1500);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md space-y-4">
                <DialogHeader>
                    <DialogTitle>Withdraw Funds</DialogTitle>
                </DialogHeader>

                {/* Amount */}
                <div>
                    <label className="text-sm">Amount</label>
                    <Input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>




                {/* Method */}
                {/* <div className="space-y-1">
                    <label className="text-sm">Payout Method</label>
                    <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="w-full border rounded-md p-2 bg-transparent"
                    >
                        <option value="bank">Bank Transfer</option>
                        <option value="card">Debit Card</option>
                        <option value="stripe">Stripe Connect</option>
                    </select>
                </div> */}



                {/* Fee Breakdown */}
                {/* <div className="text-sm space-y-1 p-3 rounded-md bg-muted">
                    <div className="flex justify-between">
                        <span>Processing fee (2%)</span>
                        <span>${fee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                        <span>You’ll receive</span>
                        <span>${receiveAmount.toFixed(2)}</span>
                    </div>
                </div> */}




                {/* Notice */}
                {/* <p className="text-xs text-muted-foreground">
                    Funds usually arrive within 2–5 business days depending on your bank.
                </p> */}

                {/* Confirm */}
                <Button
                    onClick={handleWithdraw}
                    disabled={!amount || loading}
                    className="w-full bg-[#003933] hover:bg-[#002822] text-white"
                >
                    {loading ? <Spinner className="w-4 h-4" /> : "Confirm Withdraw"}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default WithdrawModal;
