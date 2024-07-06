import "@/styles/App.scss";
import "./Header.scss";
import { useState, useEffect } from "react";
import getMode from "../../utils/getMode";
import { useBanner } from "@/context/BannerContext";
import StyledLink from "./StyledLink";

const Header = () => {
  const mode = getMode();
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
  const headerClass = ` p-4 ${isBannerVisible ? 'mt-12' : ''} ${isAnimating ? 'slide-up' : '' } hidden `;
  const navClass = `mt-2 `; // add fonts

  return (
    <header className={headerClass}>
      <div className="container mx-auto flex justify-between items-center">
        <StyledLink
          address="/"
          text={<h2 className="text-2xl font-sans font-semibold">LuminAI Innovate Scholars</h2>}
        />
        <nav className={navClass}>
          <StyledLink address="/Syllabus" text="Syllabus" />
          <StyledLink address="/Staff" text="Meet Our Staff" />
          <StyledLink address="/Inquiry" text="Inquiry" />
          <StyledLink address="/Login" text="Login" />
          <StyledLink address="/Dashboard" text="Dashboard" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
