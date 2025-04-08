"use client";
import React, { useRef } from "react";
import Header from "@/components/CryptoHeader";
import Ticker from "@/components/sections/ticker";
import MintLanding from "@/components/MintingSections/MintLanding";
import { motion, useInView } from "framer-motion";

const page = () => {
  return (
    <>
      <Ticker />
      <Header />
      <MintLanding />
    </>
  );
};

export default page;
