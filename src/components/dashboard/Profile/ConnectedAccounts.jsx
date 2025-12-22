import { Button } from "@/components/ui/button";
import {
  Instagram,
  Music,
  Plus,
  Youtube,
  Facebook,
  ExternalLink,
  Check
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { useProfile } from "@/hooks/auth.hook";
import { useAddSocialMedia, useVerifySocialMedia } from "@/hooks/social.hook";

const ConnectedAccounts = () => {
  const { data: profile } = useProfile();
  const { mutate: addAccount, isPending } = useAddSocialMedia();
  const { mutate: verifyAccount, isPending: isVerifying } = useVerifySocialMedia();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [url, setUrl] = useState("");
  const [otp, setOtp] = useState(null);

  const connectedSocials = profile?.social_media || {};

  const accounts = [
    { id: "facebook", name: "Facebook", icon: Facebook },
    { id: "youtube", name: "YouTube", icon: Youtube },
    { id: "instagram", name: "Instagram", icon: Instagram },
    { id: "tiktok", name: "TikTok", icon: Music },
  ];

  const handleConnectClick = (platform) => {
    setSelectedPlatform(platform);
    setUrl("");
    setOtp(null);
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setUrl("");
    setOtp(null);
    setSelectedPlatform(null);
  };

  const handleConfirmConnect = () => {
    if (!selectedPlatform || !url) return;

    addAccount(
      {
        platform: selectedPlatform.id,
        url: url
      },
      {
        onSuccess: (data) => {
          if (data?.status && data?.otp) {
            setOtp(data.otp);
          }
        }
      }
    );
  };

  const handleVerify = () => {
    if (!selectedPlatform) return;

    verifyAccount(
      {
        platform: selectedPlatform.id
      },
      {
        onSuccess: (data) => {
          if (data?.status) {
            handleCancel();
          }
        }
      }
    );
  };

  const handleAccountClick = (account, isConnected, connectedUrl) => {
    if (isConnected && connectedUrl) {
      window.open(connectedUrl, "_blank", "noopener,noreferrer");
    } else {
      handleConnectClick(account);
    }
  };

  // Separate accounts into connected and unconnected lists
  const connectedList = accounts.filter(account => !!connectedSocials[account.id]);
  const unconnectedList = accounts.filter(account => !connectedSocials[account.id]);

  return (
    <div className="p-6 space-y-8">
      {/* Connected Accounts Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Connected Accounts
        </h2>
        {connectedList.length === 0 ? (
          <div className="text-center text-[#717171] dark:text-white text-[16px] py-10 px-4 w-full shadow rounded-[24px]">
            <p>No Accounts connected yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {connectedList.map((account) => {
              const connectedUrl = connectedSocials[account.id];
              return (
                <Button
                  key={account.id}
                  variant="outline"
                  onClick={() => handleAccountClick(account, true, connectedUrl)}
                  className="flex items-center justify-between w-full p-4 h-12 rounded-full border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20"
                >
                  <div className="flex items-center gap-3">
                    <account.icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="text-green-700 dark:text-green-300 font-medium">
                      {account.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-green-600 hidden sm:inline">Connected</span>
                    <ExternalLink className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                </Button>
              );
            })}
          </div>
        )}
      </div>

      {/* Add New Account Section */}
      {unconnectedList.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Add new account
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {unconnectedList.map((account) => (
              <Button
                key={account.id}
                variant="outline"
                onClick={() => handleAccountClick(account, false, null)}
                className="flex items-center justify-between w-full p-4 h-12 rounded-full border border-gray-300 dark:border-[#364152] hover:bg-gray-50 dark:hover:bg-[#2E2E2E]"
              >
                <div className="flex items-center gap-3">
                  <account.icon className="h-5 w-5 text-gray-600 dark:text-white" />
                  <span className="text-gray-700 dark:text-white font-medium">
                    {account.name}
                  </span>
                </div>
                <Plus className="h-4 w-4 text-gray-600 dark:text-white" />
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Connection Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleCancel}>
        <DialogContent className="sm:max-w-md space-y-4">
          <DialogHeader>
            <DialogTitle>Connect {selectedPlatform?.name}</DialogTitle>
          </DialogHeader>

          {!otp ? (
            // Step 1: Enter URL
            <>
              <div>
                <label className="text-sm font-medium mb-1 block">Profile URL</label>
                <Input
                  type="url"
                  placeholder={`Enter your ${selectedPlatform?.name} profile URL`}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmConnect}
                  disabled={!url || isPending}
                  className="flex-1 bg-[#003933] hover:bg-[#002822] text-white"
                >
                  {isPending ? <Spinner className="w-4 h-4 text-white" /> : "Generate OTP"}
                </Button>
              </div>
            </>
          ) : (
            // Step 2: Verify OTP
            <>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Your OTP Code:
                  </p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                    {otp}
                  </p>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  <p className="font-medium">Next steps:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>
                      Add this OTP to your {selectedPlatform?.name}{" "}
                      {selectedPlatform?.id === "youtube" ? "channel description" : "bio"}
                    </li>
                    <li>Save your changes on {selectedPlatform?.name}</li>
                    <li>Click the Verify button below</li>
                  </ol>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="flex-1 bg-[#003933] hover:bg-[#002822] text-white"
                >
                  {isVerifying ? <Spinner className="w-4 h-4 text-white" /> : "Verify"}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConnectedAccounts;
