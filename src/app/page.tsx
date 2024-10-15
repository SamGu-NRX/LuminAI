'use client';

import { motion } from 'framer-motion';
import { AuroraBackground } from '@/components/ui/aurora-background';
import Header from '@/components/Header/Header';
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

export default function Home() {
  return (
    <div id="Home" className="text-white dark:text-black">
      <ApplicationBanner />
      <AuroraBackground>
        <div className="flex flex-col gap-4 items-center justify-center px-4 min-h-screen w-full">
          <Header />
          <div>
            <motion.div
              initial={{ opacity: 0.0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: 'easeInOut',
              }}
              className="w-full mx-auto"
            >
              <HeroSection />
              <SocialsSection />
              <FeaturesSection />
              <AICurriculumSection />
              <TestimonialsSection />
              <CTASection />
              <ExploreAISection />
              {/* <ContactUsSection /> */}
            </motion.div>
          </div>
          <Footer />
        </div>
      </AuroraBackground>
    </div>
  );
}
