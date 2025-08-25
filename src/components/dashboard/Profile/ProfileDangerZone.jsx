import { Button } from "@/components/ui/button";

const ProfileDangerZone = () => {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 mx-auto   max-w-2xl">
      <Button
        variant="ghost"
        className="w-xl block p-4.5 rounded-full text-[#717171] text-[16px] border border-[#003933] bg-none sm:flex items-center justify-center"
      >
        Sign out
      </Button>
      <Button
        variant="ghost hover:text-[#e7002a] hover:bg-primary/90"
        className="w-xl block p-4.5 rounded-full text-[#DF1C41] text-[16px] border border-[#003933] bg-none sm:flex items-center justify-center"
      >
        Delete account
      </Button>
    </div>
  );
};

export default ProfileDangerZone;
