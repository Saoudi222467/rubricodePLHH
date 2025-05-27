"use client";
import { useEffect, useState } from "react";
import Header from "@/components/CryptoHeader";
import LandingHero from "@/components/LandingSections/LandingHero";
import Ticker from "@/components/sections/ticker";
import MissionStatement from "@/components/LandingSections/MissionStatement";
import HarmonySpectrum from "@/components/LandingSections/HarmonySpectrum";
import EarthSection from "@/components/LandingSections/EarthSection";
import FoundationSection from "@/components/LandingSections/FoundationSection";
import CoCreateSection from "@/components/LandingSections/CoCreateSection";
import DreamFieldSection from "@/components/LandingSections/DreamFieldSection";
import FictionFunction from "@/components/LandingSections/FictionFunction";
import CTASection from "@/components/LandingSections/CTASection";
import WhatWeDo from "@/components/LandingSections/WhatWeDo";
import YourRole from "@/components/LandingSections/YourRole";
import WhatYouCanExpect from "@/components/LandingSections/WhatYouCanExpect";
import ClosingThought from "@/components/LandingSections/ClosingThought";
import QnASection from "@/components/LandingSections/QnASection";

export default function Home() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000); // Give enough time for the hero section to be fully visible

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Ticker />
      <Header />
      <main className="bg-black text-white overflow-x-hidden">
        <div className="relative bg-black w-full">
          {/* Hero section is always visible */}
          <div className="relative z-50">
            <LandingHero />
          </div>

          {/* Other sections with controlled initial opacity */}
          <div 
            className={`relative transition-opacity duration-1000 ${
              isInitialLoad ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ zIndex: isInitialLoad ? -1 : 40 }}
          >
            <WhatWeDo />
            <YourRole />
            <MissionStatement />
            <HarmonySpectrum />
            <EarthSection />
            <FoundationSection />
            <CoCreateSection />
            <DreamFieldSection />
            <FictionFunction />
            <WhatYouCanExpect />
            <CTASection />
            <ClosingThought />
            <QnASection />
          </div>
        </div>
      </main>
    </>
  );
}
