"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const PreSaleStaking = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <>
      <section ref={ref} className="w-full h-[100vh] relative overflow-hidden">
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="pre-sale-staking-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center px-6 text-center bg-black text-white z-50"
            >
              <div className="max-w-4xl space-y-6">
                <motion.h3
                  initial={{ y: "-50%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-50%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-2xl sm:text-3xl font-semibold"
                >
                  🔹 44% – Pre-Sale & Staking Rewards
                </motion.h3>

                <motion.p
                  initial={{ y: "50%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "50%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  className="text-lg sm:text-xl"
                >
                  <strong>Master Number 44 | The Generator</strong>
                  <br />
                  The foundation. The pulse. The movement. This is where energy
                  begins. Where participation is rewarded. Where those who stake
                  belief, receive value.
                  <br />
                  Why 44? Because our founder is a 4N Generator. And four means:
                  Structure. Strength. Stability. Spirit. Double four means:
                  It's unshakable.
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

export default PreSaleStaking;
