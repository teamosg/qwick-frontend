import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  UserPlus,
  Pin,
  CircleX,
  ExternalLink,
  Ban,
  CheckCircle,
  Ellipsis,
} from "lucide-react";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PinOff } from "lucide-react";

function MessageOptions({ chat }) {
  const { avatar, username, pinned } = chat;
  console.log(chat);
  // single handler for all items
  const handleItemClick = () => {
    toast.error("This feature hasn't been implemented yet!");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mx-2" asChild>
        <Ellipsis />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="dark:bg-gray-800">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleItemClick("Mark as unread")}>
            <CheckCircle />
            Mark as unread
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleItemClick("Profile")}>
            <Avatar className={"w-[18px] h-[18px] rounded-full object-cover"}>
              <AvatarImage src={avatar} alt={username} />
              <AvatarFallback>{username.split("")[0]}</AvatarFallback>
            </Avatar>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleItemClick("Add to group")}>
            <UserPlus />
            Add to group
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600 hover:text-red-600 font-bold"
            onClick={() => handleItemClick("Block User")}
          >
            <Ban color="red" className="rotate-90" />
            Block User
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {pinned ? (
            <DropdownMenuItem onClick={() => handleItemClick("Pin")}>
              <PinOff className="rotate-45" />
              Unpin
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => handleItemClick("Pin")}>
              <Pin className="rotate-45" />
              Pin
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => handleItemClick("Open in new tab")}>
            <ExternalLink />
            Open in new tab
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600 hover:text-red-600 font-bold"
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
