// components/DAO/Rationale.tsx
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

export function DaoRationale() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sentinelRef, { amount: 0.5 });

  return (
    <>
      {/* spacer to trigger when this section comes into view */}
      <div ref={sentinelRef} className="w-full h-screen" />

      <AnimatePresence>
        {isInView && (
          <motion.section
            key="dao-rationale"
            className="fixed inset-0 h-screen flex flex-col items-center justify-center bg-black text-white z-20 px-6"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            custom={5}
          >
            <h2 className="text-3xl font-semibold mb-4">
              Why We Do It This Way
            </h2>
            <p className="mb-4 text-center max-w-2xl">
              And why do we do it this way? Because we don’t believe in top-down
              change.
            </p>
            <p className="text-center max-w-2xl">
              Because the only way to build something for the people – is to let
              the people build it themselves.
            </p>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
