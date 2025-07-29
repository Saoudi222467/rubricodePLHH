"use client";
import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const DreamFieldSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const blobStyle = {
    background: "radial-gradient(circle, #001B1B 0%, #A67C00 100%)",
    // filter: "blur(77px)",
  };

  const blobAnimation = {
    boxShadow: [
      "0 0 0px 0px #A67C0088",
      "0 0 80px 40px #A67C0088",
      "0 0 0px 0px #A67C0088",
    ],
  };

  const blobTransition = {
    duration: 3,
    ease: "easeInOut",
    repeat: Infinity,
  };

  const Tooltip = ({
    label,
    sublabel,
  }: {
    label: string;
    sublabel: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 whitespace-nowrap text-left"
    >
      <div className="text-white font-semibold text-sm leading-tight">
        {label}
      </div>
      <div className="text-white text-xs leading-tight">{sublabel}</div>
    </motion.div>
  );

  const Blob = ({
    size,
    className,
    label,
    sublabel,
    isVisible,
    delayOrder,
  }: {
    size: string;
    className: string;
    label: string;
    sublabel: string;
    isVisible: boolean;
    delayOrder: number;
  }) => (
    <motion.div
      className={`group absolute ${className} z-10 cursor-pointer`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{
        duration: isVisible ? 0.5 : 0.3,
        ease: "easeInOut",
        delay: isVisible ? 0.8 + delayOrder * 0.3 : 0,
      }}
    >
      <motion.div
        className={`rounded-full ${size}`}
        style={blobStyle}
        animate={blobAnimation}
        transition={blobTransition}
      />

      {/* Tooltip appears on hover */}
      <AnimatePresence>
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 hidden group-hover:block">
          <Tooltip label={label} sublabel={sublabel} />
        </div>
      </AnimatePresence>
    </motion.div>
  );

  return (
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
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full h-[100vh] flex flex-col justify-center items-center text-center px-4 text-2xl sm:text-4xl font-bold gap-5 pt-10 z-50"
          >
            {/* Headings */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <h2>
                  This is not a{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-yellow-200 drop-shadow-[0_0_8px_rgba(255,204,0,0.8)]">
                    Dream.
                  </span>
                </h2>
                <h2>
                  This is a{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-lime-200 drop-shadow-[0_0_8px_rgba(0,255,128,0.8)]">
                    Field.
                  </span>
                </h2>

            </motion.div>

            {/* Globe & Blobs */}
            <div className="relative">
              {/* Globe Image */}
              <motion.img
                src="/assets/images/landing/globe.png"
                alt="Globe"
                className="w-[280px] sm:w-[400px] md:w-[500px] h-auto object-contain"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              />

              {/* Blobs with tooltips (staggered) */}
              <Blob
                isVisible={isInView}
                delayOrder={0}
                size="w-16 h-16"
                className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                label="Garden"
                sublabel="Ghana"
              />
              <Blob
                isVisible={isInView}
                delayOrder={1}
                size="w-12 h-12"
                className="top-[22%] left-[18%]"
                label="Oasis"
                sublabel="Kenya"
              />
              <Blob
                isVisible={isInView}
                delayOrder={2}
                size="w-12 h-12"
                className="top-[22%] right-[18%]"
                label="Haven"
                sublabel="Rwanda"
              />

              <Blob
                isVisible={isInView}
                delayOrder={3}
                size="w-12 h-12"
                className="bottom-[5%] left-1/2 -translate-x-1/2"
                label="Seed"
                sublabel="Nigeria"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DreamFieldSection;
