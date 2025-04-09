"use client"
import { useRef } from "react"
import CryptoHeader from "@/components/CryptoHeader"
import Ticker from "@/components/sections/ticker"
import MintLanding from "@/components/MintingSections/MintLanding"
import InfinityPhasesSection from "@/components/MintingSections/InfinityPhasesSection"
import MotionSection from "@/components/MintingSections/MotionSection"
import PhasePrices from "@/components/MintingSections/PhasePrices"
import MintingSection from "@/components/MintingSections/MintingSection"
import { useScroll } from "framer-motion"

export default function Home() {
  const scrollRef = useRef(null)

  // Track overall scroll progress for the entire page
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  })

  return (
    <main
      ref={scrollRef}
      className="bg-black text-white snap-y snap-mandatory overflow-y-scroll scroll-smooth h-screen"
    >
      {/* Ticker with highest z-index */}
      <div className="relative z-40">
        <Ticker />
      </div>

      {/* Header with high z-index */}
      <CryptoHeader />

      {/* Content Sections */}
      <div className="relative z-10 pt-[40px]">
        <MintLanding />
        <InfinityPhasesSection />
        <MotionSection />
        <PhasePrices />
        <MintingSection />
      </div>
    </main>
  )
}
