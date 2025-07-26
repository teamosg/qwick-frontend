import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import {
  FaFacebook,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaEnvelope,
} from 'react-icons/fa';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-20 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Logo - Replace with your actual logo */}
          <div className="mb-10">
            <div className="text-2xl font-bold text-[#003933]">YourLogo</div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Quick</h1>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">SIGN IN</h2>
          <p className="text-gray-600 mb-8">
            Start earning rewards for your content
          </p>

          {/* Social Buttons */}
          <div className="mb-8">
            <div className="flex flex-col space-y-3">
              <button className="w-full py-2.5 px-4 border border-gray-300 rounded-md text-center font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                <FcGoogle className="text-lg" />
                <span>Google</span>
              </button>
              <button className="w-full py-2.5 px-4 border border-gray-300 rounded-md text-center font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                <FaFacebook className="text-lg text-blue-600" />
                <span>Facebook</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  placeholder="Enter email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#003933] focus:border-[#003933]"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#003933] focus:border-[#003933]"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FaEye className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#003933] focus:ring-[#003933] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Keep me signed in
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-[#003933] hover:text-[#002822]"
                >
                  Forget your password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#003933] text-white py-2.5 px-4 rounded-md hover:bg-[#002822] transition mt-2 font-medium"
            >
              Sign in
            </button>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a
                href="#"
                className="text-[#003933] font-medium hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image (hidden on mobile) */}
      <div className="hidden md:block md:w-1/2 bg-[#003933]">
        {/* Replace with your actual image */}
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-white text-center p-8">
            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-lg">Your image or content goes here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
