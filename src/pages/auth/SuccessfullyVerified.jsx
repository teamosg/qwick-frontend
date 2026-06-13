import { Link, useNavigate } from "react-router-dom";
import commonAuthLogo from "../../assets/authImg.png";
import successfull from "../../assets/successfull.gif";
import LogoOnly from "@/components/Logo/LogoOnly";
import Logo from "@/components/Logo/Logo";

const SuccessfullyVerified = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side - Content */}
      <div className="w-full md:w-1/2 px-6 md:px-12 lg:px-20 pb-6 md:pb-10 flex flex-col">
        <div className="max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="py-5 md:py-7 mb-4 md:mb-5">
            {/* <LogoOnly /> */}
            <Logo />
          </div>
        </div>
        <div className="max-w-md mx-auto w-full flex flex-col items-center justify-center flex-1">
          <div className="mb-8 flex justify-center w-full">
            <img src={successfull} alt="Success" className="w-32 h-32 md:w-48 md:h-48 object-contain" />
          </div>

          <div className="text-center flex flex-col gap-4 md:gap-7 lf:gap-8">
            {/* Title */}
            <h2 className="text-black dark:text-white text-center font-[Inter] text-2xl md:text-3xl not-italic font-medium mb-4 leading-tight">
              Your account has been verified successfully
            </h2>

            <button
              onClick={() => navigate("/sign-in")}
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-4 px-10 rounded-full transition mt-2 font-medium cursor-pointer"
            >
              Sign In
            </button>
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

export default SuccessfullyVerified;
