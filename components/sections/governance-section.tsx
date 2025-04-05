"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/ui/reveal"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Check, Clock, FileText, Users, ArrowRight, AlertCircle } from "lucide-react"
import Link from "next/link"

// Sample active proposals
const activeProposals = [
  {
    id: 1,
    title: "Increase Staking Rewards by 2%",
    description: "Proposal to increase the annual staking rewards from 8% to 10% to incentivize long-term holding.",
    votesFor: 2800000,
    votesAgainst: 1200000,
    totalVotes: 4000000,
    status: "active", // active, passed, rejected
    timeRemaining: "2 days",
    category: "Treasury",
  },
  {
    id: 2,
    title: "Add New Metaverse Region",
    description: "Expand the PLHH metaverse with a new mountain region featuring exclusive land plots and experiences.",
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
    description: "Allocate 100,000 PLHH from the community fund to support environmental conservation projects.",
    votesFor: 2900000,
    votesAgainst: 1100000,
    totalVotes: 4000000,
    status: "passed",
    timeRemaining: "Completed",
    category: "Community",
  },
]

// Governance process steps
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
]

export function GovernanceSection() {
  const [selectedProposal, setSelectedProposal] = useState(activeProposals[0])

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-mint-white to-mint-white">
      {/* Animated gradient backgrounds */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(95,185,195,0.15),transparent_80%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(83,146,65,0.1),transparent_50%)]" />
      </div>

      <Container className="relative z-10">
        <Reveal width="100%">
          <h2 className="mb-4 text-center font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-forest-green via-aqua-blue to-forest-green bg-clip-text text-transparent">
              Community Governance
            </span>
          </h2>
        </Reveal>

        <Reveal width="100%">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-dark-text text-lg mb-4">
              PLHH is governed by the community – not by corporations. Every PLHH Coin holder has the power to propose,
              discuss, and vote on meaningful decisions that shape the future of the ecosystem.
            </p>
            <p className="text-dark-text text-lg mb-4">
              Voting power is proportional to your holdings – but the intention behind each vote is what truly matters.
            </p>
            <p className="text-dark-text text-lg mb-4">
              From funding regenerative projects to forming partnerships and shaping the Metaverse – you have a voice.
              This ensures that PLHH evolves not by control, but by collective intelligence, shared values, and aligned
              vision.
            </p>
            <p className="text-dark-text text-lg font-medium">
              At PLHH, governance is not a feature.
              <br />
              It's the foundation of freedom.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16" id="proposals">
          {/* Active Proposals */}
          <Reveal width="100%" className="lg:col-span-2">
            <div
              className="bg-mint-white/50 backdrop-blur-sm rounded-lg overflow-hidden"
              style={{ boxShadow: "0 0 0 2px #a67c00" }}
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-forest-green" />
                  <h3 className="text-xl font-bold text-forest-green">Active Proposals</h3>
                </div>

                <div className="space-y-4">
                  {activeProposals.map((proposal) => (
                    <motion.div
                      key={proposal.id}
                      whileHover={{ scale: 1.01 }}
                      className={`cursor-pointer rounded-lg p-4 transition-all ${
                        selectedProposal.id === proposal.id
                          ? "bg-warm-gold/5"
                          : "bg-mint-white/30 hover:bg-mint-white/40"
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
                          <h3 className="font-semibold text-dark-text">{proposal.title}</h3>
                          <span className="text-xs text-forest-green bg-forest-green/10 px-2 py-0.5 rounded-full">
                            {proposal.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3 text-dark-text" />
                          <span className="text-dark-text">{proposal.timeRemaining}</span>
                        </div>
                      </div>

                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-sage-green">For: {(proposal.votesFor / 1000000).toFixed(1)}M PLHH</span>
                          <span className="text-brick-red">
                            Against: {(proposal.votesAgainst / 1000000).toFixed(1)}M PLHH
                          </span>
                        </div>
                        <div className="h-2 bg-dark-text/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-sage-green to-sage-green/80"
                            style={{ width: `${(proposal.votesFor / proposal.totalVotes) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="text-sm text-dark-text line-clamp-2">{proposal.description}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6">
                  <Link href="/proposals">
                    <Button
                      variant="outline"
                      className="w-full text-forest-green hover:bg-[#a67c00]/10"
                      style={{ boxShadow: "0 0 0 2px #a67c00" }}
                    >
                      View All Proposals
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Selected Proposal Details */}
          <Reveal width="100%">
            <div
              className="bg-mint-white/50 backdrop-blur-sm rounded-lg overflow-hidden h-full"
              style={{ boxShadow: "0 0 0 2px #a67c00" }}
            >
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold text-forest-green mb-4">Proposal Details</h3>

                <div className="space-y-4 flex-grow">
                  <h3 className="text-xl font-semibold text-dark-text">{selectedProposal.title}</h3>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-dark-text">Status:</span>
                      <span
                        className={`font-medium ${
                          selectedProposal.status === "passed"
                            ? "text-sage-green"
                            : selectedProposal.status === "rejected"
                              ? "text-brick-red"
                              : "text-forest-green"
                        }`}
                      >
                        {selectedProposal.status.charAt(0).toUpperCase() + selectedProposal.status.slice(1)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-dark-text">Category:</span>
                      <span className="font-medium text-dark-text">{selectedProposal.category}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-dark-text">Time Remaining:</span>
                      <span className="font-medium text-dark-text">{selectedProposal.timeRemaining}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-dark-text">Total Votes:</span>
                      <span className="font-medium text-dark-text">
                        {(selectedProposal.totalVotes / 1000000).toFixed(1)}M PLHH
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-dark-text mb-2">Description</h4>
                    <p className="text-dark-text text-sm">{selectedProposal.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-dark-text mb-2">Current Results</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>For</span>
                          <span>{((selectedProposal.votesFor / selectedProposal.totalVotes) * 100).toFixed(1)}%</span>
                        </div>
                        <Progress
                          value={(selectedProposal.votesFor / selectedProposal.totalVotes) * 100}
                          className="h-2 bg-dark-text/20"
                        >
                          <div className="h-full bg-gradient-to-r from-sage-green to-sage-green/80 rounded-full" />
                        </Progress>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Against</span>
                          <span>
                            {((selectedProposal.votesAgainst / selectedProposal.totalVotes) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <Progress
                          value={(selectedProposal.votesAgainst / selectedProposal.totalVotes) * 100}
                          className="h-2 bg-dark-text/20"
                        >
                          <div className="h-full bg-gradient-to-r from-brick-red to-brick-red/80 rounded-full" />
                        </Progress>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Link href={`/proposals/${selectedProposal.id}/vote`}>
                    <Button
                      className="w-full bg-gradient-to-r from-forest-green to-aqua-blue text-mint-white hover:from-forest-green hover:to-aqua-blue/90"
                      style={{ boxShadow: "0 0 0 2px #a67c00" }}
                    >
                      Cast Your Vote
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Governance Process */}
        <Reveal width="100%">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-center font-montserrat text-2xl font-bold mb-8">
              <span className="bg-gradient-to-r from-forest-green via-aqua-blue to-forest-green bg-clip-text text-transparent">
                How PLHH Governance Works
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {governanceSteps.map((step, index) => (
                <div
                  key={index}
                  className="bg-mint-white/50 backdrop-blur-sm rounded-lg p-6 text-center"
                  style={{ boxShadow: "0 0 0 2px #a67c00" }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-forest-green to-aqua-blue flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-6 w-6 text-mint-white" />
                  </div>
                  <h4 className="text-forest-green font-semibold mb-2">{step.title}</h4>
                  <p className="text-sm text-dark-text">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8 text-dark-text">
              <p className="italic font-medium">
                PLHH Governance is simple, transparent, and soul-powered.
                <br />
                You don't need permission – just participation.
                <br />
                You don't follow decisions – you create them.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal width="100%">
          <div className="flex justify-center mt-12">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-warm-gold to-earthy-copper text-dark-text transition-all hover:scale-105 hover:from-warm-gold hover:to-earthy-copper/90"
              style={{ boxShadow: "0 0 0 2px #a67c00" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 0.5,
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Connect Wallet to Participate
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

