"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import InfinityLoopSmall from "@/components/InfinityLoopSmall";

export default function newLandingHero() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0 });

  return (
    <>
      <section ref={ref} className="w-full h-[100vh] relative overflow-hidden bg-black">
        {/* Main Content */}
        <motion.div
          className="fixed inset-0 z-[5] flex items-center justify-center p-4"
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="max-w-4xl text-center space-y-4">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500 text-3xl md:text-5xl font-bold leading-tight mb-2">
                PEACE, LOVE & HARMONY
              </h1>
              <h2 className="text-yellow-300 text-xl md:text-3xl font-light">
                for more HUMANITY
              </h2>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="space-y-4"
            >
              <p className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500 text-lg md:text-xl">
                is more than a project,
              </p>
              <p className="text-yellow-300 text-lg md:text-xl italic">
                it is more than a coin,
              </p>
              <p className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500 text-lg md:text-xl italic font-semibold">
                it's a MOVEMENT.
              </p>
            </motion.div>

            {/* Animated Infinity Symbol */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="my-0"
            >
              <InfinityLoopSmall />
            </motion.div>

            {/* Bottom Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="space-y-4"
            >
              <p className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500 text-base md:text-lg leading-relaxed">
                A living vision for a new Earth,<br />
                where <span className="font-bold">Peace, Love & Harmony</span> are not ideals,<br />
                but the foundation of real action.
              </p>
              
              <p className="text-green-400 text-base md:text-lg font-semibold flex items-center justify-center gap-2">
                💚 Real value for real change.
              </p>
              
              <p className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500 text-lg md:text-xl font-bold">
                Own land. Grow life. Spread love.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Gradient Glow */}
        

        {/* Footer Text – fixed centered column */}
        <motion.div
          className="fixed inset-0 z-[5] flex flex-col items-center justify-end pb-10 text-white"
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
