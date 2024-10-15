import "@/styles/App.scss";
import "./Header.scss";
import { useState, useEffect } from "react";
import { useBanner } from "@/context/BannerContext";
import Link from 'next/link';

const Header = () => {
  const { isBannerVisible } = useBanner();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isBannerVisible) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Duration of the slide up animation
    }
  }, [isBannerVisible]);

  //TODO: remove this (${mode === "dark" ? "header-text-dark text-white" : "header-text-light text-black"}) and change to dark:text-white, etc.
  const headerClass = ` p-4 hidden ${isBannerVisible ? 'mt-12' : ''} ${isAnimating ? 'slide-up' : '' }
    header-text-dark header-text-light dark:header-dark dark:text-white`;
  const navClass = `mt-2 `; // add fonts

  return (
    <header className={headerClass}>
      <div className="container mx-auto flex justify-between  items-center">
      <Link href="/" className="text-slate-700 hover:text-black transition-all">
              <h1 className='text-3xl font-Outfit text-[#3d4561] md:text-2xl font-bold'>
                LuminAI
              </h1>
            </Link>
        <Link href="/" className="text-slate-700 hover:text-black transition-all">
          <h2 className="text-2xl font-sans font-semibold">LuminAI Innovate Scholars</h2>
        </Link>

        <nav className={navClass}>
          <Link href="/Syllabus"><p>Syllabus</p></Link>
          <Link href="/Staff"><p>Meet our staff</p></Link>
          {/* <StyledLink address="/Inquiry" text="Inquiry" />
          <StyledLink address="/Login" text="Login" />
          <StyledLink address="/Dashboard" text="Dashboard" /> */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
