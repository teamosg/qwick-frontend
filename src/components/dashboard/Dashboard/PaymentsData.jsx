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
      paid: "bg-success-bg text-success border-success",
      pending: "bg-warning-bg text-warning border-warning",
      cancel: "bg-error-bg text-error border-error",
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
                  className="bg-card border border-border rounded-lg p-4 shadow-sm"
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
                  className="bg-card border border-border rounded-lg p-4 shadow-sm text-foreground"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-semibold text-foreground-strong">
                      {getDisplayName(user)}
                    </div>
                  </div>
                  <div className="text-sm text-foreground-muted p-1">
                    {user.email}
                  </div>
                  <div className="text-sm text-foreground-strong p-1">
                    {" "}
                    {getStatusBadge(user.status)}
                  </div>
                  <div className="font-semibold text-foreground-strong p-1">
                    {user.contact || "N/A"}
                  </div>
                  <div className="font-semibold text-foreground-strong p-1">
                    ${user.total_earned}
                  </div>
                </div>
              ))}
            {!isLoading && earnings.length === 0 && (
              <div className="text-center p-4 text-foreground-muted">
                No attributes found.
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <div className="p-1 min-w-[600px]">
              <Table>
                <TableHeader className="">
                  <TableRow className="bg-secondary text-foreground border-b border-border rounded-full">
                    <TableHead className="font-medium py-4 px-6 text-foreground-strong">
                      Name
                    </TableHead>
                    <TableHead className=" font-medium py-4 px-6 text-foreground-strong">
                      Email
                    </TableHead>
                    <TableHead className="font-medium py-4 px-6 text-foreground-strong">
                      Status
                    </TableHead>
                    <TableHead className=" font-medium py-4 px-6 text-foreground-strong">
                      Total amount
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
                      </TableRow>
                    ))
                    : earnings.map((user, index) => (
                      <TableRow
                        key={index}
                        className="border-none hover:bg-secondary"
                      >
                        <TableCell className="py-4 px-6 font-medium text-foreground-strong">
                          {getDisplayName(user)}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-foreground-muted">
                          {user.email}
                        </TableCell>
                        <TableCell className="py-4 px-6 font-semibold text-foreground-strong">
                          {getStatusBadge(user.status)}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-foreground-strong">
                          $ {user.total_earned}
                        </TableCell>
                      </TableRow>
                    ))}
                  {!isLoading && earnings.length === 0 && (
                    <TableRow>
                      <TableCell className="text-center py-4 text-foreground-muted" colSpan={6}>
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


