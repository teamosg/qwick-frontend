import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";
import { useDeleteAccount } from "@/hooks/auth.hook";

const DeleteAccount = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutate: deleteAccount, isPending: isDeletingPending } =
    useDeleteAccount();

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      deleteAccount({
        email: "",
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-8">
        <h2 className="text-[18px] font-semibold text-foreground-strong dark:text-white mb-1">
          Delete Account
        </h2>
        <p className="text-foreground-muted text-sm">
          Permanently remove your account and all of your data from our platform
        </p>
      </div>

      <Card className="border-error/30 shadow-sm rounded-2xl overflow-hidden bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-medium text-foreground-strong dark:text-white">
                Delete your account
              </h3>
              <p className="text-sm text-foreground-muted">
                Once you delete your account, there is no going back. Please be certain.
              </p>
            </div>

            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="cursor-pointer hover:text-white hover:bg-error active:scale-[0.98] transition-all duration-300 ease-in-out px-8 rounded-full text-error text-base border border-error bg-transparent"
                >
                  Delete account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[95%] max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6 md:p-8">
                <div className="flex justify-center mb-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-error-bg border border-error/20">
                    <AlertTriangle
                      className="w-7 h-7 sm:w-8 sm:h-8 text-error"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>

                <AlertDialogHeader>
                  <AlertDialogTitle className="text-lg sm:text-xl font-bold text-center text-foreground-strong dark:text-white">
                    Delete your account?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center text-foreground-muted text-sm leading-relaxed pt-2">
                    This action cannot be undone. This will permanently delete your
                    account and remove all your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="bg-error-bg border border-error/20 rounded-xl p-4 my-4">
                  <p className="text-sm text-error font-semibold mb-2">
                    ⚠️ You will lose:
                  </p>
                  <ul className="text-sm text-error space-y-1 ml-4 list-disc">
                    <li>All your campaigns and content</li>
                    <li>Your profile and settings</li>
                    <li>Access to all your data</li>
                  </ul>
                </div>

                <AlertDialogFooter className="flex flex-col sm:flex-row gap-3">
                  <AlertDialogCancel
                    disabled={isDeletingPending}
                    className="w-full sm:w-auto border border-border bg-secondary hover:bg-secondary-hover text-foreground rounded-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    onClick={handleDeleteAccount}
                    disabled={isDeletingPending}
                    className="w-full sm:w-auto bg-error hover:bg-error-hover text-primary-foreground font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed py-2 cursor-pointer"
                  >
                    {isDeletingPending ? "Deleting..." : "Delete account"}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeleteAccount;
