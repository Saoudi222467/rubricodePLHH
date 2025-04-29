"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const TeamReserve = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <>
      <section ref={ref} className="w-full h-[100vh] relative overflow-hidden">
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="team-reserve-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center px-6 text-center bg-black text-white z-50"
            >
              <div className="max-w-4xl space-y-6">
                <motion.h3
                  initial={{ y: "-50%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-50%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-2xl sm:text-3xl font-semibold"
                >
                  🔹 11% – Team Address / Completion Reserve
                </motion.h3>

                <motion.p
                  initial={{ y: "50%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "50%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  className="text-lg sm:text-xl"
                >
                  Not for profit. For protection. This is the field's buffer –
                  to fill the gaps, to finish what must be done, to ensure no
                  garden is left half-grown.
                  <br />
                  Every use will be transparent, purpose-led, and accountable.
                </motion.p>
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

export default TeamReserve;
