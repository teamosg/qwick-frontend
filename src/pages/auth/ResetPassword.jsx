import { useTheme } from "@/components/shared/ThemeProvider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import commonAuthLogo from "../../assets/authImg.png";
import { useResetPassword } from "../../hooks/auth.hook.js";
import { useLocation, useNavigate } from "react-router";
import LogoOnly from "@/components/Logo/LogoOnly";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const { mutate } = useResetPassword();


  const onSubmit = (data) => {
    mutate({
      email: data.email,
      new_password: data.new_password,
      confirm_password: data.confirm_password,
    });
    // Handle form submission
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-900">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 px-6 md:px-12 lg:px-20 pb-6 md:pb-10 flex flex-col bg-white dark:bg-gray-900 ">
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
              RESET PASSWORD
            </h2>
            <p className="dark:text-gray-400 text-center font-[Inter] text-base not-italic font-normal leading-relaxed">
              Create a new strong password for your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* mail input */}

            <div>
              <label className="text-gray-900 dark:text-gray-200 font-[Inter] text-[14px] not-italic font-medium leading-[155%] mb-1.5 md:mb-2 block">
                Email
              </label>
              <input
                name="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  // pattern: {
                  //   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  //   message: "Invalid email address",
                  // },
                })}
                placeholder="Enter your email"
                className="w-full px-4 py-4 border border-border-strong dark:border-gray-700 rounded-full focus:outline-none focus:ring-1 focus:ring-ring dark:focus:ring-ring focus:border-border-strong dark:focus:border-border-strong bg-white dark:bg-gray-800 text-black dark:text-white"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-900 dark:text-gray-200 font-[Inter] text-[14px] not-italic font-medium leading-[155%] mb-1.5 md:mb-2 block">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  name="new_password"
                  type={showPassword ? "text" : "password"}
                  {...register("new_password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Your password"
                  className="w-full pl-10 pr-5 py-4 border border-border-strong dark:border-gray-700 rounded-full focus:outline-none focus:ring-1 focus:ring-ring dark:focus:ring-ring focus:border-border-strong dark:focus:border-border-strong bg-white dark:bg-gray-800 text-black dark:text-white"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  ) : (
                    <FaEye className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-gray-900 dark:text-gray-200 font-[Inter] text-[14px] not-italic font-medium leading-[155%] mb-1.5 md:mb-2 block">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  name="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirm_password", {
                    validate: (value) =>
                      value === watch("new_password") ||
                      "Passwords do not match",
                  })}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-5 py-4 border border-border-strong dark:border-gray-700 rounded-full focus:outline-none focus:ring-1 focus:ring-ring dark:focus:ring-ring focus:border-border-strong dark:focus:border-border-strong bg-white dark:bg-gray-800 text-black dark:text-white"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  ) : (
                    <FaEye className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-foreground-strong dark:bg-foreground-strong text-white py-4 px-10 rounded-full hover:bg-foreground dark:hover:bg-foreground-strong/90 transition mt-2 font-medium cursor-pointer"
            >
              Reset Password
            </button>
          </form>

          {/* Back to Sign In link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Remember your password?{" "}
              <Link
                to="/sign-in"
                className="text-foreground-strong dark:text-foreground-strong font-medium hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
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

export default ResetPassword;
