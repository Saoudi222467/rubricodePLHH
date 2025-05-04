// components/DAO/Hero.tsx
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

export function DaoHero() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  // when the sentinel (full-screen div) is at least 50% in view…
  const isInView = useInView(sentinelRef, { amount: 0.5 });

  return (
    <>
      {/* occupies one viewport height to trigger `isInView` */}
      <div ref={sentinelRef} className="w-full h-screen" />

      <AnimatePresence>
        {isInView && (
          <motion.section
            key="dao-hero"
            className="fixed inset-0 h-screen flex items-center justify-center bg-black text-white z-20"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            custom={1}
          >
            <h1 className="text-5xl font-bold">
              🗳 DAO – THE SOUL OF OUR SYSTEM
            </h1>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
