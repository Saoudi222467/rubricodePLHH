"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import InfinityLoop from "@/components/InfinityLoop";

export default function SectionIntro() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { amount: 0.5 });

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.3, when: "beforeChildren" } },
    exit: { transition: { staggerChildren: 0.2, when: "afterChildren" } },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 180, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } },
  };

  const textVariants: Variants = {
    hidden: (direction: number) => ({
      opacity: 0,
      x: direction * 50,
      y: 20,
      scale: 0.95,
    }),
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { type: "tween", ease: "easeOut", duration: 0.7 },
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction * -50,
      y: 20,
      transition: { duration: 0.3 },
    }),
  };

  const textLines = [
    [-1, "Not a company. ", "A constellation of conscious creators.", ""],
    [1, "PLHH is not structured by titles,", " but by trust.", ""],
    [-1, "Not led by roles,", " but by resonance.", ""],
    [1, "Here, everyone contributes", " from their own genius.", ""],
    [-1, "We don’t follow", " – we align.", ""],
    [1, "We don’t manage", " – we harmonize.", ""],
    [-1, "This is not about who’s in charge.", "", ""],
    [1, "It’s about what we’re here to build.", "", ""],
    [-1, "Together.", " As one.", " In infinite possibility."],
  ];

  return (
    <div ref={wrapperRef} className="relative w-full h-screen">
      <section className="fixed inset-0 overflow-hidden flex flex-col items-center justify-center">
        {/* Infinity Background */}
        <AnimatePresence>
          {isInView && (
            <motion.div
              className="fixed inset-0 -z-20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <InfinityLoop />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay */}
        <AnimatePresence>
          {isInView && (
            <motion.div
              className="fixed inset-0 -z-10 bg-gradient-to-br from-[#4E2A1E]/50 via-[#3A1F0B]/30 to-[#D4AF37]/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <AnimatePresence>
          {isInView && (
            <motion.div
              className="relative z-30 max-w-2xl px-6 text-center space-y-3"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <motion.h2
                variants={titleVariants}
                className=" mt-24 text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_4px_8px_rgba(212,175,55,0.5)]"
              >
                GUARDIANS OF INFINITY
              </motion.h2>

              {textLines.map(([dir, part1, part2, part3], idx) => (
                <motion.p
                  key={idx}
                  custom={dir}
                  variants={textVariants}
                  className="text-lg text-white"
                >
                  {part1 && <span>{part1}</span>}
                  {part2 && (
                    <span className="text-[#FFE066] font-semibold">
                      {part2}
                    </span>
                  )}
                  {part3 && <span>{part3}</span>}
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Hint */}
        <AnimatePresence>
          {isInView && (
            <motion.div
              className="fixed bottom-10 z-40 w-full flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1,
              }}
            >
              <span className="text-[#D4AF37]">↓ Scroll ↓</span>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
