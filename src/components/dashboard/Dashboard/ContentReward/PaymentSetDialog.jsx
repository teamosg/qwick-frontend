import React from "react";
import { DollarSign } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../../../ui/button";

const PaymentSetDialog = ({showPaymentsModal, setShowForm, setShowPaymentsModal}) => {
  return (
    <Dialog open={showPaymentsModal} onOpenChange={setShowPaymentsModal}>
      <DialogContent className="max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-0 p-0 overflow-hidden">
        {/* Header with brand accent */}
        <div className="relative bg-gradient-to-br from-primary to-primary-dark px-6 pt-8 pb-6">
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
              <DollarSign className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <DialogTitle className="text-xl font-bold text-center text-white mb-2">
            Set up Qwick Payments
          </DialogTitle>
          <DialogDescription className="text-center text-white/80 text-sm leading-relaxed">
            To get paid or deposit funds on Qwick, you need to set up your
            payment account.
          </DialogDescription>
        </div>

        {/* Body content */}
        <div className="px-6 py-6 space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Connect your payment method to start receiving payouts and manage
              campaign budgets seamlessly.
            </p>
          </div>

          <Button
            className="w-full bg-foreground-strong hover:bg-foreground text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            onClick={() => {
              setShowPaymentsModal(false);
              setShowForm(false);
              // Add your payment setup logic here
            }}
          >
            Set up payments
          </Button>

          <button
            type="button"
            onClick={() => setShowPaymentsModal(false)}
            className="w-full text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium transition-colors"
          >
            I'll do this later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSetDialog;
