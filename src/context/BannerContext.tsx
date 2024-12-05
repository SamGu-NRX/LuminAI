"use client";

// src/context/BannerContext.tsx
import { createContext, useState, useContext, ReactNode } from "react";

interface BannerContextType {
  isBannerVisible: boolean;
  setBannerVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  hideBanner: () => void;
  bannerHeight: number;
  setBannerHeight: React.Dispatch<React.SetStateAction<number>>;
}

const BannerContext = createContext<BannerContextType | undefined>(undefined);

export const BannerProvider = ({ children }: { children: ReactNode }) => {
  const [isBannerVisible, setBannerVisibility] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(0);

  const hideBanner = () => {
    setBannerVisibility(false);
  };

  return (
    <BannerContext.Provider
      value={{
        isBannerVisible,
        setBannerVisibility,
        hideBanner,
        bannerHeight,
        setBannerHeight,
      }}
    >
      {children}
    </BannerContext.Provider>
  );
};

export const useBanner = () => {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error("useBanner must be used within a BannerProvider");
  }
  return context;
};
