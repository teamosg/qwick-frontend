import { useGetDepositTransactions } from "@/hooks/payment.hook";
import ProfileBalanceDataSkeleton from "./ProfileBalanceDataSkeleton";
import { NoTransactionsAlert } from "@/components/Alerts/NoTransactionsAlert";
import { FetchErrorAlert } from "@/components/Alerts/FetchErrorAlerts";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

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

  const getStatusBadge = (status) => {
    const normalizedStatus = status?.toLowerCase() || "";
    // Map status to visual variant keys
    let variantKey = "pending";
    if (["succeeded", "paid", "complete", "completed"].includes(normalizedStatus)) {
      variantKey = "paid";
    } else if (["failed", "cancel", "cancelled"].includes(normalizedStatus)) {
      variantKey = "cancel";
    } else {
      variantKey = "pending";
    }

    const variants = {
      paid: "bg-success-bg text-success border-success/20",
      pending: "bg-warning-bg text-warning border-warning/20",
      cancel: "bg-error-bg text-error border-error/20",
    };

    return (
      <Badge
        variant="outline"
        className={`${variants[variantKey]} capitalize rounded-full px-3 py-1 text-xs font-medium`}
      >
        {status || "Unknown"}
      </Badge>
    );
  };

  // Helper to format currency
  const formatAmount = (amount) => {
    return `$${Number(amount || 0).toFixed(2)}`;
  };

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "dd MMM yyyy");
    } catch (e) {
      return dateString;
    }
  };

  if (isLoadingTransactions) return <ProfileBalanceDataSkeleton />;
  if (isErrorTransactions) return <FetchErrorAlert />;

  return (
    <>
      {/* Mobile Card View */}
      <div className="block md:hidden space-y-3">
        {transactions?.map((transaction, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="font-semibold text-foreground-strong dark:text-white">
                {transaction?.holder_name || transaction?.name || "Unknown"}
              </div>
              {getStatusBadge(transaction?.status)}
            </div>
            <div className="text-sm text-foreground-muted">
              {formatDate(transaction?.created_at || transaction?.date)}
            </div>
            <div className="text-sm text-foreground-muted">

            </div>
            <div className="font-semibold text-foreground-strong dark:text-white mt-1">
              {formatAmount(transaction?.amount)} {" "}
              <span>
                {transaction?.stripe_info?.currency}
              </span>
            </div>
          </div>
        ))}

        {!transactions?.length && <NoTransactionsAlert />}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="p-1">
          <Table>
            <TableHeader>
              <TableRow className="border border-border rounded-full">
                <TableHead className="text-foreground-muted font-medium py-4 px-6">
                  Name
                </TableHead>
                <TableHead className="text-foreground-muted font-medium py-4 px-6">
                  Date
                </TableHead>
                <TableHead className="text-foreground-muted font-medium py-4 px-6">
                  Amount
                </TableHead>
                <TableHead className="text-foreground-muted font-medium py-4 px-6">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="bg-card rounded-xl">
              {transactions?.map((transaction, index) => (
                <TableRow
                  key={index}
                  className="border-none hover:bg-secondary/50"
                >
                  <TableCell className="py-4 px-6 font-medium text-foreground-strong dark:text-white">
                    {transaction?.holder_name || transaction?.name || "Unknown"}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-foreground-muted">
                    {formatDate(transaction?.created_at || transaction?.date)}
                  </TableCell>
                  <TableCell className="py-4 px-6 font-semibold text-foreground-strong dark:text-white">
                    {formatAmount(transaction?.amount)}
                  </TableCell>
                  <TableCell className="py-4 px-6 font-semibold text-foreground-strong dark:text-white">
                    {transaction?.stripe_info?.currency}
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    {getStatusBadge(transaction?.status)}
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
