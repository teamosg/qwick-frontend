import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useCommunityStore } from "@/store/communityStore";
import { useGetCommunityEarnings } from "@/hooks/community.hook";
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

const PaymentsData = () => {
  const { selectedBrandCommunity } = useCommunityStore();
  const { data: earnings = [], isLoading } = useGetCommunityEarnings(selectedBrandCommunity?.id);

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
    if (user.full_name) {
      return user.full_name;
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
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-card dark:bg-card border rounded-lg p-4 shadow-sm dark:border-border"
                >
                  <div className="flex justify-between items-start mb-2">
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <Skeleton className="h-4 w-48 mb-2" />
                  <Skeleton className="h-5 w-20 mb-2" />
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-5 w-16" />
                </div>
              ))
              : earnings.map((user, index) => (
                <div
                  key={index}
                  className="bg-card border rounded-lg p-4 shadow-sm dark:bg-card dark:border-border dark:text-foreground"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-semibold text-foreground dark:text-white">
                      {getDisplayName(user)}
                    </div>
                  </div>
                  <div className="text-sm text-foreground dark:text-white p-1">
                    {user.email}
                  </div>
                  <div className="text-sm text-foreground dark:text-white p-1">
                    {" "}
                    {getStatusBadge(user.status)}
                  </div>
                  <div className="font-semibold text-foreground dark:text-white p-1">
                    {user.contact || "N/A"}
                  </div>
                  <div className="font-semibold text-foreground dark:text-white p-1">
                    ${user.total_earned}
                  </div>
                </div>
              ))}
            {!isLoading && earnings.length === 0 && (
              <div className="text-center p-4 text-muted-foreground dark:text-muted-foreground">
                No attributes found.
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <div className="p-1 min-w-[600px]">
              <Table>
                <TableHeader className="">
                  <TableRow className="bg-muted/50 text-foreground border-border rounded-full dark:bg-accent dark:text-foreground dark:border-border">
                    <TableHead className="font-medium py-4 px-6 dark:text-white">
                      Name
                    </TableHead>
                    <TableHead className=" font-medium py-4 px-6 dark:text-white">
                      Email
                    </TableHead>
                    <TableHead className="font-medium py-4 px-6 dark:text-white">
                      Status
                    </TableHead>
                    <TableHead className=" font-medium py-4 px-6 dark:text-white">
                      Total amount
                    </TableHead>
                    {/* <TableHead className="font-medium py-4 px-6 dark:text-white">
                      Contact
                    </TableHead>
                    <TableHead className="font-medium py-4 px-6 dark:text-white">
                      Actions
                    </TableHead> */}
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
                      </TableRow>
                    ))
                    : earnings.map((user, index) => (
                      <TableRow
                        key={index}
                        className="border-none hover:bg-accent dark:hover:bg-accent dark:text-foreground"
                      >
                        <TableCell className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                          {getDisplayName(user)}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-gray-600 dark:text-white">
                          {user.email}
                        </TableCell>
                        <TableCell className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                          {getStatusBadge(user.status)}
                        </TableCell>
                        <TableCell className="py-4 px-6 dark:text-white">
                          $ {user.total_earned}
                        </TableCell>
                        {/* <TableCell className="py-4 px-6 dark:text-white">
                        {user.contact || "N/A"}
                      </TableCell>
                      <TableCell className="py-4 px-6 flex gap-2">
                        <button className="cursor-pointer">
                          <EllipsisVertical />
                        </button>
                      </TableCell> */}
                      </TableRow>
                    ))}
                  {!isLoading && earnings.length === 0 && (
                    <TableRow>
                      <TableCell className="text-center py-4 text-muted-foreground dark:text-muted-foreground" colSpan={6}>
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


