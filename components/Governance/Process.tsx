"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import InfinityLoop from "@/components/InfinityLoop";
import { FileText, Users, Check, AlertCircle } from "lucide-react";

const governanceSteps = [
  {
    icon: FileText,
    title: "1. Submit a Proposal",
    description:
      "Anyone holding at least 10,000 PLHH can submit a proposal — your vision, your voice.",
  },
  {
    icon: Users,
    title: "2. Community Discussion",
    description:
      "Refine your idea in a 7-day open discussion — together in the circle of trust.",
  },
  {
    icon: Check,
    title: "3. Token-Weighted Voting",
    description:
      "On-chain voting weighted by holdings — every vote counts, every holder matters.",
  },
  {
    icon: AlertCircle,
    title: "4. Execution Threshold",
    description:
      "66% approval plus 10% quorum required — turning proposals into reality.",
  },
];

export function GovernanceProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.25, when: "beforeChildren" } },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 180, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } },
  };

  const textVariants: Variants = {
    hidden: (_: number) => ({ opacity: 0, y: 30 }),
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "tween", ease: "easeOut", duration: 0.7 },
    },
    exit: (_: number) => ({
      opacity: 0,
      y: -30,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <>
      {/* trigger */}
      <div ref={ref} className="w-full h-screen" />

      <AnimatePresence>
        {isInView && (
          <motion.section
            key="governance-process"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* animated loop */}
            <motion.div
              className="fixed inset-0 -z-20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <InfinityLoop />
            </motion.div>

            {/* gold gradient overlay */}
            <motion.div
              className="fixed inset-0 -z-10 bg-gradient-to-br from-[#4E2A1E]/50 via-[#3A1F0B]/30 to-[#D4AF37]/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />

            {/* content */}
            <motion.div
              className="relative z-30 max-w-6xl px-6 text-center space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <motion.h3
                variants={titleVariants}
                className="
                  text-4xl md:text-5xl font-bold
                  bg-gradient-to-r from-[#D4AF37] via-[#FFE066] to-[#D4AF37]
                  bg-clip-text text-transparent
                  drop-shadow-[0_4px_8px_rgba(212,175,55,0.5)]
                "
                whileHover={{ scale: 1.05 }}
              >
                GOVERNANCE PROCESS – COURAGE TO BELIEVE, HUMILITY TO LISTEN
              </motion.h3>

              <motion.div
                variants={textVariants}
                custom={1}
                className="space-y-4 text-lg text-white/80"
              >
                <p>
                  This is the essence of Governance. Not just structure. Not
                  just voting. But the courage to believe in something, and the
                  humility to let the community decide.
                </p>
                <p>
                  You can propose, publish, and share your truth. You don’t need
                  approval or permission—only courage. When the community feels
                  your vision, we rise together.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {governanceSteps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 text-center"
                    style={{ boxShadow: "0 0 20px rgba(212,175,55,0.4)" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: 0.3 + idx * 0.1,
                    }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37]/40 to-[#FFE066]/20">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-2xl font-semibold text-[#FFE066] mb-2">
                      {step.title}
                    </h4>
                    <p className="text-white/80 text-sm">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* scroll hint */}
            <motion.div
              className="fixed bottom-8 z-40 w-full flex justify-center"
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
