import { Card, CardContent } from "@/components/ui/card";

const SecurityPrivacy = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Two-factor authentication section */}
      <div className="space-y-4">
        <div className="mb-8">
          <h2 className="text-[18px] font-semibold text-[#090003] dark:text-white mb-4">
            Two-factor authentication
          </h2>
          <p className="text-[#717171] text-sm">
            Secure your account by requiring a verification code when signing in
          </p>
        </div>

        {/* Text message card */}
        <Card className="text-left text-[#717171] text-[16px] mb-8 py-10 w-full shadow rounded-[24px] ">
          <CardContent className="p-6">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 dark:text-white">Text message</h3>
              <p className="text-sm text-gray-500">Receive a code via SMS</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurityPrivacy;
