import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetMyCommunityList } from "@/hooks/community.hook";
import { SidebarMyCommunitySkeleton } from "./skeletons/SidebarMyCommunitySkeleton";


export function SidebarMyCommunity({ onClose }) {
  // const { setSelectedJoinedCommunity } = useJoinedCommunityStore();
  const {
    data: communityList,
    isLoading: isLoadingCommunityList,
    isError: isErrorCommunityList,
  } = useGetMyCommunityList();

  const myCommunityList = communityList?.created_communities

  if (isLoadingCommunityList || isErrorCommunityList)
    return <SidebarMyCommunitySkeleton />;


  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-[#090003] dark:text-white font-semibold text-base hover:no-underline">
          My Community
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="max-h-40 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="p-4">
              {myCommunityList?.map((community) => (
                <React.Fragment key={community?.business_name}>
                  <div className="text-sm  mb-3">
                    <button
                      onClick={onClose}
                      className="cursor-pointer transition duration-300 hover:text-[#17173c]"
                    >
                      <img
                        src="https://placehold.co/60x60"
                        alt=""
                        className="rounded-full inline mr-2 object-cover h-8 w-8"
                      />
                      {community?.business_name?.slice(0, 15)}
                      {community?.business_name?.length > 15 ? "..." : ""}
                    </button>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
