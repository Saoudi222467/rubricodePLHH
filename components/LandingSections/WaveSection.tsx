"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function WaveSection({ isMobile }: { isMobile: boolean }) {
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
      className={`relative w-full overflow-hidden ${
        isMobile ? "py-24" : "h-[200vh] snap-start"
      } bg-black text-white no-scrollbar`}
    >
      <div className={`${isMobile ? "" : "fixed inset-0"}`}>
        <motion.div
          style={{ opacity: animated(contentOpacity, 1) }}
          className="relative h-full w-full"
        >
          {/* Background wave line with controlled opacity */}
          <motion.div
            className="wave-container absolute inset-0 pointer-events-none"
            style={{ opacity: animated(waveLineOpacity, 0) }}
          >
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
                  style={{ opacity: animated(waveLineOpacity, 1) }}
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
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="3.9"
                    result="effect1_foregroundBlur_276_1564"
                  />
                </filter>
              </defs>
            </svg>
          </motion.div>

          <div
            className={`orb-container-wrapper w-full relative flex ${
              isMobile
                ? "flex-col items-center gap-y-20 pt-12"
                : "flex-row justify-evenly sm:translate-y-[70%] gap-12"
            }`}
          >
            {/* Orb 1 */}
            <motion.div
              style={{
                opacity: animated(orb1Opacity, 1),
                y: animated(orb1Y, 0),
              }}
              className="relative flex flex-col items-center"
            >
              <p className="mb-2 text-white text-4xl font-bold w-64 text-center glowing-text font-montserrat">
                Technology with{" "}
                <span className="text-cyan-400 glowing-text">Soul.</span>
              </p>
              <motion.div
                className="absolute w-40 h-40 rounded-full pointer-events-none bottom-0"
                style={{
                  background:
                    "radial-gradient(circle, #024242, transparent 70%, #024242)",
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
            </motion.div>

            {/* Orb 2 */}
            <motion.div
              style={{
                opacity: animated(orb2Opacity, 1),
                y: animated(orb2Y, 0),
              }}
              className={`relative flex flex-col items-center ${!isMobile && 'top-60'}`}
            >
              <p className="mb-2 text-white text-4xl font-bold w-64 text-center glowing-text font-montserrat">
                Nature with{" "}
                <span className="text-green-300 glowing-text">Purpose.</span>
              </p>
              <motion.div
                className="absolute w-40 h-40 rounded-full pointer-events-none bottom-0"
                style={{
                  background:
                    "radial-gradient(circle, #003D20, transparent 70%, #003D20)",
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
              style={{
                opacity: animated(orb3Opacity, 1),
                y: animated(orb3Y, 0),
              }}
              className="relative flex flex-col items-center"
            >
              <p className="mb-2 text-white glowing-text text-4xl font-bold w-64 text-center font-montserrat">
                Humanity with{" "}
                <span className="text-orange-300 glowing-text">Vision.</span>
              </p>
              <motion.div
                className="absolute w-40 h-40 rounded-full pointer-events-none bottom-0"
                style={{
                  background:
                    "radial-gradient(circle, #9C4003, transparent 70%, #9C4003)",
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
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
