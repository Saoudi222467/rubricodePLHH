"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import StakingHero from "@/components/StakingSections/StakingHero";
import StakingFormPanel from "@/components/StakingSections/StakingFormPanel";
import CryptoHeader from "@/components/CryptoHeader";
import StakingPhilosophy from "@/components/StakingSections/StakingPhilosophy";
import StakingDetails from "@/components/StakingSections/StakingDetails";

export default function StakingPage() {
  const scrollRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  // Scale the radial gradient as you scroll
  const size = useTransform(scrollYProgress, [0, 1], ["2vw", "100vw"]);

  return (
    <div
      ref={scrollRef}
      className="relative text-white overflow-x-hidden min-h-screen"
      style={{
        background: "linear-gradient(to bottom, #000000 , #342803 , #000 )",
      }}
    >
      {/* 🔁 Background wrapper with gradient below tree image */}
      <div className="fixed inset-0 z-0">
        {/* 🎯 Radial Gradient - BELOW the image */}
        <motion.div
          className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 rounded-full pointer-events-none blur-lg"
          style={{
            width: size,
            height: size,
            background: "radial-gradient(circle, #c59506 , #191919 )",
            zIndex: 0,
          }}
        />

        {/* 🌳 Tree Image - ABOVE the gradient */}
        <img
          src="/tree.png"
          alt="Tree Background"
          className="w-full h-full object-cover pointer-events-none z-10 absolute inset-0"
        />
      </div>

      {/* 🌐 Foreground Content */}
      <div className="relative z-20">
        <CryptoHeader />
        <StakingHero />
        <StakingPhilosophy />
        <StakingDetails />
        <StakingFormPanel />
      </div>
    </div>
  );
}
