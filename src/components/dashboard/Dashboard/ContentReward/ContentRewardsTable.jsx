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
import { mySubmissions } from "@/data/mySubmissions";
import { CirclePlus } from "lucide-react";

const ContentRewardsTable = () => {
  return (
    <div className="w-full">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 text-[#1E293B] dark:text-gray-100 border border-[#717171]/40 dark:border-gray-700 rounded-full pl-4 pr-2 py-1 max-w-full sm:max-w-max">
        <div className="flex items-center gap-2">
          <CirclePlus size={14} className="text-[#1E293B] dark:text-gray-200" />
          <p className="text-sm font-medium">Status</p>
          <div className="w-px h-3 bg-[#717171]/60 dark:bg-gray-600"></div>
        </div>

        <Select>
          <SelectTrigger className="cursor-pointer shadow-none border-0 focus-visible:ring-0 text-sm bg-transparent dark:text-gray-100">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent className="text-[#1E293B] dark:text-gray-100 dark:bg-gray-800 border dark:border-gray-700">
            <SelectGroup>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="mt-4 w-full">
        <DataTable columns={contentRewardColumn} data={mySubmissions} />
      </div>
    </div>
  );
};

export default ContentRewardsTable;
