import { useTheme } from "@/components/shared/ThemeProvider";
import { Link } from "react-router-dom";
import commonAuthLogo from "../../assets/authImg.png";
import { useForgotPassword } from "../../hooks/auth.hook.js";
import { useNavigate } from "react-router";
import LogoOnly from "@/components/Logo/LogoOnly";
import Logo from "@/components/Logo/Logo";

const ForgotPassword = () => {
  const navigate = useNavigate()
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  // Use the new auth hook
  const { form, mutate, isPending } = useForgotPassword();
  const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit = (data) => {
    mutate(data,
      {
        onSuccess: (data) => {
          if (data?.success) {
            navigate("/enter-otp", { state: { email: data.email } });
          }
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 px-6 md:px-12 lg:px-20 pb-6 md:pb-10 flex flex-col">
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
            <h2 className="text-black dark:text-white text-center font-[Inter] text-2xl md:text-3xl not-italic font-medium leading-tight mb-2">
              Forgot Password
            </h2>
            <p className="dark:text-qwick-gray-400 text-center font-[Inter] text-base not-italic font-normal leading-relaxed">
              No worries. Reset instructions are on the way.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-qwick-gray-900 dark:text-qwick-gray-200 font-[Inter] text-[14px] not-italic font-medium leading-[155%] mb-1.5 md:mb-2.5 block">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                  className="w-full px-5 py-4 border border-qwick-gray-300 dark:border-qwick-gray-700 rounded-full focus:outline-none focus:ring-1 focus:ring-ring dark:focus:ring-ring focus:border-qwick-gray-300 dark:focus:border-qwick-gray-700 bg-card text-black dark:text-white"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-4 px-10 rounded-full transition mt-2 font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Sending..." : "Continue"}
            </button>
          </form>

          {/* Back to Sign In link */}
          <div className="mt-6 text-center">
            <p className="text-qwick-gray-600 dark:text-qwick-gray-400">
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
      <div className="hidden md:block md:w-1/2">
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

export default ForgotPassword;
