"use client";
import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const CoCreateSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <>
      <section ref={ref} className="w-full h-[100vh] relative overflow-hidden">
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="cocreate-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-full h-[100vh] z-50"
            >
              {/* Background Image with Zoom-In Animation */}
              <motion.img
                src="/assets/images/landing/CoCreate.jpg"
                alt="Co-Create Background"
                className="absolute inset-0 w-full h-full object-cover z-0"
                animate={{ scale: [1, 1.2] }}
                transition={{
                  duration: 10,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              {/* Text Content */}
              <div className="relative z-10 w-full h-full flex flex-col sm:flex-row justify-between items-center sm:items-start sm:text-left text-center px-4 sm:px-10 md:px-16 pt-40 text-white font-bold text-lg sm:text-2xl md:text-4xl gap-y-10 sm:gap-y-0">
                {/* Left Text - From Left */}
                <motion.h2
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "-100%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  You are not here to
                  <br />
                  <span className="text-amber-400">Follow.</span>
                </motion.h2>

                {/* Right Text - From Right */}
                <motion.h2
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "100%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                >
                  You are here to
                  <br />
                  <span className="text-amber-400">Co-Create.</span>
                </motion.h2>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="h-[100vh]" />
    </>
  );
};

export default CoCreateSection;
