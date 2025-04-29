"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const WhoWeAre = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <>
      <section ref={ref} className="w-full h-[100vh] relative overflow-hidden">
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="who-we-are-wrapper"
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
                  Who We Are (and Aren't)
                </motion.h2>

                <motion.ul
                  initial={{ y: "50%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "50%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  className="list-disc list-inside space-y-2 text-left text-lg sm:text-xl"
                >
                  <li>We are not a company.</li>
                  <li>We are not a logo.</li>
                  <li>We are not a launch.</li>
                </motion.ul>

                <motion.p
                  initial={{ y: "50%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "50%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="mt-4 text-lg sm:text-xl"
                >
                  We are a field: a place where humans, intelligence, and earth
                  co-create the future.
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

export default WhoWeAre;
