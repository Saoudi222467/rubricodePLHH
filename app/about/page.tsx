"use client";

import React from "react";
import Header from "@/components/CryptoHeader";
import AboutEssence from "@/components/About/AboutEssence";
import CoreChoices from "@/components/About/CoreChoices";
import DAOSection from "@/components/About/DAOSection";
import RealWorldAsset from "@/components/About/RealWorldAsset";
import RegenerativeCircle from "@/components/About/RegenerativeCircle";
import WhoWeAre from "@/components/About/WhoWeAre";
import ManBehindMovement from "@/components/About/ManBehindMovement";
import SpiritSection from "@/components/About/SpiritSection";
// import { Footer } from "@/components/sections/footer"; // Optional

const AboutPage = () => {
  return (
    <>
      <main className="relative bg-black text-white overflow-x-hidden overflow-y-auto pointer-events-auto">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-50">
          {/* You can insert a ticker if needed */}
        </div>

        <Header />

        {/* Content */}
        <div className="relative z-10 pt-[40px] w-full mx-auto ">
          <AboutEssence />
          <CoreChoices />
          {/* <div className="h-[100vh] w-full "></div> */}
          <DAOSection />
          <RealWorldAsset />
          <RegenerativeCircle />
          <WhoWeAre />
          <ManBehindMovement />
          <SpiritSection />
        </div>

        {/* <Footer /> */}
      </main>
    </>
  );
};

export default AboutPage;
