import AnnouncementFeed from "@/components/announcement/AnnouncementFeed";
import CommunityChat from "@/components/CommunityChat/CommunityChat";
import ContentRewardDetailsPayment from "@/components/contentReward/ContentRewardDetailsPayment";
import ContentRewardDetails from "@/components/contentReward/ContentRewordDetails";
import ContentRewordPublic from "@/components/contentReward/ContentRewordPublic";
import AutomatedMessage from "@/components/dashboard/Dashboard/AutomatedMessage";
import Analytics from "@/components/dashboard/Dashboard/ContentReward/Analytics";
import ContentRewardDetailsEdit from "@/components/dashboard/Dashboard/ContentReward/ContentRewardDetailsEdit";
import DashboardContentReward from "@/components/dashboard/Dashboard/ContentReward/DashboardContentReward";
import MySubmissions from "@/components/dashboard/Dashboard/ContentReward/MySubmissions";
import DashboardSettings from "@/components/dashboard/Dashboard/DashboardSettings";
import NotificationsSettings from "@/components/dashboard/Dashboard/NotificationsSettings";
import Payments from "@/components/dashboard/Dashboard/Payments";
import Payout from "@/components/dashboard/Dashboard/Payout";
import Users from "@/components/dashboard/Dashboard/Users";
import WaitList from "@/components/dashboard/Dashboard/WaitList";
import AddCommunity from "@/pages/addcommunity/AddCommunity";
import Announcement from "@/pages/announcement/Announcement";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import ResetPasswordOtp from "@/pages/auth/ResetPasswordOtp";
import SignUp from "@/pages/auth/SignUp";
import SuccessfullyUpdated from "@/pages/auth/SuccessfullyUpdated";
import SuccessfullyVerified from "@/pages/auth/SuccessfullyVerified";
import VerifyAccount from "@/pages/auth/VerifyAccount";
import Dashboard from "@/pages/dashboard/Dashboard";
import Discover from "@/pages/dashboard/Discover";
import JoinCommunity from "@/pages/dashboard/JoinCommunity";
import Profile from "@/pages/dashboard/Profile";
import Feedback from "@/pages/feedback/Feedback";
import DynamicHelpPage from "@/pages/help/DynamicHelpPage";
import NeedHelp from "@/pages/help/NeedHelp";
import Message from "@/pages/Message/Message";
import Notifications from "@/pages/notifications/Notifications";
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
        path: "/verify-account",
        element: <VerifyAccount />,
      },
      {
        path: "/successfully-verified",
        element: <SuccessfullyVerified />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/enter-otp",
        element: <ResetPasswordOtp />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },

      {
        path: "/successfully-updated",
        element: <SuccessfullyUpdated />,
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
        path: "/messages",
        element: <Message />,
      },
      {
        path: "/addcommunity",
        element: <AddCommunity />,
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
                element: <ContentRewordPublic />,
              },
              {
                path: "reward-details",
                element: <ContentRewardDetails />,
              },
              {
                path: "reward-details-payment",
                element: <ContentRewardDetailsPayment />,
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
            index: true,
            element: <DashboardContentReward />,
          },
          {
            path: "content-reward",
            element: <DashboardContentReward />,
          },
          {
            path: "my-submissions",
            element: <MySubmissions />,
          },
          {
            path: "analytics",
            element: <Analytics />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "wait-list",
            element: <WaitList />,
          },
          {
            path: "payments",
            element: <Payments />,
          },
          {
            path: "payout",
            element: <Payout />,
          },
          {
            path: "automated-message",
            element: <AutomatedMessage />,
          },
          {
            path: "dashboard-settings",
            element: <DashboardSettings />,
          },
          {
            path: "dashboard-settings/notifications",
            element: <NotificationsSettings />,
          },
          {
            path: "content-reward/edit/:id",
            element: <ContentRewardDetailsEdit />,
          },
        ],
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/need-help",
        element: <NeedHelp />,
      },
      {
        path: "/need-help/:category",
        element: <DynamicHelpPage />,
      },
      {
        path: "/feedback",
        element: <Feedback />,
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
