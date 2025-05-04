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
          <motion.section
            key="dao-philosophy"
            className="fixed inset-0 h-screen flex flex-col items-center justify-center bg-black text-white z-20 px-6"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            custom={2}
          >
            <h2 className="text-3xl font-semibold mb-4">Our Philosophy</h2>
            <p className="mb-4 text-center max-w-2xl">
              We don’t believe in central power. We believe in collective
              responsibility. That’s why we didn’t build this as a corporation.
              We built it as a DAO – a Decentralized Autonomous Organization.
            </p>
            <p className="text-center max-w-2xl">
              Not because it’s trendy. But because it’s true to our vision.
            </p>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
