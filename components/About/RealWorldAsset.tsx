"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";

const RealWorldAsset = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const words = ["Soil", "Water", "Trees", "Life"];

  // stagger each word into view, 0.5s apart, sliding up from below (y: 50px)
  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.5, duration: 0.6, ease: "easeOut" },
    }),
  };

  const colors: Record<string, string> = {
    Soil: "#A67C00",
    Water: "#00ADEF",
    Trees: "#539241",
    Life: "#F9CD13",
  };

  return (
    <>
      <section ref={ref} className="w-full h-[100vh] relative overflow-hidden">
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="real-world-asset-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="
                fixed inset-0
                bg-black text-white z-50
                flex flex-col items-center justify-center
                px-6 text-center overflow-hidden
              "
            >
              {/* Words appear one by one, sliding up from below, always colored & glowing */}
              <div className="relative z-10 flex flex-col items-center space-y-6">
                {words.map((word, i) => (
                  <motion.div
                    key={word}
                    custom={i}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl sm:text-6xl font-bold"
                    style={{
                      color: colors[word],
                      textShadow: `0 0 8px ${colors[word]}, 0 0 16px ${colors[word]}`,
                    }}
                  >
                    {word}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      {/* Spacer to allow scrolling */}
      {/* <div className="h-[100vh]" /> */}
    </>
  );
};

export default RealWorldAsset;
