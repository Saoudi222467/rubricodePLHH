"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EarthSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });

  return (
    <>
      {/* <div className="h-[100vh]" /> */}

      <section ref={ref} className="relative w-full h-[100vh]  overflow-hidden">
        {/* Fixed Inner Content Wrapper */}
        <motion.div
          className="fixed top-0 left-0 w-full h-[100vh] z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Radial Gradient Background Layer (Animated Pulse) */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 10, 1] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute z-0 left-[80%] top-32"
          >
            <div
              className="w-36 h-36"
              style={{
                background:
                  "radial-gradient(circle at center, rgb(251, 205, 3), rgb(212, 195, 1))",
                filter: "blur(80px)",
              }}
            />
          </motion.div>

          {/* Background Image Layer with Zoom-in Animation */}
          <motion.img
            src="/earth-section-bg.png"
            alt="Earth Background"
            className="absolute inset-0 w-full h-full object-cover z-10 opacity-70"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
          />

          {/* Text Content Layer */}
          <div className="relative z-20 h-full w-full flex flex-col justify-center items-center text-5xl gap-y-10 font-semibold text-white text-center px-4">
            <h1>The Earth is Alive.</h1>
            <h1>Every Garden is a Seed.</h1>
            <h1>Every seed is a promise.</h1>
          </div>
        </motion.div>
      </section>

      <div className="h-[100vh]" />
    </>
  );
};

export default EarthSection;
