"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import InfinityLoop from "@/components/InfinityLoop";

const listContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const listItem: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function RegenerativeCircle() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const points = [
    "Your energy feeds the tech.",
    "The tech structures the asset.",
    "The asset generates real-world returns.",
    "The returns fuel the next seed.",
    "The cycle continues.",
  ];

  return (
    <>
      <section ref={ref} className="w-full h-[100vh] relative overflow-hidden">
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="regenerative-circle-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed inset-0 bg-black text-white z-50 flex items-center justify-center px-6 overflow-hidden"
            >
              {/* Background loop */}
              <div className="absolute inset-0 pointer-events-none">
                <InfinityLoop />
              </div>

              {/* Content */}
              <div className="relative z-10 max-w-4xl space-y-8">
                {/* Animated gradient headline */}
                <motion.h2
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                  className="
                    text-3xl sm:text-4xl font-extrabold 
                    bg-gradient-to-r from-[#F9CD13] via-[#A67C00] to-[#539241]
                    bg-clip-text text-transparent
                    uppercase tracking-wider
                  "
                >
                  Our Regenerative Circle
                </motion.h2>

                {/* Staggered, styled list */}
                <motion.ul
                  variants={listContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4 text-left text-lg sm:text-xl"
                >
                  {points.map((point, idx) => (
                    <motion.li
                      key={idx}
                      variants={listItem}
                      className="flex items-start"
                    >
                      {/* Animated gradient bullet */}
                      <span
                        className="
                          mt-2 flex-shrink-0 w-3 h-3 rounded-full
                          bg-gradient-to-br from-[#F9CD13] to-[#539241]
                          animate-pulse
                        "
                      />
                      <span className="ml-3">{point}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Closing tagline */}
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                  className="
                    mt-6 text-lg sm:text-xl
                    italic
                    bg-gradient-to-r from-[#539241] to-[#00ADEF]
                    bg-clip-text text-transparent
                  "
                >
                  No extractive finance. Only regenerative systems.
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      {/* <div className="h-[100vh]" /> Spacer */}
    </>
  );
}
