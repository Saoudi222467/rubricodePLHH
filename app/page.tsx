"use client";
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

export default function Home() {
  return (
    <>
      <Ticker />

      {/* Sticky Header (handled within CryptoHeader) */}
      <Header />
      <main className="bg-black text-white overflow-x-hidden">
        {/* Ticker in normal document flow */}

        {/* Page Content */}
        <div className="relative z-10 bg-black w-full">
          <LandingHero />
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
        </div>
      </main>
    </>
  );
}
