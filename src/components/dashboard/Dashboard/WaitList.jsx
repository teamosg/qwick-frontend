import WaitListData from "./WaitListData";

const WaitList = () => {
  return (
    <div className="">
      <h2 className="text-[24px] text-foreground dark:text-foreground font-semibold mb-3">
        Waitlist
      </h2>
      <WaitListData />
    </div>
  );
};

export default WaitList;
