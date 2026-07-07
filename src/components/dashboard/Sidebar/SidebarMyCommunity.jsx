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
import { Link } from "react-router";


export function SidebarMyCommunity({ onClose, createdCommunityList, isLoadingCommunityList, isErrorCommunityList }) {

  if (isLoadingCommunityList || isErrorCommunityList)
    return <SidebarMyCommunitySkeleton />;


  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-foreground-subtle dark:text-zinc-400 font-semibold text-base hover:no-underline">
          My Community
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="max-h-40 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="p-4">
              {createdCommunityList?.map((community) => (
                <React.Fragment key={community?.business_name}>
                  <Link to={`/dashboard/${community?.username}`}>
                    <div className="text-sm  mb-3" >
                      <button
                        onClick={onClose}
                        className="flex items-center gap-2 dark:text-white cursor-pointer transition duration-300 hover:text-foreground-strong"
                      >
                        <AvatarUser
                          src={community?.profile_image}
                          alt={community?.business_name}
                          className="h-8 w-8"
                        />
                        {community?.business_name?.slice(0, 15)}
                        {community?.business_name?.length > 15 ? "..." : ""}
                      </button>
                    </div>
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
