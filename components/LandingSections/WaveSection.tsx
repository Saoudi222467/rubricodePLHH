"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function WaveSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const waveOpacity = useTransform(smoothScrollYProgress, [-0.1, 1], [0, 1]);

  return (
    <section
      ref={ref}
      id="wave-section"
      className="
        snap-start 
        relative 
        flex 
        items-center 
        justify-evenly 
        h-screen 
        w-full
        overflow-hidden
      "
    >
      {/* --- Animated Background Wave (SVG) --- */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          width="1915"
          height="634"
          viewBox="0 0 1915 634"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_276_1564)">
            <motion.path
              d="M-88 12.5C226 81.5 527 662.5 981 618.5C1548.5 563.5 1521 194 1959 125.5"
              stroke="var(--landing)"
              strokeWidth="9"
              opacity={waveOpacity}
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

      {/* --- Orb + Text 1 --- */}
      <div className="relative flex flex-col items-center">
        <motion.div
          className="w-16 h-16 bg-teal-500 rounded-full shadow-lg"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <p className="mt-2 text-white text-lg">
          Technology with <span className="text-cyan-400">Soul.</span>
        </p>
      </div>

      {/* --- Orb + Text 2 --- */}
      <div className="relative flex flex-col items-center">
        <motion.div
          className="w-16 h-16 bg-green-600 rounded-full shadow-lg"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <p className="mt-2 text-white text-lg">
          Nature with <span className="text-green-300">Purpose.</span>
        </p>
      </div>

      {/* --- Orb + Text 3 --- */}
      <div className="relative flex flex-col items-center">
        <motion.div
          className="w-16 h-16 bg-orange-600 rounded-full shadow-lg"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <p className="mt-2 text-white text-lg">
          Humanity with <span className="text-orange-300">Vision.</span>
        </p>
      </div>
    </section>
  );
}
