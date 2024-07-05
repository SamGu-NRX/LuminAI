// src/components/ApplicationBanner.jsx
import './styles.scss';
// src/components/ApplicationBanner.jsx
import  { useEffect } from 'react';
import { useBanner } from '@/context/BannerContext';

const ApplicationBanner = () => {
  const { setBannerVisible } = useBanner();

  useEffect(() => {
    setBannerVisible(true);
    return () => setBannerVisible(false);
  }, [setBannerVisible]);

  return (
    <div className="fixed top-0 left-0 w-full bg-blue-500 text-white text-center p-2 z-100">
      <span className="font-bold">Last-minute call for our 2024 summer application!</span>
      <button onClick={() => window.location.href='/application-form'}
        aria-label="Apply Now"
        className="ml-6 inline-flex h-8 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:bg-[linear-gradient(90deg, #6366f1, #a855f7)]" >
          Apply Now
        </button>
    </div>
  );
};

export default ApplicationBanner;


<button className="p-[3px] relative">
<div className="ml-6 inline-flex h-8 px-6 justify-center rounded-lg absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500">
    <div onClick={() => window.location.href='/application-form'} 
        className="px-8 py-2 rounded-[6px] relative group transition duration-200 hover:bg-transparent animate-shimmer items-center border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%]  font-medium text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        Apply Now
    </div>
</div>
</button>