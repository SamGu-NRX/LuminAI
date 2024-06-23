import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white text-center p-3 mt-8 text-sm transition-opacity duration-500 opacity-0"
    style={{ opacity: 0, transition: 'opacity 0.5s ease-in-out' }}>
      <p>&copy; {currentYear} LuminAI Bootcamps. All rights reserved. </p>
    </footer>
  );
};

export default Footer;
