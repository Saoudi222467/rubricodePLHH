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
              background: "radial-gradient(circle, rgba(255,217,0,1), transparent)",
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
        <div className="max-w-3xl bg-white/20 backdrop-blur-xl rounded-2xl p-10 space-y-8 border border-white/30 shadow-2xl">
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold uppercase tracking-wide text-yellow-300 drop-shadow-lg"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: isInView ? 0 : -40, opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Our Essence
            <br className="hidden sm:block" />
            <span className=" block text-white text-xl sm:text-2xl mt-5 font-semibold tracking-normal">
              It’s About All of Us
            </span>
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl text-white/90 leading-relaxed font-light drop-shadow-md whitespace-pre-line"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: isInView ? 0 : 40, opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            This isn't about a team.{"\n"}
            It’s about humanity, intelligence, and the planet!{"\n"}
            A sacred alliance between man, machine, and Mother Nature.{"\n"}
            Not branding. Not hype.{"\n"}
            An activation of harmony between technology,{"\n"}
            humanity, and nature.
          </motion.p>

        </div>
      </motion.div>
    </section>
  );
};

export default AboutEssence;
