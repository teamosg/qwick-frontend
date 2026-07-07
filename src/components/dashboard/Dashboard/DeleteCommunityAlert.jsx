import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, ChevronRight, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCommunityStore } from "@/store/communityStore";
import { useDeleteCommunity } from "@/hooks/community.hook";
import { useNavigate } from "react-router";



const DeleteCommunityAlert = () => {
    const navigate = useNavigate()
    const { mutate: deleteCommunity, isPending: isDeletingPending } = useDeleteCommunity();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { selectedBrandCommunity, setSelectedBrandCommunity } = useCommunityStore()
    const communityUsername = selectedBrandCommunity?.username;

    const handleDeleteCommunity = async (e) => {
        e.preventDefault();
        deleteCommunity({ communityUsername },
            {
                onSuccess: data => {
                    if (data?.success) {
                        setIsDialogOpen(false);
                        setSelectedBrandCommunity(null)
                        navigate("/dashboard");
                    }
                }
            }
        )
    }

    return (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
                <button
                    className="w-full text-error cursor-pointer flex items-center justify-between bg-card rounded-xl py-3 px-4 hover:shadow-lg transition-all duration-300 ease-in-out shadow-sm border border-error"
                >
                    <div className="flex items-center justify-center gap-3">
                        <Trash2 className="text-error size-5" />
                        <h3 className="text-foreground-strong text-[16px] font-semibold">
                            Delete Community
                        </h3>
                    </div>
                    <ChevronRight className="text-error size-5" />
                </button>
            </AlertDialogTrigger>

            <AlertDialogContent className="max-w-md bg-card rounded-2xl shadow-2xl border border-border">
                {/* Warning Icon */}
                <div className="flex justify-center mb-4 pt-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error-bg border border-error/30">
                        <AlertTriangle className="w-8 h-8 text-error" strokeWidth={2.5} />
                    </div>
                </div>

                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold text-center text-foreground-strong">
                        Delete this community?
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-center text-foreground-muted text-sm leading-relaxed pt-2">
                        This action cannot be undone. Deleting this community will permanently
                        remove it from the platform.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {/* Warning Box */}
                <div className="bg-error-bg border border-error/30 rounded-lg p-4 my-4">
                    <p className="text-sm text-error font-medium">
                        ⚠️ You will lose:
                    </p>
                    <ul className="text-sm text-error mt-2 space-y-1 ml-4 list-disc opacity-90">
                        <li>All posts and discussions</li>
                        <li>All member data related to this community</li>
                        <li>All community settings & configurations</li>
                    </ul>
                </div>

                <AlertDialogFooter className="flex-col sm:flex-row gap-3">
                    <AlertDialogCancel
                        disabled={isDeletingPending}
                        className="w-full sm:w-auto border border-border hover:bg-secondary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </AlertDialogCancel>

                    <Button
                        onClick={handleDeleteCommunity}
                        disabled={isDeletingPending}
                        className="w-full sm:w-auto bg-error hover:bg-error/90 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDeletingPending ? "Deleting..." : "Delete Community"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
};

export default DeleteCommunityAlert;