"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function WhatYouCanExpect() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });

  return (
    <section ref={ref} className="w-full h-[100vh]  relative">
      {/* Text – fixed & centered */}
      <motion.div
        className="fixed inset-0 z-10 flex items-center justify-center p-6"
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="max-w-3xl text-center space-y-8">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-red-300 to-pink-300 text-4xl md:text-6xl font-extrabold uppercase tracking-wider drop-shadow-xl">
            What You Can Expect
          </h2>
          <ul className="list-none space-y-4">
            <li className="text-gray-200 text-xl md:text-3xl font-light leading-relaxed tracking-wide drop-shadow-md">
              ✨ <span className="text-white font-medium">Freedom</span> instead
              of <span className="text-white font-medium">pressure</span>
            </li>
            <li className="text-gray-200 text-xl md:text-3xl font-light leading-relaxed tracking-wide drop-shadow-md">
              ✨ <span className="text-white font-medium">Dignity</span> instead
              of <span className="text-white font-medium">dependency</span>
            </li>
            <li className="text-gray-200 text-xl md:text-3xl font-light leading-relaxed tracking-wide drop-shadow-md">
              ✨ <span className="text-white font-medium">Co‑creation</span>{" "}
              instead of{" "}
              <span className="text-white font-medium">regulations</span>
            </li>
            <li className="text-gray-200 text-xl md:text-3xl font-light leading-relaxed tracking-wide drop-shadow-md">
              ✨ <span className="text-white font-medium">Security</span>{" "}
              instead of <span className="text-white font-medium">debt</span>
            </li>
            <li className="text-gray-200 text-xl md:text-3xl font-light leading-relaxed tracking-wide drop-shadow-md">
              ✨ <span className="text-white font-medium">True community</span>{" "}
              instead of{" "}
              <span className="text-white font-medium">loneliness</span>
            </li>
          </ul>
          <p className="text-gray-200 text-lg md:text-2xl leading-relaxed tracking-wide drop-shadow-md">
            Not another{" "}
            <span className="text-white font-semibold">funding scheme</span>.
            Not more <span className="text-white font-semibold">red tape</span>.
            <br />
            But a{" "}
            <span className="text-yellow-300 font-semibold">
              living, breathing collective
            </span>
            .<br />
            Rooted in the <span className="text-white font-medium">heart</span>.
            In the <span className="text-white font-medium">land</span>. And in{" "}
            <span className="text-white font-medium">you</span>.
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
            filter: "blur(120px)",
            mixBlendMode: "screen",
          }}
        />
      </motion.div>
    </section>
  );
}
