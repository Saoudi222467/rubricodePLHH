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
      "Increase annual staking rewards from 8% to 10% to reward long-term holders.",
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
      "Expand the PLHH Metaverse with a new mountain region and exclusive land plots.",
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
      "Allocate 100,000 PLHH to support environmental conservation projects.",
    votesFor: 2900000,
    votesAgainst: 1100000,
    totalVotes: 4000000,
    status: "passed",
    timeRemaining: "Completed",
    category: "Community",
  },
];

export function GovernanceProposals() {
  const [selected, setSelected] = useState<Proposal>(activeProposals[0]);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sentinelRef, { amount: 0.5, once: false });

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.25, when: "beforeChildren" } },
  };

  const itemVariants: Variants = {
    hidden: (dir: number) => ({ opacity: 0, y: dir * 30 }),
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "tween", ease: "easeOut", duration: 0.6 },
    },
    exit: (_: number) => ({
      opacity: 0,
      y: -30,
      transition: { duration: 0.3 },
    }),
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
            {/* Infinity-loop background */}
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

            {/* Content & Proposals */}
            <motion.div
              className="relative z-30 max-w-6xl px-6 space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <motion.h3
                variants={itemVariants}
                className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-[#D4AF37] via-[#FFE066] to-[#D4AF37] bg-clip-text text-transparent"
              >
                GOVERNANCE PROPOSALS – YOUR VOICE, YOUR VISION
              </motion.h3>

              {/* Narrative Intro */}
              <motion.p
                variants={itemVariants}
                className="text-center text-lg font-medium text-white/90 px-4"
              >
                That’s why we chose DAO Governance. Because it’s not about one
                mind—it’s about many hearts. Everyone who has a thought, a
                vision, a fire, a question, an idea deserves to be heard. And
                not just heard—but seen, voted on, and if the community
                agrees—brought to life.
              </motion.p>

              {/* Proposals Grid */}
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                custom={1}
                variants={itemVariants}
              >
                {/* Left: Proposal List */}
                <div className="lg:col-span-2 space-y-4">
                  {activeProposals.map((p) => (
                    <motion.div
                      key={p.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      className={`cursor-pointer rounded-lg p-5 transition-all ${
                        selected.id === p.id
                          ? "bg-[#FFE066]/10"
                          : "bg-white/10 hover:bg-white/20"
                      }`}
                      style={{
                        boxShadow:
                          selected.id === p.id
                            ? "0 0 0 2px #D4AF37"
                            : "0 0 0 1px rgba(212,175,55,0.3)",
                      }}
                      onClick={() => setSelected(p)}
                    >
                      <div className="flex justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-semibold">{p.title}</h4>
                          <span className="text-sm bg-[#F59E0B]/20 px-2 py-0.5 rounded-full text-[#f37669] flex justify-center items-center w-20">
                            {p.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#FFE066]">
                          <Clock className="h-4 w-4" />
                          {p.timeRemaining}
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[#F59E0B]">
                            For {(p.votesFor / 1e6).toFixed(1)}M
                          </span>
                          <span className="text-[#F7786B]">
                            Against {(p.votesAgainst / 1e6).toFixed(1)}M
                          </span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#F59E0B] to-[#D97706]"
                            style={{
                              width: `${(p.votesFor / p.totalVotes) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      <p className="text-sm text-white/80 line-clamp-2">
                        {p.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Right: Detail Card */}
                <div
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4"
                  style={{ boxShadow: "0 0 0 2px #D4AF37" }}
                >
                  <motion.h4
                    variants={itemVariants}
                    className="text-2xl font-semibold text-[#FFE066]"
                  >
                    {selected.title}
                  </motion.h4>

                  <motion.div
                    variants={itemVariants}
                    className="text-sm space-y-1"
                  >
                    <p>
                      Status:{" "}
                      <span className="font-medium text-white">
                        {selected.status}
                      </span>
                    </p>
                    <p>Category: {selected.category}</p>
                    <p>Time Left: {selected.timeRemaining}</p>
                    <p>
                      Total Votes: {(selected.totalVotes / 1e6).toFixed(1)}M
                    </p>
                  </motion.div>

                  <motion.p
                    variants={itemVariants}
                    className="text-white/90 text-sm"
                  >
                    {selected.description}
                  </motion.p>

                  <motion.div variants={itemVariants} className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>For</span>
                        <span>
                          {(
                            (selected.votesFor / selected.totalVotes) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                      <Progress
                        value={(selected.votesFor / selected.totalVotes) * 100}
                        className="h-2 bg-white/20"
                      >
                        <div className="h-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-full" />
                      </Progress>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Against</span>
                        <span>
                          {(
                            (selected.votesAgainst / selected.totalVotes) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          (selected.votesAgainst / selected.totalVotes) * 100
                        }
                        className="h-2 bg-white/20"
                      >
                        <div className="h-full bg-gradient-to-r from-[#F7786B] to-[#DD5C4B] rounded-full" />
                      </Progress>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Link
                      href={`/proposals/${selected.id}/vote`}
                      className="block"
                    >
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white hover:from-[#F59E0B] hover:to-[#D97706]/90"
                        style={{ boxShadow: "0 0 0 2px #D4AF37" }}
                      >
                        Cast Your Vote
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* spacer to allow scrolling */}
      <div className="h-[100vh]" />
    </>
  );
}
