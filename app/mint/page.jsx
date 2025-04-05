"use client";
import React from "react";
import Header from "@/components/CryptoHeader";
import Ticker from "@/components/sections/ticker";
import InfinityLoop from "@/components/InfinityLoop";

const page = () => {
  return (
    <>
      <Ticker />
      <Header />
      <InfinityLoop />
    </>
  );
};

export default page;
