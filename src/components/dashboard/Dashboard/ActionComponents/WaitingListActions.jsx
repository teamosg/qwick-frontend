import { EllipsisVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function WaitingListActions({ onApprove, onReject }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="cursor-pointer p-2 rounded hover:bg-secondary">
                    <EllipsisVertical className="h-5 w-5" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="right" align="start" className="w-32">
                <DropdownMenuItem onClick={onApprove}>Approve</DropdownMenuItem>
                <DropdownMenuItem
                    className="text-error"
                    onClick={onReject}
                >
                    Reject
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
