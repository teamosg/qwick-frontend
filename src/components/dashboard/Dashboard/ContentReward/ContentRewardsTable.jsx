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
    <div>
      <div className="flex items-center text-[#1E293B] border border-[#717171] max-w-max rounded-full pl-4">
        <div className="flex items-center gap-2">
          <CirclePlus size={14} />
          <p>Status</p>
          <div className="w-0.5 h-3 bg-[#717171]"></div>
        </div>
        <Select>
          <SelectTrigger
            className={
              "cursor-pointer shadow-none border-0 focus-visible:ring-0"
            }
          >
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent className={"text-[#1E293B]"}>
            <SelectGroup>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* table  */}
      <div className="mt-4">
        <DataTable columns={contentRewardColumn} data={mySubmissions} />
      </div>
    </div>
  );
};

export default ContentRewardsTable;
