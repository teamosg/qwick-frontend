import AnnouncementFeed from "@/components/announcement/AnnouncementFeed";
import CommunityChat from "@/components/CommunityChat/CommunityChat";
import Withdraw from "@/components/CommunityChat/Withdraw";
// import ContentRewardDetailsPayment from "@/components/contentReward/ContentRewardDetailsPayment";
import ContentRewardDetails from "@/components/contentReward/ContentRewordDetails";
import ContentRewordPublic from "@/components/contentReward/ContentRewordPublic";
import AutomatedMessage from "@/components/dashboard/Dashboard/AutomatedMessage";
import Analytics from "@/components/dashboard/Dashboard/ContentReward/Analytics";
import ContentRewardDetailsEdit from "@/components/dashboard/Dashboard/ContentReward/ContentRewardDetailsEdit";
import DashboardContentReward from "@/components/dashboard/Dashboard/ContentReward/DashboardContentReward";
import MySubmissions from "@/components/dashboard/Dashboard/ContentReward/AllSubmissions";
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
import CampaignDetails from "@/pages/discover/CampaignDetails";
import Discover from "@/pages/dashboard/Discover";
import JoinCommunity from "@/pages/dashboard/JoinCommunity";
import Profile from "@/pages/dashboard/Profile";
import Feedback from "@/pages/feedback/Feedback";
import DynamicHelpPage from "@/pages/help/DynamicHelpPage";
import NeedHelp from "@/pages/help/NeedHelp";
import Message from "@/pages/Message/Message";
import Notifications from "@/pages/notifications/Notifications";
import TermsAndConditions from "@/pages/TermsAndConditions";
import NotFound from "@/shared/NotFound";
import { createBrowserRouter, Outlet } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import SignIn from "../pages/auth/SignIn";
import Landing from "../pages/landing/Landing";
import Home from "../pages/dashboard/Home";
import DashboardLayout from "./../layout/DashboardLayout";
import VerifyTwoAuth from "@/pages/auth/VerifyTwoAuth";
import DepositSuccess from "@/pages/deposit/DepositSuccess";
import PrivateRoute from "./PrivateRoute";
const router = createBrowserRouter([
  // Landing Page
  {
    path: "/",
    element: <Landing />,
  },

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
        path: "/verify-2fa",
        element: <VerifyTwoAuth />,
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
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
      },
    ],
  },

  {
    path: "/",
    element:  <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/discover",
        element: <Discover />,
      },
      {
        path: "/discover/:campaignId",
        element: <CampaignDetails />,
      },
      {
        path: "/join-community/:communityUsername",
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
        path: "announcement",
        element: <Announcement />,
        children: [
          {
            path: ":communityUsername",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <AnnouncementFeed />,
              },
              {
                path: "announcement",
                element: <AnnouncementFeed />,
              },
              {
                path: "content-reward",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <ContentRewordPublic />,
                  },
                  {
                    path: "reward-details/:campaignId",
                    element: <ContentRewardDetails />,
                  },
                  // {
                  //   path: "reward-details-payment/:campaignId",
                  //   element: <ContentRewardDetailsPayment />,
                  // },
                ],
              },
              {
                path: "community-chat",
                element: <CommunityChat />,
              },
            ],
          },
        ],
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: ':communityUsername',
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <DashboardContentReward />,
              },
              {
                path: "content-payout",
                element: <DashboardContentReward />,
              },
              {
                path: "all-submissions",
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
              {
                path: "announcement",
                element: <AnnouncementFeed />,
              },
              {
                path: "community-chat",
                element: <CommunityChat />,
              },
            ]
          }
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
  {
    path: "/deposit/success",
    element: <DepositSuccess />,
  },
]);

export default router;
