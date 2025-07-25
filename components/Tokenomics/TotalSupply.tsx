"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  Variants,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

export default function TotalSupply() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const count = useMotionValue(0);
  const [displayCount, setDisplayCount] = useState("0");

  useEffect(() => {
    let controls: any;
    if (isInView) {
      controls = animate(count, 1_000_000_000, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => {
          setDisplayCount(Math.floor(v).toLocaleString());
        },
      });
    }
    return () => controls && controls.stop();
  }, [isInView, count]);

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.3, when: "beforeChildren" } },
    exit: { transition: { staggerChildren: 0.1, when: "afterChildren" } },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, rotate: -10, scale: 0.8 },
    show: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 200 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } },
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
  };

  const descVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut" } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.4 } },
  };

  return (
    <section
      ref={ref}
      className="w-full h-screen relative bg-black overflow-hidden flex items-center justify-center"
    >
      <AnimatePresence>
        {isInView && (
          <motion.div
            className="text-center px-6 z-50 max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <motion.h1
              variants={titleVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-2xl"
            >
              TOKENOMICS
              <br />
              <span className="text-lg sm:text-xl font-medium text-gray-300 block mt-1">
                The Sacred Structure of
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9CD13] to-[#539241]">
                PEACE, LOVE &amp; HARMONY
              </span>
            </motion.h1>

            <motion.img
              variants={imageVariants}
              src="/assets/images/landing/coin.png"
              alt="Peace Love & Harmony Coin"
              className="mx-auto mt-10 w-36 sm:w-44 md:w-52 lg:w-60 drop-shadow-2xl"
            />

            <motion.h2
              variants={subtitleVariants}
              className="mt-10 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white flex items-center justify-center gap-3"
            >
              <span>🔝</span>
              <span>Total Supply:</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F9CD13] to-[#A67C00]">
                {displayCount}
              </span>
              <span className="text-gray-400 text-lg font-medium">
                (1B Tokens)
              </span>
            </motion.h2>

            <motion.p
              variants={descVariants}
              className="mt-6 text-gray-300 italic leading-relaxed border-l-4 border-[#F9CD13] pl-5 text-base sm:text-lg"
            >
              Carefully crafted — not by chance — but to embrace infinite
              possibility.<br />
              Here's how we channel that energy into purpose.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
