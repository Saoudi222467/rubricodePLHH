"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function LandingHero() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });

  return (
    <>
      {/* Dummy content before section */}
      {/* <div className="h-[100vh] " /> */}

      <section ref={ref} className="w-full h-[100vh] bg-black relative">
        <div className="flex flex-col overflow-hidden w-full h-full items-center justify-between py-56 relative">
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

          {/* Footer Text */}
          <motion.div
            className="fixed bottom-10 z-10 text-white flex flex-col items-center"
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <h3 className="text-sm">Scroll for immersive experience</h3>
            <div className="mt-2 animate-bounce w-6 h-6 relative">
              <Image
                src="/DoubleDown.png"
                alt="Scroll down arrow"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dummy content after section */}
      <div className="h-[100vh] " />
    </>
  );
}
