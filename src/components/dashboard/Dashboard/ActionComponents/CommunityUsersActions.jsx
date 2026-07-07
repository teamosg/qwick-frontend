import { EllipsisVertical, Shield, ShieldAlert, UserMinus } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function CommunityUsersActions({ onApprove, onDemote, onRemove, role }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="cursor-pointer p-2 rounded-lg hover:bg-secondary text-foreground-muted hover:text-foreground transition-colors">
                    <EllipsisVertical className="h-5 w-5" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="bottom" align="end" className="w-52 p-1 bg-card border border-border rounded-xl shadow-lg">
                {role === 'user' ? (
                    <DropdownMenuItem 
                        onClick={onApprove}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-lg cursor-pointer"
                    >
                        <Shield className="h-4 w-4 text-primary" />
                        <span>Promote to Moderator</span>
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem
                        onClick={onDemote}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-lg cursor-pointer"
                    >
                        <ShieldAlert className="h-4 w-4 text-warning" />
                        <span>Demote to User</span>
                    </DropdownMenuItem>
                )}

                <div className="h-px bg-border my-1" />

                <DropdownMenuItem
                    onClick={onRemove}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-error hover:bg-error-bg hover:text-error rounded-lg cursor-pointer"
                >
                    <UserMinus className="h-4 w-4" />
                    <span>Remove Member</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default CommunityUsersActions;