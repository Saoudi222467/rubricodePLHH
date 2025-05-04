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
      {/* spacer to trigger when this section comes into view */}
      <div ref={sentinelRef} className="w-full h-screen" />

      <AnimatePresence>
        {isInView && (
          <motion.div
            key="dao-cta-wrapper"
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
              custom={7}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
                Join the Revolution
              </h2>

              <p className="text-xl sm:text-2xl leading-relaxed">
                And when it works – it’s not because of{" "}
                <span className="text-amber-400 font-semibold">one mind</span>.
                It’s because of the{" "}
                <span className="text-amber-400 font-semibold">many</span> who
                showed up, spoke up, and stood{" "}
                <span className="text-amber-400 font-semibold">together</span>.
              </p>

              <p className="text-xl sm:text-2xl leading-relaxed">
                This is why we built a{" "}
                <span className="text-amber-400 font-semibold">DAO</span>. This
                is why the{" "}
                <span className="text-amber-400 font-semibold">token</span>{" "}
                exists. This is why the{" "}
                <span className="text-amber-400 font-semibold">Metaverse</span>{" "}
                matters. This is why{" "}
                <span className="text-amber-400 font-semibold">
                  Peace, Love & Harmony
                </span>{" "}
                lives.
              </p>

              <p className="italic text-lg sm:text-xl md:text-2xl">
                Because{" "}
                <span className="text-amber-400 font-semibold">together</span>{" "}
                is the only way.
              </p>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
