"use client";

import React from "react";
import Header from "@/components/CryptoHeader";
// import { Footer } from "@/components/sections/footer"; // Optional if you want footer
// import Ticker from "@/components/sections/ticker"; // Optional if you want ticker

import TotalSupply from "@/components/Tokenomics/TotalSupply";

import Holonomics from "@/components/Tokenomics/Holonomics";
import TokenomicsDistribution from "@/components/Tokenomics/TokenomicsDistribution";

const TokenomicsPage = () => {
  return (
    <>
      <main className="relative bg-black text-white overflow-x-hidden overflow-y-auto pointer-events-auto">
        {/* Fixed Header and Optional Ticker */}
        <div className="fixed top-0 left-0 right-0 z-50">
          {/* <Ticker /> */}
        </div>

        <Header />

        {/* Content Sections */}
        <div className="relative z-10 pt-[40px] bg-black">
          <TotalSupply />
          <div className="h-screen w-full" />
          <TokenomicsDistribution />

          <Holonomics />
        </div>

        {/* Optional Footer */}
        {/* <Footer /> */}
      </main>
    </>
  );
};

export default TokenomicsPage;
