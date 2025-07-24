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
    <section
      ref={ref}
      className="w-full h-[100vh] relative overflow-hidden bg-black"
    >
      <AnimatePresence>
        {isInView && (
          <motion.div
            key="man-behind-movement-wrapper"
            className="fixed inset-0 flex items-center justify-center px-4 sm:px-6 text-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Glowing corner blobs */}
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
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(14,228,163,1), rgba(14,228,163,0.6), transparent)",
                    filter: "blur(200px)",
                    mixBlendMode: "screen",
                  }}
                />
              </motion.div>
            ))}

            {/* Main content */}
            <div className="relative z-10 max-w-4xl space-y-8">
              <motion.h2
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="
                  text-4xl sm:text-5xl font-extrabold
                  bg-gradient-to-r from-yellow-400 via-yellow-600 to-green-500
                  bg-clip-text text-transparent
                  uppercase tracking-wide leading-tight
                "
              >
                The Man Behind<br />The Movement
              </motion.h2>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="text-lg sm:text-xl text-white/90 font-light leading-relaxed sm:leading-loose drop-shadow-md px-2 sm:px-6"
              >
                I ignited the light of{" "}
                <span className="text-yellow-300 font-semibold">
                  Peace, Love & Harmony
                </span>{" "}
                — but it is the{" "}
                <span className="text-pink-400 font-semibold">
                  Guardians of Infinity
                </span>{" "}
                who make it <span className="text-yellow-200 font-bold">shine</span> and carry it into the world.
                
                My deepest calling is to unite those who choose to live in <br/> harmony with the four{" "}
                <span className="text-green-300 font-semibold">sacred pillars</span> of our world:
                <br />
                <span className="text-white/90">
                  Mother Nature, the animal kingdom, humanity, and conscious technology.
                </span>
                <br />
                Together, we can create a future where these pillars stand in perfect alignment —
                <br/>as a living symphony of{" "}
                <span className="text-blue-300 font-semibold">
                  balance, beauty, and belonging
                </span>.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ManBehindMovement;
