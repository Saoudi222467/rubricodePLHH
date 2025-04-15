"use client";
import { useEffect, useState } from "react";
import Header from "@/components/CryptoHeader";
import { Footer } from "@/components/sections/footer";
import LandingSection from "@/components/LandingSections/InitialSection";
import Ticker from "@/components/sections/ticker";
import WaveSection from "@/components/LandingSections/WaveSection";
import EarthSection from "@/components/LandingSections/EarthSection";
import CoinSection from "@/components/LandingSections/CoinSection";
import CoCreateSection from "@/components/LandingSections/CoCreateSection";
import DreamFieldSection from "@/components/LandingSections/DreamFieldSection";
import FictionFunction from "@/components/LandingSections/FictionFunction";
import ReadySection from "@/components/LandingSections/ReadySection";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set initial scroll and determine mobile view
    window.scrollTo(0, 0);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main
      className={`bg-black text-white overflow-x-hidden ${
        !isMobile
          ? "overflow-y-auto"
          : "snap-y snap-mandatory overflow-y-scroll h-screen scroll-smooth"
      }`}
    >
      {/* Fixed Header and Ticker */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Ticker />
        <Header />
      </div>

      {/* Content Sections */}
      <div
        className={`bg-black ${
          isMobile
            ? "pt-[160px] space-y-16 overflow-x-hidden"
            : "relative z-10 pt-[40px]"
        }`}
      >
        <LandingSection isMobile={isMobile} />
       <WaveSection isMobile={isMobile} />
        <EarthSection isMobile={isMobile} />
         <CoinSection isMobile={isMobile} />
        <CoCreateSection isMobile={isMobile} />
         <DreamFieldSection isMobile={isMobile} />
        <FictionFunction isMobile={isMobile} />
        <ReadySection isMobile={isMobile} />
        {/* <Footer /> */}
      </div>
    </main>
  );
}
