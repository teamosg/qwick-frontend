import { useTheme } from "@/components/shared/ThemeProvider";
import { useRef, useState } from "react";
import commonAuthLogo from "../../assets/authImg.png";
import { useVerifyOtp } from "@/hooks/auth.hook";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useLocation } from "react-router-dom";
import ResendOtp from "./ResendOtp";
import LogoOnly from "@/components/Logo/LogoOnly";
import Logo from "@/components/Logo/Logo";

const VerifyTwoAuth = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const { theme } = useTheme();
    const darkMode = theme === "dark";
    const inputRefs = useRef([]);
    const { mutate, isPending } = useVerifyOtp("two_factor_auth");

    const handleOtpChange = (index, value) => {
        // Only allow numbers
        if (!/^[0-9]*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto focus to next input if value is entered
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const location = useLocation();
    const email = location.state?.email || "";


    const handleSubmit = (e) => {
        e.preventDefault();
        const code = otp.join("");


        if (!code || code.length !== 6) {
            toast.error("Please enter a valid OTP.");
            return;
        }

        if (!email) {
            toast.error("Email is missing, please sign in again.");
            return;
        }

        // Call your mutation with form data
        mutate({
            email,
            otp: code,
            otp_type: "two_factor_auth",
        });
    };

    return (
        <div className="min-h-screen flex bg-white dark:bg-gray-900">
            {/* Left side - Form */}
            <div className="w-full md:w-1/2 px-6 md:px-12 lg:px-20 pb-6 md:pb-10 flex flex-col bg-white dark:bg-gray-900">
                <div className="max-w-md mx-auto w-full flex justify-between items-center">
                    {/* Logo */}
                    <div className="py-5 md:py-7 mb-4 md:mb-5">
                        {/* <LogoOnly /> */}
                        <Logo />
                    </div>

                    {/* Theme Toggle */}
                    {/* <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" size={20} />
            ) : (
              <FaMoon className="text-gray-600" size={20} />
            )}
          </button> */}
                </div>

                <div className="max-w-md mx-auto w-full flex flex-col justify-center flex-1">
                    <div className="mb-8 text-center">
                        <h2 className="text-black dark:text-white text-center font-[Inter] text-2xl md:text-3xl not-italic font-medium leading-tight uppercase mb-2">
                            VERIFY YOUR TWO-FACTOR AUTHENTICATION
                        </h2>
                        <p className="dark:text-gray-400 text-center font-[Inter] text-base not-italic font-normal leading-relaxed">
                            Check your email, we are sending the verification code
                        </p>
                    </div>

                    {/* OTP Input */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="text-black dark:text-gray-200 font-[Inter] text-[18px] not-italic font-medium leading-[155%] mb-4 block">
                                Enter your OTP
                            </label>
                            <div className="flex justify-center gap-1.5 md:gap-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="w-10 h-10 md:w-12 md:h-12 text-center border border-gray-300 dark:border-zinc-700 rounded-full focus:outline-none focus:ring-2 focus:ring-ring dark:focus:ring-ring focus:border-border-strong dark:focus:border-border-strong bg-white dark:bg-zinc-900 text-gray-900 dark:text-white text-lg font-medium"
                                        placeholder=""
                                    />
                                ))}
                            </div>
                        </div>

                        <ResendOtp type="verify-2fa" email={email} />

                        <button
                            type="submit"
                            className="w-full bg-foreground-strong dark:bg-foreground-strong text-white py-4 px-10 rounded-full hover:bg-foreground dark:hover:bg-foreground-strong/90 transition mt-2 font-medium cursor-pointer"
                        >
                            {
                                isPending
                                    ? <div className="flex items-center justify-center"><Spinner /> </div>
                                    : "Confirm"
                            }
                        </button>
                    </form>
                </div>
            </div>

            {/* Right side - Image (hidden on mobile) */}
            <div className="hidden md:block md:w-1/2 bg-white dark:bg-zinc-900">
                <div className="h-full w-full flex items-center justify-center p-2.5 rounded-[30px] overflow-hidden">
                    <img
                        src={commonAuthLogo}
                        alt="Authentication"
                        className="h-full w-full object-cover rounded-[30px]"
                    />
                </div>
            </div>
        </div>
    );
};


export default VerifyTwoAuth;