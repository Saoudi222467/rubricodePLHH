"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import InfinityLoop from "@/components/InfinityLoop";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function GovernanceCTA() {
  // sentinel to watch when this section scrolls into/out of view
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sentinelRef, { amount: 0.5, once: false });

  // stagger for content items
  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2, when: "beforeChildren" } },
  };

  // headline pop-in
  const titleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 180, damping: 20 },
    },
  };

  // slide + fade for paragraphs & buttons
  const itemVariants: Variants = {
    hidden: (dir: number) => ({ opacity: 0, y: dir * 30 }),
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "tween", ease: "easeOut", duration: 0.6 },
    },
  };

  return (
    <>
      {/* full-screen “trigger” div */}
      <div ref={sentinelRef} className="w-full h-screen" />

      <AnimatePresence>
        {isInView && (
          <motion.section
            key="governance-cta"
            className="fixed inset-0 z-50 overflow-hidden flex flex-col items-center justify-center bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* 1) Infinity-loop behind everything */}
            <motion.div
              className="fixed inset-0 -z-20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <InfinityLoop />
            </motion.div>

            {/* 2) Gold-brown gradient overlay */}
            <motion.div
              className="fixed inset-0 -z-10 bg-gradient-to-br from-[#4E2A1E]/50 via-[#3A1F0B]/30 to-[#D4AF37]/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />

            {/* 3) Content & CTA */}
            <motion.div
              className="relative z-30 max-w-2xl px-6 text-center space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <motion.h2
                variants={titleVariants}
                className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_4px_8px_rgba(212,175,55,0.5)]"
                whileHover={{ scale: 1.05 }}
              >
                Ready to{" "}
                <span className="text-[#FFE066]">Shape the Future?</span>
              </motion.h2>

              <motion.p
                custom={1}
                variants={itemVariants}
                className="text-lg text-white"
              >
                Everyone who has a thought. A vision. A fire. A question. An
                idea.
                <br />
                Deserves to be heard.
              </motion.p>

              <motion.p
                custom={-1}
                variants={itemVariants}
                className="text-lg text-white"
              >
                Ready to give your voice a platform? Join us, connect your
                wallet, and start shaping tomorrow.
              </motion.p>

              <motion.div
                custom={1}
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-[#FFE066] text-[#3A1F0B] hover:bg-[#FFE066]/90 transition-all"
                  style={{ boxShadow: "0 0 0 2px #D4AF37" }}
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
                    Connect Wallet
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>

                <Link href="/dao">
                  <Button
                    size="lg"
                    className="border border-[#FFE066] bg-transparent text-[#FFE066] hover:bg-[#FFE066] hover:text-white transition-all"
                    style={{ boxShadow: "0 0 0 2px #D4AF37" }}
                  >
                    Go to DAO Page
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* 4) Pulsing scroll hint */}
            <motion.div
              className="fixed bottom-10 z-40 w-full flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1,
              }}
            >
              <span className="text-[#D4AF37]">↓ Scroll ↓</span>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
