"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, Check } from "lucide-react";

export default function DashboardSwitcher({
  data: communityList,
  isLoading: isLoadingCommunityList,
  setSelectedCommunity,
  selectedCommunity,
}) {
  if (isLoadingCommunityList || !selectedCommunity) return <p>loading ...</p>;

  console.log(selectedCommunity);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="z-40 flex items-center justify-between gap-2 py-2.5 px-3 rounded-lg text-white focus-visible:outline-none">
        <Avatar className="rounded-lg h-8 w-8">
          <AvatarFallback className="rounded-lg text-primary-foreground">
            <img
              src={selectedCommunity?.avatarUrl || "https://placehold.co/60x60"}
              alt=""
              className="w-11 h-11 object-cover"
            />
          </AvatarFallback>
        </Avatar>
        <div className="text-start flex flex-col gap-1 leading-none">
          <span className="text-base leading-none font-semibold truncate max-w-[17ch]">
            {selectedCommunity?.business_name?.slice(0, 14)}...
          </span>
          <span className="text-xs truncate max-w-[20ch]">
            @{selectedCommunity?.username}
          </span>
        </div>
        <ArrowDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="start">
        <DropdownMenuLabel>Communities</DropdownMenuLabel>
        {communityList.map((community) => (
          <DropdownMenuItem
            key={community.id}
            onClick={() => setSelectedCommunity(community)}
          >
            <div className="flex items-center gap-2">
              <Avatar className="rounded-md h-8 w-8">
                <AvatarFallback className="rounded-md  text-foreground">
                  <img
                    src={
                      selectedCommunity?.avatarUrl ||
                      "https://placehold.co/60x60"
                    }
                    alt=""
                  />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span>{community.name}</span>
                {/* <span className="text-xs text-muted-foreground">
                  @{community.username}
                </span> */}
              </div>
            </div>
            {selectedCommunity.id === community.id && (
              <Check className="ml-auto" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
