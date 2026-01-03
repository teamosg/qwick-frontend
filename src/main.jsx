import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./components/shared/ThemeProvider";
import "./index.css";
import router from "./routes/router";
import { Toaster } from "./components/ui/sonner";
import NotificationProvider from "./providers/NotificationProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

AOS.init({
  duration: 1000,
  once: true,
});
// Main App
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <NotificationProvider>
            <RouterProvider router={router} />
          </NotificationProvider>
          {/* <Toaster position="bottom-right" /> */}
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);

