"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function TextSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const contentOpacity = useTransform(smoothScrollYProgress, [0.95, 1], [1, 0]);
  const sectionOpacity = useTransform(smoothScrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.section
      ref={ref}
      id="text-section"
      className="relative h-[100vh] w-full flex flex-col justify-center items-center overflow-hidden font-montserrat bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/bghero2.jpeg')",
        opacity: sectionOpacity
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1,delay:1 }}
        className="mb-8 text-white text-4xl font-bold relative z-10"
      >
        The Earth is Alive.
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="mb-8 text-white text-4xl font-bold relative z-10"
      >
        Every Garden is a Seed.
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="text-white text-4xl font-bold relative z-10"
      >
        Every seed is a promise.
      </motion.div>
    </motion.section>
  );
}
