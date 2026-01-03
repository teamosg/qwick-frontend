import { Link } from "react-router-dom";
import commonAuthLogo from "../../assets/authImg.png";
import successfull from "../../assets/successfull.gif";
import LogoOnly from "@/components/Logo/LogoOnly";

const SuccessfullyUpdated = () => {
  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-900">
      {/* Left side - Content */}
      <div className="w-full md:w-1/2 px-6 md:px-12 lg:px-20 pb-6 md:pb-10 flex flex-col bg-white dark:bg-gray-900">
        <div className="max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="py-5 md:py-7 mb-4 md:mb-5">
            <LogoOnly />
          </div>
        </div>
        <div className="max-w-md mx-auto w-full flex flex-col items-center justify-center flex-1">
          <div className="mb-8 flex justify-center w-full">
            <img src={successfull} alt="Success" className="w-32 h-32 md:w-48 md:h-48 object-contain" />
          </div>

          <div className="text-center flex flex-col gap-4 md:gap-7 lf:gap-8">
            {/* Title */}
            <h2 className="text-black dark:text-white text-center font-[Inter] text-2xl md:text-3xl not-italic font-medium uppercase mb-4 leading-tight">
              Password Update Successful
            </h2>

            <button
              type="submit"
              className="w-full bg-[#003933] dark:bg-[#003933] text-white py-4 px-10 rounded-full hover:bg-[#002822] dark:hover:bg-primary/90 transition mt-2 font-medium cursor-pointer"
            >
              Sign in
            </button>
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

export default SuccessfullyUpdated;
