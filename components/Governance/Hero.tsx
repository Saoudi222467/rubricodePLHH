"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

export function GovernanceHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <>
      <section ref={ref} className="w-full h-[100vh] relative overflow-hidden">
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="governance-hero-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center px-6 text-center bg-black text-white z-50"
            >
              <div className="max-w-3xl space-y-6">
                <motion.h2
                  initial={{ y: "-50%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-50%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
                >
                  <span className="bg-gradient-to-r from-forest-green via-aqua-blue to-forest-green bg-clip-text text-transparent">
                    Community Governance
                  </span>
                </motion.h2>

                <motion.div
                  initial={{ y: "50%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "50%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  className="text-dark-text text-lg space-y-4 text-white"
                >
                  <p>
                    PLHH is governed by the community – not by corporations.
                    Every PLHH Coin holder has the power to propose, discuss,
                    and vote on meaningful decisions that shape the future of
                    the ecosystem.
                  </p>
                  <p>
                    Voting power is proportional to your holdings – but the
                    intention behind each vote is what truly matters.
                  </p>
                  <p>
                    From funding regenerative projects to forming partnerships
                    and shaping the Metaverse – you have a voice.
                  </p>
                  <p className="font-medium">
                    At PLHH, governance is not a feature.
                    <br />
                    It's the foundation of freedom.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Spacer to allow scroll flow */}
      <div className="h-[100vh]" />
    </>
  );
}
