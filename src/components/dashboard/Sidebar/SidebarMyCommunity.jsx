import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetCommunityList } from "@/hooks/community.hook";
import { SidebarMyCommunitySkeleton } from "./skeletons/SidebarMyCommunitySkeleton";

const tags = Array.from({ length: 3 }).map(
  (_, i, a) => `Profile ${a.length - i}`
);
export function SidebarMyCommunity({ onClose }) {
  const {
    data: communityList,
    isLoading: isLoadingCommunityList,
    isError: isErrorCommunityList,
  } = useGetCommunityList();

  if (isLoadingCommunityList || isErrorCommunityList)
    return <SidebarMyCommunitySkeleton />;

  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-[#090003] dark:text-white font-semibold text-base hover:no-underline">
          My Community
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="h-40 max-h-40 ">
            <div className="p-4">
              {communityList.map((community) => (
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
                      {community?.business_name?.slice(0, 15)}...
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
