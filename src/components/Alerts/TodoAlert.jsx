import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export function TodoAlert({ message }) {
    return (
        <div
            className="p-2"
        >
            <Alert className="border-blue-500/40 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40">
                <Info className="h-4 w-4" />
                <AlertTitle className="font-semibold">Action Required</AlertTitle>
                <AlertDescription>
                    {message || "Please follow the instructions to complete this task."}
                </AlertDescription>
            </Alert>
        </div>
    );
}
