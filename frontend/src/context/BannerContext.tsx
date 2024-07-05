// src/context/BannerContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface BannerContextType {
  isBannerVisible: boolean;
  setBannerVisible: (visible: boolean) => void;
}

const BannerContext = createContext<BannerContextType | undefined>(undefined);

export const BannerProvider = ({ children }: { children: ReactNode }) => {
  const [isBannerVisible, setBannerVisible] = useState(false);

  return (
    <BannerContext.Provider value={{ isBannerVisible, setBannerVisible }}>
      {children}
    </BannerContext.Provider>
  );
};

export const useBanner = () => {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error('useBanner must be used within a BannerProvider');
  }
  return context;
};
