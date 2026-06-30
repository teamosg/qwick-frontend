import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, ExternalLink } from "lucide-react";

const CampaignCheckoutModal = ({ open, setOpen, checkoutDetails }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent 
        className="sm:max-w-md p-6 overflow-hidden rounded-2xl border-border bg-surface shadow-2xl"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CreditCard className="h-6 w-6 animate-pulse" />
          </div>
          <DialogTitle className="text-center text-xl font-bold tracking-tight text-foreground-strong">
            Campaign Payment Summary
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-foreground-subtle max-w-xs mx-auto">
            {checkoutDetails?.message || "Complete your payment to activate this campaign and start receiving content."}
          </DialogDescription>
        </DialogHeader>

        <div className="my-6 space-y-4 rounded-xl bg-background p-5 border border-border">
          <div className="flex justify-between items-center text-sm">
            <span className="text-foreground-muted font-medium">Campaign Budget</span>
            <span className="font-semibold text-foreground-strong">
              ${checkoutDetails?.base_amount ? Number(checkoutDetails.base_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-foreground-muted font-medium">Platform Fee</span>
            <span className="font-semibold text-foreground-strong">
              ${checkoutDetails?.platform_fee ? Number(checkoutDetails.platform_fee).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}
            </span>
          </div>
          
          <div className="h-px bg-border my-2" />
          
          <div className="flex justify-between items-center">
            <span className="text-base font-bold text-foreground-strong">Total Amount</span>
            <span className="text-xl font-extrabold text-primary">
              ${checkoutDetails?.amount_to_pay ? Number(checkoutDetails.amount_to_pay).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="flex-1 order-2 sm:order-1 rounded-xl h-12 text-foreground-strong border-border hover:bg-muted/10 font-semibold"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (checkoutDetails?.checkout_url) {
                window.location.href = checkoutDetails.checkout_url;
              }
            }}
            className="flex-1 order-1 sm:order-2 bg-primary hover:bg-primary-hover text-white rounded-xl h-12 font-semibold shadow-lg shadow-primary/20 dark:shadow-none flex items-center justify-center gap-2 border-0"
          >
            Proceed to Pay
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignCheckoutModal;
