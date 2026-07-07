import { useEffect, useState } from "react";
import { useTheme } from "@/components/shared/ThemeProvider";
import logoBlack from "@/assets/qwick_logo_black.svg";
import logoWhite from "@/assets/qwick_logo_white.svg";

const SplashScreen = () => {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);

  const logoSrc = theme === "dark" ? logoWhite : logoBlack;

  // Animate progress bar from 0 to ~90% with varied increments
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        const increment = Math.random() * 12 + 4;
        return Math.min(prev + increment, 90);
      });
    }, 350);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background">
      {/* Branding */}
      <div className="flex flex-col items-center gap-5 mb-12">
        <img
          src={logoSrc}
          alt="Qwick"
          className="h-14 md:h-20 w-auto object-contain opacity-0"
          style={{
            animation: "splashFadeIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        />
        <p
          className="text-foreground-muted text-sm md:text-base font-inter tracking-wide opacity-0"
          style={{
            animation: "splashFadeIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards",
          }}
        >
          Preparing your dashboard...
        </p>
      </div>

      {/* Horizontal Progress Bar */}
      <div className="relative w-56 md:w-72 h-1.5">
        {/* Track */}
        <div className="absolute inset-0 rounded-full bg-qwick-gray-200 dark:bg-qwick-gray-800 overflow-hidden">
          {/* Fill */}
          <div
            className="h-full rounded-full bg-primary relative"
            style={{
              width: `${progress}%`,
              transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow:
                "0 0 8px rgba(246, 43, 54, 0.45), 0 0 24px rgba(246, 43, 54, 0.18)",
            }}
          >
            {/* Shimmer sweep */}
            <div
              className="absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-white/35 to-transparent"
              style={{
                animation: "splashShimmer 1.8s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes splashFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes splashShimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(500%);
          }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
