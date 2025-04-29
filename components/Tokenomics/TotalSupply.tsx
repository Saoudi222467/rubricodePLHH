"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const TotalSupply = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <>
      <section ref={ref} className="w-full h-[100vh] relative overflow-hidden">
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="total-supply-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-full h-[100vh] flex flex-col items-center justify-center px-6 text-center bg-black text-white z-50"
            >
              <div className="max-w-5xl space-y-10">
                {/* BIG H1 TITLE */}
                <motion.h1
                  initial={{ y: "-80%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-80%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-3xl md:text-5xl font-bold leading-tight"
                >
                  TOKENOMICS – THE SACRED STRUCTURE OF PEACE, LOVE & HARMONY
                </motion.h1>

                {/* Main H2 and Paragraph */}
                <div className="space-y-6">
                  <motion.h2
                    initial={{ y: "-50%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-50%", opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="text-2xl sm:text-4xl font-bold"
                  >
                    🔝 Total Supply: 1,000,000,000 (1 Billion Tokens)
                  </motion.h2>

                  <motion.p
                    initial={{ y: "50%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "50%", opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="text-lg sm:text-xl"
                  >
                    Not chosen by chance. Chosen to hold the full field of
                    possibilities. And here's how we activate that energy:
                  </motion.p>
                </div>
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

export default TotalSupply;
