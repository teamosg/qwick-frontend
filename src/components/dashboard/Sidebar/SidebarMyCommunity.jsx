import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

const tags = Array.from({ length: 3 }).map(
  (_, i, a) => `Profile ${a.length - i}`
);
export function SidebarMyCommunity({ onClose }) {
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-[#090003] font-semibold text-base hover:no-underline">
          My Community
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="h-40 max-h-40 ">
            <div className="p-4">
              {tags.map((tag) => (
                <React.Fragment key={tag}>
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
                      {tag}
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
