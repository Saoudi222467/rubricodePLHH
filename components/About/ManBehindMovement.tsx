"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";

const blobVariants: Variants = {
  visible: {
    scale: [1, 1.3, 1],
    opacity: [1, 0.7, 1],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  exit: {
    scale: 4,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const ManBehindMovement = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <>
      <section
        ref={ref}
        className="w-full h-[100vh] relative overflow-hidden bg-black"
      >
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="man-behind-movement-wrapper"
              className="fixed inset-0 flex items-center justify-center px-6 text-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {/* Corner blobs with increased size and spread */}
              {[
                "top-0 left-0",
                "top-0 right-0",
                "bottom-0 left-0",
                "bottom-0 right-0",
              ].map((pos) => (
                <motion.div
                  key={pos}
                  variants={blobVariants}
                  initial="visible"
                  animate="visible"
                  exit="exit"
                  className={`absolute ${pos} w-80 h-80 pointer-events-none`}
                  style={{ willChange: "transform, opacity" }}
                >
                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(14,228,163,1), rgba(14,228,163,0.6), transparent)",
                      filter: "blur(200px)",
                      mixBlendMode: "screen",
                      transform: "translateZ(0)",
                    }}
                  />
                </motion.div>
              ))}

              {/* Main content */}
              <div className="relative z-10 max-w-3xl space-y-8">
                <motion.h2
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="
                    text-4xl sm:text-5xl font-extrabold
                    bg-gradient-to-r from-[#F9CD13] via-[#A67C00] to-[#539241]
                    bg-clip-text text-transparent
                    uppercase tracking-wide
                  "
                >
                  The Man Behind the Movement
                </motion.h2>

                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="text-lg sm:text-xl text-white/90 leading-relaxed italic drop-shadow-md"
                  style={{ textShadow: "0 2px 6px rgba(0,0,0,0.7)" }}
                >
                  Behind it all is a man who came from nothing, lived every
                  height and fall, met the dark, and chose to build something{" "}
                  <span className="bg-gradient-to-r from-[#FF6B6B] to-[#F06595] bg-clip-text text-transparent font-extrabold">
                    beautiful
                  </span>{" "}
                  for everyone. No one gets left behind. Everyone gets to come
                  home.
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spacer */}
        {/* <div className="h-[100vh]" /> */}
      </section>
    </>
  );
};

export default ManBehindMovement;
