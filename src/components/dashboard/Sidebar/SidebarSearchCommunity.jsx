import { SearchIcon } from "lucide-react";

export function SidebarSearchCommunity() {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 items-center border-b border-sidebar-border "
    >
      <input
        type="text"
        data-slot="command-input"
        className="placeholder:text-muted-foreground flex h-10  w-full rounded-md bg-transparent text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50 px-5 py-3 "
        placeholder="Search community"
      />
      <button type="submit" className="cursor-pointer">
        <SearchIcon className="size-4 shrink-0 opacity-50 " />
      </button>
    </div>
  );
}
