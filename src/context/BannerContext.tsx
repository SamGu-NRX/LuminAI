"use client";

// src/context/BannerContext.tsx
import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
  ReactNode,
} from "react";

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

  // Hiding the banner also clears its height: consumers (e.g. the navbar)
  // offset themselves by bannerHeight, so a hidden banner with a stale
  // non-zero height would leave a phantom gap on screen.
  const hideBanner = useCallback(() => {
    setBannerVisibility(false);
    setBannerHeight(0);
  }, []);

  // Memoized so consumers only re-render when banner state actually changes,
  // not on every unrelated render of the provider.
  const value = useMemo(
    () => ({
      isBannerVisible,
      setBannerVisibility,
      hideBanner,
      bannerHeight,
      setBannerHeight,
    }),
    [isBannerVisible, hideBanner, bannerHeight],
  );

  return (
    <BannerContext.Provider value={value}>{children}</BannerContext.Provider>
  );
};

export const useBanner = () => {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error("useBanner must be used within a BannerProvider");
  }
  return context;
};
