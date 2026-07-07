import { EllipsisVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function CommunityUsersActions({ onApprove, onDemote, role }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="cursor-pointer p-2 rounded hover:bg-secondary">
                    <EllipsisVertical className="h-5 w-5" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="right" align="start" className="w-32">
                {
                    role === 'user'
                        ? (
                            <DropdownMenuItem onClick={onApprove}>Promote to Moderator</DropdownMenuItem>
                        )
                        : (
                            <DropdownMenuItem
                                className="text-error"
                                onClick={onDemote}
                            >
                                Demote to User
                            </DropdownMenuItem>
                        )
                }

            </DropdownMenuContent>
        </DropdownMenu>
    );
}


export default CommunityUsersActions;