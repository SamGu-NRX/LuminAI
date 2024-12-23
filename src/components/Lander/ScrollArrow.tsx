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
      className="absolute bottom-10 left-[calc(50%-16px)] z-10 -translate-x-[calc(50%+16px)] cursor-pointer p-0"
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
      <ChevronDown className="h-8 w-8 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" />
    </motion.div>
  );
};

export default ScrollArrow;
