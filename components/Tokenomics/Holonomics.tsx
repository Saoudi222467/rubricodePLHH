"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const Holonomics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <>
      <section ref={ref} className="w-full h-[100vh] relative overflow-hidden">
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="holonomics-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center px-6 text-center bg-black text-white z-50"
            >
              <div className="max-w-4xl space-y-6">
                <motion.h2
                  initial={{ y: "-50%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-50%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-3xl sm:text-4xl font-bold"
                >
                  🌀 What This Really Is
                </motion.h2>

                <motion.p
                  initial={{ y: "50%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "50%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  className="text-lg sm:text-xl"
                >
                  This is not Tokenomics. This is Holonomics.
                  <br />
                  A system where:
                  <br />– Value circulates like blood.
                  <br />– Growth comes from giving.
                  <br />– Ownership means belonging.
                  <br />
                  <br />
                  Every token is a tool for regeneration. Every wallet is a
                  voice in the system. Every holder is part of the story.
                  <br />
                  <br />
                  This is not just finance. This is frequency.
                  <br />
                  This is not just allocation. This is alignment.
                  <br />
                  This is Peace, Love & Harmony – expressed in numbers.
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Spacer to allow scrolling */}
      <div className="h-[100vh]" />
    </>
  );
};

export default Holonomics;
