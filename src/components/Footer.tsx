"use client";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
  };

  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/LuminAIBootcamps" },
    { icon: Twitter, href: "https://twitter.com/LuminAIBootcamps" },
    { icon: Instagram, href: "https://instagram.com/LuminAIBootcamps" },
    { icon: Linkedin, href: "https://linkedin.com/company/LuminAI-Bootcamps" },
  ];

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white/20 backdrop-blur-lg border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          {/* Logo and Description */}
          <motion.div
            variants={containerVariants}
            className="text-center md:text-left mb-6 md:mb-0"
          >
            <h2 className="text-2xl font-bold text-gray-800">
              LuminAI Bootcamps
            </h2>
            <p className="text-gray-700 mt-2 max-w-sm">
              Empowering the Next Generation of AI Innovators.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.ul
            variants={containerVariants}
            className="flex flex-wrap justify-center md:justify-start space-x-6"
          >
            {footerLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-gray-800 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          {/* Social Media Links */}
          <motion.div
            variants={containerVariants}
            className="flex space-x-6 mb-4 md:mb-0"
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-blue-600 transition-colors"
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </motion.div>

          {/* Copyright */}
          <motion.p
            variants={containerVariants}
            className="text-gray-700 text-sm text-center md:text-right"
          >
            &copy; {new Date().getFullYear()} LuminAI Bootcamps. All rights
            reserved.
          </motion.p>
        </div>
      </div>
    </motion.footer>
  );
}
