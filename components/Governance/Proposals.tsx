"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import InfinityLoop from "@/components/InfinityLoop";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Clock } from "lucide-react";

type Proposal = {
  id: number;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  status: "active" | "passed" | "rejected";
  timeRemaining: string;
  category: string;
};

const activeProposals: Proposal[] = [
  {
    id: 1,
    title: "Increase Staking Rewards by 2%",
    description:
      "Proposal to increase the annual staking rewards from 8% to 10% to incentivize long-term holding.",
    votesFor: 2800000,
    votesAgainst: 1200000,
    totalVotes: 4000000,
    status: "active",
    timeRemaining: "2 days",
    category: "Treasury",
  },
  {
    id: 2,
    title: "Add New Metaverse Region",
    description:
      "Expand the PLHH metaverse with a new mountain region featuring exclusive land plots and experiences.",
    votesFor: 3500000,
    votesAgainst: 500000,
    totalVotes: 4000000,
    status: "active",
    timeRemaining: "5 days",
    category: "Metaverse",
  },
  {
    id: 3,
    title: "Community Fund Allocation",
    description:
      "Allocate 100,000 PLHH from the community fund to support environmental conservation projects.",
    votesFor: 2900000,
    votesAgainst: 1100000,
    totalVotes: 4000000,
    status: "passed",
    timeRemaining: "Completed",
    category: "Community",
  },
];

export function GovernanceProposals() {
  const [selectedProposal, setSelectedProposal] = useState<Proposal>(
    activeProposals[0]
  );
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sentinelRef, { amount: 0.5, once: false });

  // Container variant for staggering
  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.3, when: "beforeChildren" } },
  };

  // Slide + fade
  const itemVariants: Variants = {
    hidden: (dir: number) => ({ opacity: 0, y: dir * 30 }),
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "tween", ease: "easeOut", duration: 0.7 },
    },
  };

  return (
    <>
      {/* full-screen trigger */}
      <div ref={sentinelRef} className="w-full h-screen" />

      <AnimatePresence>
        {isInView && (
          <motion.section
            key="governance-proposals"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* InfinityLoop bg */}
            <motion.div
              className="fixed inset-0 -z-20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <InfinityLoop />
            </motion.div>

            {/* Gold-brown gradient overlay */}
            <motion.div
              className="fixed inset-0 -z-10 bg-gradient-to-br from-[#4E2A1E]/50 via-[#3A1F0B]/30 to-[#D4AF37]/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />

            {/* Content */}
            <motion.div
              className="relative z-30 max-w-6xl px-6 space-y-10"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              {/* Narrative */}
              <motion.div
                custom={1}
                variants={itemVariants}
                className="text-center space-y-4 text-lg"
              >
                <p>
                  Creating from scratch. Not knowing if it would work. Only
                  knowing that we had to try.
                </p>
                <p>
                  Because if we didn’t speak, if we didn’t act, if we didn’t
                  give our vision a voice – nothing would move.
                </p>
              </motion.div>

              {/* Proposals grid */}
              <motion.div
                className="grid w-full grid-cols-1 lg:grid-cols-3 gap-8"
                custom={-1}
                variants={itemVariants}
              >
                {/* List */}
                <motion.div
                  className="lg:col-span-2 space-y-4 bg-white/10 backdrop-blur-sm rounded-lg p-6"
                  style={{ boxShadow: "0 0 0 2px #D4AF37" }}
                >
                  <h3 className="flex items-center gap-2 text-xl font-bold mb-4 text-[#FFE066]">
                    <Clock className="h-5 w-5" />
                    Active Proposals
                  </h3>
                  {activeProposals.map((p) => (
                    <motion.div
                      key={p.id}
                      whileHover={{ scale: 1.01 }}
                      className={`cursor-pointer rounded-lg p-4 transition-all ${
                        selectedProposal.id === p.id
                          ? "bg-[#FFE066]/10"
                          : "bg-white/5 hover:bg-white/10"
                      }`}
                      style={{
                        boxShadow:
                          selectedProposal.id === p.id
                            ? "0 0 0 2px #D4AF37"
                            : "0 0 0 1px rgba(212,175,55,0.3)",
                      }}
                      onClick={() => setSelectedProposal(p)}
                    >
                      <div className="flex justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{p.title}</h4>
                          <span className="text-sm text-black bg-[#FFE066]/20 px-2 py-0.5 rounded-full">
                            {p.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3" />
                          <span>{p.timeRemaining}</span>
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>
                            For: {(p.votesFor / 1_000_000).toFixed(1)}M
                          </span>
                          <span>
                            Against: {(p.votesAgainst / 1_000_000).toFixed(1)}M
                          </span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#8FD19E] to-[#6BBF85]"
                            style={{
                              width: `${(p.votesFor / p.totalVotes) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      <p className="text-sm line-clamp-2 text-white/80">
                        {p.description}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Detail */}
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
                  style={{ boxShadow: "0 0 0 2px #D4AF37" }}
                  custom={1}
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-bold mb-4 text-[#FFE066]">
                    Proposal Details
                  </h3>
                  <h4 className="text-lg font-semibold mb-2">
                    {selectedProposal.title}
                  </h4>
                  <div className="space-y-1 text-sm mb-4">
                    <p>
                      Status:{" "}
                      <span className="font-medium">
                        {selectedProposal.status}
                      </span>
                    </p>
                    <p>Category: {selectedProposal.category}</p>
                    <p>Time: {selectedProposal.timeRemaining}</p>
                    <p>
                      Total Votes:{" "}
                      {(selectedProposal.totalVotes / 1_000_000).toFixed(1)}M
                    </p>
                  </div>
                  <p className="text-sm text-white/90 mb-4">
                    {selectedProposal.description}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>For</span>
                        <span>
                          {(
                            (selectedProposal.votesFor /
                              selectedProposal.totalVotes) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          (selectedProposal.votesFor /
                            selectedProposal.totalVotes) *
                          100
                        }
                        className="h-2 bg-white/20"
                      >
                        <div className="h-full bg-gradient-to-r from-[#8FD19E] to-[#6BBF85] rounded-full" />
                      </Progress>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Against</span>
                        <span>
                          {(
                            (selectedProposal.votesAgainst /
                              selectedProposal.totalVotes) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          (selectedProposal.votesAgainst /
                            selectedProposal.totalVotes) *
                          100
                        }
                        className="h-2 bg-white/20"
                      >
                        <div className="h-full bg-gradient-to-r from-[#F7786B] to-[#DD5C4B] rounded-full" />
                      </Progress>
                    </div>
                  </div>

                  <Link
                    href={`/proposals/${selectedProposal.id}/vote`}
                    className="block mt-6"
                  >
                    <Button
                      className="w-full bg-gradient-to-r from-[#8FD19E] to-[#6BBF85] text-black hover:from-[#8FD19E] hover:to-[#6BBF85]/90"
                      style={{ boxShadow: "0 0 0 2px #D4AF37" }}
                    >
                      Cast Your Vote
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
      {/* spacer */}
      <div className="h-[100vh]" />
    </>
  );
}
