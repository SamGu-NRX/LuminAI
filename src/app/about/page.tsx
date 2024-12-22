/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Navigation from "@/components/Lander/Navbar";
import Footer from "@/components/Footer";
import ApplicationBanner from "@/components/ApplicationBanner/ApplicationBanner";
import "@/styles/App.scss";
import BootcampModuleShowcase from "@/components/Lander/BootcampShowcase";
import StaffGrid from "@/components/Staff/StaffGrid";
import StaffSection from "@/components/Staff/StaffSection";

export default function StaffPage() {
  return (
    <div id="Home" className="text-white dark:text-black">
      {/* <ApplicationBanner
        text="Last-minute call for our 2024 summer application!"
        link="https://forms.gle/RaW38zynf2p515Ua8"
      /> */}
      <div className="relative bg-white min-h-screen">
        <AuroraBackground>
          <div className="flex flex-col gap-4 items-center justify-center px-4 min-h-screen w-full">
            <Navigation />
            <div className="w-full mx-auto mt-12 pb-12">
              <StaffSection />
            </div>
          </div>
        </AuroraBackground>
      </div>
      <Footer />
    </div>
  );
}
