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
                    className="w-full text-red-600 cursor-pointer flex items-center justify-between bg-white dark:bg-zinc-800 rounded-xl py-4 px-6 hover:shadow-lg transition-all duration-300 ease-in-out shadow-sm border border-red-400"
                >
                    <div className="flex items-center justify-center gap-3">
                        <Trash2 className="text-red-600" />
                        <h3 className="dark:text-white text-[20px] font-semibold">
                            Delete Community
                        </h3>
                    </div>
                    <ChevronRight className="text-red-600" />
                </button>
            </AlertDialogTrigger>

            <AlertDialogContent className="max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-0">
                {/* Warning Icon */}
                <div className="flex justify-center mb-4 pt-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30">
                        <AlertTriangle className="w-8 h-8 text-destructive" strokeWidth={2.5} />
                    </div>
                </div>

                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold text-center text-gray-900 dark:text-gray-100">
                        Delete this community?
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-center text-gray-600 dark:text-gray-400 text-sm leading-relaxed pt-2">
                        This action cannot be undone. Deleting this community will permanently
                        remove it from the platform.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {/* Warning Box */}
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-lg p-4 my-4">
                    <p className="text-sm text-red-800 dark:text-red-400 font-medium">
                        ⚠️ You will lose:
                    </p>
                    <ul className="text-sm text-red-700 dark:text-red-400 mt-2 space-y-1 ml-4 list-disc">
                        <li>All posts and discussions</li>
                        <li>All member data related to this community</li>
                        <li>All community settings & configurations</li>
                    </ul>
                </div>

                <AlertDialogFooter className="flex-col sm:flex-row gap-3">
                    <AlertDialogCancel
                        disabled={isDeletingPending}
                        className="w-full sm:w-auto border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </AlertDialogCancel>

                    <Button
                        onClick={handleDeleteCommunity}
                        disabled={isDeletingPending}
                        className="w-full sm:w-auto bg-destructive hover:bg-destructive text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDeletingPending ? "Deleting..." : "Delete Community"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
};

export default DeleteCommunityAlert;