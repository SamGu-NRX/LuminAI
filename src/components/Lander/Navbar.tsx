import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import {
  Home,
  Info,
  Briefcase,
  MessageCircleQuestion,
  Phone,
  Menu,
  X,
} from "lucide-react";
import { useBanner } from "@/context/BannerContext";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
};

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();
  const lastScrollY = useRef(0);

  const { bannerHeight } = useBanner();
  // Navigation items
  const [navItems, setNavItems] = useState([
    {
      label: "Home",
      href: "/",
      icon: Home,
      isActive: true,
    },
    {
      label: "About Us",
      href: "/about",
      icon: Info,
      isActive: false,
    },
    {
      label: "Programs",
      href: "/programs",
      icon: Briefcase,
      isActive: false,
    },
    {
      label: "Contact",
      href: "/contact",
      icon: Phone,
      isActive: false,
    },
    {
      label: "FAQ",
      href: "/faq",
      icon: MessageCircleQuestion,
      isActive: false,
    },
  ]);

  // Scroll tracking
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!isMobile) {
      if (latest > lastScrollY.current && latest > 50) {
        // Scrolling down
        setIsNavVisible(false);
      } else if (latest < lastScrollY.current || latest <= 50) {
        // Scrolling up or near top
        setIsNavVisible(true);
      }
      lastScrollY.current = latest;
    }
  });

  // Nav item click handler
  const handleNavItemClick = (clickedIndex: number) => {
    const updatedNavItems = navItems.map((item, index) => ({
      ...item,
      isActive: index === clickedIndex,
    }));
    setNavItems(updatedNavItems);
    setIsMenuOpen(false);
  };

  // Mobile Navigation Render
  const renderMobileNavigation = () => (
    <div
      className="fixed top-4 right-4 z-50"
      style={{ marginTop: bannerHeight + 32 }} // Default margin when no banner
    >
      {/* Mobile Menu Toggle */}
      <motion.button
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileTap={{ scale: 0.95 }}
        className="group flex items-center rounded-full bg-white/80 px-3 py-2 text-sm font-medium text-zinc-800 shadow-xl backdrop-blur-md dark:bg-zinc-800/80 dark:text-zinc-200"
      >
        {isMenuOpen ? (
          <X className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
        ) : (
          <Menu className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
        )}
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white/60 backdrop-blur-lg dark:bg-zinc-900/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="fixed inset-x-0 top-0 z-50 origin-top rounded-b-2xl bg-white/90 p-8 shadow-2xl dark:bg-zinc-900/90"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <nav>
                <motion.ul
                  className="mt-6 space-y-2"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        delayChildren: 0.2,
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <a
                        href={item.href}
                        onClick={() => handleNavItemClick(index)}
                        className={`flex items-center py-3 px-4 rounded-xl transition-all duration-300 ${
                          item.isActive
                            ? "bg-teal-500/10 text-teal-600 dark:text-teal-400"
                            : "hover:bg-teal-500/5 hover:text-teal-500 dark:hover:text-teal-400"
                        }`}
                      >
                        <item.icon className="h-5 w-5 mr-3" strokeWidth={2} />
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Desktop Navigation Render
  const renderDesktopNavigation = () => {
    const navVariants = {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0 },
    };

    return (
      <motion.nav
        className="fixed left-0 right-0 z-50 flex justify-center"
        variants={navVariants}
        initial="visible"
        animate={isNavVisible ? "visible" : "hidden"}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          duration: 0.3,
        }}
        style={{ top: bannerHeight || 64 }} // Default margin when no banner
      >
        <motion.ul
          className="flex space-x-2 rounded-2xl bg-white/70 p-2 shadow-2xl ring-1 ring-zinc-900/5 backdrop-blur-xl dark:bg-zinc-800/70 dark:ring-white/10"
          layout
        >
          {navItems.map((item, index) => (
            <motion.li
              key={item.href}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative"
            >
              <a
                href={item.href}
                onClick={() => handleNavItemClick(index)}
                className={`flex items-center px-4 py-2 rounded-xl transition-all duration-300 relative ${
                  item.isActive
                    ? "text-white bg-teal-500 dark:text-zinc-100"
                    : "hover:bg-teal-500/10 text-zinc-600 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400"
                }`}
              >
                <item.icon className="h-5 w-5 mr-2" strokeWidth={2} />
                {item.label}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </motion.nav>
    );
  };

  return <>{isMobile ? renderMobileNavigation() : renderDesktopNavigation()}</>;
};

export default Navigation;
