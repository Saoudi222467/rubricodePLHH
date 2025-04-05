"use client"

import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/ui/reveal"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import {
  Coins,
  Globe2,
  Users,
  Rocket,
  Building2,
  Gem,
  Boxes,
  Network,
  GamepadIcon,
  Share2,
  Shield,
  Trophy,
} from "lucide-react"

const roadmap = [
  {
    phase: "Phase 1",
    title: "Foundation & Launch",
    timeline: "Q1 2025",
    status: "completed",
    description:
      "This phase is focused on laying the groundwork for the project by establishing a solid infrastructure, launching the token, and building a strong community foundation. It includes critical steps such as smart contract auditing, strategic partnerships, and initial platform development to ensure the project is secure, sustainable, and ready for future expansion.",
    icon: Building2,
    highlights: ["Token Launch", "Community Building", "Initial Platform"],
    items: [
      {
        title: "Token Genesis",
        description: "Launch on major DEXs with initial liquidity pool of $2M",
        icon: Coins,
        status: "completed",
      },
      {
        title: "Security First",
        description: "Smart contract audit and multiple security implementations",
        icon: Shield,
        status: "completed",
      },
      {
        title: "Community Foundation",
        description: "Launch of DAO governance structure and community initiatives",
        icon: Users,
        status: "completed",
      },
      {
        title: "Strategic Partnerships",
        description: "Initial partnerships with key blockchain projects and influencers",
        icon: Share2,
        status: "completed",
      },
    ],
  },
  {
    phase: "Phase 2",
    title: "Metaverse Development",
    timeline: "Q2 2025",
    status: "in-progress",
    description:
      "In this phase, we focus on the development of our immersive metaverse, creating new virtual spaces and expanding the ecosystem's functionalities. This will involve launching the virtual land sale, creating unique NFT collections with in-world utility, and setting up a platform for virtual events. The aim is to bring our users closer to the metaverse while providing a platform for creators and players to interact in novel ways.",
    icon: Globe2,
    highlights: ["Land Sales", "NFT Launch", "Virtual Events"],
    items: [
      {
        title: "Virtual Land Sale",
        description: "First round of metaverse land sales with exclusive benefits",
        icon: Boxes,
        status: "in-progress",
      },
      {
        title: "NFT Collection",
        description: "Launch of 10,000 unique Land NFTs with utility features",
        icon: Gem,
        status: "upcoming",
      },
      {
        title: "Virtual Events Platform",
        description: "Development of virtual concert and event spaces",
        icon: GamepadIcon,
        status: "upcoming",
      },
      {
        title: "Marketplace Launch",
        description: "P2P marketplace for virtual assets and land trading",
        icon: Network,
        status: "upcoming",
      },
    ],
  },
  {
    phase: "Phase 3",
    title: "Global Expansion",
    timeline: "Q3 2025",
    status: "upcoming",
    description:
      "As we move towards global expansion, our focus will be on scaling the platform and improving interoperability with other blockchain ecosystems. This will involve introducing cross-chain capabilities, launching a mobile app to broaden accessibility, and enhancing governance features to empower the community. The goal is to position our project for wider adoption across various markets and industries.",
    icon: Rocket,
    highlights: ["Cross-chain", "Mobile App", "Partnerships"],
    items: [
      {
        title: "Cross-chain Integration",
        description: "Bridge deployment across major blockchain networks",
        icon: Network,
        status: "upcoming",
      },
      {
        title: "Mobile Experience",
        description: "Launch of mobile app for iOS and Android platforms",
        icon: GamepadIcon,
        status: "upcoming",
      },
      {
        title: "Enhanced Governance",
        description: "Implementation of advanced DAO features and voting mechanisms",
        icon: Users,
        status: "upcoming",
      },
      {
        title: "Global Partnerships",
        description: "Strategic partnerships with major brands and institutions",
        icon: Building2,
        status: "upcoming",
      },
    ],
  },
  {
    phase: "Phase 4",
    title: "Full Ecosystem",
    timeline: "Q4 2025",
    status: "upcoming",
    description:
      "In the final phase, we aim to achieve complete decentralization and the maturity of the entire ecosystem. This includes integrating cutting-edge features like DeFi 2.0, utilizing AI to enhance gameplay and content, and developing specialized metaverse districts tailored to different use cases. The full launch will mark the culmination of all phases, offering a fully immersive, decentralized ecosystem for users to explore, create, and interact.",
    icon: Trophy,
    highlights: ["DeFi 2.0", "AI Integration", "Full Launch"],
    items: [
      {
        title: "DeFi 2.0 Features",
        description: "Advanced staking, farming, and yield optimization",
        icon: Coins,
        status: "upcoming",
      },
      {
        title: "AI Integration",
        description: "AI-powered NPCs and dynamic content generation",
        icon: Network,
        status: "upcoming",
      },
      {
        title: "Metaverse Districts",
        description: "Specialized zones for gaming, education, and commerce",
        icon: Boxes,
        status: "upcoming",
      },
      {
        title: "Global Events",
        description: "Large-scale virtual events and conferences",
        icon: Users,
        status: "upcoming",
      },
    ],
  },
]

