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
          className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-500 to-purple-500 backdrop-blur-md text-white py-2 px-4 z-50 flex items-center justify-between max-w-7xl mx-auto"
        >
          {/* Main Content */}
          <div className="flex items-center space-x-4 flex-1 justify-center">
            <span className="font-bold text-center">{text}</span>
            {link && (
              <button
                onClick={() => (window.location.href = link)}
                aria-label="Apply Now"
                className="inline-flex h-8 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#343b45,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-100
                          focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50
                          backdrop-blur-sm hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.15)] bg-white/[0.2] text-sm transition duration-200"
              >
                Apply Now
              </button>
            )}
          </div>

          {/* Close Button, dont ask me why mt-[-1] fixes the button positioning*/}
          <button
            className="ml-4 inline-flex -mt-1 items-center justify-center rounded-md bg-transparent p-1 text-white text-xl font-bold hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
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
