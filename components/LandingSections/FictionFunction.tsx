"use client";
import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const FictionFunction = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const linkVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  return (
    <>
      <section
        ref={ref}
        className="w-full h-[100vh] relative overflow-hidden bg-black text-white "
      >
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="fiction-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed top-10 left-0 w-full h-[100vh] flex flex-col justify-center items-center text-center px-4 text-2xl sm:text-4xl font-bold gap-6 z-50"
            >
              {/* Headings */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <h2>
                  The world you saw is not{" "}
                  <span className="text-amber-400">Fiction.</span>
                </h2>
                <h2>
                  It is <span className="text-amber-400">Function.</span>
                </h2>
              </motion.div>

              {/* Image wrapper with links */}
              <div className="relative">
                {/* Main Image */}
                <motion.img
                  src="/assets/images/landing/fiction.png"
                  alt="Fiction is Function"
                  className="w-[360px] sm:w-[600px] md:w-[800px] h-auto object-contain"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                />

                {/* Clockwise Animated Links with Larger Font */}
                <motion.a
                  href="/guardians-of-infinity"
                  className="absolute top-4 left-4 text-base sm:text-lg md:text-xl text-white hover:text-amber-400 transition"
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0.8}
                >
                  Guardians of infinity
                </motion.a>

                <motion.a
                  href="/tokenomics"
                  className="absolute top-4 right-4 text-base sm:text-lg md:text-xl text-white hover:text-amber-400 transition"
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1.1}
                >
                  Tokenomics
                </motion.a>

                <motion.a
                  href="/dao"
                  className="absolute bottom-4 right-4 text-base sm:text-lg md:text-xl text-white hover:text-amber-400 transition"
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1.4}
                >
                  DAO
                </motion.a>

                <motion.a
                  href="/governance"
                  className="absolute bottom-4 left-4 text-base sm:text-lg md:text-xl text-white hover:text-amber-400 transition"
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1.7}
                >
                  Governance
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="h-[100vh]" />
    </>
  );
};

export default FictionFunction;
