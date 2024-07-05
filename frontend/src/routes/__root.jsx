import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect, useState, useRef, SetStateAction } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import AOS from "aos";
import "aos/dist/aos.css";

import AOSInit from "../utils/aos";
// import Preloader from '../components/Preloader.jsx';

import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import getMode from "../utils/getMode";
import "../components/Header/Header.scss";
import "../styles/App.scss";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const [preloader, setPreloader] = useState(true);

  const [showProgressBar, setShowProgressBar] = useState(false);
  const observerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollEl = document.querySelector("#main-container");
    const headerEl = document.querySelector("header");
    const footerEl = document.querySelector("footer");

    if (!scrollRef.current) {
      console.log("Initializing Locomotive Scroll");
      scrollRef.current = new LocomotiveScroll({
        el: scrollEl,
        smooth: true,
        multiplier: 1,
        class: "is-reveal",
      });

      scrollRef.current.on("scroll", (args) =>
        handleScroll(
          args,
          headerEl,
          footerEl,
          setShowProgressBar,
          showProgressBar
        )
      );

      console.log("Initializing AOS");
      <AOSInit />;

      console.log("Initializing Intersection Observer for AOS refresh");
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            AOS.refresh();
          }
        });
      });

      document.querySelectorAll("[data-aos]").forEach((aosElem) => {
        observerRef.current.observe(aosElem);
      });
    }

    return () => {
      console.log("Cleaning up");
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (scrollRef.current) {
        scrollRef.current.destroy();
        scrollRef.current = null;
      }
    };
  }, [showProgressBar]);

  const handleScroll = (
    args,
    headerEl,
    footerEl,
    setShowProgressBar,
    showProgressBar
  ) => {
    const scrollPosition = args.scroll.y;
    const totalHeight = args.limit.y;
    const windowHeight = window.innerHeight;

    if (totalHeight > 2.5 * windowHeight) {
      setShowProgressBar(true);
    } else {
      setShowProgressBar(false);
    }

    if (showProgressBar) {
      const progressBarEl = document.querySelector("#progress-bar");
      if (progressBarEl) {
        const scrollPercentage = (scrollPosition / totalHeight) * 100;
        progressBarEl.style.width = `${scrollPercentage}%`;
      }
    }

    if (headerEl) {
      if (scrollPosition > windowHeight / 2.5) {
        headerEl.classList.add("visible");
        headerEl.classList.remove("hidden");
      } else {
        headerEl.classList.remove("visible");
        headerEl.classList.add("hidden");
      }
    }

    if (footerEl) {
      if (scrollPosition + windowHeight >= totalHeight) {
        footerEl.classList.add("visible");
        footerEl.classList.remove("hidden");
      } else {
        footerEl.classList.remove("visible");
        footerEl.classList.add("hidden");
      }
    }

    if (scrollPosition === 0) {
      document.querySelectorAll("[data-aos]").forEach((aosElem) => {
        aosElem.classList.remove("aos-animate");
        if (observerRef.current) {
          observerRef.current.observe(aosElem);
        }
      });
    }
  };

  return (
    // {preloader ? <div className="loader-wrapper absolute">
    //     <div/>
    // }
    <div id="main-container">
      {showProgressBar && (
        <div
          id="progress-bar"
          className={
            getMode() === "dark"
              ? "scroll-watcher-dark"
              : "scroll-watcher-light"
          }
          style={{ width: "0%" }}
        ></div>
      )}
      <div>
        <main data-scroll-container>
          <Header />
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default Root;
