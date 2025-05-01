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
    <>
      <section
        ref={ref}
        className="w-full h-[100vh] relative overflow-hidden bg-black"
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
              className="fixed inset-0 z-50 flex items-center justify-center px-6 text-center overflow-hidden"
            >
              {/* Infinity loop background */}
              <div className="absolute inset-0 pointer-events-none">
                <InfinityLoop />
              </div>

              {/* Content */}
              <div className="relative z-10 max-w-4xl space-y-8">
                <motion.h2
                  variants={headingVariants}
                  className="
                    text-3xl sm:text-4xl font-extrabold
                    bg-gradient-to-r from-[#F9CD13] via-[#A67C00] to-[#539241]
                    bg-clip-text text-transparent
                    uppercase tracking-wide
                  "
                >
                  Our Spirit: Peace, Love & Harmony
                </motion.h2>

                <motion.p
                  variants={textVariants}
                  className="
                    text-lg sm:text-xl
                    italic
                    text-white/90
                    drop-shadow-lg
                  "
                >
                  Not a name. Not a brand. A choice. A path. A system. A
                  feeling. If something in you remembers it – you were always
                  part of us.
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Spacer to allow scrolling */}
      {/* <div className="h-[100vh]" /> */}
    </>
  );
};

export default SpiritSection;
