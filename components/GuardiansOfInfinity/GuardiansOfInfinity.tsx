"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import InfinityLoop from "@/components/InfinityLoop";

export default function GuardiansOfInfinity() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.25, when: "beforeChildren" } },
    exit: { transition: { staggerChildren: 0.1, when: "afterChildren" } },
  };
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 220, damping: 20 },
    },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut" } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  const items = [
    "Created a verified profile",
    "Held Peace, Love & Harmony tokens",
    "Shown up with heart, voice, and action",
  ];

  return (
    <section ref={ref} className="w-full h-screen relative overflow-hidden">
      <AnimatePresence>
        {isInView && (
          <motion.div
            className="
              fixed inset-0 z-50
              flex flex-col items-center justify-center
              px-6 pb-16 text-center
              bg-black bg-opacity-20 backdrop-blur-sm
            "
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {/* InfinityLoop */}
            <motion.div
              className="relative z-10 mb-8 flex items-center justify-center"
              variants={itemVariants}
            >
              <div className="w-64 h-64 md:w-80 md:h-80">
                <InfinityLoop />
              </div>
            </motion.div>

            {/* Heading with your gradient */}
            <motion.h2
              variants={headerVariants}
              className="
                relative z-10 text-4xl md:text-5xl font-extrabold uppercase tracking-wide
                bg-clip-text text-transparent
                bg-gradient-to-r from-[#FFE066] via-[#FFE060] to-[#7B245A]
              "
            >
              Guardians of Infinity
            </motion.h2>

            {/* Intro text (unchanged) */}
            <motion.p
              variants={itemVariants}
              className="relative z-10 mt-4 max-w-xl text-[#FFE060] text-lg leading-relaxed"
            >
              The ones who rise in devotion. These community members have:
            </motion.p>

            {/* Styled bullets like CoreChoices */}
            <motion.ul
              variants={containerVariants}
              className="relative z-10 mt-6 flex flex-col gap-6 max-w-xl"
            >
              {items.map((text, idx) => (
                <motion.li
                  key={idx}
                  variants={itemVariants}
                  className="flex items-start space-x-4"
                >
                  {/* gradient circle using InfinityLoop colors */}
                  <span
                    className="mt-1 w-5 h-5 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #FFE066, #7B245A)",
                    }}
                  />
                  <div className="text-left">
                    <span className="font-bold text-xl sm:text-2xl text-white">
                      {text}
                    </span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            {/* Enlarged Gold-gradient button */}
            <motion.div variants={itemVariants} className="relative z-10 mt-8">
              <button
                className="
                  flex items-center justify-center
                  px-8 py-4
                  bg-gradient-to-b from-yellow-600 to-yellow-400
                  rounded-lg
                  text-white font-semibold text-lg
                  shadow-md
                  border border-yellow-500/50
                  hover:from-yellow-500 hover:to-yellow-300
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-yellow-200
                "
              >
                Become a Guardian
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
