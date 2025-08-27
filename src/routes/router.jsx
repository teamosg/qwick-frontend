import AnnouncementFeed from "@/components/announcement/AnnouncementFeed";
import CommunityChat from "@/components/CommunityChat/CommunityChat";
import ContentReword from "@/components/contentReward/ContentReword";
import ContentRewardDetails from "@/components/contentReward/ContentRewordDetails";
import { DashboardDefault } from "@/components/dashboard/Dashboard/DashboardDefault";
import Announcement from "@/pages/announcement/Announcement";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import SignUp from "@/pages/auth/SignUp";
import SuccessfullUpdated from "@/pages/auth/SuccessfullUpdated";
import SuccessfullVerified from "@/pages/auth/SuccessfullVerified";
import VerifyAccount from "@/pages/auth/VerifyAccount";
import ConfirmApply from "@/pages/dashboard/ConfirmApply";
import Dashboard from "@/pages/dashboard/Dashboard";
import Discover from "@/pages/dashboard/Discover";
import JoinCommunity from "@/pages/dashboard/JoinCommunity";
import Profile from "@/pages/dashboard/Profile";
import NotFound from "@/shared/NotFound";
import { createBrowserRouter, Outlet } from "react-router-dom";
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
        path: "/confirm-apply",
        element: <ConfirmApply />,
      },
      {
        element: <Announcement />,
        children: [
          {
            path: "/announcement",
            index: true,
            element: <AnnouncementFeed />,
          },
          {
            path: "/content-reward",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <ContentReword />,
              },
              {
                path: "reward-retails",
                element: <ContentRewardDetails />,
              },
            ],
          },
          {
            path: "community-chat",
            element: <CommunityChat />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "community-hub",
            element: <h1>Community Hub</h1>,
          },
          {
            path: "",
            index: true,
            element: <DashboardDefault />,
          },
          {
            path: "edit-store",
            element: <h1>Edit Store</h1>,
          },
          {
            path: "content-reward",
            element: <h1>Content Reward</h1>,
          },
        ],
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
