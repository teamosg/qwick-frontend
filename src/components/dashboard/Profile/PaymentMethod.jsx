import { Button } from "@/components/ui/button";

const PaymentMethod = () => {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Two-factor authentication section */}
      <div className="text-center text-[#717171] text-sm sm:text-[16px] mb-4 sm:mb-4.5 py-6 sm:py-10 w-full shadow rounded-[16px] sm:rounded-[24px]">
        <p>No payment method found</p>
      </div>

      {/* Sign In Button */}
      <Button className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-900 text-white rounded-full py-4 sm:py-6 text-base sm:text-lg font-medium mt-4 sm:mt-8 px-6 sm:px-8">
        Add Payment method
      </Button>
    </div>
  );
};

export default PaymentMethod;
