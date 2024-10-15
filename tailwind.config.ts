/* eslint-disable @typescript-eslint/no-require-imports */
import { Config } from "tailwindcss";

import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";

const colors = require("tailwindcss/colors");

const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{css,js,jsx,ts,tsx}",
    "./components/**/*.{css,js,jsx,ts,tsx}",
    "./components/*.{css,js,jsx,ts,tsx}",
    "./app/*.{css,js,jsx,ts,tsx}",
    "./app/**/*.{css,js,jsx,ts,tsx}",
    "./src/**/*.{css,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      transitionDuration: {
        200: "200ms",
      },
      fontFamily: {
        sans: ["var(--font-baiJamjuree)"],
        slab: ["var(--font-bebasNeue)"],
        serif: ["var(--font-Montserrat)"],
        spartan: ["var(--font-leagueSpartan)"],
        inter: ["var(--font-inter)"],
      },
      animation: {
        aurora: "aurora 60s linear infinite",
        shimmer: "shimmer 2s linear infinite",
      },

      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },

        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
      zIndex: {
        "-1": "-1",
        50: "50",
        100: "100",
      },
    },
  },
  plugins: [addVariablesForColors],
};

  // This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
  function addVariablesForColors({ addBase, theme }: any) {
    let allColors = flattenColorPalette(theme("colors"));
    let newVars = Object.fromEntries(
      Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );

    addBase({
      ":root": newVars,
    });
  }


  export default config;
