"use client";

import React, { useRef } from "react";
import { useInView, motion, AnimatePresence } from "framer-motion";
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
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <>
      <section ref={ref} className="w-full h-[100vh] relative overflow-hidden">
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="governance-process-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-full h-[100vh] flex flex-col items-center justify-center px-6 text-center bg-black text-white z-50"
            >
              <div className="max-w-6xl space-y-10">
                {/* Title */}
                <motion.h3
                  initial={{ y: "-50%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-50%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-2xl sm:text-4xl font-bold text-center"
                >
                  <span className="bg-gradient-to-r from-forest-green via-aqua-blue to-forest-green bg-clip-text text-transparent">
                    How PLHH Governance Works
                  </span>
                </motion.h3>

                {/* Steps Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {governanceSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      className="bg-mint-white/50 backdrop-blur-sm rounded-lg p-6 text-center text-dark-text"
                      style={{ boxShadow: "0 0 0 2px #a67c00" }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: 0.3 + index * 0.1,
                      }}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-forest-green to-aqua-blue flex items-center justify-center mx-auto mb-4">
                        <step.icon className="h-6 w-6 text-mint-white" />
                      </div>
                      <h4 className="text-forest-green font-semibold mb-2">
                        {step.title}
                      </h4>
                      <p className="text-sm">{step.description}</p>
                    </motion.div>
                  ))}
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
}
