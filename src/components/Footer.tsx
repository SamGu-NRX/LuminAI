// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <div
//       className="relative h-[800px] w-full bg-black"
//       style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
//     >
//       <div className="fixed bottom-0 h-[800px] w-full">
//         <Content />
//       </div>
//     </div>
//   );
//   // TODO: implement real-"stickiness", where it automatically locks when the user scrolls close to the "border" of the footer
// }

// export function Content() {
//   const footerLinks = [
//     { name: "Home", href: "/" },
//     { name: "About Us", href: "/about" },
//     { name: "Programs", href: "/programs" },
//     { name: "Contact", href: "/contact" },
//     { name: "FAQ", href: "/faq" },
//   ];

//   const socialLinks = [
//     { icon: FaFacebook, href: "https://www.facebook.com/LuminAIBootcamps" },
//     { icon: FaTwitter, href: "https://twitter.com/LuminAIBootcamps" },
//     { icon: FaInstagram, href: "https://instagram.com/LuminAIBootcamps" },
//     {
//       icon: FaLinkedin,
//       href: "https://linkedin.com/company/LuminAI-Bootcamps",
//     },
//   ];
//   return (
//     <div className="bg-[#4E4E5A] min-h-screen h-full w-full flex flex-col">
//       <footer className="bottom-0 absolute w-full h-max-[800px] bg-transparent backdrop-blur-md border-t border-gray-300">
//         <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
//           {/* Top Section */}
//           <div className="flex flex-col md:flex-row md:justify-between items-center space-y-6 md:space-y-0">
//             {/* Logo and Description */}
//             <div className="text-center md:text-left">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 LuminAI Bootcamps
//               </h2>
//               <p className="text-gray-600 mt-2 max-w-md">
//                 Empowering the Next Generation of AI Innovators.
//               </p>
//             </div>

//             {/* Navigation Links */}
//             <ul className="flex flex-wrap justify-center md:justify-end space-x-6">
//               {footerLinks.map((link, index) => (
//                 <li key={index}>
//                   <Link
//                     href={link.href}
//                     className="text-gray-800 hover:text-blue-600 transition-colors"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Divider */}
//           <div className="border-t border-gray-300 my-8"></div>

//           {/* Bottom Section */}
//           <div className="flex flex-col md:flex-row md:justify-between items-center space-y-6 md:space-y-0">
//             {/* Social Media Links */}
//             <div className="flex space-x-6">
//               {socialLinks.map((social, index) => {
//                 const Icon = social.icon;
//                 return (
//                   <a
//                     key={index}
//                     href={social.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-800 hover:text-blue-600 transition-colors"
//                   >
//                     <Icon className="w-6 h-6" />
//                   </a>
//                 );
//               })}
//             </div>

//             {/* Copyright */}
//             <p className="text-gray-600 text-sm text-center md:text-right">
//               &copy; {new Date().getFullYear()} LuminAI Bootcamps. All rights
//               reserved.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

import { useSpring, animated } from '@react-spring/web';
import { useWindowSize } from "usehooks-ts";
import { useScroll } from "framer-motion";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useMemo } from 'react';

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
    { name: "Contact", href: "/contact" },
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
    <div className="bg-[#4E4E5A] bottom-0 absolute w-full text-white">
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
          <ul className="flex flex-wrap justify-center md:justify-end space-x-6">
            {footerLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
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
  const { scrollY } = useScroll(); // The absolute scroll position, in pixels.
  const { height: windowHeight = 0 } = useWindowSize(); // The height of the window, in pixels

  // Calculate the total scrollable height
  const scrollableHeight = useMemo(() => {
    return document.documentElement.scrollHeight - windowHeight;
  }, [windowHeight]);

  // Use scrollY to animate the footer
  const styles = useSpring({
    transform: (() => {
      if (scrollableHeight <= 0) return "translateY(0%)"; // Content fits within viewport

      const triggerPoint = scrollableHeight - REVEAL_DISTANCE;

      if (scrollY.get() >= triggerPoint) {
        return "translateY(0%)";
      } else {
        const progress =
          (scrollY.get() - (triggerPoint - windowHeight)) /
          (windowHeight + REVEAL_DISTANCE);

        const clampedProgress = Math.max(0, Math.min(progress, 1));

        const translateY = 100 - clampedProgress * 100;

        return `translateY(${translateY}%)`;
      }
    })(),
    config: { tension: 250, friction: 30 },
  });

  return (
    <animated.div
      className="fixed bottom-0 h-[249px] w-full "
      style={{
        ...styles,
        zIndex: -1,
      }}
    >
      <Content />
    </animated.div>
  );
};

export default Footer;
