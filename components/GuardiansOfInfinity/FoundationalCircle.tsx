"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";

export default function FoundationalCircle() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  // Variants
  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.3, when: "beforeChildren" } },
    exit: { transition: { staggerChildren: 0.1, when: "afterChildren" } },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut" } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  const itemVariants: Variants = {
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
            {/* Header */}
            <motion.h4
              variants={headerVariants}
              className="text-2xl font-semibold text-white drop-shadow-lg"
            >
              🔥 1. THE FOUNDATIONAL CIRCLE
            </motion.h4>

            {/* Description */}
            <motion.p
              variants={textVariants}
              className="mt-4 max-w-xl text-gray-300"
            >
              “The ones who lit the first fire.” These are the original vision
              holders. The initiators. The builders. The seed-planters. They
              didn’t create this to be seen – they created this so others could
              belong.
            </motion.p>

            {/* Avatars */}
            <motion.div
              variants={containerVariants}
              className="mt-6 flex flex-wrap justify-center gap-6"
            >
              {[1, 2, 3, 4].map((id) => (
                <motion.div
                  key={id}
                  variants={itemVariants}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-200" />
                  <span className="mt-2 text-sm text-gray-400">
                    Location & contribution
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optional scroll spacer */}
      {/* <div className="h-[100vh]" /> */}
    </section>
  );
}
