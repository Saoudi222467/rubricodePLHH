"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";

export default function FieldSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  // Animation variants
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
      transition: { type: "spring", stiffness: 220, damping: 20 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
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
    <>
      {/* Trigger Section (invisible) */}
      <section
        ref={ref}
        className="relative w-full h-screen bg-black overflow-hidden"
      ></section>

      <AnimatePresence>
        {isInView && (
          <motion.div
            className="fixed inset-0 z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Radial Gradient Blob */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 10, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[80%] top-32 w-36 h-36"
              style={{
                background:
                  "radial-gradient(circle at center, rgb(251, 205, 3), rgb(212, 195, 1))",
                filter: "blur(80px)",
              }}
            />

            {/* Fixed Background Image */}
            <motion.img
              src="/images/bghero2.jpeg"
              alt="Field Background"
              className="fixed inset-0 w-full h-full object-cover opacity-70"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Content Overlay */}
            <motion.div
              className="relative z-20 w-full h-screen flex flex-col items-center justify-center px-6 text-center space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <motion.h4
                variants={headerVariants}
                className="text-4xl md:text-6xl font-extrabold uppercase tracking-wide drop-shadow-lg bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent"
              >
                THE FIELD ITSELF
              </motion.h4>

              <motion.blockquote
                variants={textVariants}
                className="max-w-xl text-base md:text-lg font-semibold italic text-yellow-100 border-l-4 border-yellow-300 pl-4"
              >
                “Every human with a heart for harmony.” This is the open door.
                <br />
                Where anyone can step in. No title needed. Just truth.
              </motion.blockquote>

              <motion.button
                variants={buttonVariants}
                className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold shadow-lg hover:opacity-90 transition"
              >
                You are already part of this. And when you're ready – we'll meet
                you in the circle.
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
