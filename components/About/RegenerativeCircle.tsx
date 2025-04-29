"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const RegenerativeCircle = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <>
      <section ref={ref} className="w-full h-[100vh] relative overflow-hidden">
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="regenerative-circle-wrapper"
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
                  Our Regenerative Circle
                </motion.h2>

                <motion.ul
                  initial={{ y: "50%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "50%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  className="list-disc list-inside space-y-2 text-left text-lg sm:text-xl"
                >
                  <li>Your energy feeds the tech.</li>
                  <li>The tech structures the asset.</li>
                  <li>The asset generates real-world returns.</li>
                  <li>The returns fuel the next seed.</li>
                  <li>The cycle continues.</li>
                </motion.ul>

                <motion.p
                  initial={{ y: "50%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "50%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="mt-4 text-lg sm:text-xl"
                >
                  No extractive finance. Only regenerative systems.
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

export default RegenerativeCircle;
