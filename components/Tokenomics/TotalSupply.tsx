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

  // Motion value for count-up
  const count = useMotionValue(0);
  const formatted = useTransform(count, (latest) =>
    Math.floor(latest).toLocaleString()
  );
  const [displayCount, setDisplayCount] = useState("0");

  useEffect(() => {
    let controls: any;
    if (isInView) {
      // animate from 0 to 1,000,000,000 over 2 seconds
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
      className="w-full h-screen relative bg-black overflow-hidden"
    >
      <AnimatePresence>
        {isInView && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {/* Title */}
            <motion.h1
              variants={titleVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug text-white drop-shadow-2xl max-w-3xl"
            >
              TOKENOMICS – THE SACRED STRUCTURE OF
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9CD13] to-[#539241]">
                PEACE, LOVE &amp; HARMONY
              </span>
            </motion.h1>

            {/* Coin Image */}
            <motion.img
              variants={imageVariants}
              src="/assets/images/landing/coin.png"
              alt="Peace Love & Harmony Coin"
              className="mt-8 w-36 sm:w-44 md:w-52 lg:w-60 drop-shadow-2xl"
            />

            {/* Animated Total Supply */}
            <motion.h2
              variants={subtitleVariants}
              className="mt-10 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-white flex items-center space-x-4"
            >
              <span className="text-3xl sm:text-4xl">🔝</span>
              <span>Total Supply:</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F9CD13] to-[#A67C00]">
                {displayCount}
              </span>
              <span className="font-medium text-gray-400 text-lg">
                (1B Tokens)
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={descVariants}
              className="mt-6 max-w-2xl text-base sm:text-lg text-gray-300 italic leading-relaxed border-l-4 border-[#F9CD13] pl-4"
            >
              Not chosen by chance — chosen to hold the full field of
              possibilities.
              <br />
              And here’s how we activate that energy:
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll spacer */}
      <div className="h-[100vh]" />
    </section>
  );
}
