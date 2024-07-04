import "../../styles/App.scss";
import "./Header.scss";
import getMode from "../../utils/getMode";
import { Link } from "@tanstack/react-router";

const Header = () => {
  const mode = getMode();
  const headerClass = ` p-4 ${mode === "dark" ? "header-dark text-white" : "header-light text-black"} hidden`;
  const navClass = `mt-2 ${mode === "dark" ? "header-text-dark text-white" : "header-text-light text-black"}`; // add fonts

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
        </nav>
      </div>
    </header>
  );
};

export default Header;

function StyledLink({ address, text }) {
  return (
    <Link
      to={address}
      className="relative mx-1 p-2 bg-white overflow-hidden group"
    >
      <span className="relative z-10">{text}</span>
      <div className="absolute rounded-md inset-0 bg-gradient-to-r from-cyan-300 to-purple-300 transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"></div>
    </Link>
  );
}
