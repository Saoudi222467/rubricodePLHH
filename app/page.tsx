"use client"
import Header from "@/components/CryptoHeader";
import { Footer } from "@/components/sections/footer";
import LandingSection from "@/components/LandingSections/InitialSection";
import Ticker from "@/components/sections/ticker";
import WaveSection from "@/components/LandingSections/WaveSection";
import EarthSection from "@/components/LandingSections/EarthSection";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b bg-black text-white">
      <Ticker />
      <Header />
      <LandingSection />
      <WaveSection />
      <EarthSection />
      {/* Sections here */}
      {/* <Footer /> */}
    </main>
  );
}
