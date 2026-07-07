import { Button } from "@/components/ui/button";
import {
  Instagram,
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

const TikTokIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-tiktok"
    viewBox="0 0 16 16"
    {...props}
  >
    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
  </svg>
);

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
    // { id: "facebook", name: "Facebook", icon: Facebook },
    { id: "youtube", name: "YouTube", icon: Youtube },
    { id: "instagram", name: "Instagram", icon: Instagram },
    { id: "tiktok", name: "TikTok", icon: TikTokIcon },
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
    <div className="md:p-6 space-y-8">
      {/* Connected Accounts Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground-strong dark:text-white mb-4">
          Connected Accounts
        </h2>
        {connectedList.length === 0 ? (
          <div className="text-center text-foreground-muted text-base py-10 px-4 w-full shadow-sm bg-card border border-border rounded-2xl">
            <p>No Accounts Connected</p>
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
                  className="flex items-center justify-between w-full p-4 h-12 rounded-full border border-success/30 bg-success-bg hover:bg-success-bg/80 text-success cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <account.icon className="h-5 w-5 text-success" />
                    <span className="text-success font-medium">
                      {account.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-success/80 hidden sm:inline">Connected</span>
                    <ExternalLink className="h-4 w-4 text-success" />
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
          <h2 className="text-lg font-semibold text-foreground-strong dark:text-white mb-4">
            Connect Your Accounts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {unconnectedList.map((account) => (
              <Button
                key={account.id}
                variant="outline"
                onClick={() => handleAccountClick(account, false, null)}
                className="flex items-center justify-between w-full p-4 h-12 rounded-full border border-border bg-secondary hover:bg-secondary-hover text-foreground cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <account.icon className="h-5 w-5 text-foreground-muted" />
                  <span className="text-foreground font-medium">
                    {account.name}
                  </span>
                </div>
                <Plus className="h-4 w-4 text-foreground-muted" />
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
                  className="flex-1 cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmConnect}
                  disabled={!url || isPending}
                  className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground cursor-pointer"
                >
                  {isPending ? <Spinner className="w-4 h-4 text-primary-foreground" /> : "Generate OTP"}
                </Button>
              </div>
            </>
          ) : (
            // Step 2: Verify OTP
            <>
              <div className="space-y-3">
                <div className="p-4 bg-info/10 dark:bg-info/5 rounded-lg border border-info/30 dark:border-info/20">
                  <p className="text-sm font-medium text-info mb-2">
                    Your OTP Code:
                  </p>
                  <p className="text-2xl font-bold text-info tracking-wider">
                    {otp}
                  </p>
                </div>

                <div className="text-sm text-foreground-muted space-y-2">
                  <p className="font-medium text-foreground-strong">Next steps:</p>
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
                  className="flex-1 cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground cursor-pointer"
                >
                  {isVerifying ? <Spinner className="w-4 h-4 text-primary-foreground" /> : "Verify"}
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
