// components/DAO/Definition.tsx
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

export function DaoDefinition() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sentinelRef, { amount: 0.5 });

  return (
    <>
      {/* full-screen spacer to trigger in-view */}
      <div ref={sentinelRef} className="w-full h-screen" />

      <AnimatePresence>
        {isInView && (
          <motion.section
            key="dao-definition"
            className="fixed inset-0 h-screen flex flex-col items-center justify-center bg-black text-white z-20 px-6"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            custom={3}
          >
            <h2 className="text-3xl font-semibold mb-4">What Is a DAO?</h2>
            <p className="mb-4 text-center max-w-2xl">
              DAO means: no one rules. DAO means: everyone decides.
            </p>
            <p className="mb-4 text-center max-w-2xl">
              Every person, in every country, in every time zone – has the same
              voice. The same vote. The same power.
            </p>
            <p className="text-center max-w-2xl">
              No project can move forward unless the community says yes. Not by
              a founder. Not by a council. Not by a whale. Only by us – the
              collective.
            </p>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
