"use client";
import React, { useState, useRef } from "react";
import { useInView, motion, AnimatePresence } from "framer-motion";

const FoundationSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.5 });

  const gapClass = isHovered
    ? "gap-x-4 sm:gap-x-10 md:gap-x-20 lg:gap-x-52"
    : "gap-x-10 sm:gap-x-20 md:gap-x-52";
  const blurClass = isHovered ? "blur-[100px]" : "blur-[60px]";
  const opacityValue = isHovered ? "80%" : "50%";

  return (
    <>
      {/* <div className="h-[100vh]" /> */}

      <section
        ref={sectionRef}
        className="relative w-full h-[100vh] overflow-hidden"
      >
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="foundation-wrapper"
              className="fixed top-0 left-0 w-full h-[100vh] z-50 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {/* Background Rectangles */}
              <div
                className={`absolute inset-0 z-0 flex px-4 sm:px-10 transition-all duration-500 ${gapClass} filter ${blurClass}`}
              >
                <div
                  className="w-1/4 h-full transition-all duration-500"
                  style={{
                    backgroundColor: "#D9D9D980",
                    opacity: opacityValue,
                  }}
                />
                <div
                  className="w-1/4 h-full transition-all duration-500"
                  style={{
                    backgroundColor: "#CB6D5180",
                    opacity: opacityValue,
                  }}
                />
                <div
                  className="w-1/4 h-full transition-all duration-500"
                  style={{
                    backgroundColor: "#539241A1",
                    opacity: opacityValue,
                  }}
                />
                <div
                  className="w-1/4 h-full transition-all duration-500"
                  style={{
                    backgroundColor: "#A67C0080",
                    opacity: opacityValue,
                  }}
                />
              </div>

              {/* Main Content */}
              <div className="w-full h-full flex flex-col justify-center items-center text-white text-2xl sm:text-3xl md:text-4xl relative px-4 text-center pointer-events-auto">
                <h2
                  className={`font-bold transition duration-300 ${
                    isHovered
                      ? "drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                      : ""
                  }`}
                >
                  Foundation is not{" "}
                  <span className="text-amber-400">Control</span>
                </h2>

                <img
                  src="/about_img.png"
                  alt="Foundation Coin"
                  className={`w-[300px] sm:w-[400px] md:w-[500px] h-auto object-contain transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-50"
                  }`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />

                <h2
                  className={`font-bold transition duration-300 ${
                    isHovered
                      ? "drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                      : ""
                  }`}
                >
                  Foundation is <span className="text-amber-400">Flow</span>
                </h2>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="h-[100vh]" />
    </>
  );
};

export default FoundationSection;
