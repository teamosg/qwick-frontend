import { Badge } from "@/components/ui/badge";
import { useApproveCommunityUser, useGetCommunityUsers } from "@/hooks/community.hook";
import { useCommunityStore } from "@/store/communityStore";
import WaitListSkeleton from "./skeletons/WaitListSkeleton";
import { FetchErrorAlert } from "@/components/Alerts/FetchErrorAlerts";
import { NoDataAlert } from "@/components/Alerts/NoDataAlert";
import { WaitingListActions } from "./ActionComponents/WaitingListActions";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
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

const getStatusBadge = (status = 'waiting') => {
  const variants = {
    waiting: "bg-warning-bg text-warning border-warning",
  };

  return (
    <Badge
      variant="outline"
      className={`${variants[status.toLowerCase()]
        } rounded-full px-3 py-1 text-xs font-medium`}
    >
      {status}
    </Badge>
  );
};



const WaitListData = () => {

  const { selectedBrandCommunity } = useCommunityStore();
  const { data, isLoading, isError } = useGetCommunityUsers(selectedBrandCommunity?.username)
  const { mutate: approveUser, isPending: isApproving } = useApproveCommunityUser(selectedBrandCommunity?.username)
  const [userOnAction, setUserOnAction] = useState(null)

  const waitingUsers = data?.pending_requests || [];

  function handleApprove(id) {
    setUserOnAction(id)
    approveUser({
      userId: id,
      action: "approve",
    })
  }

  function handleReject(id) {
    setUserOnAction(id)
    approveUser({
      userId: id,
      action: "reject",
    })
  }


  if (isLoading) return <WaitListSkeleton />

  return (
    <div className="p-o">
      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-3">
        {waitingUsers?.map((user, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-4 shadow-sm text-foreground"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="font-semibold text-foreground-strong">
                {user?.username}
              </div>
            </div>
            <div className="text-sm text-foreground-muted">{user?.email}</div>
            <div className="text-sm text-foreground-muted">{user?.status}</div>
            <div className="font-semibold text-foreground-strong">
              {user?.email}
            </div>
            <div className="font-semibold text-foreground-strong">
              {user?.joined_at}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <div className="p-1 min-w-[700px]">
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
                <TableHead className="font-medium py-4 px-6 text-foreground-strong">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="rounded-xl">
              {waitingUsers?.map((user, index) => (
                <TableRow
                  key={index}
                  className="border-none hover:bg-secondary"
                >
                  <TableCell className="py-4 px-6 font-medium text-foreground-strong">
                    {user?.username}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-foreground-muted">
                    {user?.email}
                  </TableCell>
                  <TableCell className="py-4 px-6 font-semibold text-foreground-strong">
                    {getStatusBadge(user?.status)}
                  </TableCell>
                  <TableCell className="py-4 px-6 flex gap-2">
                    {
                      isApproving && userOnAction === user?.user_id
                        ? (
                          <Spinner />
                        )
                        : (
                          <WaitingListActions
                            onApprove={() => handleApprove(user?.user_id)}
                            onReject={() => handleReject(user?.user_id)}
                          />
                        )
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {
        waitingUsers?.length === 0 && <NoDataAlert
        title="Your Waitlist Is Empty"
        message='Start inviting users and grow your early audience.'
        />
      }

      {
        isError && <FetchErrorAlert />
      }
    </div>
  );
};

export default WaitListData;