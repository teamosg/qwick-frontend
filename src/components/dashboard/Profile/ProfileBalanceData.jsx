import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Table components (inline implementation)
const Table = ({ children, className = "" }) => (
  <div className={`w-full ${className}`}>
    <table className="w-full">{children}</table>
  </div>
);

const TableHeader = ({ children }) => <thead>{children}</thead>;
const TableBody = ({ children, className = "" }) => (
  <tbody className={className}>{children}</tbody>
);
const TableHead = ({ children, className = "" }) => (
  <th className={`text-left ${className}`}>{children}</th>
);
const TableRow = ({ children, className = "" }) => (
  <tr className={className}>{children}</tr>
);
const TableCell = ({ children, className = "" }) => (
  <td className={className}>{children}</td>
);

const ProfileBalanceData = () => {
  const transactions = [
    {
      name: "Nazmul Hasan",
      date: "20 May 2020",
      amount: "$5.6",
      status: "Paid",
      statusType: "paid",
    },
    {
      name: "Nazmul Hasan",
      date: "20 May 2020",
      amount: "$5.6",
      status: "Pending",
      statusType: "pending",
    },
    {
      name: "Nazmul Hasan",
      date: "20 May 2020",
      amount: "$5.6",
      status: "Paid",
      statusType: "paid",
    },
    {
      name: "Nazmul Hasan",
      date: "20 May 2020",
      amount: "$5.6",
      status: "Paid",
      statusType: "paid",
    },
    {
      name: "Nazmul Hasan",
      date: "20 May 2020",
      amount: "$5.6",
      status: "Cancel",
      statusType: "cancel",
    },
    {
      name: "Nazmul Hasan",
      date: "20 May 2020",
      amount: "$5.6",
      status: "Paid",
      statusType: "paid",
    },
    {
      name: "Nazmul Hasan",
      date: "20 May 2020",
      amount: "$5.6",
      status: "Paid",
      statusType: "paid",
    },
    {
      name: "Nazmul Hasan",
      date: "20 May 2020",
      amount: "$5.6",
      status: "Paid",
      statusType: "paid",
    },
    {
      name: "Nazmul Hasan",
      date: "20 May 2020",
      amount: "$5.6",
      status: "Paid",
      statusType: "paid",
    },
  ];

  const getStatusBadge = (status, statusType) => {
    const variants = {
      paid: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      cancel: "bg-red-100 text-red-800 border-red-200",
    };

    return (
      <Badge
        variant="outline"
        className={`${variants[statusType]} rounded-full px-3 py-1 text-xs font-medium`}
      >
        {status}
      </Badge>
    );
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <Tabs defaultValue="withdraw" className="w-full">
        {/* Tab Navigation */}
        <TabsList className="grid w-full grid-cols-2 max-w-[200px] h-auto p-1 bg-gray-100 rounded-lg">
          <TabsTrigger
            value="withdraw"
            className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2"
          >
            Withdraw
          </TabsTrigger>
          <TabsTrigger
            value="deposit"
            className="text-sm font-medium text-[#717171] data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-md py-2"
          >
            Deposit
          </TabsTrigger>
        </TabsList>

        {/* Withdraw Tab Content */}
        <TabsContent value="withdraw" className="mt-6">
          {/* Mobile Card View */}
          <div className="block sm:hidden space-y-3">
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-[#25324B]">
                    {transaction.name}
                  </div>
                  {getStatusBadge(transaction.status, transaction.statusType)}
                </div>
                <div className="text-sm text-[#25324B]">{transaction.date}</div>
                <div className="font-semibold text-[#25324B]">
                  {transaction.amount}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block">
            <div className=" p-1">
              <Table>
                <TableHeader className="">
                  <TableRow className="border border-black rounded-full">
                    <TableHead className="text-[#717171] font-medium py-4 px-6">
                      Name
                    </TableHead>
                    <TableHead className="text-[#717171] font-medium py-4 px-6">
                      Date
                    </TableHead>
                    <TableHead className="text-[#717171] font-medium py-4 px-6">
                      Amount
                    </TableHead>
                    <TableHead className="text-[#717171] font-medium py-4 px-6">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white rounded-xl">
                  {transactions.map((transaction, index) => (
                    <TableRow
                      key={index}
                      className="border-none hover:bg-gray-50"
                    >
                      <TableCell className="py-4 px-6 font-medium text-gray-900">
                        {transaction.name}
                      </TableCell>
                      <TableCell className="py-4 px-6 text-gray-600">
                        {transaction.date}
                      </TableCell>
                      <TableCell className="py-4 px-6 font-semibold text-gray-900">
                        {transaction.amount}
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        {getStatusBadge(
                          transaction.status,
                          transaction.statusType
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* Deposit Tab Content */}
        <TabsContent value="deposit" className="mt-6">
          <div className="text-center py-8 text-[#717171]">
            No deposit transactions found
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileBalanceData;
