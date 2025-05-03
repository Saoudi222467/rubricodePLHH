"use client";

import React, { useRef } from "react";
import { useInView, motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function GovernanceCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <>
      <section ref={ref} className="w-full h-[100vh] relative overflow-hidden">
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="governance-cta-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-full h-[100vh] flex flex-col items-center justify-center px-6 text-center bg-black text-white z-50"
            >
              <motion.h2
                initial={{ y: "-50%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-50%", opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-3xl sm:text-4xl font-bold mb-8"
              >
                Ready to Shape the Future?
              </motion.h2>

              <motion.div
                initial={{ y: "50%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "50%", opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              >
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-warm-gold to-earthy-copper text-dark-text transition-all hover:scale-105 hover:from-warm-gold hover:to-earthy-copper/90"
                  style={{ boxShadow: "0 0 0 2px #a67c00" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    Connect Wallet to Participate
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Spacer to allow scrolling */}
      <div className="h-[100vh]" />
    </>
  );
}
