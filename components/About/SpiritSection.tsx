"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import InfinityLoop from "@/components/InfinityLoop";

const SpiritSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const headingVariants: Variants = {
    hidden: { y: -30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const textVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <section
      ref={ref}
      className="w-full h-screen relative overflow-hidden bg-black"
    >
      <AnimatePresence>
        {isInView && (
          <motion.div
            key="spirit-section-wrapper"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { duration: 0.6, ease: "easeInOut" },
              },
            }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center"
          >
            {/* Infinity loop background */}
            <div className="absolute inset-0 pointer-events-none z-[60] flex items-center justify-center">
              <div className="w-[800px] h-[400px] relative -mt-32">
                <InfinityLoop />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl space-y-6 mt-16 sm:mt-32">
              <motion.h2
                variants={headingVariants}
                className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-[#F9CD13] via-[#A67C00] to-[#539241] bg-clip-text text-transparent uppercase tracking-wide"
              >
                Welcome to the Circle of Light
              </motion.h2>

              <motion.p
                variants={textVariants}
                className="text-lg sm:text-xl italic text-white/90 drop-shadow-lg"
              >
                This is not just a vision. It's a movement of souls. Together,
                we awaken the truth within — forging a path of inner peace,
                shared love, and unbreakable harmony. If it resonates, you were
                always meant to be here.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SpiritSection;
