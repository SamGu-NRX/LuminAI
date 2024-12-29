/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/custom/aurora-background";
import Navigation from "@/components/Lander/Navbar";
import Footer from "@/components/Footer";
import ApplicationBanner from "@/components/ApplicationBanner/ApplicationBanner";
import HeroSection from "@/components/Lander/Hero";
import SocialsSection from "@/components/Lander/Socials";
import FeaturesSection from "@/components/Lander/Features";
import AICurriculumSection from "@/components/Lander/CurriculumOverview";
import TestimonialsSection from "@/components/Lander/Testimonials";
import CTASection from "@/components/Lander/CTA";
import ExploreAISection from "@/components/Lander/ExploreAI";
import ContactUsSection from "@/components/Lander/ContactUs";
import "@/styles/App.scss";
import BootcampModuleShowcase from "@/components/Lander/BootcampShowcase";

import SyllabusCard from "@/components/Syllabus";
import Timeline from "@/components/Lander/Timeline";
import SyllabusSection from "@/components/Syllabus";

export default function StaffPage() {
  return (
    <div id="Home" className="text-white dark:text-black">
      {/* <ApplicationBanner
        text="Last-minute call for our 2024 summer application!"
        link="https://forms.gle/RaW38zynf2p515Ua8"
      /> */}
      <div className="relative min-h-screen w-full bg-white">
        <AuroraBackground className="z-1">
          <div className="z-10 flex min-h-screen w-full flex-col items-center justify-center gap-4 px-4">
            <Navigation />
            <div>
              <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="mx-auto w-full pb-12"
              >
                <SyllabusSection />
              </motion.div>
            </div>
          </div>
        </AuroraBackground>
      </div>
      <Footer />
    </div>
  );
}
