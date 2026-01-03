import { useTheme } from "@/components/shared/ThemeProvider";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import arrowRight from "../../assets/arrow-right.svg";
import commonAuthLogo from "../../assets/authImg.png";
import { useSignIn, useGoogleSignInHook } from "../../hooks/auth.hook.js";
import LogoOnly from "@/components/Logo/LogoOnly";
import { useGoogleLogin } from "@react-oauth/google";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  // Use the new auth hook
  const { form, mutate, isPending } = useSignIn();
  const { register, handleSubmit, formState: { errors } } = form;

  const { mutate: googleSignIn, isPending: googlePending } = useGoogleSignInHook();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {

      googleSignIn(tokenResponse.access_token);
    },
    onError: (error) => console.log("Google Login Failed:", error),
  });

  // const toggleDarkMode = () => {
  //   setTheme(theme === "dark" ? "light" : "dark");
  // };

  const onSubmit = (data) => {
    mutate(data);
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
          <div className="mb-10 text-center">
            <h2 className="text-black dark:text-white text-center font-[Inter] text-2xl md:text-3xl not-italic font-medium leading-tight uppercase mb-2">
              SIGN IN
            </h2>
            <p className="dark:text-gray-400 text-center font-[Inter] text-base not-italic font-normal leading-relaxed">
              Start earning rewards for your content
            </p>
          </div>

          {/* Social Buttons */}
          <div className="flex md:flex-row flex-col items-center gap-2 md:gap-3.5">
            <button
              type="button"
              onClick={() => handleGoogleLogin()}
              disabled={googlePending}
              className="w-full py-4 px-5 md:px-2 lg:px-4 border border-none dark:border-none rounded-full text-center font-medium flex items-center justify-between gap-2 hover:bg-gray-100 dark:bg-gray-800 transition cursor-pointer bg-[#f9f9f9]"
            >
              <div className="flex items-center gap-2">
                <FcGoogle className="text-lg" />
                <span className="text-gray-800 dark:text-gray-200">
                  {googlePending ? "Signing in..." : "Google"}
                </span>
              </div>
              <img src={arrowRight} alt="arrow" className="dark:invert" />
            </button>
            {/* <button className="w-full py-4 px-4 md:px-2 lg:px-4 border border-none dark:border-none rounded-full text-center font-medium flex items-center justify-between gap-2 hover:bg-gray-100 dark:bg-gray-800 transition cursor-pointer bg-[#f9f9f9]">
              <div className="flex items-center gap-2">
                <FaFacebook className="text-lg text-blue-600" />
                <span className="text-gray-800 dark:text-gray-200">
                  Facebook
                </span>
              </div>
              <img src={arrowRight} alt="arrow" className="dark:invert" />
            </button> */}
          </div>

          {/* Divider */}
          <div className="my-6 md:my-7.5 flex items-center">
            <div className="flex-1 border-t border-dashed border-gray-300 dark:border-gray-700"></div>
            <span className="px-3 text-gray-500 dark:text-gray-400 text-sm">
              or
            </span>
            <div className="flex-1 border-t border-dashed border-gray-300 dark:border-gray-700"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-black dark:text-gray-200 font-[Inter] text-[14px] not-italic font-medium leading-[155%] mb-1.5 md:mb-2.5 block">
                Email
              </label>
              <div className="relative">
                {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div> */}
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter email"
                  className="w-full px-5 py-4 border border-[#C3C3C3] dark:border-gray-700 rounded-full focus:outline-none focus:ring-1 focus:ring-[#003933] dark:focus:ring-primary focus:border-[#003933] dark:focus:border-primary bg-white dark:bg-gray-800 text-black dark:text-white"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-black dark:text-gray-200 font-[Inter] text-[14px] not-italic font-medium leading-[155%] mb-1.5 md:mb-2.5 block">
                Password
              </label>
              <div className="relative">
                {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div> */}
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter password"
                  className="w-full px-5 py-4 border border-[#C3C3C3] dark:border-gray-700 rounded-full focus:outline-none focus:ring-1 focus:ring-[#003933] dark:focus:ring-primary focus:border-[#003933] dark:focus:border-primary bg-white dark:bg-gray-800 text-black dark:text-white"
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

            {/* Remember me & Forgot password */}
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#003933] dark:text-primary focus:ring-[#003933] dark:focus:ring-primary border-gray-300 dark:border-gray-600 rounded-xl"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Keep me signed in
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-[#003933] dark:text-primary hover:text-[#002822] dark:hover:text-primary/80"
                >
                  Forget your password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#003933] dark:bg-[#003933] text-white py-4 px-10 rounded-full hover:bg-[#002822] dark:hover:bg-primary/90 transition mt-2 font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Sign up link */}
          <div className="mt-6 sm:mt-10 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-[#003933] dark:text-white font-medium hover:underline"
              >
                Sign up
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

export default SignIn;
