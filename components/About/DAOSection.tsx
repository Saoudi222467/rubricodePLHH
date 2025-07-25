"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";

const DAOSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const rowVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: custom * 0.2 },
    }),
  };

  return (
    <>
      <section ref={ref} className="w-full h-[100vh] relative overflow-hidden">
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="dao-section-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed inset-0 bg-black text-white z-50 flex flex-col justify-between h-full"
            >
              {/* Background with dark overlay */}
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }}
                transition={{
                  duration: 30,
                  ease: "linear",
                  repeat: Infinity,
                }}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/assets/images/landing/CoCreate.jpg')",
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

              {/* Foreground content */}
              <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4 space-y-8">
                
                {/* KEY MESSAGE */}
                <motion.h1
                  variants={rowVariants}
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  className="text-4xl sm:text-5xl font-extrabold text-white"
                >
                  WE ARE ALL <span className="text-[#F9CD13]">ONE</span>
                </motion.h1>

                {/* Sub Message */}
                <motion.p
                  variants={rowVariants}
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  className="text-lg sm:text-xl max-w-3xl text-white"
                >
                  Every <span className="font-bold text-[#F9CD13]">voice</span> matters. 
                  Our Structure: A <span className="font-bold text-[#F9CD13]">DAO</span> for All.
                </motion.p>

                {/* Freedom Message */}
                <motion.p
                  variants={rowVariants}
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  className="text-lg sm:text-xl text-white"
                >
                  <span className="font-bold text-[#F9CD13]">Freedom</span> is coded in.
                  We <span className="font-bold text-[#F9CD13]">co-create</span>, not rule.
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default DAOSection;
