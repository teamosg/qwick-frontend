import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `Profile ${a.length - i}`
);

export function SidebarCommunity({ onClose }) {
  return (
    <ScrollArea className="h-72 ">
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
  );
}
