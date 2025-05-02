"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";

export default function FieldSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.3, when: "beforeChildren" } },
    exit: { transition: { staggerChildren: 0.1, when: "afterChildren" } },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, x: -40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
    exit: { opacity: 0, x: -40, transition: { duration: 0.3 } },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut" } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 180, damping: 18 },
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
              🌱 4. THE FIELD ITSELF
            </motion.h4>

            <motion.p
              variants={textVariants}
              className="mt-4 max-w-xl text-gray-300"
            >
              “Every human with a heart for harmony.” This is the open door.
              Where anyone can step in. No title needed. Just truth.
            </motion.p>

            <motion.button
              variants={buttonVariants}
              className="mt-6 px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition"
            >
              You are already part of this. And when you're ready – we'll meet
              you in the circle.
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optional scroll spacer */}
      {/* <div className="h-[100vh]" /> */}
    </section>
  );
}
