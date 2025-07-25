"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeInOut", delay: 0.5 },
  },
};

const headingContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.8, when: "beforeChildren" } },
};

const symbolVariants: Variants = {
  hidden: { opacity: 0, rotate: 0 },
  visible: {
    opacity: 1,
    rotate: 45,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    rotate: -45,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

const textVariants: Variants = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { x: 50, opacity: 0, transition: { duration: 0.4, ease: "easeIn" } },
};

export default function Holonomics() {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useInView(ref, { amount: 0.5, once: false });
  const isRevealed = useInView(ref, { amount: 0.5, once: true });

  return (
    <>
      <section ref={ref} className="w-full h-screen relative overflow-hidden">
        {/* Background Fade */}
        <motion.div
          className="fixed inset-0 bg-fixed bg-gradient-to-br from-black via-gray-900 to-black"
          variants={fadeVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        />

        {/* Spotlight */}
        <motion.div
          className="fixed inset-0 pointer-events-none"
          variants={fadeVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <div
            className="w-full h-full"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.06), transparent 70%)",
            }}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center"
          variants={fadeVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Heading */}
          <motion.div
            className="flex items-center justify-center space-x-4"
            variants={headingContainer}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.span
              variants={symbolVariants}
              className="text-5xl sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#F9CD13] to-[#539241]"
              style={{ textShadow: "0 0 8px rgba(249,205,19,0.8)" }}
            >
              🌀
            </motion.span>
            <motion.span
              variants={textVariants}
              className="text-5xl sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#F9CD13] to-[#539241]"
              style={{ textShadow: "0 0 8px rgba(249,205,19,0.8)" }}
            >
              Holonomics
            </motion.span>
          </motion.div>

          {/* New Text Block */}
          <motion.div
            className="mt-8 max-w-2xl space-y-3"
            initial={{ opacity: 0 }}
            animate={
              isRevealed
                ? { opacity: 1, transition: { delay: 1.4, duration: 0.8 } }
                : { opacity: 0 }
            }
          >
            <p className="text-lg sm:text-xl font-semibold text-gray-200">
              Value is <span className="text-[#F9CD13]">intention</span> in motion.
            </p>
            <p className="text-lg sm:text-xl font-semibold text-gray-200">
              Growth is the <span className="text-[#F9CD13]">gift</span> that returns.
            </p>
            <p className="text-lg sm:text-xl font-semibold text-gray-200">
              Tokens are <span className="text-[#539241]">vessels</span>.
            </p>
            <p className="text-lg sm:text-xl font-semibold text-gray-200">
              Wallets are <span className="text-[#539241]">portals</span>.
            </p>
            <p className="text-lg sm:text-xl font-semibold text-gray-200">
              Holders are <span className="text-[#539241]">storytellers</span>.
            </p>
            <p className="text-lg sm:text-xl font-semibold text-gray-200">
              Finance is <span className="text-[#00A8E8]">frequency</span>.
            </p>
            <p className="text-lg sm:text-xl font-semibold text-gray-200">
              Allocation is <span className="text-[#00A8E8]">alignment</span>.
            </p>
            <p className="text-lg sm:text-xl font-bold text-white">
              Peace <span className="text-[#F9CD13]">·</span> Love{" "}
              <span className="text-[#539241]">·</span> Harmony{" "}
              <span className="text-[#00A8E8]">–</span> in conscious flow
            </p>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
