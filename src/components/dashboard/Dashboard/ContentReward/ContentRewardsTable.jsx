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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border">
        <div className="flex items-center gap-2 text-foreground-muted">
          <CirclePlus size={16} />
          <span className="text-sm font-semibold">Filter by</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="w-[160px]">
            <Select onValueChange={setStatusFilter} defaultValue="all">
              <SelectTrigger className="h-9 rounded-full bg-secondary border-border focus:ring-1 focus:ring-ring text-xs font-medium">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
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
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
        {filteredData.length > 0 ? (
          <div className="w-full overflow-x-auto">
            <DataTable columns={contentRewardColumn} data={filteredData} />
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-center px-4">
            <div className="p-4 rounded-full bg-secondary text-foreground-muted">
              <SearchX size={32} />
            </div>
            <div>
              <p className="font-semibold text-foreground-strong">No submissions found</p>
              <p className="text-sm text-foreground-muted">Try adjusting your filters or check back later.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentRewardsTable;
