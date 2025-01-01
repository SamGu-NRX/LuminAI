/* eslint-disable @typescript-eslint/no-require-imports */
import { transform } from "next/dist/build/swc";
import { Config } from "tailwindcss";

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

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
  variants: {
    extend: {
      fontWeight: ["responsive", "hover", "focus"],
      opacity: ["hover"],
      borderColor: ["hover", "focus"],
      margin: ["first", "last"],
      backgroundColor: ["odd", "even"],
      scale: ["hover", "active", "group-hover"],
      transform: ["hover", "group-hover"],
    },
  },
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        white: {
          "100": "#BEC1DD",
          "200": "#C1C2D3",
          DEFAULT: "#FFF",
        },
        black: {
          "100": "#BEC1DD",
          "200": "#C1C2D3",
          DEFAULT: "#000",
        },
      },
      boxShadow: {
        "LuminAI-blue": "0 10px 20px rgba(59, 130, 246, 0.15)",
      },
      transitionDuration: {
        "200": "200ms",
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
        pulse: "pulse var(--duration) ease-out infinite",
        "shimmer-slide":
          "shimmer-slide var(--speed) ease-in-out infinite alternate",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
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
        pulse: {
          "0%, 100%": {
            boxShadow: "0 0 0 0 var(--pulse-color)",
          },
          "50%": {
            boxShadow: "0 0 0 8px var(--pulse-color)",
          },
        },
        "shimmer-slide": {
          to: {
            transform: "translate(calc(100cqw - 100%), 0)",
          },
        },
        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
      },
      zIndex: {
        "50": "50",
        "100": "100",
        "-1": "-1",
      },
    },
  },
  plugins: [addVariablesForColors, require("tailwindcss-animate")],
} satisfies Config;

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
