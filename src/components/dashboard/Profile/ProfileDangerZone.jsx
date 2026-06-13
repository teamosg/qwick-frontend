"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/auth.hook";

const ProfileDangerZone = () => {
  const { mutate: logOut, isPending } = useLogout();

  const handleSignOut = () => {
    logOut();
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 mx-auto max-w-2xl">
      {/* Sign Out Button */}
      <Button
        onClick={handleSignOut}
        disabled={isPending}
        variant="ghost"
        className="cursor-pointer hover:text-white hover:bg-foreground-strong dark:hover:bg-accent transition-all duration-300 ease-in-out w-full flex items-center justify-center p-4 sm:p-4.5 rounded-full active:scale-[0.98] text-foreground-strong dark:text-white text-base sm:text-[16px] border border-foreground-muted bg-transparent"
      >
        {isPending ? "Signing out..." : "Sign out"}
      </Button>
    </div>
  );
};

export default ProfileDangerZone;
