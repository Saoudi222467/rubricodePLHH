"use client";
import { useEffect, useState } from "react";
import CryptoHeader from "@/components/CryptoHeader";
import Ticker from "@/components/sections/ticker";
import MintLanding from "@/components/MintingSections/MintLanding";
import InfinityPhasesSection from "@/components/MintingSections/InfinityPhasesSection";
import MotionSection from "@/components/MintingSections/MotionSection";
import PhasePrices from "@/components/MintingSections/PhasePrices";
import MintingSection from "@/components/MintingSections/MintingSection";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
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
        <CryptoHeader />
      </div>

      {/* Content Sections */}
      <div
        className={`bg-black ${
          isMobile
            ? "pt-[160px] space-y-16 overflow-x-hidden"
            : "relative z-10 pt-[40px]"
        }`}
      >
        <MintLanding isMobile={isMobile} />
        <InfinityPhasesSection isMobile={isMobile} />
        <MotionSection isMobile={isMobile} />
        <PhasePrices isMobile={isMobile} />
        <MintingSection isMobile={isMobile} />
      </div>
    </main>
  );
}
