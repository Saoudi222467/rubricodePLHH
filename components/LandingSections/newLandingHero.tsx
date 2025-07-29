"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import InfinityLoopSmall from "@/components/InfinityLoopSmall";

export default function NewLandingHero() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });

  return (
    <>
      <section ref={ref} className="relative w-full h-screen overflow-hidden bg-black">
        {/* Main Content Layer */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center px-4 pt-10 md:pt-0"
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="max-w-4xl w-full text-center space-y-6">
            {/* Headings */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-1 whitespace-nowrap">
                PEACE, LOVE & HARMONY
              </h1>
              <h2 className="text-yellow-300 text-lg sm:text-xl md:text-3xl font-light">
                for more HUMANITY
              </h2>
            </motion.div>

            {/* Subtitle Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="space-y-2"
            >
              <p className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500 text-base sm:text-lg md:text-xl">
                is more than a project,
              </p>
              <p className="text-yellow-300 text-base sm:text-lg md:text-xl italic">
                it is more than a coin,
              </p>
              <p className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500 text-base sm:text-lg md:text-xl italic font-semibold">
                it's a MOVEMENT.
              </p>
            </motion.div>

            {/* Infinity Loop Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="my-2"
            >
              <InfinityLoopSmall />
            </motion.div>

            {/* Bottom Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="space-y-3"
            >
              <p className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500 text-sm sm:text-base md:text-lg leading-relaxed">
                A living vision for a new Earth,<br />
                where <span className="font-bold">Peace, Love & Harmony</span> are not ideals,<br />
                but the foundation of real action.
              </p>
              <p className="text-green-400 text-sm sm:text-base md:text-lg font-semibold flex items-center justify-center gap-2">
                💚 Real value for real change.
              </p>
              <p className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500 text-sm sm:text-lg md:text-xl font-bold">
                Own land. Grow life. Spread love.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator (Bottom Layer) */}
        <motion.div
          className="absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center text-white "
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h3 className="text-xs sm:text-sm mb-2 uppercase tracking-wider">
            Scroll for immersive experience
          </h3>
          <div className="animate-bounce w-5 h-5 relative">
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

      {/* Filler for Scroll Behavior */}
      <div className="h-[100vh]" />
    </>
  );
}
