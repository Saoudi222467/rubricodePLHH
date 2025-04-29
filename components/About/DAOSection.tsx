"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const DAOSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <>
      <section ref={ref} className="w-full h-[100vh] relative overflow-hidden">
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="dao-section-wrapper"
              initial={{ opacity: 0, backgroundSize: "100%" }}
              animate={{ opacity: 1, backgroundSize: "110%" }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.6, ease: "easeInOut" },
                backgroundSize: {
                  duration: 30,
                  ease: "linear",
                  repeat: Infinity,
                },
              }}
              style={{
                backgroundImage: "url('/assets/images/landing/CoCreate.jpg')",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="fixed inset-0 bg-black text-white z-50"
            >
              <div className="relative w-full h-full">
                {/* Center of triangle */}
                <motion.h2
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="
                    absolute top-1/2 left-1/3
                    transform -translate-x-1/2 -translate-y-1/2
                    text-3xl sm:text-4xl font-bold
                  "
                >
                  Our Structure: A <span className="text-[#F9CD13]">DAO</span>{" "}
                  for All
                </motion.h2>

                {/* Vertices of triangle */}
                <motion.ul className="relative w-full h-full">
                  {/* Top vertex */}
                  <motion.li
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                    className="
                      absolute top-24 left-[45%]
                      transform -translate-x-1/2
                      text-lg sm:text-xl
                    "
                  >
                    Every <span className="text-[#F9CD13]">voice</span> matters.
                  </motion.li>

                  {/* Bottom-left vertex */}
                  <motion.li
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -30, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                    className="
                      absolute bottom-5 left-16
                      text-lg sm:text-xl
                    "
                  >
                    <span className="text-[#F9CD13]">Freedom</span> is coded in.
                  </motion.li>

                  {/* Bottom-right vertex */}
                  <motion.li
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 30, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                    className="
                      absolute bottom-5 right-16
                      text-lg sm:text-xl
                    "
                  >
                    We <span className="text-[#F9CD13]">co-create</span>, not
                    rule.
                  </motion.li>
                </motion.ul>
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

export default DAOSection;
