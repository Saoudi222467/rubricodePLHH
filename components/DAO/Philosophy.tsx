// components/DAO/Philosophy.tsx
"use client";

import React, { useRef } from "react";
import { AnimatePresence, motion, Variants, useInView } from "framer-motion";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.6 },
  }),
};

export function DaoPhilosophy() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sentinelRef, { amount: 0.5 });

  return (
    <>
      {/* trigger scroll point */}
      <div ref={sentinelRef} className="w-full h-screen" />

      <AnimatePresence>
        {isInView && (
          <motion.div
            key="dao-philosophy-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 w-full h-screen z-50"
          >
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
              custom={2}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Our Philosophy
              </h2>
              <p className="text-xl sm:text-2xl leading-relaxed mb-4">
                We don’t believe in central power. We believe in collective{" "}
                <span className="text-amber-400 font-semibold">
                  responsibility
                </span>
                . That’s why we didn’t build this as a corporation. We built it
                as a DAO – a Decentralized Autonomous Organization.
              </p>
              <p className="text-lg sm:text-xl md:text-2xl leading-relaxed">
                Not because it’s trendy. But because it’s true to our{" "}
                <span className="text-amber-400 font-semibold">vision</span>.
              </p>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
