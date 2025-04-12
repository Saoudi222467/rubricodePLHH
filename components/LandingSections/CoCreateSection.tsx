"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function CoCreateSection() {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress over this section.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Smooth the scroll progress.
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Overall pinned content opacity:
  //  - 0% to 5%: fade in from 0 to 1,
  //  - 5% to 95%: full opacity,
  //  - 95% to 100%: fade out to 0.
  const contentOpacity = useTransform(
    smoothScrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0]
  );

  // Background image fades in from 5% to 15% scroll progress.
  const bgOpacity = useTransform(smoothScrollYProgress, [0.05, 0.15], [0, 1]);

  // Left text: slides in from x=-200 to x=0 and fades in from 20% to 30%.
  const leftTextOpacity = useTransform(smoothScrollYProgress, [0.2, 0.3], [0, 1]);
  const leftTextX = useTransform(smoothScrollYProgress, [0.2, 0.3], [-200, 0]);

  // Right text: slides in from x=300 to x=0 and fades in from 30% to 40%.
  const rightTextOpacity = useTransform(smoothScrollYProgress, [0.3, 0.4], [0, 1]);
  const rightTextX = useTransform(smoothScrollYProgress, [0.3, 0.4], [300, 0]);

  return (
    <section
      ref={ref}
      id="co-create-section"
      className="relative w-full h-[200vh] overflow-hidden font-montserrat bg-cover bg-center"
    >
      {/* Fixed container to pin content only during this section's active scroll */}
      <div className="fixed inset-0">
        <motion.div style={{ opacity: contentOpacity }} className="relative h-full w-full">
          {/* Background image with its own fade-in animation */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/assets/images/landing/CoCreate.jpg')",
              opacity: bgOpacity,
            }}
          />
          {/* Optional dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 z-0" />

          {/* Content container */}
          <div className="relative z-10 w-full h-full">
            {/* Left text: appears with left-to-right slide */}
            <motion.div
              style={{ opacity: leftTextOpacity, x: leftTextX }}
              className="absolute top-40 left-10 text-5xl font-bold text-white glowing-text w-72"
            >
              You are not here to <span className="text-landing-bright glowing-text">Follow.</span>
            </motion.div>

            {/* Right text: appears with right-to-left slide */}
            <motion.div
              style={{ opacity: rightTextOpacity, x: rightTextX }}
              className="absolute top-40 right-10 text-5xl font-bold text-white glowing-text w-96 text-right"
            >
              You are here to <span className="text-landing-bright glowing-text">co-create.</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
