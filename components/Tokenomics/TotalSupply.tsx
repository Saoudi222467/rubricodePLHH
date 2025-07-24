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
    hidden: { opacity: 0, scale: 0.9 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.4 } },
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
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-2xl max-w-4xl"
            >
              The Core Energy Behind Our Mission
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9CD13] to-[#539241]">
                Total Token Supply
              </span>
            </motion.h1>

            {/* Coin Image */}
            <motion.img
              variants={imageVariants}
              src="/assets/images/landing/coin.png"
              alt="Peace Love & Harmony Coin"
              className="mt-10 w-40 sm:w-48 md:w-56 drop-shadow-2xl"
            />

            {/* Animated Supply */}
            <motion.h2
              variants={subtitleVariants}
              className="mt-10 text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-white flex items-center gap-3"
            >
              <span className="text-4xl">🌍</span>
              <span>Circulating:</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F9CD13] to-[#A67C00]">
                {displayCount}
              </span>
              <span className="text-gray-400 text-lg">(1 Billion Tokens)</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={descVariants}
              className="mt-6 max-w-xl text-base sm:text-lg text-gray-300 italic leading-relaxed border-l-4 border-[#F9CD13] pl-4"
            >
              A sacred number chosen with intention — fueling every act of unity,
              truth, and transformation within our ecosystem. <br /> More than
              supply, it’s a symbol of balance.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
