"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const blobVariants = {
  visible: {
    scale: [1, 1.3, 1],
    opacity: [0.8, 0.5, 0.8],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
  exit: {
    scale: 4,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const CoreChoices: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.5, margin: "0px" });

  return (
    <section ref={ref} className="relative w-full h-screen">
      <AnimatePresence>
        {isInView && (
          <motion.div
            key="core-choices-overlay"
            className="fixed inset-0 w-full h-screen overflow-hidden bg-black z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Corner blobs, maximized size and blur for extreme spread */}
            {[
              "top-0 left-0",
              "top-0 right-0",
              "bottom-0 left-0",
              "bottom-0 right-0",
            ].map((pos) => (
              <motion.div
                key={pos}
                className={`absolute ${pos} w-96 h-96 pointer-events-none`}
                initial="visible"
                animate="visible"
                exit="exit"
                variants={blobVariants}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,217,0,1), transparent)",
                    filter: "blur(200px)", // Maximum blur for widest spread
                    mixBlendMode: "screen",
                  }}
                />
              </motion.div>
            ))}

            {/* Center content */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <motion.h2
                className="text-3xl sm:text-4xl font-bold"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Our Core Choices
              </motion.h2>

              <motion.ul
                className="list-disc list-inside space-y-2 text-lg sm:text-xl mt-4 text-left"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              >
                <li>
                  <strong>Peace</strong> – because nothing grows in chaos.
                </li>
                <li>
                  <strong>Love</strong> – because connection is the root of
                  value.
                </li>
                <li>
                  <strong>Harmony</strong> – because structure without soul
                  breaks.
                </li>
              </motion.ul>

              <motion.p
                className="mt-6 text-lg sm:text-xl"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                We didn’t build a product. <strong>We built a field</strong> – a
                living system.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CoreChoices;
