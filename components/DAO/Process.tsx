"use client";

import React, { useRef } from "react";
import { AnimatePresence, motion, Variants, useInView } from "framer-motion";
import InfinityLoop from "@/components/InfinityLoop";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.6 },
  }),
};

export function DaoProcess() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sentinelRef, { amount: 0.5 });

  return (
    <>
      {/* trigger point */}
      <div ref={sentinelRef} className="w-full h-screen" />

      <AnimatePresence>
        {isInView && (
          <motion.div
            key="dao-process-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 w-full h-screen z-50 flex items-center justify-center overflow-hidden"
          >
            {/* Infinity-loop background */}
            <motion.div
              className="fixed inset-0 -z-20 pointer-events-none pb-20 -mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <InfinityLoop />
            </motion.div>

            {/* Gradient Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#4E2A1E]/50 via-[#3A1F0B]/30 to-[#D4AF37]/40 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />

            {/* Content */}
            <motion.section
              className="relative z-20 h-screen flex flex-col items-center justify-center px-6 text-white text-center space-y-8 max-w-3xl mx-auto"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              custom={4}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                How It Works
              </h2>

              <p className="text-xl sm:text-2xl leading-relaxed">
                You explore a project inside the Metaverse. You walk through it.
                You feel it. And then you vote:
              </p>

              <ul className="list-disc list-inside text-xl sm:text-2xl leading-relaxed space-y-4">
                <li>
                  <span className="font-semibold">
                    Should this become real?
                  </span>
                </li>
                <li>
                  <span className="font-semibold">
                    Should this receive funding?
                  </span>
                </li>
                <li>
                  <span className="font-semibold">Do we believe in this?</span>
                </li>
              </ul>

              <p className="text-lg sm:text-xl md:text-2xl leading-relaxed">
                If the community says{" "}
                <span className="text-amber-400 font-semibold">yes</span> – we
                build. If the community says{" "}
                <span className="text-amber-400 font-semibold">no</span> – we
                evolve.
              </p>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
