"use client";
import { useEffect } from "react";
import Header from "@/components/CryptoHeader";
import { Footer } from "@/components/sections/footer";
import LandingSection from "@/components/LandingSections/InitialSection";
import Ticker from "@/components/sections/ticker";
import WaveSection from "@/components/LandingSections/WaveSection";
import EarthSection from "@/components/LandingSections/EarthSection";
import CoinSection from "@/components/LandingSections/CoinSection";
import CoCreateSection from "@/components/LandingSections/CoCreateSection";
import DreamFieldSection from "@/components/LandingSections/DreamFieldSection";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b bg-black text-white">
      <Ticker />
      <Header />
      <LandingSection />
      <WaveSection />
      <EarthSection />
      <CoinSection />
      <CoCreateSection />
      <DreamFieldSection />
      {/* Sections here */}
      {/* <Footer /> */}
    </main>
  );
}
