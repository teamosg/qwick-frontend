import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { FolderX } from "lucide-react";

export function NoDataAlert({ message }) {
    return (
        <div
            className="p-2"
        >
            <Alert className="border-yellow-500/40 text-yellow-700 dark:text-yellow-300 bg-yellow-50 dark:bg-yellow-950/40">
                <FolderX className="h-4 w-4" />
                <AlertTitle className="font-semibold">No Results</AlertTitle>
                <AlertDescription>
                    {message || "There is no data to display at the moment."}
                </AlertDescription>
            </Alert>
        </div>
    );
}
