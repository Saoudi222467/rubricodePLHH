// pages/about.tsx
import React from "react";
import AboutEssence from "@/components/About/AboutEssence";
import CoreChoices from "@/components/About/CoreChoices";
import DAOSection from "@/components/About/DAOSection";
import RealWorldAsset from "@/components/About/RealWorldAsset";
import RegenerativeCircle from "@/components/About/RegenerativeCircle";
import WhoWeAre from "@/components/About/WhoWeAre";
import ManBehindMovement from "@/components/About/ManBehindMovement";
import SpiritSection from "@/components/About/SpiritSection";

const AboutPage = () => {
  return (
    <main className="max-w-5xl mx-auto px-4">
      <AboutEssence />
      <CoreChoices />
      <DAOSection />
      <RealWorldAsset />
      <RegenerativeCircle />
      <WhoWeAre />
      <ManBehindMovement />
      <SpiritSection />
    </main>
  );
};

export default AboutPage;
