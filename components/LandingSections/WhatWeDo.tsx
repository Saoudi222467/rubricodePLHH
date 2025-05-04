"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function WhatWeDo() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });

  return (
    <section ref={ref} className="w-full h-[100vh]  relative">
      {/* Text – fixed & centered */}
      <motion.div
        className="fixed inset-0 z-10 flex items-center justify-center p-4"
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="max-w-2xl text-center space-y-4 px-4">
          <h2 className="text-white text-2xl md:text-4xl font-semibold italic drop-shadow-lg">
            What We Do
          </h2>
          <p className="text-white text-lg md:text-2xl font-light leading-relaxed tracking-wide drop-shadow-md">
            🌍 <span className="font-medium">The Challenge</span>
            <br />
            Many farming families today are under enormous pressure. Give up or
            push through? Sell or fight on?
          </p>
          <p className="text-white text-lg md:text-2xl font-light leading-relaxed tracking-wide drop-shadow-md">
            🌱 <span className="font-medium">Our Alternative</span>
            <br />
            We offer you a third way:
            <br />
            👉 Shared responsibility. Collective growth.
          </p>
          <p className="text-white text-lg md:text-2xl font-light leading-relaxed tracking-wide drop-shadow-md">
            With Peace, Love & Harmony, you become part of a living network that
            connects real farms with a digital value system. That makes
            decisions together. That sees you – not as a problem, but as a
            partner.
          </p>
        </div>
      </motion.div>

      {/* Background Blob */}
      <motion.div
        className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none"
        animate={{
          opacity: inView ? 1 : 0,
          scale: [1, 1.1, 1],
        }}
        transition={{
          opacity: { duration: 1.5, ease: "easeInOut" },
          scale: {
            duration: 5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            times: [0, 0.5, 1],
          },
        }}
      >
        <div
          className="w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, #ffd900dd)",
            filter: "blur(100px)",
            mixBlendMode: "screen",
          }}
        />
      </motion.div>
    </section>
  );
}
