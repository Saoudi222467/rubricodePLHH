"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";

export default function StructureOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });

  // container only drives stagger timing
  const containerVariants: Variants = {
    hidden: {
      /* no visual change on container itself */
    },
    show: {
      transition: { staggerChildren: 0.25, when: "beforeChildren" },
    },
    exit: {
      transition: { staggerChildren: 0.1, when: "afterChildren" },
    },
  };

  // zoom-in on enter, zoom-out on exit
  const globeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 0.8,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 200, damping: 25 },
    },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "tween", ease: "easeOut", duration: 0.6 },
    },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } },
  };

  return (
    <div ref={ref} className="relative w-full h-screen">
      <AnimatePresence>
        {isInView && (
          <motion.section
            className="fixed inset-0 overflow-hidden flex items-center justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {/* Background Globe */}
            <motion.img
              src="/assets/images/landing/globe.png"
              alt="Globe Background"
              className="absolute inset-0 m-auto max-w-md -z-20 pointer-events-none"
              variants={globeVariants}
            />

            {/* Dark Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/60 -z-10"
              variants={overlayVariants}
            />

            {/* Content */}
            <motion.div className="relative z-10 max-w-3xl px-6 text-center text-white space-y-6">
              <motion.h3
                variants={headerVariants}
                className="text-4xl md:text-5xl font-bold drop-shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                THE TEAM –{" "}
                <span className="text-[#FFE066]">GUARDIANS OF INFINITY</span>
              </motion.h3>

              <motion.p
                variants={textVariants}
                className="text-xl italic text-gray-300"
              >
                Not a company. A{" "}
                <span className="text-[#FFE066] font-semibold">
                  constellation
                </span>
                .
              </motion.p>

              <motion.h4
                variants={headerVariants}
                className="text-3xl md:text-4xl font-semibold drop-shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                STRUCTURE &amp; CONCEPT OVERVIEW
              </motion.h4>

              <motion.p
                variants={textVariants}
                className="text-lg leading-relaxed text-gray-200"
              >
                The Peace, Love & Harmony team is not about{" "}
                <span className="text-[#FFE066] font-semibold">hierarchy</span>.
                It’s about{" "}
                <span className="text-[#FFE066] font-semibold">frequency</span>,{" "}
                <span className="text-[#FFE066] font-semibold">purpose</span>,
                and{" "}
                <span className="text-[#FFE066] font-semibold">
                  participation
                </span>
                . This is not a list of titles — it’s a living reflection of
                those who dare to care.
              </motion.p>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
