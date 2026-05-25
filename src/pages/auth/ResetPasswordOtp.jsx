import { useTheme } from "@/components/shared/ThemeProvider";
import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import commonAuthLogo from "../../assets/authImg.png";
import { useVerifyOtp } from "@/hooks/auth.hook";
import { toast } from "sonner";
import ResendOtp from "./ResendOtp";
import LogoOnly from "@/components/Logo/LogoOnly";

const ResetPasswordOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { theme } = useTheme();
  const darkMode = theme === "dark";
  const inputRefs = useRef([]);
  const { mutate, isPending } = useVerifyOtp("password_reset");

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
  const email =
    location.state?.email || localStorage.getItem("signup_email") || "";
  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");

    if (!email) {
      toast.error("Email is missing, please sign up again.");
      return;
    }

    // Call your mutation with form data
    mutate({
      email,
      otp: code,
      otp_type: "password_reset",
    });
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-900">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 px-6 md:px-12 lg:px-20 pb-6 md:pb-10 flex flex-col bg-white dark:bg-gray-900">
        <div className="max-w-md mx-auto w-full flex justify-between items-center">
          {/* Logo */}
          <div className="py-5 md:py-7 mb-4 md:mb-5">
            <LogoOnly />
          </div>

          {/* Theme Toggle */}
          {/* <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={`Switch to ${ darkMode ? "light" : "dark" } mode`}
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
              FORGOT PASSWORD
            </h2>
            <p className="dark:text-gray-400 text-center font-[Inter] text-base not-italic font-normal leading-relaxed">
              No worries, we'll send you reset instructions
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
                    className="w-10 h-10 md:w-12 md:h-12 text-center border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-ring dark:focus:ring-ring focus:border-border-strong dark:focus:border-border-strong bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg font-medium"
                    placeholder=""
                  />
                ))}
              </div>
            </div>

            <ResendOtp type="forgot-password" email={email} />

            <button
              type="submit"
              className="w-full bg-foreground-strong dark:bg-foreground-strong text-white py-4 px-10 rounded-full hover:bg-foreground dark:hover:bg-foreground-strong/90 transition mt-2 font-medium cursor-pointer"
            >
              {isPending ? "Verifying..." : "Confirm"}
            </button>
          </form>
        </div>
      </div>

      {/* Right side - Image (hidden on mobile) */}
      <div className="hidden md:block md:w-1/2 bg-white dark:bg-gray-800">
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

export default ResetPasswordOtp;
