// src/components/ApplicationBanner.jsx
import  { useEffect, useState } from 'react';
import { useBanner } from '@/context/BannerContext';
// import './styles.scss';
// import { Button } from '@/components/ui/moving-border'; - Implement moving border effect when hovered, also add fade-in for the border

const ApplicationBanner = () => {
  const { isBannerVisible, setBannerVisibility, hideBanner } = useBanner();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setBannerVisibility(true);
    return () => setBannerVisibility(false);
  }, [setBannerVisibility]);

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      hideBanner();
      setIsAnimating(false);
    }, 500); // Duration of the fade out animation
  };

  if (!isBannerVisible) {
    return null;
  }

  return (
    <div className={`fixed top-0 left-0 w-full bg-gradient-to-r from-blue-500 to-purple-500 backdrop:blur-md text-white text-center p-2 z-100
      ${
        isAnimating ? 'fade-out-up' : ''
      }`}>
      <span className="font-bold">Last-minute call for our 2024 summer application!</span>
      <button onClick={() => window.location.href = 'https://forms.gle/RaW38zynf2p515Ua8'}
        // onClick={() => window.location.href='/application-form'}
        aria-label="Apply Now"
        className="ml-6 inline-flex h-8 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#343b45,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-100
        focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50
        backdrop-blur-sm hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.15)] bg-white/[0.2] text-sm transition duration-200 " >
          Apply Now
      </button>
      <div className='justify-self-end w-8 bg-transparent absolute right-4 mx-2 text-center align-middle transition '>
        <button className="text-3xl font-white pt-[3px]" aria-label='Close' onClick={handleClose}>×</button>
      </div>
    </div>
  );
};

export default ApplicationBanner;
