"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function EarthSection() {
  const ref = useRef<HTMLDivElement>(null);

  // Get scroll progress relative to this section.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Smooth the scroll progress.
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Fade out the entire pinned container near the end of the section,
  // matching the behavior of InitialSection (fading from 95% to 100% scroll).
  const contentOpacity = useTransform(smoothScrollYProgress, [0.95, 1], [1, 0]);

  // Sequential fade-ins (and slight upward motion) for the background and text.
  const bgOpacity = useTransform(smoothScrollYProgress, [0, 0.1], [0, 1]);
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
      className="relative h-[200vh] w-full snap-start"
    >
      {/* Pinned container to hold the content during scrolling */}
      <div className="fixed inset-0">
        <motion.div style={{ opacity: contentOpacity }} className="relative h-full w-full">
          {/* Background image with sequential fade-in */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/bghero2.jpeg')",
              opacity: bgOpacity,
            }}
          />

          {/* Sequential text content */}
          <div className="relative z-10 flex flex-col justify-center items-center h-full">
            <motion.div
              style={{ opacity: text1Opacity, y: text1Y }}
              className="mb-8 text-white text-4xl font-bold"
            >
              The Earth is Alive.
            </motion.div>
            <motion.div
              style={{ opacity: text2Opacity, y: text2Y }}
              className="mb-8 text-white text-4xl font-bold"
            >
              Every Garden is a Seed.
            </motion.div>
            <motion.div
              style={{ opacity: text3Opacity, y: text3Y }}
              className="text-white text-4xl font-bold"
            >
              Every seed is a promise.
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
