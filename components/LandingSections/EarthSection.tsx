"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function EarthSection({ isMobile }: { isMobile: boolean }) {
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

  const contentOpacity = useTransform(smoothScrollYProgress, [0.95, 1], [1, 0]);
  const bgOpacity = useTransform(smoothScrollYProgress, [0, 0.1], [0, isMobile ? 0.4 : 1]);

  const text1Opacity = useTransform(smoothScrollYProgress, [0.1, 0.2], [0, 1]);
  const text2Opacity = useTransform(smoothScrollYProgress, [0.2, 0.3], [0, 1]);
  const text3Opacity = useTransform(smoothScrollYProgress, [0.3, 0.4], [0, 1]);

  const text1Y = useTransform(smoothScrollYProgress, [0.1, 0.2], [20, 0]);
  const text2Y = useTransform(smoothScrollYProgress, [0.2, 0.3], [20, 0]);
  const text3Y = useTransform(smoothScrollYProgress, [0.3, 0.4], [40, 0]);

  return (
    <section
      ref={ref}
      id="text-section"
      className={`w-full ${isMobile ? "py-24 min-h-[600px]" : "h-[200vh] snap-start"} bg-black text-white no-scrollbar`}
    >
      <div className={`${isMobile ? "" : "fixed inset-0"}`}>
        <motion.div style={{ opacity: animated(contentOpacity, 1) }} className="relative h-full w-full">
          {/* Background image */}
          <motion.div
            className={`absolute inset-0 bg-cover bg-center ${isMobile ? "min-h-[600px]" : ""}`}
            style={{
              backgroundImage: "url('/images/bghero2.jpeg')",
              opacity: animated(bgOpacity, 1),
            }}
          />

          {/* Text container */}
          <div
            className={`relative z-10 flex flex-col items-center space-y-8 px-4 ${
              isMobile ? "min-h-[600px] justify-center" : "h-full justify-center"
            }`}
          >
            <motion.div
              style={{ opacity: animated(text1Opacity, 1), y: animated(text1Y, 0) }}
              className="text-white text-4xl font-bold text-center"
            >
              The Earth is Alive.
            </motion.div>
            <motion.div
              style={{ opacity: animated(text2Opacity, 1), y: animated(text2Y, 0) }}
              className="text-white text-4xl font-bold text-center"
            >
              Every Garden is a Seed.
            </motion.div>
            <motion.div
              style={{ opacity: animated(text3Opacity, 1), y: animated(text3Y, 0) }}
              className="text-white text-4xl font-bold text-center"
            >
              Every seed is a promise.
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
