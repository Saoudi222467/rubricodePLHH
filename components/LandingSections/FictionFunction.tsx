"use client";
import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const FictionFunction = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <>
      <section
        ref={ref}
        className="w-full h-[100vh] relative overflow-hidden bg-black text-white"
      >
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="fiction-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-full h-[100vh] flex flex-col justify-center items-center text-center px-4 text-2xl sm:text-4xl font-bold gap-6 z-50"
            >
              {/* Text */}
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

              {/* Larger Image */}
              <motion.img
                src="/assets/images/landing/fiction.png"
                alt="Fiction is Function"
                className="w-[320px] sm:w-[500px] md:w-[650px] h-auto object-contain"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="h-[100vh]" />
    </>
  );
};

export default FictionFunction;
