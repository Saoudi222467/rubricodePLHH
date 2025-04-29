// pages/tokenomics.tsx
import React from "react";
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
    <main className="max-w-5xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center py-10">
        TOKENOMICS – THE SACRED STRUCTURE OF PEACE, LOVE & HARMONY
      </h1>
      <TotalSupply />
      <PreSaleStaking />
      <EcosystemDevelopment />
      <LiquidityPool />
      <CommunityProjects />
      <TeamReserve />
      <TheGift />
      <Holonomics />
    </main>
  );
};

export default TokenomicsPage;
