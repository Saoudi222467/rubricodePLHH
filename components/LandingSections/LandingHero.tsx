"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function LandingHero() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });

  return (
    <>
      <section
        ref={ref}
        className="w-full h-[100vh] bg-black relative overflow-hidden"
      >
        {/* Intro Text – fixed centered with enhanced typography */}
        <motion.div
          className="fixed inset-0 z-10 flex items-center justify-center p-4"
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="max-w-2xl text-center space-y-6">
            <p className="text-white text-xl md:text-3xl font-light italic leading-relaxed tracking-wide drop-shadow-md">
              You know every tree’s whisper. Every path’s memory. Every cow’s
              eyes.
            </p>
            <p className="text-white text-xl md:text-3xl font-light italic leading-relaxed tracking-wide drop-shadow-md">
              Your roots run deeper than the seasons reach.
            </p>
            <p className="text-white text-xl md:text-3xl font-light italic leading-relaxed tracking-wide drop-shadow-md">
              But the world keeps turning. And sometimes, it feels like farming
              no longer has a place.
            </p>
            <p className="text-yellow-300 text-2xl md:text-4xl font-semibold italic leading-snug tracking-wide drop-shadow-lg">
              We believe otherwise.
            </p>
            <p className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500 text-xl md:text-3xl font-semibold leading-relaxed tracking-wide">
              Peace, Love & Harmony is more than a project. It’s a living Garden
              of Eden concept –
            </p>
            <p className="text-white text-xl md:text-3xl font-light italic leading-relaxed tracking-wide drop-shadow-md">
              for you, your farm, your family. A sacred space to rethink. To
              feel again. To create anew.
            </p>
            <p className="text-white text-xl md:text-3xl font-light italic leading-relaxed tracking-wide drop-shadow-md">
              Freely. With dignity. Carried by community.
            </p>
          </div>
        </motion.div>

        {/* Gradient Glow */}
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

        {/* Footer Text – fixed centered column */}
        <motion.div
          className="fixed inset-0 z-10 flex flex-col items-center justify-end pb-10 text-white"
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h3 className="text-sm mb-2 uppercase tracking-wider">
            Scroll for immersive experience
          </h3>
          <div className="animate-bounce w-6 h-6 relative">
            <Image
              src="/DoubleDown.png"
              alt="Scroll down arrow"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* Dummy content after section */}
      <div className="h-[100vh]" />
    </>
  );
}
