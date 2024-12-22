/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
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

import SyllabusCard from "@/components/Syllabus/SyllabusCard";
import Timeline from "@/components/Syllabus/Timeline";

export default function StaffPage() {
  return (
    <div id="Home" className="text-white dark:text-black">
      {/* <ApplicationBanner
        text="Last-minute call for our 2024 summer application!"
        link="https://forms.gle/RaW38zynf2p515Ua8"
      /> */}
      <div className="relative bg-white min-h-screen w-full">
        <AuroraBackground className="z-1">
          <div className="flex flex-col gap-4 items-center justify-center px-4 min-h-screen w-full z-10">
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
                className="w-full pb-12"
              >
                <h1 className="text-4xl font-bold text-black text-center mb-8 animate-fade-in-down">
                  Bootcamp Syllabus
                </h1>
                <p className="text-xl text-black text-center mb-12 animate-fade-in-up">
                  Discover our comprehensive curriculum designed to turn you
                  into an AI innovator.
                </p>
                <SyllabusCard />
                <Timeline />
              </motion.div>
            </div>
          </div>
        </AuroraBackground>
      </div>
      <Footer />
    </div>
  );
}
