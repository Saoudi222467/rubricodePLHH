"use client";
import Header from "@/components/CryptoHeader";
import { Footer } from "@/components/sections/footer";
import LandingHero from "@/components/LandingSections/LandingHero";
import Ticker from "@/components/sections/ticker";
import MissionStatement from "@/components/LandingSections/MissionStatement";
import HarmonySpectrum from "@/components/LandingSections/HarmonySpectrum";
import EarthSection from "@/components/LandingSections/EarthSection";
import FoundationSeciton from "@/components/LandingSections/FoundationSeciton";

export default function Home() {
  return (
    <>
      <main className="relative bg-black text-white overflow-x-hidden overflow-y-auto ">
        {/* Fixed Header and Ticker */}
        <div className="fixed top-0 left-0 right-0 z-50">
          {/* <Ticker /> */}
        </div>

        <Header />

        {/* Content Sections */}
        <div className="relative z-10 pt-[40px] bg-black">
          <LandingHero />
          <MissionStatement />
          <HarmonySpectrum />
          <EarthSection />
          <FoundationSeciton />
        </div>
      </main>
    </>
  );
}

{
  /* <WaveSection />
        <EarthSection />
        <CoinSection />
        <CoCreateSection />
        <DreamFieldSection />
        <FictionFunction />
        <ReadySection /> */
}
{
  /* <Footer /> */
}
