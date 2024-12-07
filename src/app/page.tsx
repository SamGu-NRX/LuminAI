/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { motion } from "framer-motion";
import { AuroraBackground } from '@/components/ui/aurora-background';
import Navigation from "@/components/Lander/Navbar";
import Footer from '@/components/Footer';
import ApplicationBanner from '@/components/ApplicationBanner/ApplicationBanner';
import HeroSection from '@/components/Lander/Hero';
import SocialsSection from '@/components/Lander/Socials';
import FeaturesSection from '@/components/Lander/Features';
import AICurriculumSection from '@/components/Lander/Content';
import TestimonialsSection from '@/components/Lander/Testimonials';
import CTASection from '@/components/Lander/CTA';
import ExploreAISection from '@/components/Lander/ExploreAI';
import ContactUsSection from '@/components/Lander/ContactUs';
import '@/styles/App.scss';
import BootcampModuleShowcase from "@/components/Lander/BootcampShowcase";

export default function Home() {
  return (
    <div id="Home" className="text-white dark:text-black">
      <ApplicationBanner
        text="Last-minute call for our 2024 summer application!"
        link="https://forms.gle/RaW38zynf2p515Ua8"
      />
      <div className="relative bg-white min-h-screen mb-[249px]">
        <AuroraBackground className="z-1">
          <div className="flex flex-col gap-4 items-center justify-center px-4 min-h-screen w-full z-100">
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
                className="w-full mx-auto pb-12"
              >
                <HeroSection />
                <FeaturesSection />
                <AICurriculumSection />
                <BootcampModuleShowcase />
                <TestimonialsSection />
                <CTASection />
                <SocialsSection />
                {/* <ExploreAISection /> */}
                <ContactUsSection />
              </motion.div>
            </div>
          </div>
        </AuroraBackground>
      </div>
      <Footer />
    </div>
  );
}
