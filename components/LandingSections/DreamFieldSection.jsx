"use client";
import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const DreamFieldSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <>
      {/* <div className="h-[100vh]" /> */}

      <section
        ref={ref}
        className="relative w-full h-[100vh] overflow-hidden bg-black text-white"
      >
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="dreamfield-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-full h-[100vh] flex flex-col justify-center items-center text-center px-4 text-2xl sm:text-4xl font-bold gap-5 pt-10 z-50"
            >
              {/* Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <h2>This is not a Dream.</h2>
                <h2>This is a Field.</h2>
              </motion.div>

              {/* Image */}
              <motion.img
                src="/assets/images/landing/globe.png"
                alt="Globe"
                className="w-[280px] sm:w-[400px] md:w-[500px] h-auto object-contain"
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

export default DreamFieldSection;
