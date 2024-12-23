import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
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
import { useIsMobile } from "@/utils/isMobile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TransitionLink } from "@/utils/TransitionLink";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();
  const lastScrollY = useRef(0);

  const { bannerHeight } = useBanner();
  const pathname = usePathname();

  // Navigation items without isActive
  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "About Us",
      href: "/about",
      icon: Info,
    },
    {
      label: "Programs",
      href: "/programs",
      icon: Briefcase,
    },
    // {
    //   label: "Contact",
    //   href: "/contact",
    //   icon: Phone,
    // },
    // {
    //   label: "FAQ",
    //   href: "/faq",
    //   icon: MessageCircleQuestion,
    // },
  ];

  // Determine if a nav item is active based on current pathname
  const isItemActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

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

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Mobile Navigation Render
  const renderMobileNavigation = () => (
    <div
      className="fixed right-4 top-4 z-50"
      style={{ marginTop: bannerHeight + 32 }} // Default margin when no banner
    >
      {/* Mobile Menu Toggle */}
      <motion.button
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileTap={{ scale: 0.95 }}
        className="group flex items-center rounded-full bg-white/80 px-3 py-2 text-sm font-medium text-zinc-800 shadow-xl backdrop-blur-md dark:bg-zinc-800/80 dark:text-zinc-200"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
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
                  {navItems.map((item) => (
                    <motion.li
                      key={item.href}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <TransitionLink
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center rounded-xl px-4 py-3 transition-all duration-300 ${
                          isItemActive(item.href)
                            ? "bg-teal-500/10 text-teal-600 dark:text-teal-400"
                            : "hover:bg-teal-500/5 hover:text-teal-500 dark:hover:text-teal-400"
                        }`}
                      >
                        <item.icon className="mr-3 h-5 w-5" strokeWidth={2} />
                        {item.label}
                      </TransitionLink>
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
        // Use bannerHeight or fallback to 64 if banner doesn't exist
        style={{ top: bannerHeight || 64 }}
      >
        <motion.ul
          layout
          // 1) Add transition classes: transition-colors (or transition-all) and duration
          // 2) Conditionally switch from transparent to your opaque styles
          className={`flex space-x-2 rounded-2xl p-2 transition duration-300 ${
            isNavVisible
              ? "bg-white shadow-2xl ring-1 ring-zinc-900/5 dark:bg-zinc-800/70 dark:ring-white/10"
              : "bg-transparent shadow-none ring-0 backdrop-blur-none"
          } `}
        >
          {navItems.map((item) => (
            <motion.li
              key={item.href}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative"
            >
              <TransitionLink
                href={item.href}
                className={`relative flex items-center rounded-xl px-4 py-2 transition-all duration-300 ${
                  isItemActive(item.href)
                    ? "bg-teal-500 text-white dark:text-zinc-100"
                    : "text-zinc-600 hover:bg-teal-500/10 hover:text-teal-600 dark:text-zinc-300 dark:hover:text-teal-400"
                } `}
                aria-current={isItemActive(item.href) ? "page" : undefined}
              >
                <item.icon className="mr-2 h-5 w-5" strokeWidth={2} />
                {item.label}
              </TransitionLink>
            </motion.li>
          ))}
        </motion.ul>
      </motion.nav>
    );
  };

  return <>{isMobile ? renderMobileNavigation() : renderDesktopNavigation()}</>;
};

export default Navigation;
