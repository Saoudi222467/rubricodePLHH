"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import InfinityLoop from "@/components/InfinityLoop";

const listContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25, delayChildren: 0.2 },
  },
};

const listItem: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function WhoWeAre() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const lines = [
    "We are not a company.",
    "We are not a logo.",
    "We are not a launch.",
  ];

  return (
    <>
      <section
        ref={ref}
        className="w-full h-[100vh] relative overflow-hidden bg-black"
      >
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="who-we-are"
              className="fixed inset-0 z-50 flex items-center justify-center px-6 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* Pulsing blob */}
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 10, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute z-0 left-[80%] top-32"
              >
                <div
                  className="w-36 h-36 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at center, #FF6B6B, transparent)",
                    filter: "blur(80px)",
                  }}
                />
              </motion.div>

              {/* Background image */}
              <motion.img
                src="/earth-section-bg.png"
                alt="Earth background"
                className="absolute inset-0 w-full h-full object-cover z-10 opacity-70"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              {/* Soft gradient overlay */}
              <motion.div
                className="absolute inset-0"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(255,107,107,0.2), transparent 80%)",
                }}
              />

              {/* Foreground content */}
              <div className="relative z-20 max-w-3xl text-center space-y-8">
                {/* Title */}
                <motion.h2
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                  className="
                    text-4xl sm:text-5xl font-extrabold
                    bg-gradient-to-r from-[#FFD43B] via-[#FFA94D] to-[#FF6B6B]
                    bg-clip-text text-transparent
                    uppercase tracking-wide
                  "
                >
                  Who We Are{" "}
                  <span className="text-[#FFD43B]">(and Aren’t)</span>
                </motion.h2>

                {/* Animated list with gradient text and hover pop */}
                <motion.ul
                  variants={listContainer}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-4 text-left text-lg sm:text-xl"
                >
                  {lines.map((line, i) => (
                    <motion.li
                      key={i}
                      variants={listItem}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start"
                    >
                      <div
                        className="w-4 h-4 mt-1 mr-3 rounded-full animate-pulse flex-shrink-0"
                        style={{
                          background:
                            "linear-gradient(to bottom right, #FF6B6B, #F06595)",
                        }}
                      />
                      <span
                        className="
                          bg-gradient-to-r from-[#FF6B6B] via-[#F06595] to-[#FF8787]
                          bg-clip-text text-transparent
                          font-semibold
                          hover:underline
                        "
                      >
                        {line}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Tagline: bold white with glow */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                  className="mt-6 text-lg sm:text-xl font-bold text-white"
                  style={{ textShadow: "0 0 12px rgba(255,255,255,0.9)" }}
                >
                  We are a field where humans, intelligence & earth co-create
                  the future.
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spacer */}
        <div className="h-[100vh]" />
      </section>
    </>
  );
}
