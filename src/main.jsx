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

AOS.init({
  duration: 1000,
  once: true,
});
// Main App
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        {/* <Toaster position="bottom-right" /> */}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
