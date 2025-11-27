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
import {
  useBlockUser,
  usePinConversation,
  useUnpinConversation,
} from "@/hooks/conversations.hook";

function MessageOptions({ chat }) {
  const { avatar, username, pinned, user_id, type, group_id, group_name } = chat;
  const { mutate: pinConversation } = usePinConversation();
  const { mutate: unpinConversation } = useUnpinConversation();
  const { mutate: blockUser } = useBlockUser();

  const conversationName = type === "dm" ? username : group_name;

  // single handler for all items
  const handleItemClick = () => {
    toast.error("This feature hasn't been implemented yet!");
  };

  const handlePinConversation = () => {
    pinConversation({
      conversationId: user_id ?? group_id,
    });
  };

  const handleUnpinConversation = () => {
    unpinConversation({
      conversationId: user_id ?? group_id,
    });
  };

  const handleBlockUser = () => {
    blockUser({
      userId: user_id ?? group_id,
    });
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
          {
            type === 'dm' &&
            <>
              <DropdownMenuItem onClick={() => handleItemClick("Profile")}>
                <Avatar className={"w-[18px] h-[18px] rounded-full object-cover"}>
                  <AvatarImage src={avatar} alt={conversationName} />
                  <AvatarFallback>{conversationName.split("")[0]}</AvatarFallback>
                </Avatar>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleItemClick("Add to group")}>
                <UserPlus />
                Add to group
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 hover:text-red-600 font-bold"
                onClick={() => handleBlockUser()}
              >
                <Ban color="red" className="rotate-90" />
                Block User
              </DropdownMenuItem>
            </>
          }
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {pinned ? (
            <DropdownMenuItem onClick={() => handleUnpinConversation()}>
              <PinOff className="rotate-45" />
              Unpin
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => handlePinConversation()}>
              <Pin className="rotate-45" />
              Pin
            </DropdownMenuItem>
          )}
          {/* <DropdownMenuItem onClick={() => handleItemClick("Open in new tab")}>
            <ExternalLink />
            Open in new tab
          </DropdownMenuItem> */}
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