export function RoadmapSection() {
  return (
    <section className="relative py-20 bg-white" id="roadmap">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(83,146,65,0.1),transparent_70%)]" />

      <Container className="flex flex-col items-center">
        <Reveal>
          <div className="mb-16 text-center">
            <h2 className="mb-4 bg-gradient-to-r from-forest-green via-aqua-blue to-forest-green bg-clip-text font-montserrat text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              Journey to Digital Harmony
            </h2>
            <p className="mx-auto max-w-2xl text-dark-text">
            Our comprehensive roadmap to revolutionize the digital landscape
            through blockchain technology and community-driven innovation.
            </p>
          </div>
        </Reveal>

        <div className="relative mx-auto max-w-5xl">
          {/* Center line */}
          <div className="mt-10 absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-forest-green/50 via-forest-green/10 to-transparent" />

          {roadmap.map((phase, index) => (
            <Reveal key={index}>
              <div className="relative mb-24 last:mb-0 mt-2">
                {/* Phase header */}
                <div className="mb-20 flex justify-center">
                  <motion.div
                    className="relative inline-flex items-center gap-2 rounded-full border-2 border-[#a67c00] backdrop-blur-lg shadow-lg px-4 py-2"
                  >
                    <phase.icon className="h-5 w-5 text-forest-green" />
                    <span className="font-montserrat text-lg font-semibold text-forest-green">
                      {phase.phase}: {phase.title}
                    </span>
                  </motion.div>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-1/2 top-[3.8rem] -translate-x-1/2 z-10">
                  <motion.div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                      phase.status === "completed"
                        ? "border-[#a67c00] bg-forest-green text-white"
                        : phase.status === "in-progress"
                          ? "border-[#a67c00] bg-forest-green text-white"
                          : "border-[#a67c00] bg-forest-green text-white"
                    }`}
                  >
                    <span className="font-mono text-sm font-bold">{index + 1}</span>
                  </motion.div>
                </div>

                {/* Phase content */}
                <div className="grid gap-8 md:grid-cols-2">
                  {/* Left side - Phase info */}
                  <motion.div
                    className="rounded-lg border-2 border-[#a67c00] backdrop-blur-lg shadow-lg bg-mint-white/40 p-6 h-full"
                  >
                    <div className="mb-4">
                      <div className="mb-2 font-mono text-sm text-forest-green">{phase.timeline}</div>
                      <p className="text-sm text-dark-text">{phase.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {phase.highlights.map((highlight, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="border-warm-gold/20 bg-warm-gold/5 text-forest-green"
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>

                  {/* Right side - Milestones */}
                  <div className="space-y-4 h-full flex flex-col justify-between">
                    {phase.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        className="rounded-lg border-2 border-[#a67c00] backdrop-blur-lg shadow-lg bg-mint-white/40 p-4 flex-1"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <item.icon className="h-5 w-5 text-forest-green" />
                          <h4 className="font-montserrat text-sm font-semibold text-forest-green">{item.title}</h4>
                        </div>
                        <p className="text-sm text-dark-text">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
