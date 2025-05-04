"use client";
import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const CTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-30% 0px -30% 0px" });

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.7,
        delayChildren: 0.5,
      },
    },
    hidden: {},
    exit: { opacity: 0, transition: { duration: 0.6 } },
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
      className="relative w-full h-[200vh] overflow-hidden bg-black text-white"
    >
      <AnimatePresence>
        {inView && (
          <motion.div
            key="cta-fixed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
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
              className="relative text-center px-6 pointer-events-auto z-10"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
            >
              <motion.h2
                variants={childVariants}
                className="text-3xl md:text-5xl font-bold mb-4"
              >
                Farm calling for more?
              </motion.h2>

              <motion.h2
                variants={childVariants}
                className="text-3xl md:text-5xl font-bold mb-4"
              >
                Next chapter: supported, free, rooted.
              </motion.h2>

              <motion.h2
                variants={childVariants}
                className="text-3xl md:text-5xl font-bold mb-4"
              >
                Let your story be heard.
              </motion.h2>

              <motion.h2
                variants={childVariants}
                className="text-3xl md:text-5xl font-bold mb-6"
              >
                Your vision is our mission.
              </motion.h2>

              <motion.button
                variants={childVariants}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-xl shadow-md transition cursor-pointer"
                onClick={() => alert("I’m Ready!")}
              >
                Apply
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CTASection;
