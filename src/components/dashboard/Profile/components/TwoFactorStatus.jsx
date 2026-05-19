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
                <h2 className="text-[18px] font-semibold text-[#090003] dark:text-white mb-1">
                    Two-Factor Authentication
                </h2>
                <p className="text-[#717171] text-sm">
                    Add an extra layer of security with a verification code when signing in.
                </p>
            </div>

            <Card className="text-left text-[#717171] border-[#003933] text-[16px] mb-8 w-full shadow rounded-[24px] p-0">
                <CardContent className="p-6 flex items-center justify-between">
                    <div className="space-y-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                            Text Message
                        </h3>
                        <p className="text-sm text-gray-500">
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
