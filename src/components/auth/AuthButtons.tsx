"use client";
// this component HAS TO BE use client

import React from "react";
import * as m from "framer-motion/m";
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";
import { LogIn } from "lucide-react";

type OAuthButtonProps = {
  buttonText?: string;
  handleClick: () => void;
  isLoading?: boolean;
};

type EmailSignInButtonProps = {
  mode?: "signin" | "signup" | "resetPassword";
  isLoading: boolean;
};

export function GoogleSignInButton({
  buttonText,
  handleClick,
  isLoading,
}: OAuthButtonProps) {
  return (
    <m.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 transition duration-300 hover:bg-gray-100"
      disabled={isLoading}
    >
      <FaGoogle className="mr-2" />{" "}
      {isLoading ? "Loading..." : buttonText || "Continue with Google"}
    </m.button>
  );
}

export function DiscordSignInButton({
  buttonText,
  handleClick,
  isLoading,
}: OAuthButtonProps) {
  return (
    <m.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-white transition duration-300 hover:bg-indigo-700"
      disabled={isLoading}
    >
      <FaDiscord className="mr-2" />{" "}
      {isLoading ? "Loading..." : buttonText || "Continue with Discord"}
    </m.button>
  );
}

export function GithubSignInButton({
  buttonText,
  handleClick,
  isLoading,
}: OAuthButtonProps) {
  return (
    <m.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="flex w-full items-center justify-center rounded-md bg-slate-800 px-4 py-2 text-white transition duration-300 hover:bg-slate-900"
      disabled={isLoading}
    >
      <FaGithub className="mr-2" />{" "}
      {isLoading ? "Loading..." : buttonText || "Continue with Github"}
    </m.button>
  );
}

export function EmailSignInButton({ mode, isLoading }: EmailSignInButtonProps) {
  return (
    <m.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="submit"
      className="w-full rounded-md bg-blue-600 py-2 text-white transition duration-300 hover:bg-blue-700"
      disabled={isLoading}
    >
      <div className="flex items-center justify-center">
        <LogIn className="mr-2 h-4 w-4" />
        {isLoading
          ? "Loading..."
          : mode === "signin"
            ? "Sign In"
            : mode === "signup"
              ? "Sign Up"
              : "Reset Password"}
      </div>
    </m.button>
  );
}
