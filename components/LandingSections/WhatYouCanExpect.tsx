"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function WhatYouCanExpect() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });

  return (
    <section ref={ref} className="w-full h-[100vh] bg-black relative">
      {/* Text – fixed & centered */}
      <motion.div
        className="fixed inset-0 z-10 flex items-center justify-center p-4"
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="max-w-2xl text-center space-y-6 px-4">
          <h2 className="text-white text-2xl md:text-4xl font-semibold italic drop-shadow-lg">
            What You Can Expect
          </h2>
          <ul className="list-none space-y-3 text-white text-lg md:text-2xl font-light leading-relaxed tracking-wide drop-shadow-md">
            <li>✨ Freedom instead of pressure</li>
            <li>✨ Dignity instead of dependency</li>
            <li>✨ Co‑creation instead of regulations</li>
            <li>✨ Security instead of debt</li>
            <li>✨ True community instead of loneliness</li>
          </ul>
          <p className="text-white text-lg md:text-2xl font-light leading-relaxed tracking-wide drop-shadow-md">
            Not another funding scheme. Not more red tape. But a living,
            breathing collective. Rooted in the heart. In the land. And in you.
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
