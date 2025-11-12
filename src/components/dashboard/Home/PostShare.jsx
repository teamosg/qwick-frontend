import Share from "@/assets/svg/Share";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useState } from "react";

export function PostShare() {
  const [copied, setCopied] = useState(false);
  const shareLink = "https://ui.shadcn.com/docs/installation";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      setCopied(false);
      console.log(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center cursor-pointer px-2 py-1 rounded-md hover:text-[#003933] hover:dark:text-emerald-300 transition-colors">
          <Share />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-900 border-none">
        <DialogHeader>
          <DialogTitle className="text-black dark:text-white">
            Share link
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-zinc-400">
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 text-gray-700 dark:text-zinc-400">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              className="text-gray-800 dark:text-white bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-gray-700"
              id="link"
              value={shareLink}
              readOnly
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={handleCopy}
            className="flex items-center gap-1 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white"
          >
            <Copy size={16} />
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="bg-[#003933] dark:bg-[#003933] text-white px-4 py-2 sm:py-4 sm:px-10 rounded-3xl sm:rounded-full hover:bg-[#002822] hover:dark:bg-primary/90 transition font-medium cursor-pointer flex gap-2"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
