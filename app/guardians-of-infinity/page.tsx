"use client";
// File: app/guardians-of-infinity/page.tsx
import React from "react";
import Header from "@/components/CryptoHeader";
// import { Footer } from "@/components/sections/footer"; // Optional if you want footer
import Ticker from "@/components/sections/ticker"; // Optional if you want ticker

// Import sections
import SectionIntro from "@/components/GuardiansOfInfinity/SectionIntro";
import StructureOverview from "@/components/GuardiansOfInfinity/StructureOverview";
import FoundationalCircle from "@/components/GuardiansOfInfinity/FoundationalCircle";
import GuardiansOfInfinity from "@/components/GuardiansOfInfinity/GuardiansOfInfinity";
import CircleContributors from "@/components/GuardiansOfInfinity/CircleContributors";
import FieldSection from "@/components/GuardiansOfInfinity/FieldSection";
import ClosingQuote from "@/components/GuardiansOfInfinity/ClosingQuote";

export default function GuardiansPage() {
  return (
    <>
      <div className="sticky top-0 z-30 flex flex-col">
        <Ticker />
      </div>
      <Header />
      <main className="relative bg-black text-white overflow-x-hidden overflow-y-auto pointer-events-auto">
        {/* Content Sections */}
        <div className="relative z-10 pt-[40px] bg-black">
          <SectionIntro />
          <div className="h-screen w-full" />
          <StructureOverview />
          <div className="h-screen w-full" />
          <FoundationalCircle />
          <div className="h-screen w-full" />
          <GuardiansOfInfinity />
          <div className="h-screen w-full" />
          <CircleContributors />
          <div className="h-screen w-full" />
          <FieldSection />
          <div className="h-screen w-full" />
          <ClosingQuote />
        </div>

        {/* Optional Footer */}
        {/* <Footer /> */}
      </main>
    </>
  );
}
