"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function YourRole() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.7 });

  return (
    <section ref={ref} className="w-full h-[100vh] relative ">
      {/* Text – fixed & centered */}
      <motion.div
        className="fixed inset-0 z-10 flex items-center justify-center p-6"
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="max-w-3xl text-center space-y-8">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 text-4xl md:text-6xl font-extrabold uppercase tracking-wider drop-shadow-xl">
            Your Role
          </h2>
          <p className="text-gray-200 text-lg md:text-2xl leading-relaxed tracking-wide">
            Whether you <span className="text-white font-medium">sell</span>,{" "}
            <span className="text-white font-medium">stay</span>, or{" "}
            <span className="text-white font-medium">co‑create</span> – what
            matters is your{" "}
            <span className="text-yellow-300 font-semibold">voice</span>.<br />
            Your next chapter begins with a choice: to be{" "}
            <span className="text-white font-medium">heard</span>.
          </p>
          <p className="text-gray-200 text-lg md:text-2xl leading-relaxed tracking-wide">
            <span className="text-yellow-300 font-semibold">Your Story</span>
            <br />
            You are the{" "}
            <span className="text-white font-medium">beginning</span> of
            everything.
            <br />
            Your story, your family, your heart – your land.
          </p>
          <p className="text-gray-200 text-lg md:text-2xl leading-relaxed tracking-wide">
            We want to feel who you are.
            <br />
            Not just <span className="text-white font-medium">data</span>.<br />
            But your <span className="text-white font-medium">dreams</span>,
            your <span className="text-white font-medium">doubts</span>, your{" "}
            <span className="text-white font-medium">courage</span>.
          </p>
          <p className="text-gray-200 text-lg md:text-2xl leading-relaxed tracking-wide">
            That’s why we ask:{" "}
            <span className="text-yellow-300 font-semibold">
              Share your story with us
            </span>
            .<br />
            Not to judge. But to{" "}
            <span className="text-white font-medium">understand</span>.
          </p>
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
            background: "radial-gradient(circle, #00ffff55 0%, #0066ff55 70%)",
            filter: "blur(120px)",
            mixBlendMode: "screen",
          }}
        />
      </motion.div>
    </section>
  );
}
