// components/DAO/CTA.tsx
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

export function DaoCTA() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sentinelRef, { amount: 0.5 });

  return (
    <>
      {/* full-screen spacer to trigger in-view */}
      <div ref={sentinelRef} className="w-full h-screen" />

      <AnimatePresence>
        {isInView && (
          <motion.section
            key="dao-cta"
            className="fixed inset-0 h-screen flex flex-col items-center justify-center bg-black text-white z-20 px-6 text-center"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            custom={7}
          >
            <h2 className="text-3xl font-semibold mb-4">Join the Revolution</h2>
            <p className="mb-4">
              And when it works – it’s not because of one mind. It’s because of
              the many who showed up, spoke up, and stood together.
            </p>
            <p className="mb-4">
              This is why we built a DAO. This is why the token exists. This is
              why the Metaverse matters. This is why Peace, Love & Harmony
              lives.
            </p>
            <p className="italic">Because together is the only way.</p>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
