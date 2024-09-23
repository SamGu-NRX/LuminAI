// src/components/StyledLink.tsx
import { Link } from "@tanstack/react-router";
import React, {
  Component,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
} from "react";

interface StyledLinkProps {
  address: string;
  text:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | string
    | Component;
}

const StyledLink: React.FC<StyledLinkProps> = ({ address, text }) => {
  return (
    <Link
      to={address}
      className="relative mx-1 p-2 bg-white overflow-hidden group"
    >
      <span className="relative z-10">{text as ReactNode}</span>
      <div className="absolute rounded-md inset-0 bg-gradient-to-r from-cyan-300 to-purple-300 transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"></div>
    </Link>
  );
};

export default StyledLink;
