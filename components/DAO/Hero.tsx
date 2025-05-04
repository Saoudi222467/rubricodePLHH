// components/DAO/Hero.tsx
"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

export function DaoHero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <>
      {/* full-screen trigger */}
      <section ref={ref} className="w-full h-[100vh] relative overflow-hidden">
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="dao-hero-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-full h-[100vh] z-50"
            >
              {/* Background Image with Zoom-In Animation */}
              <motion.img
                src="/assets/images/landing/DAOHero.jpg"
                alt="DAO Hero Background"
                className="absolute inset-0 w-full h-full object-cover z-0"
                animate={{ scale: [1, 1.2] }}
                transition={{
                  duration: 10,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              {/* Gradient Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#4E2A1E]/50 via-[#3A1F0B]/30 to-[#D4AF37]/40 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              />

              {/* Text Content */}
              <div className="relative z-20 w-full h-full flex flex-col justify-center items-center text-center px-4 sm:px-10 md:px-16 py-10">
                <motion.h1
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-white font-bold text-4xl sm:text-5xl md:text-6xl leading-tight"
                >
                  <span className="text-amber-400">DAO</span> – THE SOUL OF OUR{" "}
                  <span className="text-amber-400">SYSTEM</span>
                </motion.h1>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* spacer to allow scroll-away */}
      <div className="h-[100vh]" />
    </>
  );
}
