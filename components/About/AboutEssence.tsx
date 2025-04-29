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
    scale: [1, 1.3, 1],
    opacity: [0.6, 0.4, 0.6],
    transition: {
      x: { type: "tween", duration: 0.8, ease: "easeOut" },
      scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  },
  exit: (custom: number) => ({
    x: `${custom * 100}vw`,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeInOut" },
  }),
};

const AboutEssence: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <>
      <section
        ref={ref}
        className="w-screen h-screen relative overflow-hidden bg-black"
      >
        {/* Two blobs: slide in from edges into center on enter, exit back to edges */}
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

        <motion.div
          className="fixed inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="max-w-4xl space-y-6">
            <motion.h2
              initial={{ y: "-50%", opacity: 0 }}
              animate={{
                y: isInView ? "0%" : "-50%",
                opacity: isInView ? 1 : 0,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-4xl font-bold"
            >
              Our Essence: It's About All of Us
            </motion.h2>

            <motion.p
              initial={{ y: "50%", opacity: 0 }}
              animate={{
                y: isInView ? "0%" : "50%",
                opacity: isInView ? 1 : 0,
              }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="text-lg sm:text-xl"
            >
              This isn't about a team. It's about humanity, intelligence, and
              the planet — a sacred alliance between man, machine, and Mother
              Nature. Not branding. Not hype. An activation of harmony between
              technology, humanity, and nature.
            </motion.p>
          </div>
        </motion.div>
      </section>
      <div className="h-[100px] w-full "></div>
    </>
  );
};

export default AboutEssence;
