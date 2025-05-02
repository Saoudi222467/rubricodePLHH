"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";

export default function ClosingQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.25, when: "beforeChildren" } },
    exit: { transition: { staggerChildren: 0.1, when: "afterChildren" } },
  };

  const quoteVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut" } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  return (
    <section ref={ref} className="w-full h-screen relative overflow-hidden">
      <AnimatePresence>
        {isInView && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <motion.blockquote
              variants={quoteVariants}
              className="italic text-xl text-gray-300 max-w-2xl drop-shadow-lg"
            >
              “We don’t lead with power. We lead with presence. Together, we
              carry the infinite.”
            </motion.blockquote>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optional scroll spacer */}
      {/* <div className="h-[100vh]" /> */}
    </section>
  );
}
