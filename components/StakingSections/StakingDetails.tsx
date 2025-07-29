"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const StakingDetails = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, {
    amount: 0.5,
    once: false,
  });

  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setIsInView(inView);
    console.log("StakingDetails in view:", inView);
  }, [inView]);

  const tiers = [
    { years: "1 year", frequency: "Initiation", apy: "11%" },
    { years: "2 years", frequency: "Connection", apy: "22%" },
    { years: "3 years", frequency: "Trust", apy: "33%" },
    { years: "4 years", frequency: "Foundation", apy: "44%" },
    { years: "5 years", frequency: "Expansion", apy: "55%" },
    { years: "6 years", frequency: "Integration", apy: "66%" },
    { years: "7 years", frequency: "Mastery", apy: "77%" },
    { years: "8 years", frequency: "Transcendence", apy: "88%" },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden text-white pt-20"
      >
        {/* 🖥️ Desktop layout */}
        <div className="hidden md:flex fixed w-full px-10 top-1/2 transform -translate-y-1/2 flex-row justify-between items-start gap-10">
          {/* Left Text */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{
              x: isInView ? 0 : -100,
              opacity: isInView ? 1 : 0,
            }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-3xl font-semibold max-w-xl"
          >
            <h2>
              The deeper you root, the more you receive – <br /> not just in
              tokens, but in influence, access, and alignment.
            </h2>
          </motion.div>

          {/* Right Table */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{
              x: isInView ? 0 : 100,
              opacity: isInView ? 1 : 0,
            }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white w-full max-w-xl"
          >
            <div className="grid grid-cols-3 table-fixed w-full font-semibold text-yellow-500 mb-6 gap-x-4 text-base md:text-lg lg:text-xl">
              <div className="break-words">Commitment</div>
              <div className="break-words">Frequency</div>
              <div className="break-words">APY</div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-col gap-y-4"
            >
              {tiers.map((tier, i) => (
                <motion.div
                  key={i}
                  variants={rowVariants}
                  className="grid grid-cols-3 table-fixed w-full gap-x-4 break-words text-base md:text-lg lg:text-xl"
                >
                  <div>{tier.years}</div>
                  <div>{tier.frequency}</div>
                  <div>{tier.apy}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* 📱 Mobile layout */}
        <div className="flex md:hidden flex-col gap-y-10 px-6 text-center">
          {/* Top Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="text-2xl font-semibold pt-4"
          >
            <h2>
              The deeper you root, the more you receive – <br /> not just in
              tokens, but in influence, access, and alignment.
            </h2>
          </motion.div>

          {/* Table Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base w-full"
          >
            <div className="grid grid-cols-3 table-fixed w-full font-semibold text-yellow-500 mb-4 gap-x-2 text-sm sm:text-base">
              <div className="break-words">Commitment</div>
              <div className="break-words">Frequency</div>
              <div className="break-words">APY</div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-col gap-y-3"
            >
              {tiers.map((tier, i) => (
                <motion.div
                  key={i}
                  variants={rowVariants}
                  className="grid grid-cols-3 table-fixed w-full gap-x-2 break-words text-sm sm:text-base"
                >
                  <div>{tier.years}</div>
                  <div>{tier.frequency}</div>
                  <div>{tier.apy}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Spacer to allow scroll out */}
      <div className="h-[50vh] "></div>
    </>
  );
};

export default StakingDetails;
