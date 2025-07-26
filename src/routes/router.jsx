import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from './../layout/DashboardLayout';
import SignIn from '../pages/auth/SignIn';
import AuthLayout from '../layout/AuthLayout';
import DashboardHome from './../pages/dashboard/DashboardHome';
import NotFound from '@/shared/NotFound';

const router = createBrowserRouter([
  //Admin Dashboard layout
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

  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
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
