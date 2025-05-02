"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";

export default function StructureOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.25, when: "beforeChildren" } },
    exit: { transition: { staggerChildren: 0.1, when: "afterChildren" } },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, x: -40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 200, damping: 25 },
    },
    exit: { opacity: 0, x: -40, transition: { duration: 0.3 } },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut" } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  return (
    <section ref={ref} className="w-full h-screen relative overflow-hidden">
      <AnimatePresence>
        {isInView && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-start justify-center px-6 max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <motion.h3
              variants={headerVariants}
              className="text-3xl font-semibold text-white drop-shadow"
            >
              🌍 THE TEAM – GUARDIANS OF INFINITY
            </motion.h3>

            <motion.p
              variants={textVariants}
              className="mt-3 text-lg text-gray-300"
            >
              Not a company. A constellation.
            </motion.p>

            <motion.h4
              variants={headerVariants}
              className="mt-6 text-2xl font-medium text-white drop-shadow"
            >
              🌀 STRUCTURE & CONCEPT OVERVIEW
            </motion.h4>

            <motion.p variants={textVariants} className="mt-2 text-gray-300">
              The Peace, Love & Harmony team is not about hierarchy. It's about
              frequency, purpose, and participation. This is not a list of
              titles. It's a living reflection of those who dare to care.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optional scroll spacer */}
      {/* <div className="h-[100vh]" /> */}
    </section>
  );
}
