"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";

const blobVariants: Variants = {
  visible: {
    scale: [1, 1.3, 1],
    opacity: [1, 0.7, 1],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
  exit: {
    scale: 4,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const listContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3 },
  },
};

const listItem: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function CoreChoices() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const choices = [
    { key: "Peace", desc: "because nothing grows in chaos." },
    { key: "Love", desc: "because connection is the root of value." },
    { key: "Harmony", desc: "because structure without soul breaks." },
  ];

  return (
    <section ref={ref} className="relative w-full h-screen">
      <AnimatePresence>
        {isInView && (
          <motion.div
            key="core-choices-overlay"
            className="fixed inset-0 w-full h-screen overflow-hidden bg-black z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Corner blobs */}
            {[
              "top-0 left-0",
              "top-0 right-0",
              "bottom-0 left-0",
              "bottom-0 right-0",
            ].map((pos) => (
              <motion.div
                key={pos}
                className={`absolute ${pos} w-64 h-64 pointer-events-none`}
                initial="visible"
                animate="visible"
                exit="exit"
                variants={blobVariants}
                style={{ willChange: "transform, opacity" }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,217,0,1), transparent)",
                    filter: "blur(150px)",
                    mixBlendMode: "screen",
                    transform: "translateZ(0)",
                  }}
                />
              </motion.div>
            ))}

            {/* Center content */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <motion.h2
                className="
                  text-5xl sm:text-6xl font-extrabold uppercase tracking-wider
                  bg-gradient-to-r from-[#F9CD13] via-[#A67C00] to-[#539241]
                  bg-clip-text text-transparent drop-shadow-lg
                "
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Our Core Choices
              </motion.h2>

              <motion.ul
                className="mt-6 flex flex-col gap-6 max-w-xl"
                variants={listContainer}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {choices.map(({ key, desc }, idx) => (
                  <motion.li
                    key={idx}
                    variants={listItem}
                    className="flex items-start space-x-4"
                  >
                    <span
                      className="mt-1 w-5 h-5 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, #F9CD13, #A67C00)`,
                      }}
                    />
                    <div className="text-left">
                      <span className="font-bold text-xl sm:text-2xl text-white">
                        {key}
                      </span>{" "}
                      <span className="text-white/80 text-lg sm:text-xl">
                        — {desc}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.p
                className="mt-8 text-2xl sm:text-3xl italic text-white/90 max-w-lg drop-shadow-md"
                initial={{ y: 40, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{ y: 40, opacity: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: choices.length * 0.3 + 0.2,
                }}
              >
                We didn’t build a product.{" "}
                <span className="font-bold bg-gradient-to-r from-[#A67C00] to-[#539241] bg-clip-text text-transparent">
                  We built a field
                </span>{" "}
                – a living system.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
