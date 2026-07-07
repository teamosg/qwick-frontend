import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAddPaymentMethod } from "@/hooks/payment.hook";

const PaymentMethod = () => {
  const { mutate: addPaymentMethod, isPending: isAddingPaymentMethod } =
    useAddPaymentMethod();

  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    addPaymentMethod();
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Info Box */}
      <div className="text-center text-foreground-muted text-sm sm:text-base py-6 sm:py-10 w-full shadow-sm border border-border rounded-2xl bg-card">
        <p>No payment method found</p>
      </div>

      {/* Open Modal Button */}
      <Button
        onClick={() => setOpen(true)}
        className="bg-primary hover:bg-primary-hover text-primary-foreground px-4 py-2 sm:py-6 sm:px-10 rounded-3xl sm:rounded-full transition font-medium cursor-pointer flex gap-2 m-auto">
        Add Payment Method
      </Button>

      {/* ================= MODAL ================= */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[90%] max-w-md bg-card border border-border rounded-2xl p-6 space-y-6 shadow-xl">
            {/* Title */}
            <h2 className="text-lg font-semibold text-foreground-strong dark:text-white">
              Add Payment Method
            </h2>

            {/* Description */}
            <p className="text-sm text-foreground-muted">
              You’ll be securely redirected to Stripe to add your payment
              method. This helps you complete future payments faster and
              securely.
            </p>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isAddingPaymentMethod}
                className="cursor-pointer"
              >
                Cancel
              </Button>

              <Button
                onClick={handleConfirm}
                disabled={isAddingPaymentMethod}
                className="bg-primary hover:bg-primary-hover text-primary-foreground min-w-[120px] flex items-center justify-center gap-2 cursor-pointer"
              >
                {isAddingPaymentMethod ? <Spinner className="text-primary-foreground" /> : "Confirm"}
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* ================= END MODAL ================= */}
    </div>
  );
};

export default PaymentMethod;
