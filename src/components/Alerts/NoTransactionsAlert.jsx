import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Inbox } from "lucide-react";

export function NoTransactionsAlert() {
  return (
    <Alert className="flex flex-col items-center justify-center gap-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 text-center py-6 rounded-none">
      <Inbox className="h-6 w-6 text-gray-500 dark:text-gray-300" />
      <AlertTitle className="text-gray-700 dark:text-white font-semibold">
        No Transactions
      </AlertTitle>
      <AlertDescription className="text-gray-600 dark:text-gray-300 text-sm">
        No withdraw transactions found.
      </AlertDescription>
    </Alert>
  );
}
