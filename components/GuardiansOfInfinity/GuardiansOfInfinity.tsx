"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";

export default function GuardiansOfInfinity() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.25, when: "beforeChildren" } },
    exit: { transition: { staggerChildren: 0.1, when: "afterChildren" } },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 220, damping: 20 },
    },
    exit: { opacity: 0, x: 30, transition: { duration: 0.3 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut" } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <section ref={ref} className="w-full h-screen relative overflow-hidden">
      <AnimatePresence>
        {isInView && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <motion.h4
              variants={headerVariants}
              className="text-2xl font-semibold text-white drop-shadow-lg"
            >
              ✨ 2. GUARDIANS OF INFINITY
            </motion.h4>

            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-xl text-gray-300"
            >
              “The ones who rise in devotion.” These are the community members
              who:
            </motion.p>

            <motion.ul
              variants={containerVariants}
              className="list-disc list-inside mt-4 text-gray-300"
            >
              {[
                "Created a verified profile",
                "Hold Peace, Love & Harmony tokens",
                "Show up with heart, with voice, with action",
              ].map((text, idx) => (
                <motion.li key={idx} variants={itemVariants} className="mt-2">
                  {text}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              variants={cardVariants}
              className="mt-6 bg-gray-800 bg-opacity-50 p-6 rounded-lg"
            >
              <p className="text-gray-400">
                [Community Map / Carousel goes here]
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                Become a Guardian
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optional scroll spacer */}
      {/* <div className="h-[100vh]" /> */}
    </section>
  );
}
