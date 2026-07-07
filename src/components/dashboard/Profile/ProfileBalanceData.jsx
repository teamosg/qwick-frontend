import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WithdrawList from "./components/WithdrawList";
import DepositList from "./components/DepositList";

const ProfileBalanceData = () => {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <Tabs defaultValue="withdraw" className="w-full">
        {/* Tab Navigation */}
        <TabsList className="grid w-full grid-cols-2 max-w-[200px] h-auto p-1 bg-secondary rounded-lg">
          <TabsTrigger
            value="withdraw"
            className="text-sm font-medium text-foreground-muted data-[state=active]:bg-card data-[state=active]:text-foreground-strong data-[state=active]:shadow-sm rounded-md py-2 cursor-pointer"
          >
            Withdraw
          </TabsTrigger>
          <TabsTrigger
            value="deposit"
            className="text-sm font-medium text-foreground-muted data-[state=active]:bg-card data-[state=active]:text-foreground-strong data-[state=active]:shadow-sm rounded-md py-2 cursor-pointer"
          >
            Deposit
          </TabsTrigger>
        </TabsList>

        {/* Withdraw Tab Content */}
        <TabsContent value="withdraw" className="mt-6">
          <WithdrawList />
        </TabsContent>

        {/* Deposit Tab Content */}
        <TabsContent value="deposit" className="mt-6">
          <DepositList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileBalanceData;
