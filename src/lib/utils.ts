import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toPusherKey(key: string) {
  return key.replace(/:/g, '__')
}

export function chatHrefConstructor(id1: string, id2: string) {
  const sortedIds = [id1, id2].sort()
  return `${sortedIds[0]}--${sortedIds[1]}`
}

import { useState, useEffect } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false); // Default to false

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkIsMobile = () => setIsMobile(window.innerWidth < 768);

      checkIsMobile(); // Set initial value

      const handleResize = () => checkIsMobile();

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return isMobile;
};

// TODO: Make this, add a link, link to modal
// export const CTALink = ({ href, children }) => {
//   return (
//     <a href={href} target="_blank" rel="noopener noreferrer">
//       {children}
//     </a>
//   );
// };
