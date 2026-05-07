import { FetchErrorAlert } from "@/components/Alerts/FetchErrorAlerts";
import { NoDataAlert } from "@/components/Alerts/NoDataAlert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useGetCommunityUsers, useManageCommunityUserRole } from "@/hooks/community.hook";
import { useCommunityStore } from "@/store/communityStore";
import { EllipsisVertical, Link2 } from "lucide-react";
import WaitListSkeleton from "./skeletons/WaitListSkeleton";
import CommunityUsersActions from "./ActionComponents/CommunityUsersActions";
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

const getStatusBadge = (status = 'active') => {
  const variants = {
    active: "bg-green-100 text-green-800 border-green-200",
    moderator: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    cancel: "bg-red-100 text-red-800 border-red-200",
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


const UsersData = () => {

  const { selectedBrandCommunity } = useCommunityStore();
  const { data, isLoading, isError } = useGetCommunityUsers(selectedBrandCommunity?.username)
  const { mutate: changeRole, isPending: isChangingRole } = useManageCommunityUserRole(selectedBrandCommunity?.username)
  const [userOnAction, setUserOnAction] = useState(null)

  const activeUsers = data?.members || [];

  const handleApproveToModerator = (userId) => {
    setUserOnAction(userId);
    changeRole({ userId, action: "promote" })
  }

  const handleDemoteToUser = (userId) => {
    setUserOnAction(userId);
    changeRole({ userId, action: "demote" })
  }


  if (isLoading) return <WaitListSkeleton />

  return (
    <div className="p-o">
      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-3">
        {activeUsers?.map((user, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg p-4 shadow-sm dark:bg-[#2E2E2E] dark:border-[#444] dark:text-[#fff]"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="font-semibold text-[#25324B] dark:text-[#fff]">
                {user?.username}
              </div>
            </div>
            <div className="text-sm text-[#25324B] dark:text-[#fff]">{user?.email}</div>
            <div className="text-sm text-[#25324B] dark:text-[#fff]">{user?.status}</div>
            <div className="font-semibold text-[#25324B] dark:text-[#fff]">
              {user?.email}
            </div>
            <div className="font-semibold text-[#25324B] dark:text-[#fff]">
              {user?.joined_at}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <div className="p-1 min-w-[800px]">
          <Table>
            <TableHeader className="">
              <TableRow className="bg-[#f5f5f5] text-gray-900 dark:bg-[#2E2E2E] dark:text-[#fff] border-black rounded-full">
                <TableHead className="font-medium py-4 px-6 dark:text-[#fff]">
                  Name
                </TableHead>
                <TableHead className=" font-medium py-4 px-6 dark:text-[#fff]">
                  Email
                </TableHead>
                <TableHead className="font-medium py-4 px-6 dark:text-[#fff]">
                  Status
                </TableHead>
                <TableHead className="font-medium py-4 px-6 dark:text-[#fff]">
                  Role
                </TableHead>
                <TableHead className="font-medium py-4 px-6 dark:text-[#fff]">
                  Joined at
                </TableHead>
                <TableHead className="font-medium py-4 px-6 dark:text-[#fff]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="rounded-xl">
              {activeUsers?.map((user, index) => (
                <TableRow
                  key={index}
                  className="border-none hover:bg-white dark:hover:bg-[#2E2E2E]"
                >
                  <TableCell className="py-4 px-6 font-medium text-gray-900 dark:text-[#fff]">
                    {user?.username}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-gray-600 dark:text-[#fff]">
                    {user?.email}
                  </TableCell>
                  <TableCell className="py-4 px-6 font-semibold text-gray-900 dark:text-[#fff]">
                    {getStatusBadge(user?.status)}
                  </TableCell>
                  <TableCell className="py-4 px-6 font-semibold text-gray-900 dark:text-[#fff]">
                    {getStatusBadge(user?.is_moderator ? 'moderator' : 'user')}
                  </TableCell>
                  <TableCell className="py-4 px-6 font-semibold text-sm text-gray-500 dark:text-[#fff]">
                    {user?.joined_at?.substring(0, 10)}
                  </TableCell>
                  <TableCell className="py-4 px-6 flex gap-2">
                    {
                      isChangingRole && userOnAction === user?.id
                        ? (
                          <Spinner />
                        )
                        : (
                          <CommunityUsersActions
                            role={user?.is_moderator ? 'moderator' : 'user'}
                            onApprove={() => handleApproveToModerator(user?.id)}
                            onDemote={() => handleDemoteToUser(user?.id)}
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
        activeUsers?.length === 0 && <NoDataAlert />
      }

      {
        isError && <FetchErrorAlert />
      }
    </div>
  );
};

export default UsersData;
