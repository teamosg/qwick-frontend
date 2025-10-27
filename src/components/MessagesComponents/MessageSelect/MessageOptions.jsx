import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserPlus, Pin, CircleX, ExternalLink, Ban, CheckCircle, Ellipsis } from "lucide-react";
import toast from "react-hot-toast";

function MessageOptions({ avatar }) {
  // single handler for all items
  const handleItemClick = (label) => {
    // toast.success("Clicked:", label);
    toast.error("This feature hasn't been implemented yet!")
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mx-2" asChild>
        <Ellipsis />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleItemClick("Mark as unread")}>
            <CheckCircle />
            Mark as unread
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleItemClick("Profile")}>
            <img
              src={avatar}
              className="w-[18px] h-[18px] rounded-full object-cover"
            />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleItemClick("Add to group")}>
            <UserPlus />
            Add to group
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600 hover:text-red-600"
            onClick={() => handleItemClick("Block User")}
          >
            <Ban color="red" className="rotate-90" />
            Block User
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleItemClick("Pin")}>
            <Pin className="rotate-45" />
            Pin
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleItemClick("Open in new tab")}>
            <ExternalLink />
            Open in new tab
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600 hover:text-red-600"
            onClick={() => handleItemClick("Close chat")}
          >
            <CircleX color="red" />
            Close chat
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MessageOptions;
