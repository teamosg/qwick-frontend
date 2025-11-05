import { Cell } from "recharts";

const contentRewardColumn = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status ? "Approved" : "Rejected";
      return (
        <span style={{ color: status === "Approved" ? "green" : "red" }}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "totalViews",
    header: "Total Views",
  },
  {
    accessorKey: "submission",
    header: "Submission",
  },
  {
    accessorKey: "rewardRate",
    cell: ({ row }) => {
      return <span>${row.original.rewardRate.toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "paidAmount",
    header: "Paid amount",
    cell: ({ row }) => {
      return <span>${row.original.paidAmount.toFixed(2)}</span>;
    },
  },
];

export default contentRewardColumn;
