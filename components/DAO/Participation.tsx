// components/DAO/Participation.tsx
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

export function DaoParticipation() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sentinelRef, { amount: 0.5 });

  return (
    <>
      {/* full-screen spacer to trigger in-view */}
      <div ref={sentinelRef} className="w-full h-screen" />

      <AnimatePresence>
        {isInView && (
          <motion.section
            key="dao-participation"
            className="fixed inset-0 h-screen flex flex-col items-center justify-center bg-black text-white z-20 px-6"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            custom={6}
          >
            <h2 className="text-3xl font-semibold mb-4">
              Participation & Ownership
            </h2>
            <p className="mb-4 text-center max-w-2xl">
              Our Metaverse is the space. The DAO is the engine. And the token
              is the voice.
            </p>
            <p className="mb-4 text-center max-w-2xl">
              This is participation without borders. Ownership without
              permission. Democracy without dilution.
            </p>
            <p className="text-center max-w-2xl">
              You don’t just invest money. You invest your vote. You invest your
              energy. You invest your presence.
            </p>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
