import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ScrollArrow = () => {
  const scrollToNextSection = () => {
    // Select the hero section
    const heroSection = document.querySelector(".flex-container");

    if (heroSection) {
      // Find the next sibling element (the next section)
      const nextSection = heroSection.nextElementSibling;

      if (nextSection) {
        // Scroll to the next section smoothly
        nextSection.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn("No next section found to scroll to.");
      }
    } else {
      console.warn("Hero section with class '.flex-container' not found.");
    }
  };


  return (
    <motion.div
      // TODO: I have fucking no idea why you need to subtract 16px (50% of the width)
      className="absolute bottom-10 p-0 left-[calc(50%-16px)] -translate-x-[calc(50%+16px)] cursor-pointer z-10"
      animate={{
        y: [0, 10, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      onClick={scrollToNextSection}
    >
      <ChevronDown className="w-8 h-8 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" />
    </motion.div>
  );
};

export default ScrollArrow;
