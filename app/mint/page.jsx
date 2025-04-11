"use client"
import CryptoHeader from "@/components/CryptoHeader"
import Ticker from "@/components/sections/ticker"
import MintLanding from "@/components/MintingSections/MintLanding"
import InfinityPhasesSection from "@/components/MintingSections/InfinityPhasesSection"
import MotionSection from "@/components/MintingSections/MotionSection"
import PhasePrices from "@/components/MintingSections/PhasePrices"
import MintingSection from "@/components/MintingSections/MintingSection"

export default function Home() {
  return (
    <main className="bg-black text-white snap-y snap-mandatory overflow-y-scroll scroll-smooth h-screen">
      {/* Fixed header and ticker */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Ticker />
        <CryptoHeader />
      </div>

      {/* Content Sections */}
      <div className="relative z-10 pt-[40px] bg-black">
        <MintLanding />
        <InfinityPhasesSection />
        <MotionSection />
        <PhasePrices />
        <MintingSection />
      </div>
    </main>
  )
}
