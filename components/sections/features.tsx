"use client"

import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/ui/reveal"
import { motion } from "framer-motion"
import { Heart, Globe, Users, Shield } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "🤝 Community First",
    description:
      "We place people at the center. Every decision, every project, every step is guided by the values of love, peace, and harmony – for all of humanity.",
  },
  {
    icon: Globe,
    title: "🌎 Global Impact",
    description:
      "With the power of blockchain and united hearts, we create real-world change – from local communities to global ecosystems.",
  },
  {
    icon: Users,
    title: "🌱 Collective Growth",
    description: "No one is left behind. We grow together – in purpose, in abundance, in harmony.",
  },
  {
    icon: Shield,
    title: "🔐 Secure & Transparent",
    description:
      "Built on secure, decentralized blockchain technology. Open. Trustworthy. Fully transparent – so you always know where you stand.",
  },
]

export function FeaturesSection() {
  return (
    <section
      className="relative py-20 backdrop-blur-lg shadow-xl"
      style={{
        backgroundImage: "url('/future.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay to ensure content visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-mint-white/50 to-mint-white/50 backdrop-blur-sm"></div>

      <Container className="relative z-10">
        <Reveal>
          <h2 className="mb-3 text-center font-montserrat text-3xl font-bold tracking-tight sm:text-4xl text-black">
          🌍 Building a{" "}
            <span className="bg-gradient-to-r from-forest-green via-aqua-blue to-forest-green bg-clip-text text-transparent px-2 py-1 rounded">
              Better Future
            </span>
          </h2>
          <p className="text-center text-dark-text mb-12 text-lg">
            For the Earth. For Each Other. For Generations to Come.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Reveal key={index}>
              <div className="h-[300px]">
                {" "}
                {/* Fixed height container */}
                <motion.div
                  whileHover={{ scale: 1.05, borderColor: "var(--aqua-blue)" }}
                  className="flex h-full w-full flex-col rounded-2xl border-2 border-[#a67c00] bg-mint-white/80 p-6 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-forest-green/20"
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-4 p-3 rounded-full bg-forest-green/10 w-fit">
                      <feature.icon className="h-8 w-8 text-forest-green" />
                    </div>
                    <h3 className="mb-2 font-montserrat text-lg font-semibold text-dark-text">{feature.title}</h3>
                    <p className="text-dark-text flex-grow overflow-auto">{feature.description}</p>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 text-center">
            <p className="text-xl font-semibold italic text-black">
              "A system for the people. A movement for the planet. A future for us all."
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

