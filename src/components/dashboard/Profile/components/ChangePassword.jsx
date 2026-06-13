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



const ChangePassword = () => {
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
        <div>
            <h2 className="text-[18px] font-semibold text-foreground dark:text-white mb-4">
                Change Password
            </h2>

            <Card className="border-foreground-muted shadow rounded-[24px]">
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
                                                    placeholder="Current Password"
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
                                                    placeholder="New Password"
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
                                                    placeholder="Confirm New Password"
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
                                className="w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed bg-foreground-strong dark:bg-accent hover:bg-foreground dark:hover:bg-accent/80 text-white rounded-xl"
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
    );
};

export default ChangePassword;