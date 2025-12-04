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
import { useDeposit } from "@/hooks/payment.hook";

const DEPOSIT_FEE = 0.015; // 1.5%

const DepositModal = ({ open, setOpen }) => {
    const { mutate: deposit, isPending: isDepositing } = useDeposit();
    const [amount, setAmount] = useState("");
    // const [method, setMethod] = useState("card");

    // const fee = useMemo(() => amount * DEPOSIT_FEE || 0, [amount]);
    // const finalAmount = useMemo(
    //     () => Number(amount || 0) + fee,
    //     [amount, fee]
    // );

    const handleDeposit = () => {
        deposit({ amount: amount })
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md space-y-4">
                <DialogHeader>
                    <DialogTitle>Add Funds</DialogTitle>
                </DialogHeader>

                {/* Amount */}
                <div>
                    <label className="text-sm">Amount ($)</label>
                    <Input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>



                {/* Method */}
                {/* <div className="space-y-1">
                    <label className="text-sm">Payment Method</label>
                    <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="w-full border rounded-md p-2 bg-transparent"
                    >
                        <option value="card">Debit / Credit Card</option>
                        <option value="stripe">Stripe Balance</option>
                    </select>
                </div> */}



                {/* Fee Breakdown */}
                {/* <div className="text-sm space-y-1 p-3 rounded-md bg-muted">
                    <div className="flex justify-between">
                        <span>Stripe fee (1.5%)</span>
                        <span>${fee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                        <span>Total charge</span>
                        <span>${finalAmount.toFixed(2)}</span>
                    </div>
                </div> */}



                {/* Notice */}
                {/* <p className="text-xs text-muted-foreground">
                    Funds will be available instantly after successful payment.
                </p> */}



                {/* Confirm */}
                <Button
                    onClick={handleDeposit}
                    disabled={!amount || isDepositing}
                    className="w-full bg-[#003933] hover:bg-[#002822] text-white"
                >
                    {isDepositing ? <Spinner className="w-4 h-4" /> : "Confirm Deposit"}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default DepositModal;
