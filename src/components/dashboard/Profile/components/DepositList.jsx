import { useGetDepositTransactions } from "@/hooks/payment.hook";
import ProfileBalanceDataSkeleton from "./ProfileBalanceDataSkeleton";
import { NoTransactionsAlert } from "@/components/Alerts/NoTransactionsAlert";
import { FetchErrorAlert } from "@/components/Alerts/FetchErrorAlerts";

// Inline Table Components
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

const DepositList = () => {
  const {
    data: transactions,
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
  } = useGetDepositTransactions();

  if (isLoadingTransactions) return <ProfileBalanceDataSkeleton />;
  if (isErrorTransactions) return <FetchErrorAlert />;

  return (
    <>
      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-3">
        {transactions?.map((transaction, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#2E2E2E] border rounded-lg p-4 shadow-sm"
          >
            <div className="font-semibold text-[#25324B] dark:text-white mb-1">
              {transaction.name}
            </div>
            <div className="text-sm text-[#25324B] dark:text-white">
              {transaction.date}
            </div>
            <div className="font-semibold text-[#25324B] dark:text-white mt-1">
              {transaction.amount}
            </div>
          </div>
        ))}

        {!transactions?.length && <NoTransactionsAlert />}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block">
        <div className="p-1">
          <Table>
            <TableHeader>
              <TableRow className="border rounded-full">
                <TableHead className="text-[#717171] font-medium dark:text-white py-4 px-6">
                  Name
                </TableHead>
                <TableHead className="text-[#717171] font-medium dark:text-white py-4 px-6">
                  Date
                </TableHead>
                <TableHead className="text-[#717171] font-medium dark:text-white py-4 px-6">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="bg-white dark:bg-[#2E2E2E] rounded-xl">
              {transactions?.map((transaction, index) => (
                <TableRow
                  key={index}
                  className="border-none hover:bg-gray-50 dark:hover:bg-[#364152]"
                >
                  <TableCell className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                    {transaction.name}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-gray-600 dark:text-white">
                    {transaction.date}
                  </TableCell>
                  <TableCell className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                    {transaction.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {!transactions?.length && <NoTransactionsAlert />}
        </div>
      </div>
    </>
  );
};

export default DepositList;
