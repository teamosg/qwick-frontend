import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useCommunityStore } from "@/store/communityStore";
import { useEditCommunity, useGetMyCommunityList } from "@/hooks/community.hook";
import ToggleSwitch from "./ToggleSwitch";
import WaitListData from "./WaitListData";

const WaitList = () => {
  const { selectedBrandCommunity, setSelectedBrandCommunity } = useCommunityStore();
  const { mutate: editCommunity, isPending } = useEditCommunity();
  const { data: communityList } = useGetMyCommunityList();

  const myCommunityList = communityList?.created_communities || [];
  const activeCommunity = myCommunityList.find(c => c.username === selectedBrandCommunity?.username) || selectedBrandCommunity;

  const isAutoJoin = activeCommunity ? !activeCommunity.require_approval : false;

  const handleToggleAutoJoin = () => {
    if (!selectedBrandCommunity || isPending) return;

    const nextAutoJoin = !isAutoJoin;
    const payload = new FormData();
    payload.append("require_approval", !nextAutoJoin);

    editCommunity(
      {
        communityUsername: selectedBrandCommunity.username,
        payload,
      },
      {
        onSuccess: (data) => {
          if (data?.status) {
            setSelectedBrandCommunity({
              ...selectedBrandCommunity,
              require_approval: !nextAutoJoin,
            });
          }
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-[20px] md:text-[24px] text-foreground dark:text-foreground font-bold">
        Waitlist
      </h2>

      {selectedBrandCommunity && (
        <div className="bg-card dark:bg-card rounded-xl p-6 shadow-sm border border-border dark:border-border">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
                <h3 className="text-foreground-strong dark:text-white text-base sm:text-lg font-semibold">
                  User Auto Join
                </h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        aria-label="User auto join information"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      align="center"
                      className="max-w-xs p-2 text-xs"
                    >
                      If turned on, users will auto join the community without any approvals. If turned off, requested users will appear in the waitlist.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-muted-foreground dark:text-muted-foreground text-sm">
                Allow users to join your community instantly without waiting for admin approval.
              </p>
            </div>
            <ToggleSwitch
              enabled={isAutoJoin}
              onToggle={handleToggleAutoJoin}
              disabled={isPending}
            />
          </div>
        </div>
      )}

      <WaitListData />
    </div>
  );
};

export default WaitList;
