"use client";

import { useSpring, animated } from "@react-spring/web";
import { useWindowSize } from "usehooks-ts";
import { useScroll } from "framer-motion";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useMemo, useEffect, useState } from "react";
import { TransitionLink } from "@/utils/TransitionLink";

interface FooterLink {
  name: string;
  href: string;
}

interface SocialLink {
  icon: IconType;
  href: string;
}

export const Content: React.FC = () => {
  const footerLinks: FooterLink[] = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Programs", href: "/programs" },
    // { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  const socialLinks: SocialLink[] = [
    { icon: FaFacebook, href: "https://www.facebook.com/LuminAIBootcamps" },
    { icon: FaTwitter, href: "https://twitter.com/LuminAIBootcamps" },
    { icon: FaInstagram, href: "https://instagram.com/LuminAIBootcamps" },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/company/LuminAI-Bootcamps",
    },
  ];

  return (
    <div className="bg-[#4E4E5A] bottom-0 w-full text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between items-center space-y-6 md:space-y-0">
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">LuminAI Bootcamps</h2>
            <p className="mt-2 max-w-md">
              Empowering the Next Generation of AI Innovators.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-end space-x-6">
            {footerLinks.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                className="hover:text-blue-400 transition-colors group relative font-medium duration-300"
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute left-0 top-full h-[2px] w-full bg-current origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 pointer-events-none"></span>
              </TransitionLink>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:justify-between items-center space-y-6 md:space-y-0">
          {/* Social Media Links */}
          <div className="flex space-x-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="text-sm text-center md:text-right">
            &copy; {new Date().getFullYear()} LuminAI Bootcamps. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const FOOTER_HEIGHT = 249; // Height of the footer in pixels
  const REVEAL_DISTANCE = FOOTER_HEIGHT; // Distance from bottom to start revealing the footer

  // Get scroll position and window size
  return (
    <animated.div
      className="fixed bottom-0 h-[249px] w-full"
      style={{
        // ...styles,
        // Set a neutral zIndex so it can be placed behind the main content if main content has a higher zIndex
        zIndex: -1,
      }}
    >
      <Content />
    </animated.div>
  );
};

export default Footer;
