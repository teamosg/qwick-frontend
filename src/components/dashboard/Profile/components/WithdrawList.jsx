import { useWithdrawTransactions, useProcessWithdrawal } from "@/hooks/payment.hook";
import { Badge } from "@/components/ui/badge";
import ProfileBalanceDataSkeleton from "./ProfileBalanceDataSkeleton";
import { NoTransactionsAlert } from "@/components/Alerts/NoTransactionsAlert";
import { FetchErrorAlert } from "@/components/Alerts/FetchErrorAlerts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { format } from "date-fns";

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

const WithdrawList = () => {
  const {
    data: transactions,
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
  } = useWithdrawTransactions();

  const { mutate: processWithdraw, isPending: isProcessing } = useProcessWithdrawal();

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
        {status}
      </Badge>
    );
  };

  const handleProcessWithdraw = (id) => {
    processWithdraw({ withdrawal_id: id });
  };

  if (isLoadingTransactions) {
    return <ProfileBalanceDataSkeleton />;
  }
  if (isErrorTransactions) {
    return <FetchErrorAlert />;
  }

  // Helper to format currency
  const formatAmount = (amount) => {
    // Assuming amount is a number or string number
    return `$${Number(amount).toFixed(2)}`;
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

  return (
    <>
      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-3">
        {transactions?.map((transaction, index) => {
          const normalizedStatus = transaction.status?.toLowerCase() || "";
          const isFailed = ["failed", "cancel", "cancelled"].includes(normalizedStatus);

          return (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-semibold text-foreground-strong dark:text-white">
                  {transaction.holder_name || "Unknown"}
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(transaction.status)}

                  {!isFailed && (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
                        <MoreVertical className="h-4 w-4 text-foreground-muted" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleProcessWithdraw(index + 1)}
                          disabled={isProcessing}
                          className="cursor-pointer"
                        >
                          Process Withdraw request
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
              <div className="text-sm text-foreground-muted">
                {formatDate(transaction.created_at)}
              </div>
              <div className="font-semibold text-foreground-strong dark:text-white">
                {formatAmount(transaction.amount)}
              </div>
            </div>
          );
        })}
        {!transactions?.length && <NoTransactionsAlert />}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block">
        <div className=" p-1">
          <Table>
            <TableHeader className="">
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
                <TableHead className="text-foreground-muted font-medium py-4 px-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-card rounded-xl">
              {transactions?.map((transaction, index) => {

                return (
                  <TableRow
                    key={index}
                    className="border-none hover:bg-secondary/50"
                  >
                    <TableCell className="py-4 px-6 font-medium text-foreground-strong dark:text-white">
                      {transaction.holder_name || "Unknown"}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-foreground-muted">
                      {formatDate(transaction.created_at)}
                    </TableCell>
                    <TableCell className="py-4 px-6 font-semibold text-foreground-strong dark:text-white">
                      {formatAmount(transaction.amount)}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      {getStatusBadge(transaction.status)}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      {transaction.status?.toLowerCase() === "pending" && (
                        <DropdownMenu>
                          <DropdownMenuTrigger className="focus:outline-none p-2 hover:bg-secondary rounded-full transition-colors cursor-pointer">
                            <MoreVertical className="h-4 w-4 text-foreground-muted" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleProcessWithdraw(transactions.length - index)}
                              disabled={isProcessing}
                              className="cursor-pointer"
                            >
                              Process Withdraw request
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {!transactions?.length && <NoTransactionsAlert />}
        </div>
      </div>
    </>
  );
};

export default WithdrawList;
