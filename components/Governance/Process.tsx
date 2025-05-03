"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import InfinityLoop from "@/components/InfinityLoop";
import { FileText, Users, Check, AlertCircle } from "lucide-react";

// ✅ Step definitions
const governanceSteps = [
  {
    icon: FileText,
    title: "1. Submit a Proposal",
    description:
      "Anyone holding at least 10,000 PLHH Coins can submit a proposal to the DAO – whether it's about funding a project, adjusting parameters, or introducing new features. Your voice, your vision, your proposal.",
  },
  {
    icon: Users,
    title: "2. Community Discussion (7 Days)",
    description:
      "Each proposal enters a 7-day open discussion period. The community can share feedback, ask questions, and suggest improvements. Refinement happens in the circle – together.",
  },
  {
    icon: Check,
    title: "3. Token-Weighted Voting",
    description:
      "After the discussion, the proposal moves to a formal on-chain vote. Votes are weighted by the number of PLHH Coins held in your wallet. More coins = more voting power – but every voice counts.",
  },
  {
    icon: AlertCircle,
    title: "4. Execution Threshold",
    description:
      "For a proposal to pass and be executed, it must meet two conditions: 66% approval from voters and 10% quorum (of total circulating PLHH). If the community aligns – the vision becomes reality.",
  },
];

export function GovernanceProcess() {
  // sentinel to watch when this section scrolls into/out of view
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });

  // container stagger
  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.3, when: "beforeChildren" } },
  };

  // title pop-in
  const titleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 180, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } },
  };

  // text slide/fade
  const textVariants: Variants = {
    hidden: (dir: number) => ({ opacity: 0, y: dir * 50 }),
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "tween", ease: "easeOut", duration: 0.7 },
    },
    exit: (dir: number) => ({
      opacity: 0,
      y: dir * -50,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <>
      <div ref={ref} className="w-full h-screen" />
      <AnimatePresence>
        {isInView && (
          <motion.section
            key="governance-process"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Background loop */}
            <motion.div
              className="fixed inset-0 -z-20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <InfinityLoop />
            </motion.div>

            {/* Gradient overlay */}
            <motion.div
              className="fixed inset-0 -z-10 bg-gradient-to-br from-[#4E2A1E]/50 via-[#3A1F0B]/30 to-[#D4AF37]/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />

            {/* Content */}
            <motion.div
              className="relative z-30 max-w-6xl px-6 text-center space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <motion.h3
                variants={titleVariants}
                className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_4px_8px_rgba(212,175,55,0.5)]"
                whileHover={{ scale: 1.05 }}
              >
                How PLHH Governance Works
              </motion.h3>

              <motion.div
                className="space-y-4 text-lg text-white/90"
                variants={textVariants}
                custom={1}
              >
                <p>
                  This is the essence of Governance. Not just structure. Not
                  just voting. But the courage to believe in something, and the
                  humility to let the community decide.
                </p>
                <p>
                  That's why we chose DAO Governance. Because it's not about one
                  mind. It's about many hearts.
                </p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              >
                {governanceSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 text-center"
                    style={{ boxShadow: "0 0 20px rgba(212,175,55,0.4)" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: 0.4 + i * 0.1,
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
              </motion.div>
            </motion.div>

            {/* Scroll Hint */}
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
