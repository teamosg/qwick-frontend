import { useState } from "react";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaLock,
  FaUser,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import arrowRight from "../../assets/arrow-right.svg";
import commonAuthLogo from "../../assets/authImg.png";
import { useSignUp, useGoogleSignInHook } from "../../hooks/auth.hook.js";
import { useNavigate } from "react-router";
import LogoOnly from "@/components/Logo/LogoOnly";
import { useGoogleLogin } from "@react-oauth/google";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Use the new auth hook
  const { form, mutate, isPending } = useSignUp();
  const { register, handleSubmit, formState: { errors }, watch } = form;

  const acceptedTerms = watch("accepted_terms");

  const { mutate: googleSignIn, isPending: googlePending } = useGoogleSignInHook();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {

      googleSignIn(tokenResponse.access_token);
    },
    onError: (error) => console.log("Google Login Failed:", error),
  });

  const onSubmit = (data) => {
    const { accepted_terms, ...payload } = data;
    mutate(payload, {
      onSuccess: res => {
        if (res?.status) {
          navigate("/verify-account", {
            state: { email: form.getValues("email"), data: payload },
          });
        }
      } 
    });
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
        </div>

        <div className="max-w-md mx-auto w-full flex flex-col justify-center flex-1">
          <div className="mb-8 text-center">
            <h2 className="text-black dark:text-white text-center font-[Inter] text-2xl md:text-3xl not-italic font-medium leading-tight ">
              Sign Up
            </h2>
            {/* Sign In link */}
            <div className="mt-2 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  className="text-[#003933] dark:text-white font-medium hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="flex md:flex-row flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => handleGoogleLogin()}
              disabled={googlePending}
              className="w-full py-4 px-5 md:px-2 lg:px-4 border border-none dark:border-none rounded-full text-center font-medium flex items-center justify-between gap-2 hover:bg-gray-100 dark:bg-zinc-900 transition cursor-pointer bg-[#f9f9f9]"
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
          <div className="my-3 flex items-center">
            <div className="flex-1 border-t border-dashed border-gray-300 dark:border-gray-700"></div>
            <span className="px-3 text-gray-500 dark:text-gray-400 text-sm">
              or
            </span>
            <div className="flex-1 border-t border-dashed border-gray-300 dark:border-gray-700"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* Name and Username Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-black dark:text-gray-200 font-[Inter] text-[14px] not-italic font-medium leading-[155%] mb-1.5 md:mb-2.5 block">
                  Name
                </label>
                <div className="relative flex">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    {...register("full_name")}
                    placeholder="Name"
                    className="w-full pl-10 pr-5 py-4 border border-[#C3C3C3] dark:border-gray-700 rounded-full focus:outline-none focus:ring-1 focus:ring-[#003933] dark:focus:ring-primary focus:border-[#003933] dark:focus:border-primary bg-white dark:bg-gray-800 text-black dark:text-white"
                  />
                </div>
                {errors.full_name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.full_name.message}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label className="text-black dark:text-gray-200 font-[Inter] text-[14px] not-italic font-medium leading-[155%] mb-1.5 md:mb-2.5 block">
                  Username
                </label>
                <div className="relative flex">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    {...register("username")}
                    placeholder="Username"
                    className="w-full pl-10 pr-5 py-4 border border-[#C3C3C3] dark:border-gray-700 rounded-full focus:outline-none focus:ring-1 focus:ring-[#003933] dark:focus:ring-primary focus:border-[#003933] dark:focus:border-primary bg-white dark:bg-gray-800 text-black dark:text-white"
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-black dark:text-gray-200 font-[Inter] text-[14px] not-italic font-medium leading-[155%] mb-1.5 md:mb-2.5 block">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                  className="w-full pl-10 pr-5 py-4 border border-[#C3C3C3] dark:border-gray-700 rounded-full focus:outline-none focus:ring-1 focus:ring-[#003933] dark:focus:ring-primary focus:border-[#003933] dark:focus:border-primary bg-white dark:bg-gray-800 text-black dark:text-white"
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
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Password"
                  className="w-full pl-10 pr-5 py-4 border border-[#C3C3C3] dark:border-gray-700 rounded-full focus:outline-none focus:ring-1 focus:ring-[#003933] dark:focus:ring-primary focus:border-[#003933] dark:focus:border-primary bg-white dark:bg-gray-800 text-black dark:text-white"
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
              <label className="text-black dark:text-gray-200 font-[Inter] text-[14px] not-italic font-medium leading-[155%] mb-1.5 md:mb-2.5 block">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirm_password")}
                  placeholder="Confirm password"
                  className="w-full pl-10 pr-5 py-4 border border-[#C3C3C3] dark:border-gray-700 rounded-full focus:outline-none focus:ring-1 focus:ring-[#003933] dark:focus:ring-primary focus:border-[#003933] dark:focus:border-primary bg-white dark:bg-gray-800 text-black dark:text-white"
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
              {errors.confirm_password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start gap-2 py-2">
              <input
                type="checkbox"
                {...register("accepted_terms")}
                id="accepted_terms"
                className="mt-1 w-4 h-4 text-[#003933] border-gray-300 rounded focus:ring-[#003933] cursor-pointer"
              />
              <label htmlFor="accepted_terms" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                By signing up, I agree to{" "}
                <Link to="/terms-and-conditions" className="text-[#003933] dark:text-white font-medium hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/terms-and-conditions" className="text-[#003933] dark:text-white font-medium hover:underline">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>
            {errors.accepted_terms && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.accepted_terms.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending || !acceptedTerms}
              className="w-full bg-[#003933] dark:bg-[#003933] text-white py-4 px-10 rounded-full hover:bg-[#002822] dark:hover:bg-primary/90 transition mt-2 font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Creating Account..." : "Sign Up"}
            </button>
          </form>


        </div>
      </div >

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
    </div >
  );
};

export default SignUp;
