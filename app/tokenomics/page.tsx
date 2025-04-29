"use client";

import React from "react";
import Header from "@/components/CryptoHeader";
// import { Footer } from "@/components/sections/footer"; // Optional if you want footer
// import Ticker from "@/components/sections/ticker"; // Optional if you want ticker

import TotalSupply from "@/components/Tokenomics/TotalSupply";
import PreSaleStaking from "@/components/Tokenomics/PreSaleStaking";
import EcosystemDevelopment from "@/components/Tokenomics/EcosystemDevelopment";
import LiquidityPool from "@/components/Tokenomics/LiquidityPool";
import CommunityProjects from "@/components/Tokenomics/CommunityProjects";
import TeamReserve from "@/components/Tokenomics/TeamReserve";
import TheGift from "@/components/Tokenomics/TheGift";
import Holonomics from "@/components/Tokenomics/Holonomics";

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
          <PreSaleStaking />
          <EcosystemDevelopment />
          <LiquidityPool />
          <CommunityProjects />
          <TeamReserve />
          <TheGift />
          <Holonomics />
        </div>

        {/* Optional Footer */}
        {/* <Footer /> */}
      </main>
    </>
  );
};

export default TokenomicsPage;
