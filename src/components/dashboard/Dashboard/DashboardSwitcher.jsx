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
import { useState } from "react";
const workspaces = [
  {
    id: 1,
    name: "Community One",
    createdBy: "@lofttypayoff",
    avatarUrl: "https://placehold.co/60x60",
  },
  {
    id: 2,
    name: "Community Two",
    createdBy: "@example.com",
    avatarUrl: "https://placehold.co/60x60",
  },
  {
    id: 3,
    name: "Community Three",
    createdBy: "@example.com",
    avatarUrl: "https://placehold.co/60x60",
  },
];
export default function DashboardSwitcher() {
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="z-40 flex items-center justify-between gap-2 py-2.5 px-3 rounded-lg text-white focus-visible:outline-none">
        <Avatar className="rounded-lg h-8 w-8">
          <AvatarFallback className="rounded-lg text-primary-foreground">
            <img
              src={selectedWorkspace.avatarUrl}
              alt=""
              className="w-11 h-11 object-cover"
            />
          </AvatarFallback>
        </Avatar>
        <div className="text-start flex flex-col gap-1 leading-none">
          <span className="text-base leading-none font-semibold truncate max-w-[17ch]">
            {selectedWorkspace.name}
          </span>
          <span className="text-xs truncate max-w-[20ch]">
            {selectedWorkspace.createdBy}
          </span>
        </div>
        <ArrowDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="start">
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        {workspaces.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            onClick={() => setSelectedWorkspace(workspace)}
          >
            <div className="flex items-center gap-2">
              <Avatar className="rounded-md h-8 w-8">
                <AvatarFallback className="rounded-md  text-foreground">
                  <img src={selectedWorkspace.avatarUrl} alt="" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span>{workspace.name}</span>
                <span className="text-xs text-muted-foreground">
                  {workspace.createdBy}
                </span>
              </div>
            </div>
            {selectedWorkspace.id === workspace.id && (
              <Check className="ml-auto" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
