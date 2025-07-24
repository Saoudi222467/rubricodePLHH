"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const blobVariants = {
  hidden: (custom: number) => ({
    x: `${custom * -100}vw`,
    opacity: 0,
  }),
  visible: {
    x: "0vw",
    scale: [1, 1.1, 1],
    opacity: [0.6, 0.4, 0.6],
    transition: {
      x: { type: "tween", duration: 0.6, ease: "easeOut" },
      scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  },
  exit: (custom: number) => ({
    x: `${custom * 100}vw`,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  }),
};

const AboutEssence: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <section
      ref={ref}
      className="w-screen h-screen relative overflow-hidden bg-black"
    >
      {/* Animated blobs */}
      {[-1, 1].map((dir) => (
        <motion.div
          key={dir}
          custom={dir}
          variants={blobVariants}
          initial="hidden"
          animate={isInView ? "visible" : "exit"}
          className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none"
        >
          <div
            className="w-[60vw] h-[60vw] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,217,0,1), transparent)",
              filter: "blur(80px)",
              mixBlendMode: "screen",
            }}
          />
        </motion.div>
      ))}

      {/* Text content */}
      <motion.div
        className="fixed inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="max-w-3xl bg-white/10 backdrop-blur-lg rounded-xl p-8 space-y-8 border border-white/20 shadow-xl">
          <motion.h2
            className="
              text-4xl sm:text-5xl font-extrabold uppercase tracking-wide
              bg-gradient-to-r from-yellow-400 via-green-400 to-green-600
              bg-clip-text text-transparent drop-shadow-lg
            "
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: isInView ? 0 : -40, opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Our Essence: United by Purpose
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl text-white leading-relaxed font-light drop-shadow-md"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: isInView ? 0 : 40, opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            This isn’t just about a team — it’s a collective mission.
            It’s about the unity of humanity, intelligence, and the planet.
            A sacred connection between human spirit, intelligent technology, and the wisdom of nature.
            This is not about branding or buzzwords. It’s the realignment of purpose,
            the harmony of progress — where nature, people, and machines move as one.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutEssence;
