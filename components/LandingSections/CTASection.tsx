"use client";
import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const CTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-30% 0px -30% 0px" });

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.8,
        delayChildren: 0.6,
      },
    },
    hidden: {},
    exit: { opacity: 0, transition: { duration: 0.4 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={ref}
      className="relative w-full h-[200vh] overflow-hidden text-white"
    >
      <AnimatePresence>
        {inView && (
          <motion.div
            key="cta-fixed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center z-10 pointer-events-none"
          >
            {/* Background Blob */}
            <motion.div
              className="absolute inset-0 z-0 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                times: [0, 0.5, 1],
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

            {/* Text Content */}
            <motion.div
              className="relative text-center px-6 pointer-events-auto z-10 leading-snug"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
            >
              <motion.h2
                variants={childVariants}
                className="text-2xl md:text-4xl font-semibold mb-2"
              >
                Do you need support as a farmer?
              </motion.h2>

              <motion.h2
                variants={childVariants}
                className="text-2xl md:text-4xl font-semibold mb-2"
              >
                Let us hear your story and vision.
              </motion.h2>

              <motion.h2
                variants={childVariants}
                className="text-2xl md:text-4xl font-semibold mb-2"
              >
                We will tell it and make it come true with you!
              </motion.h2>

              <motion.h2
                variants={childVariants}
                className="mt-7 text-2xl md:text-4xl font-extrabold"
              >
                Your vision is our mission.
              </motion.h2>
              {/* Scroll Down Indicator */}
            <div className="pt-6 text-sm text-gray-400 animate-bounce">
            ↓ Scroll to continue ↓
          </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CTASection;
