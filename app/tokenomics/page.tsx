"use client";

import React from "react";
import Header from "@/components/CryptoHeader";
// import { Footer } from "@/components/sections/footer"; // Optional if you want footer
import Ticker from "@/components/sections/ticker"; // Optional if you want ticker

import TotalSupply from "@/components/Tokenomics/TotalSupply";

import Holonomics from "@/components/Tokenomics/Holonomics";
import TokenomicsDistribution from "@/components/Tokenomics/TokenomicsDistribution";

const TokenomicsPage = () => {
  return (
    <>
      <div className="sticky top-0 z-30 flex flex-col">
        <Ticker />
      </div>
      <Header />
      <main className="relative bg-black text-white overflow-x-hidden overflow-y-auto pointer-events-auto">
        {/* Fixed Header and Optional Ticker */}

        {/* Content Sections */}
        <div className="relative z-10 pt-[40px] bg-black">
          <TotalSupply />
          <div className="h-screen w-full" />
          <TokenomicsDistribution />
          <div className="h-screen w-full" />

          <Holonomics />
        </div>

        {/* Optional Footer */}
        {/* <Footer /> */}
      </main>
    </>
  );
};

export default TokenomicsPage;
