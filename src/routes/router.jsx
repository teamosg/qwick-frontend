import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from './../layout/DashboardLayout';
import SignIn from '../pages/auth/SignIn';
import AuthLayout from '../layout/AuthLayout';
import DashboardHome from './../pages/dashboard/DashboardHome';
import NotFound from '@/shared/NotFound';
import SignUp from '@/pages/auth/SignUp';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ResetPassword from '@/pages/auth/ResetPassword';
import SuccessfullVerified from '@/pages/auth/SuccessfullVerified';
import SuccessfullUpdated from '@/pages/auth/SuccessfullUpdated';
import VerifyAccount from '@/pages/auth/VerifyAccount';

const router = createBrowserRouter([
  //Admin Dashboard layout

  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/reset-password',
        element: <ResetPassword />,
      },
      {
        path: '/successfull-verified',
        element: <SuccessfullVerified />,
      },
      {
        path: '/successfull-updated',
        element: <SuccessfullUpdated />,
      },
      {
        path: '/verify-account',
        element: <VerifyAccount />,
      },
    ],
  },

  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },

      // if page now found
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
