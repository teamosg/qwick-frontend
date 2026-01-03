import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useCommunityStore } from "@/store/communityStore";
import { useGetCommunityEarnings } from "@/hooks/community.hook";
import { EllipsisVertical } from "lucide-react";
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

const PaymentsData = () => {
  const { selectedBrandCommunity } = useCommunityStore();
  const { data: earnings = [] } = useGetCommunityEarnings(selectedBrandCommunity?.id);

  const getStatusBadge = (status) => {
    const variants = {
      paid: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
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
    return user.username || "Unknown User";
  };

  return (
    <div className="p-o">
      <Tabs defaultValue="withdraw" className="w-full">
        {/* Withdraw Tab Content */}
        <TabsContent value="withdraw" className="p-0">
          {/* Mobile Card View */}
          <div className="block sm:hidden space-y-3">
            {earnings.map((user, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg p-4 shadow-sm dark:bg-[#2E2E2E] dark:border-[#444] dark:text-[#fff]"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-[#25324B] dark:text-[#fff]">
                    {getDisplayName(user)}
                  </div>
                </div>
                <div className="text-sm text-[#25324B] dark:text-[#fff] p-1">
                  {user.email}
                </div>
                <div className="text-sm text-[#25324B] dark:text-[#fff] p-1">
                  {" "}
                  {getStatusBadge(user.status)}
                </div>
                <div className="font-semibold text-[#25324B] dark:text-[#fff] p-1">
                  {user.contact || "N/A"}
                </div>
                <div className="font-semibold text-[#25324B] dark:text-[#fff] p-1">
                  ${user.total_earned}
                </div>
              </div>
            ))}
            {earnings.length === 0 && (
              <div className="text-center p-4 text-gray-500 dark:text-gray-400">
                No attributes found.
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block">
            <div className="p-1">
              <Table>
                <TableHeader className="">
                  <TableRow className="bg-[#f5f5f5] text-gray-900 border-black rounded-full dark:bg-[#2E2E2E] dark:text-[#fff] dark:border-[#444]">
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
                    {/* <TableHead className="font-medium py-4 px-6 dark:text-[#fff]">
                      Contact
                    </TableHead>
                    <TableHead className="font-medium py-4 px-6 dark:text-[#fff]">
                      Actions
                    </TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody className="rounded-xl">
                  {earnings.map((user, index) => (
                    <TableRow
                      key={index}
                      className="border-none hover:bg-white dark:hover:bg-[#2E2E2E] dark:text-[#fff]"
                    >
                      <TableCell className="py-4 px-6 font-medium text-gray-900 dark:text-[#fff]">
                        {getDisplayName(user)}
                      </TableCell>
                      <TableCell className="py-4 px-6 text-gray-600 dark:text-[#fff]">
                        {user.email}
                      </TableCell>
                      <TableCell className="py-4 px-6 font-semibold text-gray-900 dark:text-[#fff]">
                        {getStatusBadge(user.status)}
                      </TableCell>
                      <TableCell className="py-4 px-6 dark:text-[#fff]">
                        $ {user.total_earned}
                      </TableCell>
                      {/* <TableCell className="py-4 px-6 dark:text-[#fff]">
                        {user.contact || "N/A"}
                      </TableCell>
                      <TableCell className="py-4 px-6 flex gap-2">
                        <button className="cursor-pointer">
                          <EllipsisVertical />
                        </button>
                      </TableCell> */}
                    </TableRow>
                  ))}
                  {earnings.length === 0 && (
                    <TableRow>
                      <TableCell className="text-center py-4 text-gray-500 dark:text-gray-400" colSpan={6}>
                        No records found.
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

export default PaymentsData;

