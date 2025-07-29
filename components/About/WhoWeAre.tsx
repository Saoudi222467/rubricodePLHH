"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";

const listContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.8,
      delayChildren: 1.2,
    },
  },
};

const listItem: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 1.2,
    },
  },
};

export default function WhoWeAre() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const lines = [
    { prefix: "We are not a", word: "company" },
    { prefix: "We are not a", word: "logo" },
    { prefix: "We are not a", word: "launch" },
  ];

  return (
    <>
      <section
        ref={ref}
        className="w-full h-[100vh] relative overflow-hidden bg-black"
      >
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="who-we-are"
              className="fixed inset-0 z-50 flex items-start justify-center px-6 overflow-hidden pt-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              {/* Pulsing blob */}
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 8, 1] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute z-0 left-[80%] top-32"
              >
                <div
                  className="w-36 h-36 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at center, #FF6B6B, transparent)",
                    filter: "blur(80px)",
                  }}
                />
              </motion.div>

              {/* Background image */}
              <motion.img
                src="/earth-section-bg.png"
                alt="Earth background"
                className="absolute inset-0 w-full h-full object-cover z-10 opacity-50"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />

              {/* Soft gradient overlay */}
              <motion.div
                className="absolute inset-0"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(255,107,107,0.15), transparent 80%)",
                }}
              />

              {/* Foreground content */}
              <div className="relative z-20 max-w-4xl text-center space-y-16">
                {/* Title */}
                <motion.h2
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="
                    text-5xl sm:text-6xl font-extrabold
                    bg-gradient-to-r from-[#FFD43B] via-[#FFA94D] to-[#FF6B6B]
                    bg-clip-text text-transparent
                    uppercase tracking-wide
                    leading-tight
                  "
                >
                  Who We Are
                  <span className="block text-3xl sm:text-4xl mt-2 text-[#FFD43B] font-semibold tracking-wide">
                    (and Aren’t)
                  </span>
                </motion.h2>

                {/* Animated list */}
                <motion.ul
                  variants={listContainer}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-3 text-center"
                >
                  {lines.map((line, i) => (
                    <motion.li
                      key={i}
                      variants={listItem}
                      className="text-4xl sm:text-5xl font-bold tracking-wide "
                    >
                      <span className="text-white">{line.prefix} </span>
                      <span className="text-[#FFD43B]">{line.word}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Center-aligned tagline */}
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 3.6 }}
                  className="
                    text-2xl sm:text-3xl
                    font-bold
                    max-w-3xl mx-auto
                    leading-relaxed text-center
                  "
                  style={{
                    textShadow: "0 0 20px rgba(255,255,255,0.4)",
                    background: "linear-gradient(to right, #ffffff, #f0f0f0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  We are a field where humans, intelligence & earth <br/>co-create the future.
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
