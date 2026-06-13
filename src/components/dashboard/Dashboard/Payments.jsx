import PaymentsData from "./PaymentsData";

const Payments = () => {
  return (
    <div className="">
      <h2 className="text-[24px] text-foreground dark:text-foreground font-semibold mb-3">
        Payments
      </h2>
      <PaymentsData />
    </div>
  );
};

export default Payments;
