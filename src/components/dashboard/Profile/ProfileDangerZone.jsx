"use client";

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
import notImplemented from "@/dummyMessages/notImplemented";
import { useState } from "react";
import { useDeleteAccount, useLogout } from "@/hooks/auth.hook";

const ProfileDangerZone = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const user = localStorage.getItem("user");
  console.log(user);

  const { mutate: logOut, isPending } = useLogout();
  const { mutate: deleteAccount, isPending: isDeletingPending } =
    useDeleteAccount();

  const handleSignOut = () => {
    logOut();
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault(); // Prevent default dialog close behavior
    try {
      deleteAccount({
        email: "",
      });

      // Close dialog after successful deletion
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 mx-auto max-w-2xl">
      {/* Sign Out Button */}
      <Button
        onClick={handleSignOut}
        disabled={isPending}
        variant="ghost"
        className="cursor-pointer hover:text-white hover:bg-[#003933] transition-all duration-300 ease-in-out w-full block p-4.5 rounded-full active:scale-98 text-[#003933] dark:text-white text-[16px] border border-[#003933] bg-none sm:flex items-center justify-center"
      >
        {isPending ? "Signing out..." : "Sign out"}
      </Button>

      {/* Delete Account with Confirmation Modal */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            className="cursor-pointer hover:text-white hover:bg-[#DF1C41] active:scale-98 transition-all duration-300 ease-in-out w-full block p-4.5 rounded-full text-[#DF1C41] text-[16px] border border-[#DF1C41] bg-none sm:flex items-center justify-center"
          >
            Delete account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-0">
          {/* Warning Icon Header */}
          <div className="flex justify-center mb-4 pt-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30">
              <AlertTriangle
                className="w-8 h-8 text-[#DF1C41]"
                strokeWidth={2.5}
              />
            </div>
          </div>

          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-center text-gray-900 dark:text-gray-100">
              Delete your account?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-gray-600 dark:text-gray-400 text-sm leading-relaxed pt-2">
              This action cannot be undone. This will permanently delete your
              account and remove all your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Warning Box */}
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-lg p-4 my-4">
            <p className="text-sm text-red-800 dark:text-red-400 font-medium">
              ⚠️ You will lose:
            </p>
            <ul className="text-sm text-red-700 dark:text-red-400 mt-2 space-y-1 ml-4 list-disc">
              <li>All your campaigns and content</li>
              <li>Your profile and settings</li>
              <li>Access to all your data</li>
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
              onClick={handleDeleteAccount}
              disabled={isDeletingPending}
              className="w-full sm:w-auto bg-[#DF1C41] hover:bg-[#c01838] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeletingPending ? "Deleting..." : "Delete account"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfileDangerZone;
