"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function YourRole() {
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
            🧭 Your Role
          </h2>
          <p className="text-white text-lg md:text-2xl font-light leading-relaxed tracking-wide drop-shadow-md">
            Whether you sell, stay, or co-create – what matters is your voice.
            And your next chapter begins with a choice: to be heard.
          </p>
          <p className="text-white text-lg md:text-2xl font-light leading-relaxed tracking-wide drop-shadow-md">
            <span className="font-medium">Your Story</span>
            <br />
            You are the beginning of everything. Your story, your family, your
            heart – your land.
          </p>
          <p className="text-white text-lg md:text-2xl font-light leading-relaxed tracking-wide drop-shadow-md">
            We want to feel who you are. Not just data. But your dreams. Your
            doubts. Your courage.
          </p>
          <p className="text-white text-lg md:text-2xl font-light leading-relaxed tracking-wide drop-shadow-md">
            That’s why we ask: Share your story with us. Not to judge. But to
            understand.
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
