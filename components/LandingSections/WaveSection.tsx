"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function WaveSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Overall fade out once scrolling out of section (like InitialSection)
  const contentOpacity = useTransform(smoothScrollYProgress, [0.95, 1], [1, 0]);

  // Sequential animations for the elements:
  // Wave (line) fades in first, then orb1, orb2, orb3 (with a slight upward slide)
  const waveLineOpacity = useTransform(smoothScrollYProgress, [0, 0.1], [0, 1]);
  const orb1Opacity = useTransform(smoothScrollYProgress, [0.1, 0.2], [0, 1]);
  const orb2Opacity = useTransform(smoothScrollYProgress, [0.2, 0.3], [0, 1]);
  const orb3Opacity = useTransform(smoothScrollYProgress, [0.3, 0.4], [0, 1]);

  const orb1Y = useTransform(smoothScrollYProgress, [0.1, 0.2], [50, 0]);
  const orb2Y = useTransform(smoothScrollYProgress, [0.2, 0.3], [50, 0]);
  const orb3Y = useTransform(smoothScrollYProgress, [0.3, 0.4], [50, 0]);

  return (
    <section
      ref={ref}
      id="wave-section"
      className="relative h-[200vh] w-full overflow-hidden snap-start"
    >
      {/* Pinned container: content remains fixed as we scroll */}
      <div className="fixed inset-0">
        <motion.div style={{ opacity: contentOpacity }} className="relative h-full w-full">
          {/* --- Background Wave (Line) --- */}
          <div className="wave-container absolute inset-0 pointer-events-none">
            <svg
              width="1915"
              height="634"
              viewBox="0 0 1915 634"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              className="w-full"
            >
              <g filter="url(#filter0_f_276_1564)">
                <motion.path
                  d="M-88 12.5C226 81.5 527 662.5 981 618.5C1548.5 563.5 1521 194 1959 125.5"
                  stroke="var(--landing)"
                  strokeWidth="9"
                  style={{ opacity: waveLineOpacity }}
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_276_1564"
                  x="-96.7648"
                  y="0.30498"
                  width="2064.26"
                  height="632.871"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur stdDeviation="3.9" result="effect1_foregroundBlur_276_1564" />
                </filter>
              </defs>
            </svg>
          </div>

          {/* --- Orbs & Texts (positions remain unchanged) --- */}
          <div className="orb-container-wrapper w-full relative flex justify-evenly sm:translate-y-[70%] flex-wrap sm:flex-nowrap gap-12 translate-y-[0%] flex-col sm:flex-row">
            {/* Orb 1 */}
            <motion.div
              style={{ opacity: orb1Opacity, y: orb1Y }}
              className="relative flex flex-col items-center"
            >
              <motion.div
                className="absolute w-40 h-40 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, #024242, transparent 70%, #024242)",
                }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="w-40 h-40 rounded-full shadow-lg"
                style={{
                  background:
                    "radial-gradient(circle, #001B1B 0%, transparent 10%, transparent 50%, #024242 100%)",
                }}
              />
              <p className="mt-2 text-white text-4xl font-bold w-64 text-center glowing-text font-montserrat">
                Technology with <span className="text-cyan-400 glowing-text">Soul.</span>
              </p>
            </motion.div>

            {/* Orb 2 */}
            <motion.div
              style={{ opacity: orb2Opacity, y: orb2Y }}
              className="relative flex flex-col items-center top-64"
            >
              <p className="mb-2 sm:mt-2 text-white text-4xl font-bold w-64 text-center glowing-text font-montserrat">
                Nature with <span className="text-green-300 glowing-text">Purpose.</span>
              </p>
              <motion.div
                className="absolute w-40 h-40 rounded-full pointer-events-none bottom-0"
                style={{
                  background: "radial-gradient(circle, #003D20, transparent 70%, #003D20)",
                }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="w-40 h-40 rounded-full shadow-lg"
                style={{
                  background:
                    "radial-gradient(circle, #003D20 0%, transparent 10%, transparent 50%, #004A26 100%)",
                }}
              />
            </motion.div>

            {/* Orb 3 */}
            <motion.div
              style={{ opacity: orb3Opacity, y: orb3Y }}
              className="relative flex flex-col items-center"
            >
              <motion.div
                className="absolute w-40 h-40 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, #9C4003, transparent 70%, #9C4003)",
                }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="w-40 h-40 rounded-full shadow-lg"
                style={{
                  background:
                    "radial-gradient(circle, #9C4003 0%, transparent 10%, transparent 50%, #9C4003 100%)",
                }}
              />
              <p className="mt-2 text-white glowing-text text-4xl font-bold w-64 text-center font-montserrat">
                Humanity with <span className="text-orange-300 glowing-text">Vision.</span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
