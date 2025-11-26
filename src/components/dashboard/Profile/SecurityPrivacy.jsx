import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useChangePassword } from "@/hooks/auth.hook";
import { Spinner } from "@/components/ui/spinner";


// -------------------
// ZOD VALIDATION SCHEMA
// -------------------
const passwordSchema = z
  .object({
    current_password: z.string().min(1, "Current password is required"),
    new_password: z.string().min(6, "New password must be at least 6 characters"),
    confirm_password: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match!",
  });


const SecurityPrivacy = () => {
  const { mutate: changePassword, isPending: isChanging } = useChangePassword();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = (data) => {
    changePassword(data)
  };

  return (
    <div className="p-6 space-y-10">
      {/* Two-factor authentication section */}
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

      {/* Change Password Section */}
      <div>
        <h2 className="text-[18px] font-semibold text-[#090003] dark:text-white mb-4">
          Change Password
        </h2>

        <Card className="border-[#003933] shadow rounded-[24px]">
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                {/* Current Password */}
                <FormField
                  control={form.control}
                  name="current_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-white">
                        Current Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showCurrent ? "text" : "password"}
                            placeholder="Enter current password"
                            {...field}
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrent(!showCurrent)}
                            className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-300"
                          >
                            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* New Password */}
                <FormField
                  control={form.control}
                  name="new_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-white">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showNew ? "text" : "password"}
                            placeholder="Enter new password"
                            {...field}
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-300"
                          >
                            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-white">
                        Confirm New Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirm ? "text" : "password"}
                            placeholder="Confirm new password"
                            {...field}
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-300"
                          >
                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isChanging}
                  className="w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed bg-[#003933] hover:bg-[#005a52] text-white rounded-xl"
                >
                  {
                    isChanging
                      ? <Spinner />
                      : "Change Password"
                  }
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurityPrivacy;
