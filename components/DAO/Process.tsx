// components/DAO/Process.tsx
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

export function DaoProcess() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sentinelRef, { amount: 0.5 });

  return (
    <>
      {/* full-screen spacer to trigger in-view */}
      <div ref={sentinelRef} className="w-full h-screen" />

      <AnimatePresence>
        {isInView && (
          <motion.section
            key="dao-process"
            className="fixed inset-0 h-screen flex flex-col items-center justify-center bg-black text-white z-20 px-6"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            custom={4}
          >
            <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
            <p className="mb-4 text-center max-w-2xl">
              You explore a project inside the Metaverse. You walk through it.
              You feel it. And then you vote:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 max-w-2xl text-center">
              <li>– Should this become real?</li>
              <li>– Should this receive funding?</li>
              <li>– Do we believe in this?</li>
            </ul>
            <p className="text-center max-w-2xl">
              If the community says yes – we build. If the community says no –
              we evolve.
            </p>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
