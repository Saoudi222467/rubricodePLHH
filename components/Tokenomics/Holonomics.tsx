// components/Holonomics.tsx
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
  hidden: { opacity: 0, rotate: 0 }, // start rotated –45°
  visible: {
    opacity: 1,
    rotate: 45, // animate to 0°
    transition: { duration: 0.8, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    rotate: -45, // rotate back out when leaving
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
        {/* background fade */}
        <motion.div
          className="fixed inset-0 bg-fixed bg-gradient-to-br from-black via-gray-900 to-black"
          variants={fadeVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        />

        {/* spotlight fade */}
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

        {/* content fade */}
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center"
          variants={fadeVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* heading */}
          <motion.div
            className="flex items-center justify-center space-x-4"
            variants={headingContainer}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"} // drive from isVisible
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

          {/* paragraphs fade in together after heading */}
          <motion.div
            className="mt-8 max-w-2xl space-y-6"
            initial={{ opacity: 0 }}
            animate={
              isRevealed
                ? { opacity: 1, transition: { delay: 1.4, duration: 0.8 } }
                : { opacity: 0 }
            }
          >
            <p className="text-lg sm:text-xl font-semibold text-gray-200">
              Value flows like <span className="text-[#F9CD13]">blood</span>.
              Growth comes from <span className="text-[#F9CD13]">giving</span>.
            </p>
            <p className="text-lg sm:text-xl font-semibold text-gray-200">
              Tokens <span className="text-[#539241]">regenerate</span>. Wallets{" "}
              <span className="text-[#539241]">speak</span>. Holders drive the
              story.
            </p>
            <p className="text-lg sm:text-xl font-semibold text-gray-200">
              Finance as <span className="text-[#00A8E8]">frequency</span>.
              Allocation as <span className="text-[#00A8E8]">alignment</span>.
            </p>
            <p className="text-lg sm:text-xl font-bold text-white">
              Peace <span className="text-[#F9CD13]">·</span> Love{" "}
              <span className="text-[#539241]">·</span> Harmony{" "}
              <span className="text-[#00A8E8]">·</span> in numbers
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Spacer so you can scroll past it */}
      <div className="h-screen" />
    </>
  );
}
