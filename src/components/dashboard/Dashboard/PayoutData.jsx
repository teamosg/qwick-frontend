import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useCommunityStore } from "@/store/communityStore";
import { useGetCommunityWithdrawals, useApproveWithdrawal, useRejectWithdrawal } from "@/hooks/community.hook";
import { EllipsisVertical } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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

const PayoutData = () => {
  const { selectedBrandCommunity } = useCommunityStore();
  const { data: withdrawals = [], isLoading } = useGetCommunityWithdrawals(selectedBrandCommunity?.id);
  const { mutate: approveWithdrawal, isPending: isApproving } = useApproveWithdrawal();
  const { mutate: rejectWithdrawal, isPending: isRejecting } = useRejectWithdrawal();

  const handleApprove = (id) => {
    approveWithdrawal({ id });
  };

  const handleReject = (id) => {
    rejectWithdrawal({ id });
  };

  const getStatusBadge = (status) => {
    const variants = {
      approved: "bg-green-100 text-green-800 border-green-200",
      paid: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
      cancel: "bg-red-100 text-red-800 border-red-200",
    };

    const statusKey = status?.toLowerCase() || "pending";
    const variantClass = variants[statusKey] || variants.pending;

    return (
      <Badge
        variant="outline"
        className={`${variantClass} rounded-full px-3 py-1 text-xs font-medium`}
      >
        {status || "Pending"}
      </Badge>
    );
  };

  const getDisplayName = (user) => {
    if (user.first_name || user.last_name) {
      return `${user.first_name || ""} ${user.last_name || ""}`.trim();
    }
    return user.user || "Unknown User";
  };

  return (
    <div className="p-o">
      <Tabs defaultValue="withdraw" className="w-full">
        {/* Withdraw Tab Content */}
        <TabsContent value="withdraw" className="p-0">
          {/* Mobile Card View */}
          <div className="block sm:hidden space-y-3">
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-[#2E2E2E] border rounded-lg p-4 shadow-sm dark:border-[#444]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-4 w-48 mb-2" />
                  <Skeleton className="h-5 w-20 mb-2" />
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-5 w-16" />
                </div>
              ))
              : withdrawals.map((withdrawal, index) => (
                <div
                  key={index}
                  className="bg-[#fff] dark:bg-[#2E2E2E] border rounded-lg p-4 shadow-sm dark:border-[#444] dark:text-[#fff]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-semibold text-[#25324B] dark:text-[#fff]">
                      {getDisplayName(withdrawal)}
                    </div>
                    {withdrawal.status?.toLowerCase() === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(withdrawal.id)}
                          disabled={isApproving || isRejecting}
                          className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 disabled:opacity-50"
                        >
                          {isApproving ? "..." : "Approve"}
                        </button>
                        <button
                          onClick={() => handleReject(withdrawal.id)}
                          disabled={isApproving || isRejecting}
                          className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                        >
                          {isRejecting ? "..." : "Reject"}
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-[#25324B] dark:text-[#fff] p-1">
                    {withdrawal.email}
                  </div>
                  <div className="text-sm text-[#25324B] dark:text-[#fff]  p-1">
                    {" "}
                    {getStatusBadge(withdrawal.status)}
                  </div>
                  {withdrawal.contact && (
                    <div className="font-semibold text-[#25324B] dark:text-[#fff]  p-1">
                      {withdrawal.contact}
                    </div>
                  )}
                  <div className="font-semibold text-[#25324B] dark:text-[#fff] p-1">
                    ${withdrawal.amount}
                  </div>
                </div>
              ))}
            {!isLoading && withdrawals.length === 0 && (
              <div className="text-center p-4 text-gray-500 dark:text-gray-400">
                No withdrawals found.
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <div className="p-1">
              <Table>
                <TableHeader className="">
                  <TableRow className="bg-[#f5f5f5] dark:bg-[#2E2E2E] text-gray-900 dark:text-[#fff] border-black rounded-full dark:border-[#444]">
                    <TableHead className="font-medium py-4 px-6 dark:text-[#fff]">
                      Name
                    </TableHead>
                    <TableHead className=" font-medium py-4 px-6 dark:text-[#fff]">
                      Email
                    </TableHead>
                    <TableHead className="font-medium py-4 px-6 dark:text-[#fff]">
                      Status
                    </TableHead>
                    <TableHead className=" font-medium py-4 px-6 dark:text-[#fff]">
                      Total amount
                    </TableHead>
                    <TableHead className="font-medium py-4 px-6 dark:text-[#fff]">
                      Contact
                    </TableHead>
                    <TableHead className="font-medium py-4 px-6 dark:text-[#fff]">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="rounded-xl">
                  {isLoading
                    ? Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index} className="border-none">
                        <TableCell className="py-4 px-6">
                          <Skeleton className="h-4 w-32" />
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <Skeleton className="h-4 w-48" />
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <Skeleton className="h-6 w-20 rounded-full" />
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <Skeleton className="h-4 w-16" />
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <Skeleton className="h-4 w-24" />
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <Skeleton className="h-8 w-8 rounded-full" />
                        </TableCell>
                      </TableRow>
                    ))
                    : withdrawals.map((withdrawal, index) => (
                      <TableRow
                        key={index}
                        className="border-none hover:bg-[#f5f5f5] dark:hover:bg-[#2E2E2E] dark:text-[#fff]"
                      >
                        <TableCell className="py-4 px-6 font-medium text-gray-900 dark:text-[#fff]">
                          {getDisplayName(withdrawal)}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-gray-600 dark:text-[#fff]">
                          {withdrawal.email}
                        </TableCell>
                        <TableCell className="py-4 px-6 font-semibold text-gray-900 dark:text-[#fff]">
                          {getStatusBadge(withdrawal.status)}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-gray-600 dark:text-[#fff]">
                          $ {withdrawal.amount}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-gray-600 dark:text-[#fff]">
                          {withdrawal.contact || "N/A"}
                        </TableCell>
                        <TableCell className="py-4 px-6 flex gap-2 items-center">
                          {withdrawal.status?.toLowerCase() === "pending" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleApprove(withdrawal.id)}
                                disabled={isApproving || isRejecting}
                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50 transition-colors"
                              >
                                {isApproving ? "Processing..." : "Approve"}
                              </button>
                              <button
                                onClick={() => handleReject(withdrawal.id)}
                                disabled={isApproving || isRejecting}
                                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50 transition-colors"
                              >
                                {isRejecting ? "Processing..." : "Reject"}
                              </button>
                            </div>
                          )}
                          {/* <button className="cursor-pointer">
                          <EllipsisVertical />
                        </button> */}
                        </TableCell>
                      </TableRow>
                    ))}
                  {!isLoading && withdrawals.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-gray-500 dark:text-gray-400">
                        No withdrawals found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayoutData;
