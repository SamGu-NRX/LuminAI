// src/components/ApplicationBanner.tsx
import { useEffect, useRef } from "react";
import { useBanner } from "@/context/BannerContext";
import { motion, AnimatePresence } from "framer-motion";

interface ApplicationBannerProps {
  text: string;
  link?: string;
}

const ApplicationBanner: React.FC<ApplicationBannerProps> = ({
  text,
  link,
}) => {
  const { isBannerVisible, setBannerVisibility, hideBanner, setBannerHeight } =
    useBanner();
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setBannerVisibility(true);

    const updateBannerHeight = () => {
      if (bannerRef.current) {
        setBannerHeight(bannerRef.current.offsetHeight + 32); // 16 for padding, 16 for additional margins
        console.log(bannerRef.current.offsetHeight);
      }
    };

    updateBannerHeight();

    window.addEventListener("resize", updateBannerHeight);
    return () => {
      window.removeEventListener("resize", updateBannerHeight);
      setBannerVisibility(false);
      setBannerHeight(0);
    };
  }, [setBannerVisibility, setBannerHeight]);

  const handleClose = () => {
    hideBanner();
    setBannerHeight(0);
  };

  return (
    <AnimatePresence>
      {isBannerVisible && (
        <motion.div
          ref={bannerRef}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="fixed left-0 top-0 z-50 mx-auto flex w-full max-w-7xl items-center justify-between bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-white backdrop-blur-md"
        >
          {/* Main Content */}
          <div className="flex flex-1 items-center justify-center space-x-4">
            <span className="text-center font-bold">{text}</span>
            {link && (
              <button
                onClick={() => (window.location.href = link)}
                aria-label="Apply Now"
                className="inline-flex h-8 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-white/[0.2] bg-[linear-gradient(110deg,#000103,45%,#343b45,55%,#000103)] bg-[length:200%_100%] px-6 text-sm font-medium text-slate-100 backdrop-blur-sm transition duration-200 hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.15)] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                Apply Now
              </button>
            )}
          </div>

          {/* Close Button, dont ask me why mt-[-1] fixes the button positioning*/}
          <button
            className="-mt-1 ml-4 inline-flex items-center justify-center rounded-md bg-transparent p-1 text-xl font-bold text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close"
            onClick={handleClose}
          >
            &times;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ApplicationBanner;
