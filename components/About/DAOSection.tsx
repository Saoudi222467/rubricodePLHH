"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";

const DAOSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  // Common animation props for each row, typed as Variants
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
      <section ref={ref} className="w-full h-[100vh] relative overflow-hidden ">
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="dao-section-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed inset-0 bg-black text-white z-50 flex flex-col justify-between h-full overflow-hidden mt-10"
            >
              {/* Background image with continuous zoom */}
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }}
                transition={{
                  duration: 30,
                  ease: "linear",
                  repeat: Infinity,
                }}
                style={{
                  backgroundImage: "url('/assets/images/landing/CoCreate.jpg')",
                }}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              />

              {/* Overlay content (static layer above the background) */}
              <div className="relative z-10 flex flex-col justify-between h-full">
                {/* 1st row: Every voice matters */}
                <motion.div
                  variants={rowVariants}
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  className="flex justify-center pt-20 text-lg sm:text-xl"
                >
                  Every&nbsp;
                  <span className="text-[#F9CD13] font-extrabold">voice</span>
                  &nbsp; matters.
                </motion.div>

                {/* 2nd row: Our Structure */}
                <motion.h2
                  variants={rowVariants}
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  className="flex justify-center text-3xl sm:text-4xl font-bold"
                >
                  Our Structure: A&nbsp;
                  <span className="text-[#F9CD13] font-extrabold">DAO</span>
                  &nbsp;for All
                </motion.h2>

                {/* 3rd row: Freedom … co-create */}
                <motion.div
                  variants={rowVariants}
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  className="
                    flex flex-col items-center space-y-4
                    sm:flex-row sm:justify-between sm:items-center
                    px-16 pb-20 text-lg sm:text-xl
                  "
                >
                  <span>
                    <span className="text-[#F9CD13] font-extrabold">
                      Freedom
                    </span>{" "}
                    is coded in.
                  </span>
                  <span>
                    We&nbsp;
                    <span className="text-[#F9CD13] font-extrabold">
                      co-create
                    </span>
                    , not rule.
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Spacer to allow scrolling */}
      <div className="h-[100vh]" />
    </>
  );
};

export default DAOSection;
