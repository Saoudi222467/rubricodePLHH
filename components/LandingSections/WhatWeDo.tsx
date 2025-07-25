"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function WhatWeDo() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });

  return (
    <section ref={ref} className="w-full h-[100vh] relative pt-24">
      {/* Text – fixed & centered */}
      <motion.div
        className="fixed inset-0 z-10 flex items-center justify-center p-6"
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="max-w-3xl text-center space-y-4">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-yellow-300 to-green-300 text-5xl font-extrabold uppercase tracking-wider drop-shadow-xl">
            What We Do
          </h2>

          <p className="text-gray-200 text-xl md:text-2xl tracking-wide">
            <span className="text-yellow-300 font-semibold">🌍 The Challenge:</span>{" "}
            Many farming families are under pressure —{" "}
            <span className="text-white font-medium">Give up</span>?{" "}
            <span className="text-white font-medium">Push through</span>?{" "}
            <span className="text-white font-medium">Sell</span>?{" "}
            Or <span className="text-white font-medium">fight on</span>?
          </p>

          <p className="text-gray-200 text-xl md:text-2xl tracking-wide">
            <span className="text-green-300 font-semibold">🌱 Our Alternative:</span>{" "}
            A <span className="text-white font-medium">third way</span> —{" "}
            <span className="text-white font-medium">Shared responsibility</span>.{" "}
            <span className="text-white font-medium">Collective growth</span>.
          </p>

          <p className="text-gray-200 text-xl md:text-2xl tracking-wide">
            With{" "}
            <span className="text-yellow-300 font-semibold">Peace, Love & Harmony</span>,{" "}
            you join a network that connects farms to a digital value system.{" "}
            <span className="text-white font-medium">Decisions made together</span>.{" "}
            You are not a problem — you are a{" "}
            <span className="text-white font-medium">partner</span>.
          </p>

          {/* Scroll Down Indicator */}
          <div className="pt-6 text-sm text-gray-400 animate-bounce">
            ↓ Scroll to continue ↓
          </div>
        </div>
      </motion.div>

      {/* Background Blob */}
      <motion.div
        className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none"
        animate={{
          opacity: inView ? 1 : 0,
          scale: [1, 1.05, 1],
        }}
        transition={{
          opacity: { duration: 1.5, ease: "easeInOut" },
          scale: {
            duration: 6,
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
            background: "radial-gradient(circle, #ffd900aa 0%, #ff660077 70%)",
            filter: "blur(120px)",
            mixBlendMode: "screen",
          }}
        />
      </motion.div>
    </section>
  );
}
