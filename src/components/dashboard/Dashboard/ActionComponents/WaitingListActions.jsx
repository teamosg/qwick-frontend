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
                <button className="cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                    <EllipsisVertical className="h-5 w-5" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="right" align="start" className="w-32">
                <DropdownMenuItem onClick={onApprove}>Approve</DropdownMenuItem>
                <DropdownMenuItem
                    className="text-red-600 dark:text-red-400"
                    onClick={onReject}
                >
                    Reject
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
