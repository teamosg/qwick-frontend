import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarMyCommunitySkeleton } from "./skeletons/SidebarMyCommunitySkeleton";
import AvatarUser from "@/components/ui/AvatarUser";
import { useCommunityStore } from "@/store/communityStore";
import { useNavigate } from "react-router";


export function SidebarJoinedCommunity({ onClose, joinedCommunityList, isLoadingCommunityList, isErrorCommunityList }) {

  const navigate = useNavigate()
  const { setSelectedCreatorCommunity } = useCommunityStore()

  if (isLoadingCommunityList || isErrorCommunityList)
    return <SidebarMyCommunitySkeleton />;


  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-[#090003] dark:text-white font-semibold text-base hover:no-underline">
          Joined Community
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="max-h-40 ">
            <div className="p-4">
              {joinedCommunityList?.map((community) => (
                <React.Fragment key={community?.business_name}>
                  <div className="text-sm  mb-3">
                    <button
                      onClick={() => {
                        setSelectedCreatorCommunity(community)
                        navigate(`/announcement`)
                      }}
                      className="flex items-center gap-2 dark:text-white cursor-pointer transition duration-300 hover:text-[#17173c]"
                    >
                      <AvatarUser
                        src={community?.avatar}
                        alt={community?.business_name}
                        className="h-8 w-8"
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
