"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

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

  const [finalOpacity, setFinalOpacity] = useState(0);

  const sectionOpacity = useTransform(smoothScrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const unsubscribe = smoothScrollYProgress.onChange((value) => {
      if (value >= 0.9) {
        setFinalOpacity(1);
        unsubscribe();
      }
    });
    return () => unsubscribe && unsubscribe();
  }, [smoothScrollYProgress]);
  

  return (
    <motion.section
      ref={ref}
      id="text-section"
      className="relative h-[100vh] w-full flex flex-col justify-center items-center overflow-hidden font-montserrat bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/bghero2.jpeg')",
        opacity: finalOpacity || sectionOpacity,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mb-8 text-white text-4xl font-bold relative z-10"
      >
        The Earth is Alive.
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="mb-8 text-white text-4xl font-bold relative z-10"
      >
        Every Garden is a Seed.
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
        className="text-white text-4xl font-bold relative z-10"
      >
        Every seed is a promise.
      </motion.div>
    </motion.section>
  );
}
