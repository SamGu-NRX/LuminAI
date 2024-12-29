import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BannerProvider } from "@/context/BannerContext";
import {
  Bai_Jamjuree,
  Bebas_Neue,
  League_Spartan,
  Inter,
} from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { ReactLenis } from "@/utils/lenis";


// URGENT TODO: https://fonts.google.com/specimen/Merriweather

// Load Google Fonts
const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-baiJamjuree",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-bebasNeue",
});

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-leagueSpartan",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "LuminAI | Free AI & ML Bootcamps for Students",
  description:
    "Join LuminAI's free nonprofit AI bootcamps and revolutionize your future. Perfect for high school and university students seeking hands-on AI and ML training—no fees, no fluff, all the real stuff.",
  keywords: [
    "LuminAI",
    "AI bootcamp",
    "Machine Learning",
    "High School Students",
    "University Students",
    "Free AI Education",
    "Free AI Bootcamp",
    "Free ML Bootcamp",
    "Free Machine Learning Bootcamp",
    "Nonprofit",
    "Data Science",
    "AI Fundamentals",
    "Hands-on AI Training",
  ],
  // Below are optional but highly recommended for social sharing
  openGraph: {
    title: "LuminAI | Free AI & ML Bootcamps for Students",
    description:
      "Empower your future with LuminAI's free, hands-on AI bootcamps. Learn from fellow students, gain real-world skills, and become the next AI innovator—no degree required.",
    url: "https://luminaibootcamps.vercel.app", // your actual domain
    siteName: "LuminAI",
    // images: [
    //   {
    //     url: "https://www.luminai.org/og-image.jpg", // replace with your OG image
    //     width: 1200,
    //     height: 630,
    //     alt: "LuminAI Bootcamps Banner",
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "LuminAI | Free AI & ML Bootcamps for Students",
  //   description:
  //     "Join LuminAI's nonprofit mission to make AI education accessible. Get real-world AI and ML skills at zero cost. Ready to level up?",
  //   images: ["https://www.luminai.org/twitter-image.jpg"], // replace with your Twitter card image
  //   creator: "@LuminAI", // your Twitter handle
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ReactLenis root>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${baiJamjuree.variable} ${bebasNeue.variable} ${leagueSpartan.variable} ${inter.variable} antialiased`}
        >
          <BannerProvider>
            {children}
            <Analytics />
            <SpeedInsights />
          </BannerProvider>
        </body>
      </ReactLenis>
    </html>
  );
}
