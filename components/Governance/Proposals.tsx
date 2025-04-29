"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
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

  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <>
      <section ref={ref} className="w-full h-[100vh] relative overflow-hidden">
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="governance-proposals-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-full h-[100vh] flex flex-col items-center justify-center px-6 bg-black text-white z-50"
            >
              <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Proposal List */}
                <motion.div
                  initial={{ x: "-50%", opacity: 0 }}
                  animate={{ x: "0%", opacity: 1 }}
                  exit={{ x: "-50%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="bg-white/10 text-white rounded-lg p-6 lg:col-span-2 backdrop-blur-sm"
                  style={{ boxShadow: "0 0 0 2px #a67c00" }}
                >
                  <h3 className="text-xl font-bold mb-4 text-forest-green flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Active Proposals
                  </h3>

                  <div className="space-y-4">
                    {activeProposals.map((proposal) => (
                      <motion.div
                        key={proposal.id}
                        whileHover={{ scale: 1.01 }}
                        className={`cursor-pointer rounded-lg p-4 transition-all ${
                          selectedProposal.id === proposal.id
                            ? "bg-warm-gold/5"
                            : "bg-white/5 hover:bg-white/10"
                        }`}
                        style={{
                          boxShadow:
                            selectedProposal.id === proposal.id
                              ? "0 0 0 2px #a67c00"
                              : "0 0 0 1px rgba(166, 124, 0, 0.3)",
                        }}
                        onClick={() => setSelectedProposal(proposal)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{proposal.title}</h4>
                            <span className="text-xs text-forest-green bg-forest-green/10 px-2 py-0.5 rounded-full">
                              {proposal.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="h-3 w-3" />
                            <span>{proposal.timeRemaining}</span>
                          </div>
                        </div>

                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-sage-green">
                              For: {(proposal.votesFor / 1_000_000).toFixed(1)}M
                            </span>
                            <span className="text-brick-red">
                              Against:{" "}
                              {(proposal.votesAgainst / 1_000_000).toFixed(1)}M
                            </span>
                          </div>
                          <div className="h-2 bg-dark-text/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-sage-green to-sage-green/80"
                              style={{
                                width: `${
                                  (proposal.votesFor / proposal.totalVotes) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                        </div>

                        <p className="text-sm text-white/80 line-clamp-2">
                          {proposal.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Proposal Detail Card */}
                <motion.div
                  initial={{ x: "50%", opacity: 0 }}
                  animate={{ x: "0%", opacity: 1 }}
                  exit={{ x: "50%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="bg-white/10 text-white rounded-lg p-6 backdrop-blur-sm h-full"
                  style={{ boxShadow: "0 0 0 2px #a67c00" }}
                >
                  <h3 className="text-xl font-bold text-forest-green mb-4">
                    Proposal Details
                  </h3>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">
                      {selectedProposal.title}
                    </h4>

                    <div className="space-y-1 text-sm">
                      <p>
                        Status:{" "}
                        <span className="font-medium">
                          {selectedProposal.status}
                        </span>
                      </p>
                      <p>Category: {selectedProposal.category}</p>
                      <p>Time Remaining: {selectedProposal.timeRemaining}</p>
                      <p>
                        Total Votes:{" "}
                        {(selectedProposal.totalVotes / 1_000_000).toFixed(1)}M
                      </p>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-1">Description</h5>
                      <p className="text-sm text-white/90">
                        {selectedProposal.description}
                      </p>
                    </div>

                    <div className="mt-4 space-y-2">
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
                          className="h-2 bg-dark-text/20"
                        >
                          <div className="h-full bg-gradient-to-r from-sage-green to-sage-green/80 rounded-full" />
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
                          className="h-2 bg-dark-text/20"
                        >
                          <div className="h-full bg-gradient-to-r from-brick-red to-brick-red/80 rounded-full" />
                        </Progress>
                      </div>
                    </div>

                    <Link
                      href={`/proposals/${selectedProposal.id}/vote`}
                      className="block mt-6"
                    >
                      <Button
                        className="w-full bg-gradient-to-r from-forest-green to-aqua-blue text-mint-white hover:from-forest-green hover:to-aqua-blue/90"
                        style={{ boxShadow: "0 0 0 2px #a67c00" }}
                      >
                        Cast Your Vote
                      </Button>
                    </Link>
                  </div>
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
