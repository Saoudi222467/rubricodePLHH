"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import InfinityLoop from "@/components/InfinityLoop";

export default function SectionIntro() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { amount: 0.5 });

  // Variants
  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.3, when: "beforeChildren" } },
    exit: { transition: { staggerChildren: 0.2, when: "afterChildren" } },
  };

  // Title animation
  const titleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 180, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } },
  };

  // Text animation with directional slide using custom
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

  return (
    <div ref={wrapperRef} className="relative w-full h-screen">
      <section className="fixed inset-0 overflow-hidden flex flex-col items-center justify-center">
        {/* Infinity Loop Background */}
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

        {/* Darker Themed Gradient Overlay */}
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

        {/* Content */}
        <AnimatePresence>
          {isInView && (
            <motion.div
              className="relative z-30 max-w-2xl px-6 text-center space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <motion.h2
                variants={titleVariants}
                className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_4px_8px_rgba(212,175,55,0.5)]"
                whileHover={{ scale: 1.05 }}
              >
                THE TEAM –{" "}
                <span className="text-[#FFE066]">GUARDIANS OF INFINITY</span>
              </motion.h2>

              {[
                [
                  -1,
                  "We stand as a ",
                  "concentric circle of purpose",
                  ", uniting diverse voices across continents.",
                ],
                [
                  1,
                  "Our shared vision ",
                  "illuminates pathways",
                  " for transformative collaboration.",
                ],
                [
                  -1,
                  "Every contribution echoes, empowering us to ",
                  "forge a legacy",
                  " of lasting impact.",
                ],
                [
                  1,
                  "Real change begins when we ",
                  "show up together",
                  ", crafting tomorrow.",
                ],
              ].map(([dir, pre, highlight, post], idx) => (
                <motion.p
                  key={idx}
                  custom={dir}
                  variants={textVariants}
                  className="text-lg text-white"
                  whileHover={{ scale: 1.02, color: "#FFF" }}
                >
                  {pre}
                  <span className="text-[#FFE066] font-semibold">
                    {highlight}
                  </span>
                  {post}
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
