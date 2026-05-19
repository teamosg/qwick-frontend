import DataTable from "@/components/dataTable/DataTable";
import contentRewardColumn from "@/components/tableColumns/contentRewardColumn";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CirclePlus, SearchX } from "lucide-react";
import { useState, useMemo } from "react";

const ContentRewardsTable = ({ data = [] }) => {
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredData = useMemo(() => {
    if (statusFilter === "all") return data;
    return data.filter(item => item.status?.toLowerCase() === statusFilter);
  }, [data, statusFilter]);

  return (
    <div className="w-full space-y-4">
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-zinc-900/50 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <CirclePlus size={16} />
          <span className="text-sm font-semibold">Filter by</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="w-[160px]">
            <Select onValueChange={setStatusFilter} defaultValue="all">
              <SelectTrigger className="h-9 rounded-full bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 focus:ring-1 focus:ring-[#003933] text-xs font-medium">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="dark:bg-zinc-900 dark:border-zinc-800">
                <SelectGroup>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm">
        {filteredData.length > 0 ? (
          <div className="w-full overflow-x-auto">
            <DataTable columns={contentRewardColumn} data={filteredData} />
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-center px-4">
            <div className="p-4 rounded-full bg-gray-50 dark:bg-zinc-800/50 text-gray-400">
              <SearchX size={32} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">No submissions found</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your filters or check back later.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentRewardsTable;
