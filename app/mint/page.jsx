"use client";
import React, { useRef } from "react";
import Header from "@/components/CryptoHeader";
import Ticker from "@/components/sections/ticker";
import InfinityLoop from "@/components/InfinityLoop";
import { motion, useInView } from "framer-motion";

const page = () => {
  return (
    <>
      <Ticker />
      <Header />
      <section className="bg-black text-white h-[200vh]">
        <div className="h-screen fixed p-10 top-10 flex  justify-center items-center">
          {/* Left Text */}

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {" "}
            Rooted in <span style={{ color: "#D48A61" }}>Numerology</span>
          </h2>
          <div className="flex  justify-center items-center flex-col">
            {/* Top Text */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                This is not just a{" "}
                <span className=" text-yellow-500">Minting Model</span>.
              </h2>
              <br />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                This is an{" "}
                <span className="text-yellow-500 drop-shadow-lg">
                  energetic
                </span>{" "}
                <span className="text-white">sequence.</span>
              </h2>
            </div>

            {/* Infinity Loop always visible */}
            <div className="p-10">
              <InfinityLoop />
            </div>

            {/* Bottom Text */}

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              {" "}
              Aligned with the <span className="text-yellow-500">infinity</span>
            </h2>
          </div>

          {/* Right Text */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Guided by <span style={{ color: "#892D06" }}>harmony</span>
          </h2>
        </div>
      </section>
    </>
  );
};

export default page;
