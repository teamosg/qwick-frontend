import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export function FetchErrorAlert({ message }) {
  return (
    <Alert className="border-red-500/40 text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/40">
      <TriangleAlert className="h-4 w-4" />
      <AlertTitle className="font-semibold">Network Error</AlertTitle>
      <AlertDescription>
        {message || "Something went wrong. Please try again."}
      </AlertDescription>
    </Alert>
  );
}
