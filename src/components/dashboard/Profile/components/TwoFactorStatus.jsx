import { Card, CardContent } from "@/components/ui/card";
import { useGetTwoFactorStatus, useToggleTwoFactor } from "@/hooks/auth.hook";
import ToggleSwitch from "../../Dashboard/ToggleSwitch";

const TwoFactorStatus = () => {
    const { mutate: toggleTwoFactor, isPending: isToggling } = useToggleTwoFactor()
    const { data, isLoading } = useGetTwoFactorStatus();
    const status = data?.is_2fa_enabled || false

    const handleTwoFactorToggle = () => {
        if (isToggling) return;
        toggleTwoFactor({ action: status ? 'disable' : 'enable' })
    }

    return (
        <div className="space-y-4">
            <div className="mb-8">
                <h2 className="text-[18px] font-semibold text-foreground-strong dark:text-white mb-1">
                    Two-Factor Authentication
                </h2>
                <p className="text-foreground-muted text-sm">
                    Add an extra layer of security with a verification code when signing in.
                </p>
            </div>

            <Card className="text-left text-foreground-muted border-border text-base mb-8 w-full shadow-sm rounded-2xl p-0 bg-card">
                <CardContent className="p-6 flex items-center justify-between">
                    <div className="space-y-2">
                        <h3 className="font-medium text-foreground-strong dark:text-white">
                            Text Message
                        </h3>
                        <p className="text-sm text-foreground-muted">
                            {
                                isLoading
                                    ? "Loading..."
                                    : status
                                        ? "Two-factor authentication is currently on. You will receive a code via SMS when signing in."
                                        : "Two-factor authentication is currently off. Enable it to secure your account."
                            }
                        </p>
                    </div>
                    <ToggleSwitch
                        enabled={status}
                        disabled={isToggling}
                        onToggle={handleTwoFactorToggle}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default TwoFactorStatus;
