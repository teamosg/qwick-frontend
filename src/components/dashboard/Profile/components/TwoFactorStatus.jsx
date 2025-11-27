import { Card, CardContent } from "@/components/ui/card";

const TwoFactorStatus = () => {
    return (
        <div className="space-y-4">
            <div className="mb-8">
                <h2 className="text-[18px] font-semibold text-[#090003] dark:text-white mb-1">
                    Two-factor authentication
                </h2>
                <p className="text-[#717171] text-sm">
                    Secure your account by requiring a verification code when signing in
                </p>
            </div>

            <Card className="text-left text-[#717171] border-[#003933] text-[16px] mb-8 w-full shadow rounded-[24px] p-0">
                <CardContent className="p-6">
                    <div className="space-y-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                            Text message
                        </h3>
                        <p className="text-sm text-gray-500">Receive a code via SMS</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TwoFactorStatus;