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

  const contributors = [
    {
      name: "Alice Smith",
      role: "Lead Designer",
      location: "New York, USA",
      contribution: "Crafted the UI mockups and visual identity.",
    },
    {
      name: "Ravi Patel",
      role: "Frontend Developer",
      location: "London, UK",
      contribution: "Built the React components and Framer Motion animations.",
    },
    {
      name: "Mei Chen",
      role: "Content Strategist",
      location: "Sydney, Australia",
      contribution: "Authored the site copy and messaging framework.",
    },
  ];

  return (
    <section ref={ref} className="w-full h-screen relative overflow-hidden">
      <AnimatePresence>
        {isInView && (
          <>
            {/* Gradient Background */}
            <motion.div
              className="
                fixed inset-0 -z-10
                bg-gradient-to-br
                  from-[#4E2A1E]/50
                  via-[#3A1F0B]/30
                  to-[#D4AF37]/40
              "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {/* Content Container */}
            <motion.div
              className="
                fixed inset-0 z-50
                flex flex-col items-center justify-center
                px-6 text-center
                bg-black bg-opacity-30 backdrop-blur-sm
              "
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {/* Header */}
              <motion.h4
                variants={headerVariants}
                className="
                  text-2xl sm:text-3xl font-semibold
                  bg-clip-text text-transparent
                  bg-gradient-to-r from-[#FFE066] via-[#FFE060] to-[#7B245A]
                  drop-shadow-lg
                "
              >
                Circle Contributors
              </motion.h4>

              {/* Description */}
              <motion.p
                variants={textVariants}
                className="mt-4 max-w-xl italic text-lg text-white/80"
              >
                “The builders behind the scenes.” Designers, developers,
                writers, strategists, creators – the ones who laid the stones,
                wrote the code, shaped the vision.
              </motion.p>

              {/* Cards Grid */}
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
              >
                {contributors.map((c, i) => (
                  <motion.div
                    key={i}
                    variants={cardVariants}
                    whileHover={{ scale: 1.03 }}
                    className="
                      border-2 border-[#FFE066]
                      rounded-2xl
                      p-6
                      bg-white bg-opacity-10
                      shadow-lg
                      backdrop-blur-sm
                    "
                  >
                    <h5 className="font-medium text-white text-xl">
                      {c.name} &mdash; {c.role}
                    </h5>
                    <p className="mt-1 text-white/70 italic">{c.location}</p>
                    <p className="mt-4 text-white/80">{c.contribution}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
