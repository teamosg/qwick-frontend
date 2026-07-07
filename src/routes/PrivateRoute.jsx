import { Navigate } from "react-router-dom";
import { useProfile } from "@/hooks/auth.hook";
import SplashScreen from "@/components/SplashScreen";

const PrivateRoute = ({ children }) => {
  const { isLoading, isSuccess, isError } = useProfile();
  const isAuthenticated = !!localStorage.getItem("token");

  // Not authenticated (no token) — redirect immediately
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  // Fetching profile data — show splash screen
  if (isLoading) {
    return <SplashScreen />;
  }

  // Profile fetch failed — redirect to sign-in
  if (isError) {
    return <Navigate to="/sign-in" replace />;
  }

  // Profile fetched successfully — render children
  if (isSuccess) {
    return children;
  }

  // Fallback — redirect
  return <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;
