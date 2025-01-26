/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Navigation from "@/components/Lander/Navbar";
import Footer from "@/components/Footer";
import ApplicationBanner from "@/components/ApplicationBanner/ApplicationBanner";
import "@/styles/App.scss";
import FAQ from "@/components/FAQ";

export default function StaffPage() {
  return (
    <div id="Home" className="text-white dark:text-black">
      {/* <ApplicationBanner
        text="Last-minute call for our 2024 summer application!"
        link="https://forms.gle/RaW38zynf2p515Ua8"
      /> */}
      <div className="relative mb-[249px] min-h-screen bg-white">
        <AuroraBackground>
          <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 px-4">
            <Navigation />
            <div className="mx-auto mt-12 w-full pb-12">
              <FAQ />
            </div>
          </div>
        </AuroraBackground>
      </div>
      <Footer />
    </div>
  );
}
