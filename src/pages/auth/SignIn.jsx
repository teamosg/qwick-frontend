import { Link } from 'react-router-dom';
// import commonAuthLogo from '../../assets/commonAuthLogo.png';
// import { FcGoogle } from 'react-icons/fc';

const SignIn = () => {
  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="flex items-start mb-2 sm:mb-3 md:mb-4 lg:mb-6">
          <img src={commonAuthLogo} />
        </div>

        {/* Headings */}
        <div className="text-start flex flex-col gap-2">
          <h2 className=" font-[inter] text-[17px] md:text-[18px] lg:text-[21px] not-italic font-semibold leading-[140%]">
            Sign In
          </h2>
          <p className="font-[inter] text-[15px] md:text-[16px] not-italic font-normal leading-[140%] text-muted-foreground">
            Your Admin Dashboard
          </p>
        </div>

        {/* Google Sign-In */}
        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-full py-2 hover:bg-gray-50">
          <FcGoogle size={20} />
          <span className="font-[inter] text-[14px] not-italic font-semibold leading-[140%] tracking-[-0.14px]">
            Google
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2 md:gap-3 ">
          <div className="flex-1 h-[1px] bg-[#E4EBF0] "> </div>
          <p className="text-center text-[14px] not-italic font-normal leading-[140%] text-muted-foreground">
            or sign in with
          </p>
          <div className="flex-1 h-[1px] bg-[#E4EBF0]"> </div>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block font-[inter] text-[13px] md:text-[14px] not-italic font-medium leading-[140%]"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-[inter] text-[13px] md:text-[14px] not-italic font-medium leading-[140%]"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground text-[14px] not-italic font-normal leading-[140%]">
              <input type="checkbox" className="form-checkbox " />
              Remember this device
            </label>
            <Link
              to="/forgot-password"
              className="text-[#15C8E8] text-[14px] not-italic font-semibold leading-[140%] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#15C8E8] text-white font-semibold rounded-full hover:bg-[#159be8] transition font-[Inter] text-[15px] not-italic leading-[140%]"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-muted-foreground text-[14px] not-italic font-normal leading-[140%]">
          Don’t have an account?{' '}
          <Link
            to="/sign-up"
            className="text-[#15C8E8] text-[14px] not-italic font-semibold leading-[140%] hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
