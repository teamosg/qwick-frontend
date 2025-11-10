import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent } from "@/components/ui/tabs";
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

const PayoutData = () => {
  const users = [
    {
      name: "Adam smith",
      email: "adam@gmail.com",
      status: "paid",
      contact: "0191-392912",
      total_amount: "12345",
    },
    {
      name: "Adam smith",
      email: "adam@gmail.com",
      status: "paid",
      contact: "0191-392912",
      total_amount: "12345",
    },
    {
      name: "Adam smith",
      email: "adam@gmail.com",
      status: "paid",
      contact: "0191-392912",
      total_amount: "12345",
    },
    {
      name: "Adam smith",
      email: "adam@gmail.com",
      status: "paid",
      contact: "0191-392912",
      total_amount: "12345",
    },
    {
      name: "Adam smith",
      email: "adam@gmail.com",
      status: "paid",
      contact: "0191-392912",
      total_amount: "12345",
    },
    {
      name: "Adam smith",
      email: "adam@gmail.com",
      status: "paid",
      contact: "0191-392912",
      total_amount: "12345",
    },
    {
      name: "Adam smith",
      email: "adam@gmail.com",
      status: "paid",
      contact: "0191-392912",
      total_amount: "12345",
    },
    {
      name: "Adam smith",
      email: "adam@gmail.com",
      status: "pending",
      contact: "0191-392912",
      total_amount: "12345",
    },
    {
      name: "Adam smith",
      email: "adam@gmail.com",
      status: "paid",
      contact: "0191-392912",
      total_amount: "12345",
    },
  ];
  console.log(users);

  const getStatusBadge = (status) => {
    const variants = {
      paid: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      cancel: "bg-red-100 text-red-800 border-red-200",
    };

    return (
      <Badge
        variant="outline"
        className={`${
          variants[status.toLowerCase()]
        } rounded-full px-3 py-1 text-xs font-medium`}
      >
        {status}
      </Badge>
    );
  };

  return (
    <div className="p-o">
      <Tabs defaultValue="withdraw" className="w-full">
        {/* Withdraw Tab Content */}
        <TabsContent value="withdraw" className="p-0">
          {/* Mobile Card View */}
          <div className="block sm:hidden space-y-3">
            {users.map((user, index) => (
              <div
                key={index}
                className="bg-[#fff] dark:bg-[#25324B] border rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-[#25324B] dark:text-[#fff]">
                    {user.name}
                  </div>
                </div>
                <div className="text-sm text-[#25324B] dark:text-[#fff] p-1">{user.email}</div>
                <div className="text-sm text-[#25324B] dark:text-[#fff]  p-1">
                  {" "}
                  {getStatusBadge(user.status)}
                </div>
                <div className="font-semibold text-[#25324B] dark:text-[#fff]  p-1">
                  {user.contact}
                </div>
                <div className="font-semibold text-[#25324B] dark:text-[#fff] p-1">
                  {user.total_amount}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block">
            <div className="p-1">
              <Table>
                <TableHeader className="">
                  <TableRow className="bg-[#f5f5f5] dark:bg-[#25324B] text-gray-900 dark:text-[#fff] border-black rounded-full">
                    <TableHead className="font-medium py-4 px-6">
                      Name
                    </TableHead>
                    <TableHead className=" font-medium py-4 px-6">
                      Email
                    </TableHead>
                    <TableHead className="font-medium py-4 px-6">
                      Status
                    </TableHead>
                    <TableHead className=" font-medium py-4 px-6">
                      Total amount
                    </TableHead>
                    <TableHead className="font-medium py-4 px-6">
                      Contact
                    </TableHead>
                    <TableHead className="font-medium py-4 px-6">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="rounded-xl">
                  {users.map((user, index) => (
                    <TableRow
                      key={index}
                      className="border-none hover:bg-[#f5f5f5] dark:hover:bg-[#25324B]"
                    >
                      <TableCell className="py-4 px-6 font-medium text-gray-900 dark:text-[#fff]">
                        {user.name}
                      </TableCell>
                      <TableCell className="py-4 px-6 text-gray-600 dark:text-[#fff]">
                        {user.email}
                      </TableCell>
                      <TableCell className="py-4 px-6 font-semibold text-gray-900 dark:text-[#fff]">
                        {getStatusBadge(user.status)}
                      </TableCell>
                      <TableCell className="py-4 px-6 text-gray-600 dark:text-[#fff]">
                        $ {user.total_amount}
                      </TableCell>
                      <TableCell className="py-4 px-6 text-gray-600 dark:text-[#fff]">
                        {user.contact}
                      </TableCell>
                      <TableCell className="py-4 px-6 flex gap-2">
                        <button className="cursor-pointer">
                          <EllipsisVertical />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
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
