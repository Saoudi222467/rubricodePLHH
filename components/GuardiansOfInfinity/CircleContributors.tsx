"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";

export default function CircleContributors() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.25, when: "beforeChildren" } },
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
              🛠 3. CIRCLE CONTRIBUTORS
            </motion.h4>

            <motion.p
              variants={textVariants}
              className="mt-4 max-w-xl text-gray-300"
            >
              “The builders behind the scenes.” Designers, developers, writers,
              strategists, creators – the ones who laid the stones, wrote the
              code, shaped the vision.
            </motion.p>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
            >
              {[1, 2, 3].map((id) => (
                <motion.div
                  key={id}
                  variants={cardVariants}
                  className="border rounded-lg p-6 bg-gray-800 bg-opacity-50"
                >
                  <h5 className="font-medium text-white">
                    Name | Role | Location
                  </h5>
                  <p className="mt-2 text-gray-400">
                    What I contributed and why.
                  </p>
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
