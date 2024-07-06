import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AOSInit = () => {
  useEffect(() => {
    if (typeof AOS !== "undefined") {
      AOS.init({
        easing: "ease-out-quad",
        duration: 1000,
        once: false,
      });
    } else {
      console.error("AOS is not defined");
    }
  }, []);

  return null;
};

export default AOSInit;
