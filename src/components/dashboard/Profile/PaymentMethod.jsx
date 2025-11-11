import { Button } from "@/components/ui/button";

const PaymentMethod = () => {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Two-factor authentication section */}
      <div className="text-center text-[#717171] dark:text-white text-sm sm:text-[16px] mb-4 sm:mb-4.5 py-6 sm:py-10 w-full shadow rounded-[16px] sm:rounded-[24px] bg-white dark:bg-[#2E2E2E]">
        <p>No payment method found</p>
      </div>

      {/* Sign In Button */}
      <Button className="bg-[#003933] dark:bg-[#003933] text-white px-4 py-2 sm:py-6 sm:px-10 rounded-3xl sm:rounded-full hover:bg-[#002822] dark:hover:bg-primary/90 transition font-medium cursor-pointer flex gap-2 m-auto text-center">
        Add Payment method
      </Button>
    </div>
  );
};

export default PaymentMethod;
