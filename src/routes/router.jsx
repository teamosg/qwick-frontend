import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import SignUp from "@/pages/auth/SignUp";
import SuccessfullUpdated from "@/pages/auth/SuccessfullUpdated";
import SuccessfullVerified from "@/pages/auth/SuccessfullVerified";
import VerifyAccount from "@/pages/auth/VerifyAccount";
import Apply from "@/pages/dashboard/Apply";
import ConfirmApply from "@/pages/dashboard/ConfirmApply";
import Discover from "@/pages/dashboard/Discover";
import JoinCommunity from "@/pages/dashboard/JoinCommunity";
import Profile from "@/pages/dashboard/Profile";
import NotFound from "@/shared/NotFound";
import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import SignIn from "../pages/auth/SignIn";
import Home from "../pages/dashboard/Home";
import DashboardLayout from "./../layout/DashboardLayout";

const router = createBrowserRouter([
  //Admin Dashboard layout

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/successfull-verified",
        element: <SuccessfullVerified />,
      },
      {
        path: "/successfull-updated",
        element: <SuccessfullUpdated />,
      },
      {
        path: "/verify-account",
        element: <VerifyAccount />,
      },
    ],
  },

  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "/discover",
        element: <Discover />,
      },
      {
        path: "/join-community",
        element: <JoinCommunity />,
      },
      {
        path: "/apply",
        element: <Apply />,
      },
      {
        path: "/confirm-apply",
        element: <ConfirmApply />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      // if page now found
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
