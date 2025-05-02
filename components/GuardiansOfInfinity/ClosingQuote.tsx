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
          <>
            {/* Gradient background overlay */}
            <motion.div
              className="
                fixed inset-0 -z-10
                bg-gradient-to-br
                  from-[#4E2A1E]/50
                  via-[#3A1F0B]/30
                  to-[#D4AF37]/40
              "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {/* Quote container */}
            <motion.div
              className="
                fixed inset-0 z-50
                flex items-center justify-center
                px-6 text-center
                bg-black bg-opacity-30 backdrop-blur-sm
              "
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <motion.blockquote
                variants={quoteVariants}
                className="
                  relative
                  max-w-2xl
                  pl-6
                  border-l-4 border-[#FFE066]
                  italic text-2xl sm:text-3xl
                  text-white/90
                  drop-shadow-lg
                "
              >
                “We don’t lead with power. We lead with presence. Together, we
                carry the{" "}
                <span
                  className="
                    bg-clip-text text-transparent
                    bg-gradient-to-r from-[#FFE066]
                                    via-[#FFE060]
                                    to-[#7B245A]
                  "
                >
                  infinite
                </span>
                .”
              </motion.blockquote>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
