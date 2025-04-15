"use client";
import React, { useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

const COLOR_ONE = "#D9D9D980";
const COLOR_TWO = "#CB6D5180";
const COLOR_THREE = "#539241A1";
const COLOR_FOUR = "#A67C0080";

const gradientVariants = {
  initial: {
    "--stop-start": "45%",
    "--stop-end": "55%",
    margin: "0 -2rem",
  },
  hovered: {
    "--stop-start": "40%",
    "--stop-end": "60%",
    margin: "0 -5rem",
  },
};

const CoinSection = ({ isMobile }: { isMobile: boolean }) => {
  const [localHover, setLocalHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const animated = (val: any, fallback: any) => (isMobile ? fallback : val);

  const contentOpacity = useTransform(smoothScrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  const hovered = isMobile ? true : localHover;

  return (
    <section
      ref={ref}
      className={`w-full ${isMobile ? "py-24" : "h-[200vh] snap-start"} bg-black text-white no-scrollbar`}
    >
      <div className={`${isMobile ? "" : "fixed inset-0"}`}>
        <motion.div
          style={{ opacity: animated(contentOpacity, 1) }}
          className={`relative h-full w-full ${isMobile ? "pt-20 pb-24" : ""}`}
        >
          {/* Background gradients */}
          <motion.div className="absolute inset-0" style={{ opacity: isMobile ? 0.3 : 1 }}>
            <div className="flex items-stretch h-full w-full">
              {[COLOR_ONE, COLOR_TWO, COLOR_THREE, COLOR_FOUR].map((color, index) => (
                <motion.div
                  key={index}
                  className="flex-1"
                  variants={gradientVariants}
                  animate={hovered ? "hovered" : "initial"}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${color} var(--stop-start), ${color} var(--stop-end), transparent 100%)`,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black backdrop-blur-lg"
            animate={{ opacity: hovered ? 0.1 : 0.6 }}
            transition={{ duration: 0.5 }}
            style={{ zIndex: 10 }}
          />

          {/* Content */}
          <div
            className={`relative flex flex-col items-center justify-center h-full font-montserrat font-bold text-5xl ${
              hovered ? "glowing-text" : ""
            }`}
            style={{ zIndex: 20 }}
          >
            <h1 className="text-white mb-12 transition-all shadow-sm text-center px-4">
              Foundation is not{" "}
              <span className="text-landing-bright glowing-text">Control.</span>
            </h1>

            <motion.div
              onHoverStart={() => setLocalHover(true)}
              onHoverEnd={() => setLocalHover(false)}
              whileHover={!isMobile ? { scale: 1.1 } : {}}
              className="w-80 h-80 flex items-center justify-center relative cursor-pointer overflow-hidden"
            >
              <motion.div
                animate={{ filter: hovered ? "brightness(1)" : "brightness(0.5)" }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <Image
                  src="/assets/images/landing/coin.png"
                  width={200}
                  height={200}
                  alt="coin"
                  layout="intrinsic"
                  className="w-full"
                />
              </motion.div>
            </motion.div>

            <h1 className="text-white mt-12 transition-all text-center px-4">
              Foundation is{" "}
              <span className="text-landing-bright glowing-text">flow.</span>
            </h1>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoinSection;
